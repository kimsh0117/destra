import LEFT_DOUBLE from '../../../public/assets/icons/left-double.svg'
import LEFT from '../../../public/assets/icons/left.svg'
import LOADER from '../../../public/assets/icons/loader.svg'
import LOGO from '../../../public/assets/icons/logo.svg'
import RIGHT_DOUBLE from '../../../public/assets/icons/right-double.svg'
import RIGHT from '../../../public/assets/icons/right.svg'

export const IconPack = {
  'left-double': LEFT_DOUBLE,
  left: LEFT,
  loader: LOADER,
  logo: LOGO,
  'right-double': RIGHT_DOUBLE,
  right: RIGHT,
}

export type IconPackType =
  | 'left-double'
  | 'left'
  | 'loader'
  | 'logo'
  | 'right-double'
  | 'right'
