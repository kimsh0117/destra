import React from 'react'
import { IconPack, IconPackType } from './icons'

export interface Props {
  name: IconPackType
  width?: string
  height?: string
}

const Icon = ({ name, width = '24', height = '24' }: Props) => {
  const Component = IconPack[name]
  return <Component width={width} height={height} />
}

export default Icon
