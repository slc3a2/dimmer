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
    name: 'JPG (Medium quality)',
    id: 'medium',
  },
  {
    name: 'JPG (High quality)',
    id: 'high',
  },

  {
    name: 'JPG (Low quality)',
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

const resizeList = [
  {
    label: 'Auto',
    id: uuidv4(),
    name: 'Auto',
  },
  {
    label: '16:9',
    id: uuidv4(),
    name: '16:9',
  },
  {
    label: '4:3',
    id: uuidv4(),
    name: '4:3',
  },
  {
    label: '1:1',
    id: uuidv4(),
    name: '1:1',
  },
  {
    label: '16:10',
    id: uuidv4(),
    name: '16:10',
  },
  {
    label: '2:1',
    id: uuidv4(),
    name: '2:1',
  },
]

export { dropdownList, radioThemeList, radioThemeColorList, downloadList, resizeList }
