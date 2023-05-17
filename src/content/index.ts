import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

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

    const img = document.querySelector('colora img') as HTMLImageElement
    let cropper: Cropper;

    img.onload = function() {
      cropper = new Cropper(img, {
        viewMode: 1,
        dragMode: 'crop',
        autoCrop: false,
        cropend() {
          const croppedCanvasBase64 = cropper.getCroppedCanvas().toDataURL();
          sendMsgToBackground(croppedCanvasBase64)
          hideColoraSelectArea()
        }
      });
    }

    dom.oncontextmenu = (e) => {
      e.preventDefault()
      hideColoraSelectArea()
      cropper.clear()
    }

    const hideColoraSelectArea = () => {
      document.querySelector('colora')?.remove()
      cropper.clear()
    }

    const sendMsgToBackground = (base64: string) => {
      chrome.runtime.sendMessage({
        action: 'captureSelectAreaCb',
        data: {
          base64
        }
      });
    }
  }
})

export {}
