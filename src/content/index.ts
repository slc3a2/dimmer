export {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  if (request.source) {
    const source = request.source
    const dom = document.createElement('colora')
    dom.style.cssText += `
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw; 
        height: 100vh; 
        z-index: 1002;
        cursor: crosshair;
        `
    dom.innerHTML += `
        <img src=${source} style='width:100%; height:100%;'/>
        <div class='colora-select'></div>
    `
    document.body.appendChild(dom)

    const select = document.querySelector('colora .colora-select') as HTMLElement
    if (!select) {
      return
    }

    select.style.cssText += `
        position: fixed;
        left: 0;
        top: 0;
        width: 50px;
        height: 50px;
        z-index: 1003;
        cursor: crosshair;
        display: none;
        backgorund-color: rgba(0,0,0,0.2);
        border: 1px solid rgba(0,0,0,0.3);
        z-index: 1002;
        `

    console.log(select)

    let startX = 0
    let startY = 0

    dom.onmousedown = (e) => {
      console.log('down')
      console.log(e)
      e.stopPropagation()
      e.preventDefault()
    
      select.style.display = 'block'
      select.style.left = `${e.clientX}px`
      select.style.top = `${e.clientY}px`
    
      startX = e.clientX - dom.offsetLeft
      startY = e.clientY - dom.offsetTop
    }
    
    dom.onmouseup = (e) => {
      select.style.display = 'none'
      var croppedCanvas = document.createElement('canvas')
      var croppedContext = croppedCanvas.getContext('2d')
      if (!croppedContext) {
        return
      }
      const width = Math.abs(e.clientX - startX - dom.offsetLeft)
      const height = Math.abs(e.clientY - startY - dom.offsetTop)
      croppedCanvas.width = width
      croppedCanvas.height = height
    
      const img = document.querySelector('colora img') as CanvasImageSource

      console.log(img, startX, startY, width, height, 0, 0, width, height)
      croppedContext.drawImage(img, startX, startY, width, height, 0, 0, width, height)
      const croppedDataURL = croppedCanvas.toDataURL()
      console.log(croppedDataURL)

      debugBase64(croppedDataURL)
    }
    
    dom.onmousemove = (e) => {
      e.stopPropagation()
      e.preventDefault()
      let width = e.clientX - startX - dom.offsetLeft
      let height = e.clientY - startY - dom.offsetTop
      select.style.width = `${Math.abs(width)}px`
      select.style.height = `${Math.abs(height)}px`
    }

    dom.oncontextmenu = (e) => {
      e.preventDefault()
      select.style.display = 'none'
    }

    function debugBase64(base64URL: string){
      const win = window.open();
      win?.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }
  }
  sendResponse('get the message')
})
