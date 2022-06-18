export const baseColors = {
  primary: '#64b5f5',
  primaryLight: '#a0c5e8',
  primaryDark: '#4d92dc',
  grey: '#A2A3AD',
  greySecondary: '#ECECEC',
  error: '#e47372',
  errorSecondary: '#FF9C54',
  black: '#191919',
  warning: '#FF9C54',
}

export type BaseColors = typeof baseColors
export type BaseColorType = keyof BaseColors

export const colors = {
  ...baseColors,
}

export type Colors = typeof colors
export type ColorType = keyof Colors
