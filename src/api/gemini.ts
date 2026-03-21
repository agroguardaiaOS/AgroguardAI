import { GoogleGenerativeAI } from '@google/generative-ai'
import type { LanguageCode, DiagnosisResult, Message, CapturedFrame } from '../types'
import { getDiagnosisPrompt, getChatPrompt, getLivePrompt } from '../lib/prompts'
import { getApiKey } from '../lib/storage'
import type { AIProviderClient, LiveResult } from './types'
import { parseJSON } from './types'

// ─────────────────────────────────────────
// Gemini 3.1 Pro — for diagnosis and chat
// Gemini 2.0 Flash — for live scan (speed)
// ─────────────────────────────────────────
const MODEL_PRO   = 'gemini-3.1-pro-preview'
const MODEL_FLASH = 'gemini-2.0-flash'

function client() {
  const key = getApiKey('gemini')
  if (!key) throw new Error('NO_API_KEY: Add your Gemini key in Settings.')
  return new GoogleGenerativeAI(key)
}

export class GeminiProvider implements AIProviderClient {

  // Uses Pro — needs maximum accuracy for diagnosis
  async diagnoseCrop(
    description: string,
    frame: CapturedFrame | null,
    lang: LanguageCode
  ): Promise<DiagnosisResult> {
    const model  = client().getGenerativeModel({ model: MODEL_PRO })
    const prompt = getDiagnosisPrompt(lang)
    const parts: any[] = [
      { text: `${prompt}\n\nFarmer says: "${description || 'Please analyse this image.'}"` }
    ]
    if (frame) {
      parts.push({ inlineData: { mimeType: frame.mimeType, data: frame.base64 } })
    }
    const res    = await model.generateContent(parts)
    const parsed = parseJSON<DiagnosisResult>(res.response.text())
    if (!parsed.disease) throw new Error('INCOMPLETE_RESPONSE')
    return parsed
  }

  // Uses Pro — farmers deserve the best answers
  async sendChat(
    text: string,
    history: Message[],
    lang: LanguageCode,
    onChunk: (chunk: string) => void
  ): Promise<string> {
    const model = client().getGenerativeModel({
      model: MODEL_PRO,
      systemInstruction: getChatPrompt(lang),
    })
    const geminiHistory = history
      .filter(m => m.content.trim())
      .map(m => ({
        role:  m.role === 'user' ? 'user' : 'model' as const,
        parts: [{ text: m.content }],
      }))
    const chat   = model.startChat({ history: geminiHistory })
    const result = await chat.sendMessageStream(text)
    let full = ''
    for await (const chunk of result.stream) {
      const t = chunk.text()
      full += t
      onChunk(t)
    }
    return full
  }

  // Uses Flash — live scan needs instant response
  async scanFrame(
    frame: CapturedFrame,
    lang: LanguageCode
  ): Promise<LiveResult> {
    const model = client().getGenerativeModel({ model: MODEL_FLASH })
    const res   = await model.generateContent([
      { text: getLivePrompt(lang) },
      { inlineData: { mimeType: frame.mimeType, data: frame.base64 } },
    ])
    return parseJSON<LiveResult>(res.response.text())
  }
}
