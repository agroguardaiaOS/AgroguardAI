// ─────────────────────────────────────────
// AI PROVIDERS
// ─────────────────────────────────────────

export type AIProvider = 'gemini' | 'anthropic' | 'openai' | 'deepseek'

export interface ProviderConfig {
  id:       AIProvider
  name:     string
  model:    string
  apiKey:   string
  baseUrl?: string
}

// ─────────────────────────────────────────
// LANGUAGE
// ─────────────────────────────────────────

export type LanguageCode = 'en' | 'ha' | 'ig' | 'yo' | 'sw' | 'fr' | 'am'

export interface Language {
  code:       LanguageCode
  name:       string
  native:     string
  flag:       string
  speechCode: string
  status:     'live' | 'coming'
}

// ─────────────────────────────────────────
// CHAT
// ─────────────────────────────────────────

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id:        string
  role:      MessageRole
  content:   string
  timestamp: number
  lang:      LanguageCode
  hasImage?: boolean
  imageUrl?: string
}

export interface ChatSession {
  id:        string
  messages:  Message[]
  createdAt: number
  lang:      LanguageCode
}

// ─────────────────────────────────────────
// DIAGNOSIS
// ─────────────────────────────────────────

export type SeverityLevel   = 'low' | 'medium' | 'high'
export type ConfidenceLevel = 'High' | 'Medium' | 'Low'

export interface DiagnosisResult {
  disease:      string
  confidence:   ConfidenceLevel
  cause:        string
  severity:     SeverityLevel
  treatment:    string[]
  prevention:   string[]
  affectedPart?: string
  crops?:       string[]
}

// ─────────────────────────────────────────
// CAMERA
// ─────────────────────────────────────────

export type CameraFacing = 'user' | 'environment'

export interface CameraState {
  isActive:  boolean
  isLoading: boolean
  error:     string | null
  facing:    CameraFacing
  stream:    MediaStream | null
}

export interface CapturedFrame {
  base64:    string
  mimeType:  string
  width:     number
  height:    number
  timestamp: number
}

// ─────────────────────────────────────────
// VOICE
// ─────────────────────────────────────────

export type VoiceStatus = 'idle' | 'listening' | 'speaking' | 'error'

export interface VoiceState {
  status:     VoiceStatus
  transcript: string
  error:      string | null
  supported:  boolean
}

// ─────────────────────────────────────────
// APP
// ─────────────────────────────────────────

export type AppPage = 'home' | 'live' | 'chat' | 'settings'

// ─────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────

export interface StoredHistory {
  id:        string
  date:      string
  disease:   string
  severity:  SeverityLevel
  lang:      LanguageCode
  text:      string
  imageUrl?: string
  }
