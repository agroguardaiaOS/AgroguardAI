import type { Language, LanguageCode } from '../types'

export const LANGUAGES: Record<LanguageCode, Language> = {
  en: { code:'en', name:'English',  native:'English',   flag:'🌍', speechCode:'en-NG', status:'live'   },
  ha: { code:'ha', name:'Hausa',    native:'Hausa',     flag:'🇳🇬', speechCode:'ha-NG', status:'live'   },
  ig: { code:'ig', name:'Igbo',     native:'Igbo',      flag:'🇳🇬', speechCode:'ig-NG', status:'live'   },
  yo: { code:'yo', name:'Yoruba',   native:'Yorùbá',    flag:'🇳🇬', speechCode:'yo-NG', status:'live'   },
  sw: { code:'sw', name:'Swahili',  native:'Kiswahili', flag:'🇹🇿', speechCode:'sw-TZ', status:'live'   },
  fr: { code:'fr', name:'French',   native:'Français',  flag:'🌍', speechCode:'fr-FR', status:'coming' },
  am: { code:'am', name:'Amharic',  native:'አማርኛ',      flag:'🇪🇹', speechCode:'am-ET', status:'coming' },
}

export const LIVE_LANGUAGES   = Object.values(LANGUAGES).filter(l => l.status === 'live')
export const COMING_LANGUAGES = Object.values(LANGUAGES).filter(l => l.status === 'coming')
export const DEFAULT_LANGUAGE: LanguageCode = 'en'

export function getLanguage(code: LanguageCode): Language {
  return LANGUAGES[code] ?? LANGUAGES[DEFAULT_LANGUAGE]
}

export function getLangInstruction(code: LanguageCode): string {
  const map: Record<LanguageCode, string> = {
    en: 'Respond in clear, simple English. Use short sentences a farmer can understand.',
    ha: 'Ka amsa da Hausa. Yi amfani da kalmomi masu sauki da gajerun jimloli.',
    ig: 'Zaghachi n\'Igbo. Jiri okwu dị mfe ma dị mkpụmkpụ.',
    yo: 'Dahun ni Yorùbá. Lo awọn ọrọ rọrun ati awọn gbolohun kuru.',
    sw: 'Jibu kwa Kiswahili. Tumia maneno rahisi na sentensi fupi.',
    fr: 'Répondez en français simple et clair.',
    am: 'በቀላል አማርኛ ይመልሱ።',
  }
  return map[code] ?? map.en
}

export const VOICE_GREETINGS: Record<LanguageCode, string> = {
  en: 'Hello! I am AgroGuardAI. Point your camera at a sick crop or ask me a farming question.',
  ha: 'Sannu! Ni ne AgroGuardAI. Nuna min amfanin gona ko tambaya mini game da noma.',
  ig: 'Nnọọ! Abụ m AgroGuardAI. Tụọ igwefoto gị n\'ụlọ ọ bụ ma jụọ m ajụjụ banyere ọrụ ugbo.',
  yo: 'Ẹ káàbọ̀! Èmi ni AgroGuardAI. Tọ kamẹra rẹ sí irugbin tàbí béèrè lọ́wọ́ mi nípa iṣẹ àgbẹ.',
  sw: 'Habari! Mimi ni AgroGuardAI. Elekeza kamera yako kwenye mazao au niulize swali la kilimo.',
  fr: 'Bonjour! Je suis AgroGuardAI. Pointez votre caméra sur une culture ou posez-moi une question.',
  am: 'ሰላም! እኔ AgroGuardAI ነኝ። ካሜራዎን ወደ ሰብሉ ያዙ ወይም የእርሻ ጥያቄ ይጠይቁኝ።',
       }
