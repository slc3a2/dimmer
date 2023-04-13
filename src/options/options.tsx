import { useState, useEffect, useRef } from 'react'
import domtoimage from 'dom-to-image'
import cls from 'classnames'

import Button from '@/components/Button'
import Slider from '@/components/Slider'
import Dropdown, { listItem } from '@/components/Dropdown'
import Picker, { PickerItem, LIST } from '@/components/Picker'

import styles from './options.module.scss'

const dropdownList = [
  {
    name: 'Macos Dark',
    id: 'macosDark',
  },
  {
    name: 'Macos Light',
    id: 'macosLight',
  },
  {
    name: 'Windows Dark',
    id: 'windowsDark',
  },
  {
    name: 'Windows Light',
    id: 'windowsLight',
  },
]

function App() {
  const [src, setSrc] = useState('create-chrome-ext')
  const [padding, setPadding] = useState(0)
  const [margin, setMargin] = useState(0)
  const [radius, setRadius] = useState(0)
  const [shadow, setShadow] = useState(0)
  const [theme, setTheme] = useState('null')
  const [paddingColor, setPaddingColor] = useState('')
  const [bgColor, setBgColor] = useState(LIST[0].value)
  const imgContainer = useRef(null)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.method === 'pushImgSource') {
        sendResponse({ result: 'options method has been called' })
        setSrc(request.data.url)
      }
    })
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
        a.download = 'Image.png'
        a.click()
      })
    }
  }

  const setThemeHandler = (item: listItem) => {
    console.log(item.id)
    setTheme(item.id)
  }

  const setPaddingColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.value) {
      setPaddingColor(e.target.value)
    }
  }

  const setBgColorHandler = (item: PickerItem) => {
    setBgColor(item.value)
  }

  return (
    <main className={styles.appContainer}>
      <div
        className={styles.imgContainer}
        ref={imgContainer}
        style={{ backgroundImage: `${bgColor}` }}
      >
        <div
          className={styles.margin}
          style={{
            margin: `${margin}px`,
            borderRadius: `${radius}px`,
            boxShadow: `${shadow}px ${shadow}px 10px rgba(0,0,0,0.1)`,
          }}
        >
          <div
            className={cls(
              styles.theme,
              theme === 'macosDark' && styles.macosDark,
              theme === 'macosLight' && styles.macosLight,
              theme === 'windowsDark' && styles.windowsDark,
              theme === 'windowsLight' && styles.windowsLight,
            )}
          >
            {['macosDark', 'macosLight'].includes(theme) ? (
              <>
                <p></p>
                <p></p>
                <p></p>
              </>
            ) : (
              <>
                <p>
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2524"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M98.23 451.003l829.685-1.992 0.154 64-829.685 1.992z"
                      fill={theme === 'windowsLight' ? '#2c2c2c' : '#e0e0e0'}
                      p-id="2525"
                    ></path>
                  </svg>
                </p>
                <p>
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6209"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M800 928H224c-70.692 0-128-57.308-128-128V224c0-70.692 57.308-128 128-128h576c70.692 0 128 57.308 128 128v576c0 70.692-57.308 128-128 128z m64-704c0-35.346-28.654-64-64-64H224c-35.346 0-64 28.654-64 64v576c0 35.346 28.654 64 64 64h576c35.346 0 64-28.654 64-64V224z"
                      p-id="6210"
                      fill={theme === 'windowsLight' ? '#2c2c2c' : '#e0e0e0'}
                    ></path>
                  </svg>
                </p>
                <p>
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5280"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z"
                      fill={theme === 'windowsLight' ? '#2c2c2c' : '#e0e0e0'}
                      p-id="5281"
                    ></path>
                  </svg>
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
            <img src={src} alt="" />
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
          />
        </div>
        <div className={styles.item}>
          <p className={styles.title}>Padding Color</p>
          <input
            type="color"
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
            max={100}
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
          />
        </div>
        <div className={styles.item}>
          <p className={styles.title}>Shadow</p>
          <Slider
            onChange={(value) => {
              setShadowHandler(value)
            }}
            max={30}
            min={0}
          />
        </div>
        <div className={cls(styles.item, styles.center)}>
          <p className={styles.title}>Theme</p>
          <Dropdown
            list={dropdownList}
            onChange={(key) => {
              setThemeHandler(key)
            }}
          />
        </div>

        <div className={cls(styles.item, styles.background)}>
          <p className={styles.title}>Background Color</p>
          <Picker
            onChange={(item) => {
              setBgColorHandler(item)
            }}
          />
        </div>

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
