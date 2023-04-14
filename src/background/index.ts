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
    // chrome.scripting.executeScript({
    //     target: {tabId: tabId}, //tabId代表选项卡ID，可以使用chrome.tabs.query()获取
    //     files: ['options.js'] // options.js 是选项页面中的脚本文件，可以在这里调用选项方法
    //   }, function() {
    //     chrome.tabs.sendMessage(tabId, {method: 'methodName'}); //发送一个消息来调用选项中的方法
    //   });
    // const viewTabUrl = chrome.runtime.getURL(`screenshot/index.html?id=${id++}`)
    // let targetId = null

    // chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    //   if (tabId != targetId || changedProps.status != 'complete') {
    //     return
    //   }
    //   chrome.tabs.onUpdated.removeListener(listener)

    //   var views = chrome.runtime.getViews()
    //   for (var i = 0; i < views.length; i++) {
    //     var view = views[i]
    //     if (view.location.href == viewTabUrl) {
    //       view.setScreenshotUrl(screenshotUrl)
    //       break
    //     }
    //   }
    // })
    // chrome.tabs.create({ url: viewTabUrl }, (tab) => {
    //   targetId = tab.id
    // })
  })
}
