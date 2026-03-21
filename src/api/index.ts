import type { AIProvider, LanguageCode, DiagnosisResult, Message, CapturedFrame } from '../types'
import { getSavedProvider } from '../lib/storage'
import type { AIProviderClient, LiveResult } from './types'
import { friendlyError } from './types'
import { GeminiProvider }   from './gemini'
import { AnthropicProvider } from './anthropic'
import { OpenAIProvider, DeepSeekProvider } from './openai'

// ─────────────────────────────────────────
// Provider registry
// Add new providers here — nothing else
// in the app needs to change
// ─────────────────────────────────────────

const PROVIDERS: Record<AIProvider, () => AIProviderClient> = {
  gemini:    () => new GeminiProvider(),
  anthropic: () => new AnthropicProvider(),
  openai:    () => new OpenAIProvider(),
  deepseek:  () => new DeepSeekProvider(),
}

export const PROVIDER_INFO: Record<AIProvider, { name: string; logo: string; description: string }> = {
  gemini:    { name:'Google Gemini',     logo:'🟦', description:'Gemini 3.1 Pro — Google\'s most capable model' },
  anthropic: { name:'Anthropic Claude',  logo:'🟧', description:'Claude Sonnet — Best for nuanced understanding' },
  openai:    { name:'OpenAI GPT-4o',     logo:'🟩', description:'GPT-4o — Powerful vision and reasoning' },
  deepseek:  { name:'DeepSeek',          logo:'🟪', description:'DeepSeek Chat — Affordable and capable' },
}

// ─────────────────────────────────────────
// Get the active provider client
// ─────────────────────────────────────────

function getProvider(): AIProviderClient {
  const id = getSavedProvider()
  const factory = PROVIDERS[id]
  if (!factory) return new GeminiProvider()
  return factory()
}

// ─────────────────────────────────────────
// Public API — used by hooks and pages
// ─────────────────────────────────────────

export async function diagnoseCrop(
  description: string,
  frame:       CapturedFrame | null,
  lang:        LanguageCode
): Promise<DiagnosisResult> {
  return getProvider().diagnoseCrop(description, frame, lang)
}

export async function sendChat(
  text:     string,
  history:  Message[],
  lang:     LanguageCode,
  onChunk:  (chunk: string) => void
): Promise<string> {
  return getProvider().sendChat(text, history, lang, onChunk)
}

export async function scanFrame(
  frame: CapturedFrame,
  lang:  LanguageCode
): Promise<LiveResult> {
  return getProvider().scanFrame(frame, lang)
}

export { friendlyError }
export type { LiveResult }
