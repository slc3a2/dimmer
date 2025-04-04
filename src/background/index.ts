import { DEFAULT_CONFIG } from '@/constant'

let state = {
  isGlobal: false,
  isDark: false,
  excludeUrls: '',
  config: DEFAULT_CONFIG,
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'setGlobal') {
    state = {
      ...state,
      ...message.state,
    }
  }

  if (message.action === 'getGlobal') {
    sendResponse({ state })
  }
})

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle_dark_mode') {
    state.isDark = !state.isDark

    chrome.runtime.sendMessage({
      action: 'updatePopupConfig'
    })

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            info: 'changeMode',
            data: { exclude: false }
          }, _ => {
            if (chrome.runtime.lastError) {
              return
            }
          })
        }
      })
    })
  }
})

export {}
