import OpenAI from 'openai'
import type { LanguageCode, DiagnosisResult, Message, CapturedFrame } from '../types'
import { getDiagnosisPrompt, getChatPrompt, getLivePrompt } from '../lib/prompts'
import { getApiKey } from '../lib/storage'
import type { AIProviderClient, LiveResult, AIProvider } from './types'
import { parseJSON, toHistory } from './types'

// ─────────────────────────────────────────
// OpenAI GPT-4o — vision + chat
// DeepSeek Chat  — same API, different URL
// ─────────────────────────────────────────

const CONFIGS = {
  openai: {
    model_pro:   'gpt-4o',
    model_flash: 'gpt-4o-mini',
    baseURL:     undefined,
  },
  deepseek: {
    model_pro:   'deepseek-chat',
    model_flash: 'deepseek-chat',
    baseURL:     'https://api.deepseek.com/v1',
  },
} as const

function client(provider: 'openai' | 'deepseek') {
  const key = getApiKey(provider)
  if (!key) throw new Error(`NO_API_KEY: Add your ${provider} key in Settings.`)
  return new OpenAI({
    apiKey:  key,
    baseURL: CONFIGS[provider].baseURL,
    dangerouslyAllowBrowser: true,
  })
}

function makeProvider(provider: 'openai' | 'deepseek'): AIProviderClient {
  const cfg = CONFIGS[provider]

  return {

    // ── Diagnosis ─────────────────────────
    async diagnoseCrop(
      description: string,
      frame: CapturedFrame | null,
      lang: LanguageCode
    ): Promise<DiagnosisResult> {
      const ai     = client(provider)
      const prompt = getDiagnosisPrompt(lang)

      const userContent: any[] = [
        { type: 'text', text: `${prompt}\n\nFarmer says: "${description || 'Please analyse this image.'}"` }
      ]

      if (frame) {
        userContent.push({
          type:      'image_url',
          image_url: { url: `data:${frame.mimeType};base64,${frame.base64}` },
        })
      }

      const res = await ai.chat.completions.create({
        model:    cfg.model_pro,
        messages: [{ role: 'user', content: userContent }],
      })

      const text   = res.choices[0]?.message?.content ?? ''
      const parsed = parseJSON<DiagnosisResult>(text)
      if (!parsed.disease) throw new Error('INCOMPLETE_RESPONSE')
      return parsed
    },

    // ── Chat with streaming ───────────────
    async sendChat(
      text: string,
      history: Message[],
      lang: LanguageCode,
      onChunk: (chunk: string) => void
    ): Promise<string> {
      const ai = client(provider)

      const messages = [
        { role: 'system' as const, content: getChatPrompt(lang) },
        ...toHistory(history).map(m => ({
          role:    m.role as 'user' | 'assistant',
          content: m.content,
        })),
        { role: 'user' as const, content: text },
      ]

      const stream = await ai.chat.completions.create({
        model:  cfg.model_pro,
        messages,
        stream: true,
      })

      let full = ''
      for await (const chunk of stream) {
        const t = chunk.choices[0]?.delta?.content ?? ''
        full += t
        if (t) onChunk(t)
      }
      return full
    },

    // ── Live scan ─────────────────────────
    async scanFrame(
      frame: CapturedFrame,
      lang: LanguageCode
    ): Promise<LiveResult> {
      const ai = client(provider)

      const res = await ai.chat.completions.create({
        model: cfg.model_flash,
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: getLivePrompt(lang) },
            {
              type:      'image_url',
              image_url: { url: `data:${frame.mimeType};base64,${frame.base64}` },
            },
          ],
        }],
      })

      const text = res.choices[0]?.message?.content ?? ''
      return parseJSON<LiveResult>(text)
    },
  }
}

export class OpenAIProvider implements AIProviderClient {
  private p = makeProvider('openai')
  diagnoseCrop = this.p.diagnoseCrop
  sendChat     = this.p.sendChat
  scanFrame    = this.p.scanFrame
}

export class DeepSeekProvider implements AIProviderClient {
  private p = makeProvider('deepseek')
  diagnoseCrop = this.p.diagnoseCrop
  sendChat     = this.p.sendChat
  scanFrame    = this.p.scanFrame
      }
