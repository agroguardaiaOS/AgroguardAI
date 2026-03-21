import type { LanguageCode, StoredHistory, ChatSession, AIProvider } from '../types'
import { DEFAULT_LANGUAGE } from './languages'

const KEYS = {
  LANG:     'agro_lang',
  HISTORY:  'agro_history',
  SESSIONS: 'agro_sessions',
  PROVIDER: 'agro_provider',
  GEMINI:   'agro_key_gemini',
  ANTHROPIC:'agro_key_anthropic',
  OPENAI:   'agro_key_openai',
  DEEPSEEK: 'agro_key_deepseek',
} as const

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch { return fallback }
}

function set(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)) }
  catch (e) { console.warn('AgroGuardAI storage full:', e) }
}

function remove(key: string): void {
  try { localStorage.removeItem(key) } catch { /* ignore */ }
}

// ── Language ─────────────────────────────
export const getSavedLang = (): LanguageCode =>
  get(KEYS.LANG, DEFAULT_LANGUAGE)

export const saveLang = (c: LanguageCode) =>
  set(KEYS.LANG, c)

// ── Provider ─────────────────────────────
export const getSavedProvider = (): AIProvider =>
  get(KEYS.PROVIDER, 'gemini')

export const saveProvider = (p: AIProvider) =>
  set(KEYS.PROVIDER, p)

// ── API Keys ─────────────────────────────
export const getApiKey = (provider: AIProvider): string => {
  const envMap: Record<AIProvider, string> = {
    gemini:    import.meta.env.VITE_GEMINI_API_KEY    ?? '',
    anthropic: import.meta.env.VITE_ANTHROPIC_API_KEY ?? '',
    openai:    import.meta.env.VITE_OPENAI_API_KEY    ?? '',
    deepseek:  import.meta.env.VITE_DEEPSEEK_API_KEY  ?? '',
  }
  const storageKey = {
    gemini:    KEYS.GEMINI,
    anthropic: KEYS.ANTHROPIC,
    openai:    KEYS.OPENAI,
    deepseek:  KEYS.DEEPSEEK,
  }[provider]

  return get(storageKey, '') || envMap[provider] || ''
}

export const saveApiKey = (provider: AIProvider, key: string) => {
  const storageKey = {
    gemini:    KEYS.GEMINI,
    anthropic: KEYS.ANTHROPIC,
    openai:    KEYS.OPENAI,
    deepseek:  KEYS.DEEPSEEK,
  }[provider]
  set(storageKey, key)
}

// ── History ──────────────────────────────
export const getHistory = (): StoredHistory[] =>
  get(KEYS.HISTORY, [])

export const addHistory = (item: StoredHistory) =>
  set(KEYS.HISTORY, [item, ...getHistory()].slice(0, 30))

export const clearHistory = () => remove(KEYS.HISTORY)

// ── Sessions ─────────────────────────────
export const getSessions = (): ChatSession[] =>
  get(KEYS.SESSIONS, [])

export const saveSession = (s: ChatSession) => {
  const all = getSessions().filter(x => x.id !== s.id)
  set(KEYS.SESSIONS, [s, ...all].slice(0, 10))
}

export const clearSessions = () => remove(KEYS.SESSIONS)

// ── Clear All ─────────────────────────────
export const clearAll = () =>
  Object.values(KEYS).forEach(remove)
