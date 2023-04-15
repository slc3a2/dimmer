import { useState, useEffect, useRef } from 'react'
import domtoimage from 'dom-to-image'
import cls from 'classnames'
import queryString from 'query-string'


import Button from '@/components/Button'
import Slider from '@/components/Slider'
import Dropdown, { listItem } from '@/components/Dropdown'
import Radio, { RadioItem } from '@/components/Radio'
import Picker, { PickerItem, LIST } from '@/components/Picker'

import styles from './options.module.scss'
import { dropdownList, radioThemeList, radioThemeColorList } from './constant'
import { WindowsIconZoomOut, WindowsIconZoomIn, WindowsIconClose } from './components/svgIcon'

const { id } = queryString.parse(window.location.search)

function App() {
  const [src, setSrc] = useState('')
  const [padding, setPadding] = useState(0)
  const [margin, setMargin] = useState(0)
  const [radius, setRadius] = useState(0)
  const [shadow, setShadow] = useState(0)
  const [shadowBlur, setShadowBlur] = useState(10)
  const [theme, setTheme] = useState('None')
  const [themeColor, setThemeColor] = useState('dark')
  const [paddingColor, setPaddingColor] = useState('#CAA5C9')
  const [bgColor, setBgColor] = useState(LIST[6].value)
  const [loading, setLoading] = useState(true)
  const imgContainer = useRef(null)

  useEffect(() => {
    const tempSrc = window.sessionStorage.getItem(`${id}`)
    if (tempSrc) {
      setSrc(tempSrc)
    } else {
      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.method === 'pushImgSource') {
          sendResponse({ result: 'options method has been called' })
          setSrc(request.data.url)
          window.sessionStorage.setItem(`${id}`, request.data.url)
        }
      })
    }
  }, [])

  const setPaddingHandler = (value: number) => {
    setPadding(value)
  }
  const setMarginHandler = (value: number) => {
    setMargin(value)
  }

  const setRadiusHandler = (value: number) => {
    setRadius(value)
  }

  const setShadowHandler = (value: number) => {
    setShadow(value)
  }

  const setShadowBlurHandler = (value: number) => {
    setShadowBlur(value)
  }

  const setThemeHandler = (item: RadioItem) => {
    setTheme(item.label)
  }

  const setThemeColorHandler = (item: RadioItem) => {
    if(item.name) {
      setThemeColor(item.name)
    }
  }

  const setPaddingColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPaddingColor(e.target.value)
    }
  }

  const setBgColorHandler = (item: PickerItem) => {
    setBgColor(item.value)
  }

  const saveHandler = () => {
    if (imgContainer.current) {
      const node = imgContainer.current as HTMLElement
      const scale = 3
      const style = {
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left',
        width: node.offsetWidth + 'px',
        height: node.offsetHeight + 'px',
      }
      const options = {
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
        quality: 1,
        style,
      }
      domtoimage.toPng(node, options).then((base64: string) => {
        const a = document.createElement('a')
        a.href = base64
        const date = new Date().getTime()
        a.download = `colora_image_${date}.png`
        a.click()
      })
    }
  }

  const onLoad = () => {
    setLoading(false)
  }

  return (
    <main className={styles.appContainer}>
      <div className={styles.imgContainer} ref={imgContainer} style={{ background: `${bgColor}` }}>
        <span className={styles.loading} style={{ opacity: `${loading ? 1 : 0}` }}></span>
        <div
          className={styles.imgMargin}
          style={{
            margin: `${margin}px`,
            borderRadius: `${radius}px`,
            boxShadow: `${shadow}px ${shadow}px ${shadowBlur}px rgba(0,0,0,0.1)`,
            opacity: `${loading ? 0 : 1}`,
          }}
        >
          <div
            className={cls(
              styles.theme,
              theme === 'Macos' && styles.macos,
              theme === 'Windows' && styles.windows,
              themeColor === 'light' ? styles.light : ''
            )}
          >
            {theme === 'Macos' ? (
              <>
                <p></p>
                <p></p>
                <p></p>
              </>
            ) : (
              <>
                <p>
                  <WindowsIconZoomOut theme={themeColor} />
                </p>
                <p>
                  <WindowsIconZoomIn theme={themeColor} />
                </p>
                <p>
                  <WindowsIconClose theme={themeColor} />
                </p>
              </>
            )}
          </div>
          <div
            className={styles.imgPadding}
            style={{
              padding: `${padding}px`,
              backgroundColor: `${paddingColor}`,
            }}
          >
            <img src={src} onLoad={onLoad} />
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.item}>
          <p className={styles.title}>Padding</p>
          <Slider
            onChange={(value) => {
              setPaddingHandler(value)
            }}
            max={50}
            min={0}
            defaultValue={15}
          />
        </div>
        <div className={cls(styles.item, styles.colorInput)}>
          <p className={styles.title}>Padding Color</p>
          <label htmlFor="select-color" className={styles.paddingColorInput}>
            <div className={styles.colorInput}>
              <div
                className={styles.currentPaddingColor}
                style={{ background: `${paddingColor}` }}
              ></div>
            </div>
          </label>
          <input
            type="color"
            id="select-color"
            value={paddingColor}
            onChange={(e) => {
              setPaddingColorHandler(e)
            }}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.title}>Margin</p>
          <Slider
            onChange={(value) => {
              setMarginHandler(value)
            }}
            max={200}
            min={0}
            defaultValue={50}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.title}>Radius</p>
          <Slider
            onChange={(value) => {
              setRadiusHandler(value)
            }}
            max={20}
            min={0}
            defaultValue={5}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.title}>Shadow Size</p>
          <Slider
            onChange={(value) => {
              setShadowHandler(value)
            }}
            max={30}
            min={0}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.title}>Shadow Blur</p>
          <Slider
            onChange={(value) => {
              setShadowBlurHandler(value)
            }}
            defaultValue={10}
            max={30}
            min={0}
          />
        </div>
        <div className={cls(styles.item, styles.center)}>
          <p className={styles.title}>Theme</p>
          <Radio list={radioThemeList} onChange={(item: RadioItem) => {
            setThemeHandler(item)
          }}/>
          {/* <Radio list={radioThemeColorList} /> */}
          {/* <Dropdown
            list={dropdownList}
            onChange={(key) => {
              setThemeHandler(key)
            }}
          /> */}
        </div>
        <div className={cls(styles.item)}>
          <p className={styles.title}>Theme Color</p>
          {/* <Radio list={radioThemeList} /> */}
          <Radio list={radioThemeColorList} onChange={(item: RadioItem) => {
            setThemeColorHandler(item)
          }}/>
          {/* <Dropdown
            list={dropdownList}
            onChange={(key) => {
              setThemeHandler(key)
            }}
          /> */}
        </div>

        <div className={cls(styles.item, styles.background)}>
          <p className={styles.title}>Background Color</p>
          <Picker
            onChange={(item) => {
              setBgColorHandler(item)
            }}
          />
        </div>

        <span className={styles.line}></span>

        <div className={styles.item}>
          <Button
            onClick={() => {
              saveHandler()
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App
