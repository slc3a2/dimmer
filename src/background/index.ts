import { v4 as uuidv4 } from 'uuid'

export {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisibleArea') {
    captureVisibleArea()
  }
  if (request.action === 'captureSelectArea') {
    captureSelectArea()
  }
})

const captureSelectArea = () => {
  chrome.tabs.captureVisibleTab((screenshotUrl) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs[0].id) {
          const tabId = tabs[0].id
          let message = {
            source: screenshotUrl,
          }
          chrome.tabs.sendMessage(tabId, message, (res) => {
            console.log(res)
          })
        }
      },
    )
  })
}

const captureVisibleArea = () => {
  chrome.tabs.captureVisibleTab((screenshotUrl) => {
    chrome.tabs.create(
      { url: chrome.runtime.getURL(`options.html?id=${uuidv4()}`) },
      function (tab) {
        setTimeout(() => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              method: 'pushImgSource',
              data: { url: screenshotUrl },
            })
          }
        }, 1000)
      },
    )
  })
}
