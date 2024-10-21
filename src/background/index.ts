let state = {
  isGlobal: false,
  isDark: false,
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
