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
    label: '🌚',
    id: uuidv4(),
    name: 'dark',
  },
  {
    label: '🌝',
    id: uuidv4(),
    name: 'light',
  },
]

export {dropdownList, radioThemeList, radioThemeColorList}