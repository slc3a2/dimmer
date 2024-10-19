import './index.css'

let isDark = sessionStorage.getItem('ohmydimmer-isDark') === 'true'

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
    const [root] = document.getElementsByTagName('html')
    if (!root.classList.contains('dimmer-dark')) {
      root.classList.add('dimmer-dark')
      sessionStorage.setItem('ohmydimmer-isDark', 'true')
      htmlFilter = {
        ...htmlFilter,
        ...theme['1'],
      }
    } else {
      root.classList.remove('dimmer-dark')
      sessionStorage.setItem('ohmydimmer-isDark', 'false')
      isDark = false
      htmlFilter = {
        ...htmlFilter,
        ...theme['0'],
      }
    }
    root.style.filter = objectToFilterString(htmlFilter)
  }
  if (info === 'getMode') {
    const t = sessionStorage.getItem('ohmydimmer-isDark') === 'true'
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
      root.style.filter = objectToFilterString(htmlFilter)
    }
  }
})

const checkIsFullScreen = () => {
  document.addEventListener('fullscreenchange', () => {
    const hasVideo = window.document.fullscreenElement?.querySelector('video')
    if (hasVideo) {
      const root = document.querySelector('html')
      root?.classList.remove('dimmer-dark')
      sessionStorage.setItem('ohmydimmer-isDark', 'false')
    }
  })
}

function main() {
  if (sessionStorage.getItem('ohmydimmer-flag')) {
    const t = sessionStorage.getItem('ohmydimmer-isDark')
    const root = document.getElementsByTagName('html')[0]
    if (t === 'true') {
      root.classList.add('dimmer-dark')
      htmlFilter = {
        ...htmlFilter,
        ...theme['1'],
      }
    } else {
      root.classList.remove('dimmer-dark')
      htmlFilter = {
        ...htmlFilter,
        ...theme['0'],
      }
    }
    root.style.filter = objectToFilterString(htmlFilter)
  } else {
    sessionStorage.setItem('ohmydimmer-flag', 'true')
  }
  checkIsFullScreen()
}

main()
