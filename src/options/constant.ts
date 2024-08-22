import { v4 as uuidv4 } from 'uuid'

const dropdownList = [
  {
    name: 'Macos Dark',
    id: 'macosDark',
  },
  {
    name: 'Macos Light',
    id: 'macosLight',
  },
  {
    name: 'Windows Dark',
    id: 'windowsDark',
  },
  {
    name: 'Windows Light',
    id: 'windowsLight',
  },
]

const downloadList = [
  {
    name: 'PNG 👍',
    id: 'png',
  },
  {
    name: 'high quality JPG',
    id: 'high',
  },
  {
    name: 'medium quality JPG',
    id: 'medium',
  },
  {
    name: 'low quality JPG',
    id: 'low',
  },
]

const radioThemeList = [
  {
    label: 'None',
    id: uuidv4(),
  },
  {
    label: 'Macos',
    id: uuidv4(),
  },
  {
    label: 'Windows',
    id: uuidv4(),
  },
]

const radioThemeColorList = [
  {
    label: 'Dark',
    id: uuidv4(),
    name: 'dark',
  },
  {
    label: 'Light',
    id: uuidv4(),
    name: 'light',
  },
]

export { dropdownList, radioThemeList, radioThemeColorList, downloadList }
