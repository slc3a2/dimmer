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
        border: 1px solid #fff;
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

      startX = e.clientX
      startY = e.clientY
    }

    dom.onmouseup = (e) => {
      select.style.display = 'none'
      var croppedCanvas = document.createElement('canvas')
      var croppedContext = croppedCanvas.getContext('2d')
      if (!croppedContext) {
        return
      }
      const width = Number(select.style.width.replace('px', ''))
      const height = Number(select.style.height.replace('px', ''))
      croppedCanvas.width = width
      croppedCanvas.height = height

      const img = document.querySelector('colora img') as CanvasImageSource
      console.log(img, startX, startY, width, height)
      croppedContext.drawImage(img, startX, startY, width, height, 0, 0, width, height)

      const croppedDataURL = croppedCanvas.toDataURL()
      window.open(croppedDataURL)
    }

    dom.onmousemove = (e) => {
      e.stopPropagation()
      e.preventDefault()
      let width = e.clientX - startX
      let height = e.clientY - startY
      select.style.width = `${width}px`
      select.style.height = `${height}px`
    }

    dom.oncontextmenu = (e) => {
      e.preventDefault()
      select.style.display = 'none'
    }
  }
  sendResponse('get the message')
})
