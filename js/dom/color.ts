export type ColorKey = [number, string];

export interface CanvasColorProps {
  color?: CanvasColor;
  strokeColor?: CanvasColor;
  strokeWidth?: number;
}


export enum CanvasColor {
  Black       = '#000000',
  Black2      = '#201E21',
  Black3      = '#181719',
  Black4      = '#131314',
  Black5      = '#101011',
  Black6      = '#151316',
  Black7      = '#050505',
  Black8      = '#252526',

  Blue        = '#6CC4FF',
  Blue2       = '#EBF7FB',
  Blue3       = '#5875FF',
  Blue4       = '#BFE6FF',
  Blue5       = '#F6FEFE',
  Blue6       = '#BECBF5',
  Blue7       = '#D1FAFA',
  Blue8       = '#303E45',

  Grey        = '#3F3126',
  Grey2       = '#353535',
  Grey3       = '#515151',
  Grey4       = '#F0F0F0',
  Grey5       = '#606060',
  Grey6       = '#BABABA',
  Grey7       = '#D8DFE5',
  Grey8       = '#EFC7A5',
  Grey9       = '#EFEFEF',
  Grey10      = '#DEDEDE',
  
  EOERed      = '#F15548',
  EOEOrange   = '#F4793F',
  EOEYellow   = '#FDE23D',
  EOEWhite    = '#FFFFFF',
  EOEBrown    = '#383838',
  Default     = '#FFFFFF',
  White       = '#FFFFFF',
  
  Orange      = '#FF7600',
  Mint        = '#ECFFFF',
  DarkGrey    = '#313131',
  Red         = '#E14949',

  Red2        = '#EC2425',
  Red3        = '#B02325',

  Brown       = '#4F3E32',
  Brown2      = '#3F3126',
  Brown3      = '#947C24',

  Beige       = '#E5B58F',
  Beige2      = '#FFDAB6',
  Beige3      = '#EFC7A5',
  Beige4      = '#C7AB45',

  Green       = '#1CAF5E',
  Green2      = '#1DCE6C',
  Green3      = '#1D7E6E',
  Green4      = '#A6C236',
  
  Yellow      = '#DED749',
  Yellow2     = '#F9EEDF',
  Yellow3     = '#F6F8F8',
  Yellow4     = '#FFC800',

  Purple1     = '#C745B8',
  Purple2     = '#FF58EC',
  Purple3     = '#75296C'
  





}
export const APP_BACGROUND_COLOR = CanvasColor.EOEBrown
