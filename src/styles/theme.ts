export const colors = {
  bg:        '#0A0F0A',
  bg1:       '#0D140D',
  bg2:       '#111811',
  bg3:       '#162016',
  green:     '#00C853',
  greenLite: '#14F066',
  greenDim:  'rgba(0,200,83,0.10)',
  greenBdr:  'rgba(0,200,83,0.20)',
  txt:       '#EDF2ED',
  sub:       '#7A9A7A',
  mute:      '#3A533A',
  danger:    '#FF4444',
  amber:     '#FFB300',
  info:      '#4FC3F7',
} as const

export const severity = {
  low:    '#00C853',
  medium: '#FFB300',
  high:   '#FF4444',
} as const

export type SeverityColor = keyof typeof severity
