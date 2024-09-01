import { useState, useEffect, useRef } from 'react'
import domtoimage from 'dom-to-image'
import cls from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import queryString from 'query-string'
import { SketchPicker, ColorResult } from 'react-color'

import Button from '@/components/Button'
import Slider from '@/components/Slider'
import Dropdown, { listItem } from '@/components/Dropdown'
import Radio, { RadioItem } from '@/components/Radio'
import Picker, { PickerItem, LIST } from '@/components/Picker'
import Loading from '@/components/Loading'

import Upload from './components/upload'

import styles from './options.module.scss'
import {
  dropdownList,
  radioThemeList,
  radioThemeColorList,
  downloadList,
  resizeList,
} from './constant'
import { WindowsIconZoomOut, WindowsIconZoomIn, WindowsIconClose } from './components/svgIcon'

const { id } = queryString.parse(window.location.search)

const enum IMG_TYPE {
  PNG,
  JPEG,
}

interface dropdownItemType {
  quality: number
  type: IMG_TYPE.PNG | IMG_TYPE.JPEG
}

let autoStyle: {
  width: number
  height: number
} = {
  width: 0,
  height: 0,
}

function App() {
  const [src, setSrc] = useState('')
  const [padding, setPadding] = useState(0)
  const [margin, setMargin] = useState(0)
  const [radius, setRadius] = useState(0)
  const [shadow, setShadow] = useState(0)
  const [shadowBlur, setShadowBlur] = useState(10)
  const [width, setWidth] = useState<string | number>('auto')
  const [height, setHeight] = useState<string | number>('auto')
  const [theme, setTheme] = useState('None')
  const [themeColor, setThemeColor] = useState('dark')
  const [paddingColor, setPaddingColor] = useState('#fff')
  const [openPaddingColor, setOpenPaddingColor] = useState(false)
  const [bgColor, setBgColor] = useState(LIST[6].value)
  const [loading, setLoading] = useState(true)
  const [downloadLading, setDownloadLading] = useState(false)
  const [isEmptyData, setIsEmptyData] = useState(false)

  const imgContainer = useRef(null)

  const saveSource = (base64: string) => {
    setSrc(base64)
    window.sessionStorage.setItem(`${id}`, base64)
  }

  useEffect(() => {
    if (!id) {
      setIsEmptyData(true)
      return
    }
    const tempSrc = window.sessionStorage.getItem(`${id}`)
    if (tempSrc) {
      setSrc(tempSrc)
    } else {
      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.method === 'openOptionPage') {
          sendResponse({ result: 'options method has been called' })
          saveSource(request.data.url)
        }
      })
    }
    document.addEventListener('click', handleDocClick)
    return () => {
      document.removeEventListener('click', handleDocClick)
    }
  }, [])

  const handleDocClick = (e: any) => {
    const parent = document.querySelector('.sketch-picker')
    const contain = parent?.contains(e.target)
    if (!contain) {
      setOpenPaddingColor(false)
    }
  }

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
    if (item.name) {
      setThemeColor(item.name)
    }
  }

  const setPaddingColorHandler = (e: ColorResult) => {
    const { r, g, b, a } = e.rgb
    setPaddingColor(`rgba(${r}, ${g}, ${b}, ${a})`)
  }

  const setBgColorHandler = (item: PickerItem) => {
    setBgColor(item.value)
  }

  const downloadHandler = ({ quality = 1, type = IMG_TYPE.PNG }: dropdownItemType) => {
    if (downloadLading) return
    if (imgContainer.current) {
      const node = imgContainer.current as HTMLElement
      const scale = 3
      const style = {
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left',
        width: node.offsetWidth + 'px',
        height: node.offsetHeight + 'px',
      }

      setDownloadLading(true)
      setTimeout(() => {
        setDownloadLading(false)
      }, 1300)
      if (type === IMG_TYPE.PNG) {
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
      } else if (type === IMG_TYPE.JPEG) {
        const options = {
          height: node.offsetHeight * scale,
          width: node.offsetWidth * scale,
          quality,
          style,
        }
        domtoimage.toJpeg(node, options).then((base64: string) => {
          const a = document.createElement('a')
          a.href = base64
          const date = new Date().getTime()
          a.download = `colora_image_${date}.jpg`
          a.click()
        })
      }
    }
  }

  const onLoad = () => {
    setLoading(false)
    if (imgContainer.current) {
      const node = imgContainer.current as HTMLElement
      const { offsetWidth, offsetHeight } = node
      setWidth(offsetWidth)
      setHeight(offsetHeight)
      autoStyle = {
        width: offsetWidth,
        height: offsetHeight,
      }
    }
  }

  const uploadOnChange = (url: string) => {
    const id = uuidv4()
    window.sessionStorage.setItem(`${id}`, url)
    window.location.href = `${window.location.href}?id=${id}`
  }

  const openUploaderHandler = () => {
    window.open(`${window.location.origin}/options.html`)
  }

  const openPaddingColorHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setOpenPaddingColor(!openPaddingColor)
  }

  const dropdownOnChange = ({ name, id }: { name: string; id: string }) => {
    const MAP_KEY: Record<string, dropdownItemType> = {
      png: {
        quality: 1,
        type: IMG_TYPE.PNG,
      },
      high: {
        quality: 1,
        type: IMG_TYPE.JPEG,
      },
      medium: {
        quality: 0.8,
        type: IMG_TYPE.JPEG,
      },
      low: {
        quality: 0.3,
        type: IMG_TYPE.JPEG,
      },
    }
    const res = MAP_KEY?.[id]
    downloadHandler(res)
  }

  const setResizeHandler = (item: RadioItem) => {
    const { name } = item
    const HANDLER_MAP: Record<string, () => void> = {
      Auto: () => {
        const v = 'auto'
        const { width, height } = autoStyle
        setWidth(width)
        setHeight(height)
      },
      '1:1': () => {
        if (width >= height) {
          setWidth(height)
        } else {
          setHeight(width)
        }
      },
      '2:1': () => {
        setWidth(autoStyle.width)
        const pre = autoStyle.width / 2
        setHeight(pre * 1)
      },
      '4:3': () => {
        setWidth(autoStyle.width)
        const pre = autoStyle.width / 4
        setHeight(pre * 3)
      },
      '16:9': () => {
        setWidth(autoStyle.width)
        const pre = autoStyle.width / 16
        setHeight(pre * 9)
      },
      '16:10': () => {
        setWidth(autoStyle.width)
        const pre = autoStyle.width / 16
        setHeight(pre * 10)
      },
      '800x600': () => {
        setWidth(800)
        setHeight(600)
      },
    }
    name && HANDLER_MAP?.[name]()
  }

  return (
    <main className={styles.appContainer}>
      {isEmptyData ? (
        <Upload
          onChange={(url) => {
            uploadOnChange(url)
          }}
        />
      ) : (
        <>
          <section className={styles.contentWrapper}>
            <div
              className={styles.imgContainer}
              ref={imgContainer}
              style={{ background: `${bgColor}`, width: `${width}px`, height: `${height}px` }}
            >
              <Loading visible={loading} />
              <div
                className={styles.imgMargin}
                style={{
                  margin: `${margin}px`,
                  borderRadius: `${radius}px`,
                  boxShadow: `5px 5px ${10 + shadowBlur}px ${shadow}px rgba(0,0,0,0.1)`,
                  opacity: `${loading ? 0 : 1}`,
                }}
              >
                <div
                  className={cls(
                    styles.theme,
                    theme === 'Macos' && styles.macos,
                    theme === 'Windows' && styles.windows,
                    themeColor === 'light' ? styles.light : '',
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
          </section>
          <section className={styles.sidebarWrapper}>
            <div className={styles.sidebar}>
              <div className={styles.item}>
                <p className={styles.title}>Padding</p>
                <Slider
                  onChange={(value) => {
                    setPaddingHandler(value)
                  }}
                  max={50}
                  min={0}
                  defaultValue={0}
                />
              </div>
              <div className={cls(styles.item, styles.paddingColor)}>
                <p className={styles.title}>Padding Color</p>
                <div
                  className={styles.colorInput}
                  onClick={(e) => {
                    openPaddingColorHandler(e)
                  }}
                >
                  <div
                    className={styles.currentPaddingColor}
                    style={{ background: `${paddingColor}` }}
                  ></div>
                </div>
                {openPaddingColor ? (
                  <div className={styles.sketchPickerWrap}>
                    <SketchPicker
                      className={styles.sketchPicker}
                      color={paddingColor}
                      onChange={(e) => {
                        setPaddingColorHandler(e)
                      }}
                      presetColors={[]}
                    />
                  </div>
                ) : null}
              </div>
              <div className={styles.item}>
                <p className={styles.title}>Margin</p>
                <Slider
                  onChange={(value) => {
                    setMarginHandler(value)
                  }}
                  max={201}
                  min={0}
                  defaultValue={100}
                />
              </div>
              <div className={styles.item}>
                <p className={styles.title}>Border Radius</p>
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
                  max={20}
                  min={0}
                />
              </div>
              <div className={cls(styles.item, styles.center)}>
                <p className={styles.title}>Theme</p>
                <Radio
                  list={radioThemeList}
                  onChange={(item: RadioItem) => {
                    setThemeHandler(item)
                  }}
                />
              </div>
              <div className={cls(styles.item)}>
                <p className={styles.title}>Theme Color</p>
                <Radio
                  list={radioThemeColorList}
                  onChange={(item: RadioItem) => {
                    setThemeColorHandler(item)
                  }}
                />
              </div>
              <div className={cls(styles.item)}>
                <p className={cls(styles.title, styles.noMargin)}>Resize</p>
                <div className={styles.resizeListWrap}>
                  <div className={styles.resizeListInlineBlock}>
                    <Radio
                      list={resizeList}
                      className={styles.resizeItem}
                      onChange={(item: RadioItem) => {
                        setResizeHandler(item)
                      }}
                    />
                  </div>
                </div>
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

              <div className={cls(styles.item, styles.buttonWrap)}>
                <div className={cls(styles.mainButtonGroup)}>
                  <Dropdown
                    className={styles.downloadButton}
                    list={downloadList}
                    label={'Export As ...'}
                    onChange={dropdownOnChange}
                  />
                  <Button
                    className={styles.uploadButton}
                    onClick={() => {
                      openUploaderHandler()
                    }}
                  >
                    Upload and Edit
                  </Button>
                </div>

                <Button
                  className={styles.feedbackButton}
                  onClick={() => {
                    openUploaderHandler()
                  }}
                >
                  {' '}
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default App
