import { useState, useCallback } from 'react'
import type { Message, LanguageCode, CapturedFrame } from '../types'
import { diagnoseCrop, sendChat, friendlyError } from '../api'
import { addHistory } from '../lib/storage'

let _id = 0
const uid = () => `${Date.now()}-${++_id}`

function makeMsg(
  role:    Message['role'],
  content: string,
  lang:    LanguageCode,
  extra?:  Partial<Message>
): Message {
  return {
    id:        uid(),
    role,
    content,
    timestamp: Date.now(),
    lang,
    ...extra,
  }
}

export function useChat(lang: LanguageCode) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  // Add a message to the list
  const append = useCallback((m: Message) => {
    setMessages(p => [...p, m])
  }, [])

  // Stream chunks into the last assistant message
  const patchLast = useCallback((chunk: string) => {
    setMessages(p => {
      const a = [...p]
      const l = a[a.length - 1]
      if (l?.role === 'assistant') {
        a[a.length - 1] = { ...l, content: l.content + chunk }
      }
      return a
    })
  }, [])

  // ── Send text message ─────────────────
  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg = makeMsg('user', text.trim(), lang)
    append(userMsg)
    setLoading(true)
    setError(null)

    // Empty placeholder for streaming
    append(makeMsg('assistant', '', lang))

    try {
      await sendChat(
        text.trim(),
        [...messages, userMsg],
        lang,
        patchLast
      )
    } catch (e) {
      const err = friendlyError(e)
      setError(err)
      setMessages(p => {
        const a = [...p]
        a[a.length - 1] = { ...a[a.length - 1], content: err }
        return a
      })
    } finally {
      setLoading(false)
    }
  }, [messages, lang, loading, append, patchLast])

  // ── Send image + text (diagnosis) ─────
  const diagnose = useCallback(async (
    text:  string,
    frame: CapturedFrame | null
  ) => {
    if (loading) return

    const userMsg = makeMsg('user', text || 'Diagnose this crop', lang, {
      hasImage: !!frame,
      imageUrl: frame
        ? `data:${frame.mimeType};base64,${frame.base64}`
        : undefined,
    })

    append(userMsg)
    setLoading(true)
    setError(null)

    try {
      const r = await diagnoseCrop(text, frame, lang)

      const formatted = [
        `🌿 ${r.disease}`,
        `Confidence: ${r.confidence}  ·  Severity: ${r.severity.toUpperCase()}`,
        '',
        `Cause: ${r.cause}`,
        '',
        'Treatment:',
        ...r.treatment.map((t, i) => `${i + 1}. ${t}`),
        '',
        'Prevention:',
        ...r.prevention.map(p => `• ${p}`),
      ].join('\n')

      append(makeMsg('assistant', formatted, lang))

      // Save to history
      addHistory({
        id:       uid(),
        date:     new Date().toISOString(),
        disease:  r.disease,
        severity: r.severity,
        lang,
        text,
        imageUrl: userMsg.imageUrl,
      })

    } catch (e) {
      const err = friendlyError(e)
      setError(err)
      append(makeMsg('assistant', err, lang))
    } finally {
      setLoading(false)
    }
  }, [lang, loading, append, messages])

  const clear = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    loading,
    error,
    send,
    diagnose,
    clear,
  }
    }
