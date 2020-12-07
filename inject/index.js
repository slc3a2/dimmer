chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.info === 'changeMode') {
    let root = document.getElementsByTagName('html')[0];
    if(!root.classList.contains("dark")){
      root.classList.add("dark");
    }else{
      root.classList.remove('dark');
    }
  }
  if(request.info === 'getMode') {
    let root = document.getElementsByTagName('html')[0];
    if(!root.classList.contains("dark")){
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