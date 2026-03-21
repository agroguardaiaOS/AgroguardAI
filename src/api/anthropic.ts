import Anthropic from '@anthropic-ai/sdk'
import type { LanguageCode, DiagnosisResult, Message, CapturedFrame } from '../types'
import { getDiagnosisPrompt, getChatPrompt, getLivePrompt } from '../lib/prompts'
import { getApiKey } from '../lib/storage'
import type { AIProviderClient, LiveResult } from './types'
import { parseJSON, toHistory } from './types'

// ─────────────────────────────────────────
// Claude Sonnet 4 — for diagnosis and chat
// Claude Haiku 4  — for live scan (speed)
// ─────────────────────────────────────────
const MODEL_PRO   = 'claude-sonnet-4-6'
const MODEL_FLASH = 'claude-haiku-4-5-20251001'

function client() {
  const key = getApiKey('anthropic')
  if (!key) throw new Error('NO_API_KEY: Add your Anthropic key in Settings.')
  return new Anthropic({
    apiKey: key,
    dangerouslyAllowBrowser: true,
  })
}

export class AnthropicProvider implements AIProviderClient {

  // Uses Sonnet — best reasoning for diagnosis
  async diagnoseCrop(
    description: string,
    frame: CapturedFrame | null,
    lang: LanguageCode
  ): Promise<DiagnosisResult> {
    const ai     = client()
    const prompt = getDiagnosisPrompt(lang)

    const content: any[] = [
      { type: 'text', text: `${prompt}\n\nFarmer says: "${description || 'Please analyse this image.'}"` }
    ]

    if (frame) {
      content.unshift({
        type: 'image',
        source: {
          type:       'base64',
          media_type: frame.mimeType as 'image/jpeg' | 'image/png' | 'image/webp',
          data:       frame.base64,
        },
      })
    }

    const res    = await ai.messages.create({
      model:      MODEL_PRO,
      max_tokens: 1024,
      messages:   [{ role: 'user', content }],
    })

    const text   = res.content.filter(b => b.type === 'text').map(b => (b as any).text).join('')
    const parsed = parseJSON<DiagnosisResult>(text)
    if (!parsed.disease) throw new Error('INCOMPLETE_RESPONSE')
    return parsed
  }

  // Uses Sonnet with streaming
  async sendChat(
    text: string,
    history: Message[],
    lang: LanguageCode,
    onChunk: (chunk: string) => void
  ): Promise<string> {
    const ai = client()

    const messages = [
      ...toHistory(history),
      { role: 'user' as const, content: text },
    ]

    let full = ''
    const stream = await ai.messages.stream({
      model:      MODEL_PRO,
      max_tokens: 1024,
      system:     getChatPrompt(lang),
      messages,
    })

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        full += chunk.delta.text
        onChunk(chunk.delta.text)
      }
    }

    return full
  }

  // Uses Haiku — fastest Claude model for live scan
  async scanFrame(
    frame: CapturedFrame,
    lang: LanguageCode
  ): Promise<LiveResult> {
    const ai  = client()
    const res = await ai.messages.create({
      model:      MODEL_FLASH,
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type:       'base64',
              media_type: frame.mimeType as 'image/jpeg' | 'image/png' | 'image/webp',
              data:       frame.base64,
            },
          },
          { type: 'text', text: getLivePrompt(lang) },
        ],
      }],
    })

    const text = res.content.filter(b => b.type === 'text').map(b => (b as any).text).join('')
    return parseJSON<LiveResult>(text)
  }
  }
