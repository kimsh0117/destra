export const baseColors = {
  primary: '#18A866',
  primaryLight: '#E8F6F0',
  primaryDark: '#128952',
  grey: '#A2A3AD',
  greySecondary: '#ECECEC',
  error: '#FB432E',
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
