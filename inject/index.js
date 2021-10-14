chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.info)
  if(request.info === 'changeMode') {
    let root = document.getElementsByTagName('html')[0];
    if(!root.classList.contains("dimmer-dark")){
      root.classList.add("dimmer-dark");
    }else{
      root.classList.remove('dimmer-dark');
    }
  }
  if(request.info === 'getMode') {
    let root = document.getElementsByTagName('html')[0];
    if(!root.classList.contains("dimmer-dark")){
      sendResponse({
        has: false
      })
    }else{
      sendResponse({
        has: true
      })
    }
  }
})