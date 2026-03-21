import { useState, useCallback } from 'react'
import type { LanguageCode } from '../types'
import { getSavedLang, saveLang } from '../lib/storage'
import { LANGUAGES, LIVE_LANGUAGES } from '../lib/languages'

export function useLanguage() {
  const [lang, setLang] = useState<LanguageCode>(getSavedLang())

  const setLanguage = useCallback((code: LanguageCode) => {
    setLang(code)
    saveLang(code)
  }, [])

  return {
    lang,
    setLanguage,
    current:       LANGUAGES[lang],
    liveLanguages: LIVE_LANGUAGES,
  }
    }
