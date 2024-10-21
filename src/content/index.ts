import './index.css'

import { SESSION_KEY, CLASS_KEY } from '@/constant'

type Filter = Record<string, string>

let htmlFilter: Filter = {}

const theme = {
  '1': {
    invert: '100',
    ['hue-rotate']: '180deg',
  },
  '0': {
    invert: '0',
    ['hue-rotate']: '0deg',
  },
}
const convertFilterToObject = (filterValue: string) => {
  const filters = filterValue.split(' ')
  const result: Filter = {}
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i]
    const openParenIndex = filter.indexOf('(')
    const name = filter.substring(0, openParenIndex)
    const value = filter.substring(openParenIndex + 1, filter.length - 1)
    result[name] = value
  }
  return result
}

const objectToFilterString = (obj: Filter) => {
  return Object.entries(obj)
    .map(([name, value]) => `${name}(${value})`)
    .join(' ')
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { info, data = {} } = request
  if (info === 'changeMode') {
    chrome.runtime.sendMessage({ action: 'getGlobal' }, (response) => {
      const { isDark, isGlobal } = response?.state || {}
      const [root] = document.getElementsByTagName('html')
      if (isGlobal) {
        if (isDark) {
          root.classList.add(CLASS_KEY)
          sessionStorage.setItem(SESSION_KEY, 'true')
          htmlFilter = {
            ...htmlFilter,
            ...theme['1'],
          }
        } else {
          root.classList.remove(CLASS_KEY)
          sessionStorage.setItem(SESSION_KEY, 'false')
          htmlFilter = {
            ...htmlFilter,
            ...theme['0'],
          }
        }
      } else {
        if (!root.classList.contains(CLASS_KEY)) {
          root.classList.add(CLASS_KEY)
          sessionStorage.setItem(SESSION_KEY, 'true')
          htmlFilter = {
            ...htmlFilter,
            ...theme['1'],
          }
        } else {
          root.classList.remove(CLASS_KEY)
          sessionStorage.setItem(SESSION_KEY, 'false')
          htmlFilter = {
            ...htmlFilter,
            ...theme['0'],
          }
        }
      }
      root.style.filter = `${objectToFilterString(htmlFilter)}`
    })
  }
  if (info === 'getMode') {
    const t = sessionStorage.getItem(SESSION_KEY) === 'true'
    sendResponse({
      has: t,
    })
  }
  if (info === 'changeConfig') {
    const { brightness, contrast, grayscale, sepia } = data
    const [root] = document.getElementsByTagName('html')
    if (root) {
      htmlFilter = {
        ...htmlFilter,
        brightness: `${brightness * 10}%`,
        contrast: `${contrast / 10}`,
        grayscale: `${grayscale * 10}%`,
        sepia: `${sepia * 10}%`,
      }
      root.style.filter = `${objectToFilterString(htmlFilter)}`
    }
  }
})

const checkIsFullScreen = () => {
  document.addEventListener('fullscreenchange', () => {
    const hasVideo = window.document.fullscreenElement?.querySelector('video')
    if (hasVideo) {
      const root = document.querySelector('html')
      root?.classList.remove(CLASS_KEY)
      sessionStorage.setItem(SESSION_KEY, 'false')
    }
  })
}

function main() {
  chrome.runtime.sendMessage({ action: 'getGlobal' }, (response) => {
    if (response) {
      const state = response.state
      const { isDark, isGlobal } = state
      const root = document.getElementsByTagName('html')[0]
      if (isGlobal) {
        if (isDark) {
          root.classList.add(CLASS_KEY)
          htmlFilter = {
            ...htmlFilter,
            ...theme['1'],
          }
        } else {
          root.classList.remove(CLASS_KEY)
          htmlFilter = {
            ...htmlFilter,
            ...theme['0'],
          }
        }
      } else {
        const t = sessionStorage.getItem(SESSION_KEY)
        if (t === 'true') {
          root.classList.add(CLASS_KEY)
          htmlFilter = {
            ...htmlFilter,
            ...theme['1'],
          }
        } else {
          root.classList.remove(CLASS_KEY)
          htmlFilter = {
            ...htmlFilter,
            ...theme['0'],
          }
        }
      }
      root.style.filter = `${objectToFilterString(htmlFilter)}`
    }
  })
  checkIsFullScreen()
}

main()
