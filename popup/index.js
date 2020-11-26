document.querySelector('.normal').onclick = function(e) {
  if(this.classList.contains('cur')){
    this.classList.remove('cur')
    changeModeHandle()
  }else{
    this.classList.add('cur')
    changeModeHandle()
  }
}

function changeModeHandle() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    let message = {
        info: 'changeMode'
    }
    console.log(tabs[0].id)
    chrome.tabs.sendMessage(tabs[0].id, message, res => {
        console.log('popup=>content')
        console.log(res)
    })
  })
}
window.onload = function(){
  const version = chrome.runtime.getManifest().version;
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    let message = {
        info: 'getMode'
    }
    chrome.tabs.sendMessage(tabs[0].id, message, res => {
        console.log(res)
        if(res.has){
          document.querySelector('.normal').classList.add('cur')
        }else{
          document.querySelector('.normal').classList.remove('cur')
        }
    })
  })
  
  document.querySelector('.gh').onclick = function(e) {
    window.open('https://github.com/codedance98')
  }
  
  document.querySelector('.score').onclick = function(e) {
    window.open('https://github.com/codedance98')
  }
}