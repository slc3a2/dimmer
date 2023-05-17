export {}

import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
        <img class='colora-snap-img' src=${source} style='display: block;max-width: 100%;'/>
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
        border: 1px solid red;
        z-index: 1002;
        `

    let startX = 0
    let startY = 0
    let isStart = false

    const img = document.querySelector('.colora-snap-img') as HTMLImageElement

    const cropper = new Cropper(img, {
      viewMode: 1,
      dragMode: 'none',
      // crop(event) {
      //   let cas = cropper.getCroppedCanvas();// 获取被裁剪后的canvas                  
      //   let base64 = cas.toDataURL('image/jpeg');
      //   console.log(base64)
      //   console.log(event)
      //   console.log(event.detail.x);
      //   console.log(event.detail.y);
      //   console.log(event.detail.width);
      //   console.log(event.detail.height);
      //   console.log(event.detail.rotate);
      //   console.log(event.detail.scaleX);
      //   console.log(event.detail.scaleY);
      // },
    });

    // dom.onmousedown = (e) => {
    //   e.stopPropagation()
    //   e.preventDefault()
    //   isStart = true
    
    //   select.style.display = 'block'
    //   select.style.left = `${e.clientX}px`
    //   select.style.top = `${e.clientY}px`
    
    //   startX = e.clientX - dom.offsetLeft;
    //   startY = e.clientY - dom.offsetTop;

    //   // const domRect = dom.getBoundingClientRect();
    //   // startX = e.pageX - domRect.left - window.scrollX;
    //   // startY = e.pageY - domRect.top - window.scrollY;
    // }

    // dom.onmousemove = (e) => {
    //   if(!isStart) return
    //   e.stopPropagation()
    //   e.preventDefault()
    //   // let width = e.pageX - startX - dom.offsetLeft;
    //   // let height = e.pageY - startY - dom.offsetTop;
    //   // const domRect = dom.getBoundingClientRect();
    //   let width = e.clientX - startX;
    //   let height = e.clientY - startY;
    //   select.style.width = `${Math.abs(width)}px`;
    //   select.style.height = `${Math.abs(height)}px`;

    //   console.log(`宽 ${Math.abs(width)} 高 ${Math.abs(height)}`)
    //   console.log(`开始x ${startX} 开始y ${startY}`)
    // }
    
    // dom.onmouseup = (e) => {
    //   isStart = false
    //   select.style.display = 'none'
    //   const croppedCanvas = document.createElement('canvas')
    //   const croppedContext = croppedCanvas.getContext('2d')
    //   if (!croppedContext) {
    //     return
    //   }
    //   const width = Math.abs(e.clientX - startX - dom.offsetLeft + window.scrollX)
    //   const height = Math.abs(e.clientY - startY - dom.offsetTop + window.scrollY)
    //   croppedCanvas.width = width
    //   croppedCanvas.height = height
    //   console.log(document, croppedCanvas)

    //   // const img = document.querySelector('colora img') as CanvasImageSource
    //   const img = document.querySelector('.colora-snap-img') as CanvasImageSource;


    //   console.log(img, startX, startY, width, height, 0, 0, width, height)
    //   croppedContext.drawImage(img, startX, startY, width, height, 0, 0, width, height)
    //   const croppedDataURL = croppedCanvas.toDataURL()
    //   // console.log(croppedDataURL)

    //   hideColoraSelectArea()

    //   debugBase64(croppedDataURL)
    // }

    dom.oncontextmenu = (e) => {
      e.preventDefault()
      // hideColoraSelectArea()
      cropper.clear()
    }

    const hideColoraSelectArea = () => {
      document.querySelector('colora')?.remove()
    }

    function debugBase64(base64URL: string){
      const win = window.open();
      win?.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }
  }
  sendResponse('get the message')
})
