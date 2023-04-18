import { v4 as uuidv4 } from 'uuid'

export {}
console.log('This is the background page.')
console.log('Put the background scripts here.')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisibleArea') {
    captureVisibleArea()
  }
})

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
