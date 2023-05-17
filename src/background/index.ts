import { v4 as uuidv4 } from 'uuid'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisibleArea') {
    captureVisibleArea()
  }
  if (request.action === 'captureSelectArea') {
    captureSelectArea()
  }
  if (request.action === 'captureSelectAreaCb') {
    captureSelectAreaCb(request?.data?.base64)
  }
})

const captureSelectArea = () => {
  chrome.tabs.captureVisibleTab((base64) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs[0].id) {
          const tabId = tabs[0].id
          let message = {
            source: base64,
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
  chrome.tabs.captureVisibleTab((base64) => {
    chrome.tabs.create(
      { url: chrome.runtime.getURL(`options.html?id=${uuidv4()}`) },
      function (tab) {
        setTimeout(() => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              method: 'openOptionPage',
              data: { url: base64 },
            })
          }
        }, 1000)
      },
    )
  })
}

const captureSelectAreaCb = (base64: string) => {
  if(!base64) return
  chrome.tabs.create(
    { url: chrome.runtime.getURL(`options.html?id=${uuidv4()}`) },
    function (tab) {
      setTimeout(() => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            method: 'openOptionPage',
            data: { url: base64 },
          })
        }
      }, 1000)
    },
  )
}

export {}
