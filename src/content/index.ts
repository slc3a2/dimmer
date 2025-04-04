import './index.css'

import { SESSION_KEY, CLASS_KEY, ADVANCE_KEY, DOMAIN_DARK_KEY } from '@/constant'
import { matchWildcardUrls } from '@/utils'

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

const domainDarkMode = {
  get: () => localStorage.getItem(DOMAIN_DARK_KEY),
  set: (isDark: boolean) => localStorage.setItem(DOMAIN_DARK_KEY, isDark ? 'true' : 'false')
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

const setFilter = (data: Record<string, number>, passive: Boolean) => {
  if (Object.keys(data).length === 0) return
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
    if (!passive) {
      const t = { brightness, contrast, grayscale, sepia }
      sessionStorage.setItem(ADVANCE_KEY, JSON.stringify(t))
      chrome.runtime.sendMessage({
        action: 'setGlobal',
        state: {
          config: t,
        },
      })
    }
    root.style.filter = `${objectToFilterString(htmlFilter)}`
  }
}

const readableConfig = (data: Record<string, number>): Record<string, string> => {
  const KEY_MAP: Map<string, number> = new Map([
    ['brightness', 10],
    ['contrast', 0.1],
    ['grayscale', 10],
    ['sepia', 10],
  ])
  const TAIL_MAP: Map<string, string> = new Map([
    ['brightness', '%'],
    ['contrast', ''],
    ['grayscale', '%'],
    ['sepia', '%'],
  ])
  const res: Record<string, string> = {}
  Object.keys(data).forEach((key) => {
    const mappedValue = KEY_MAP.get(key) || 1
    res[key] = `${data[key] * mappedValue}${TAIL_MAP.get(key) || ''}`
  })
  return res
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { info, data = {} } = request
  if (info === 'changeMode' || info === 'toggleMode') {
    chrome.runtime.sendMessage({ action: 'getGlobal' }, (response) => {
      const { isDark, isGlobal } = response?.state || {}
      const [root] = document.getElementsByTagName('html')
      if (isGlobal) {
        if (isDark && data.exclude !== true) {
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
        const willBeDark = !root.classList.contains(CLASS_KEY)
        if (willBeDark) {
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
        domainDarkMode.set(willBeDark)
      }
      root.style.filter = `${objectToFilterString(htmlFilter)}`
    })
    if (info === 'toggleMode') {
      chrome.runtime.sendMessage({ action: 'updatePopupConfig' });
    }
  }
  if (info === 'getMode') {
    const has = sessionStorage.getItem(SESSION_KEY) === 'true'
    const data = JSON.parse(sessionStorage.getItem(ADVANCE_KEY) || '{}')
    sendResponse({
      has,
      data,
    })
  }
  if (info === 'changeConfig') {
    setFilter(data, false)
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
      const { isDark, isGlobal, config, excludeUrls } = state
      const root = document.getElementsByTagName('html')[0]
      if (isGlobal) {
        if (isDark && matchWildcardUrls(window.location.href, excludeUrls) === false) {
          root.classList.add(CLASS_KEY)
          htmlFilter = {
            ...htmlFilter,
            ...readableConfig(config),
            ...theme['1'],
          }
        } else {
          root.classList.remove(CLASS_KEY)
          htmlFilter = {
            ...htmlFilter,
            ...readableConfig(config),
            ...theme['0'],
          }
        }
      } else {
        const config = JSON.parse(sessionStorage.getItem(ADVANCE_KEY) || '{}')
        const domainIsDark = domainDarkMode.get()
        if (domainIsDark !== null) {
          const domainDarkValue = domainIsDark === 'true'
          if (domainDarkValue) {
            root.classList.add(CLASS_KEY)
          } else {
            root.classList.remove(CLASS_KEY)
          }
          sessionStorage.setItem(SESSION_KEY, domainIsDark)
          htmlFilter = {
            ...htmlFilter,
            ...readableConfig(config),
            ...theme[domainDarkValue ? '1' : '0'],
          }
          chrome.runtime.sendMessage({ action: 'updatePopupConfig' })
        } else {
          const t = sessionStorage.getItem(SESSION_KEY)
          if (t === 'true') {
            root.classList.add(CLASS_KEY)
            htmlFilter = {
              ...htmlFilter,
              ...readableConfig(config),
              ...theme['1'],
            }
          } else {
            root.classList.remove(CLASS_KEY)
            htmlFilter = {
              ...htmlFilter,
              ...readableConfig(config),
              ...theme['0'],
            }
          }
        }
      }
      root.style.filter = `${objectToFilterString(htmlFilter)}`
    }
  })
  checkIsFullScreen()
}

main()
