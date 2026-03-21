import type { LanguageCode, DiagnosisResult, Message, CapturedFrame } from '../types'

// ─────────────────────────────────────────
// Every AI provider must implement this
// interface. Swap providers without touching
// any other file in the app.
// ─────────────────────────────────────────

export interface AIProviderClient {
  diagnoseCrop(
    description: string,
    frame:       CapturedFrame | null,
    lang:        LanguageCode
  ): Promise<DiagnosisResult>

  sendChat(
    text:     string,
    history:  Message[],
    lang:     LanguageCode,
    onChunk:  (chunk: string) => void
  ): Promise<string>

  scanFrame(
    frame: CapturedFrame,
    lang:  LanguageCode
  ): Promise<LiveResult>
}

export interface LiveResult {
  status:   'healthy' | 'diseased' | 'unclear' | 'no_crop'
  summary:  string
  disease:  string | null
  severity: string | null
  action:   string
}

// ─────────────────────────────────────────
// Shared utility — parse JSON from any
// AI response safely
// ─────────────────────────────────────────

export function parseJSON<T>(text: string): T {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('PARSE_ERROR: AI returned invalid format.')
  try {
    return JSON.parse(match[0]) as T
  } catch {
    throw new Error('PARSE_ERROR: Could not parse AI response.')
  }
}

// ─────────────────────────────────────────
// Shared utility — convert our Message[]
// to the format each provider expects
// ─────────────────────────────────────────

export function toHistory(messages: Message[]) {
  return messages.map(m => ({
    role:    m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }))
}

// ─────────────────────────────────────────
// Shared error classifier — turns raw API
// errors into farmer-friendly messages
// ─────────────────────────────────────────

export function friendlyError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err)

  if (msg.includes('NO_API_KEY'))
    return 'No API key found. Please add your key in Settings.'
  if (msg.includes('401') || msg.includes('API_KEY_INVALID') || msg.includes('invalid_api_key'))
    return 'Invalid API key. Please check your key in Settings.'
  if (msg.includes('429') || msg.includes('QUOTA') || msg.includes('rate_limit'))
    return 'Rate limit reached. Please wait a moment and try again.'
  if (msg.includes('PARSE_ERROR'))
    return 'Unexpected AI response. Please try again.'
  if (msg.includes('NetworkError') || msg.includes('fetch') || msg.includes('Failed to fetch'))
    return 'No internet connection. Please check your network.'
  if (msg.includes('SAFETY'))
    return 'Request blocked by safety filter. Please rephrase.'
  if (msg.includes('overloaded') || msg.includes('529'))
    return 'AI provider is busy. Please try again in a moment.'

  return 'Something went wrong. Please try again.'
  }
