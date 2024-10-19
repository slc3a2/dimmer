import { useState, useEffect } from 'react'
import cls from 'classnames'
import { IoMdSettings } from 'react-icons/io'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiPaintBrushHouseholdFill } from 'react-icons/pi'
import { BsBrightnessHighFill } from 'react-icons/bs'
import { TbContrast2Filled } from 'react-icons/tb'
import { FaCameraRetro } from 'react-icons/fa'
import { PiCheckerboardFill } from 'react-icons/pi'

import styles from './popup.module.scss'
import { downloadList } from './constant'

import Button from '@/components/Button'
import Slider from '@/components/Slider'
import Switch from '@/components/SwitchMain'
import Setting from './Setting'

interface Config {
  brightness: number
  contrast: number
  grayscale: number
  sepia: number
}

const DEFAULT_CONFIG = {
  brightness: 10,
  contrast: 10,
  grayscale: 0,
  sepia: 0,
}

const Popup = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)
  const [isDark, setIsDark] = useState<boolean>(false)
  const [inSettingPage, setInSettingPage] = useState<boolean>(false)

  useEffect(() => {
    init()
    // checkCurrentPageCanInject()
  }, [])

  // useEffect(() => {
  // onNotice(config)
  // checkCurrentPageCanInject()
  // }, [config])

  const onNotice = (config: Config) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const [{ id }] = tabs
        if (id) {
          let message = {
            info: 'changeConfig',
            data: config,
          }
          chrome.tabs.sendMessage(id, message, (res) => {})
        }
      },
    )
  }

  const init = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        let message = {
          info: 'getMode',
        }
        const [{ id }] = tabs
        if (id) {
          chrome.tabs.sendMessage(id, message, (res) => {
            setIsDark(res?.has)
            toggleStyle()
          })
        }
      },
    )
  }

  const toggleStyle = () => {
    if (isDark) {
      import('@/styles/variable_dark.scss').then((module) => {
        console.log(module)
        document.documentElement.style.cssText = module.default
        // setStyle('style2')
      })
    } else {
      import('@/styles/variable.scss').then((module) => {
        console.log(module)
        document.documentElement.style.cssText = module.default
        // setStyle('style1')
      })
    }
  }

  const gotoSetting = () => {
    setInSettingPage(true)
  }

  const switchOnChange = (v: boolean) => {
    if (v) {
      // this.classList.remove('cur')
      // document.querySelector('body').classList.remove('dark')
      // changeModeHandle()
    } else {
      // this.classList.add('cur')
      // console.log(document.querySelector('body'))
      // document.querySelector('body').classList.add('dark')
      // changeModeHandle()
    }
    changeModeHandle(v)
  }

  const changeModeHandle = (v: boolean) => {
    setIsDark(v)
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const [{ id }] = tabs
        if (id) {
          let message = {
            info: 'changeMode',
          }
          chrome.tabs.sendMessage(id, message, (res) => {})
        }
      },
    )
  }

  const brightnessOnChange = (value: number) => {
    setConfig({
      ...config,
      brightness: value,
    })
    onNotice(config)
  }

  const contrastOnChange = (value: number) => {
    setConfig({
      ...config,
      contrast: value,
    })
    onNotice(config)
  }

  const grayscaleOnChange = (value: number) => {
    setConfig({
      ...config,
      grayscale: value,
    })
    onNotice(config)
  }

  const sepiaOnChange = (value: number) => {
    setConfig({
      ...config,
      sepia: value,
    })
    onNotice(config)
  }

  const resetAll = () => {
    console.log(DEFAULT_CONFIG)
    setConfig(DEFAULT_CONFIG)
  }

  const dropdownOnChange = ({ name, id }: { name: string; id: string }) => {
    console.log(name, id)
  }

  const onBack = () => {
    setInSettingPage(false)
  }

  return (
    <main className={cls(styles.main, inSettingPage ? styles.inSetting : '')}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {/* <Button className={styles.settingButton} onClick={resetAll}>
            <IoMdArrowRoundBack size={20} />
          </Button> */}
          <Button className={styles.resetButton} onClick={resetAll}>
            <div className={styles.content}>
              <PiPaintBrushHouseholdFill size={20} />
              {/* <span>Reset</span> */}
            </div>
          </Button>
          <Button className={styles.settingButton} onClick={gotoSetting}>
            <IoMdSettings size={20} />
          </Button>
        </div>
        <div className={styles.switchWrap}>
          <Switch value={isDark} onChange={switchOnChange} />
        </div>
        <div className={styles.config}>
          {/* <div className={styles.item}>
            <Dropdown
              className={styles.downloadButton}
              list={downloadList}
              label={<div className={styles.buttonContent}></div>}
              onChange={dropdownOnChange}
            />
          </div> */}

          <div className={styles.item}>
            <BsBrightnessHighFill size={20} className={styles.icon} />
            <span>Brightness</span>
            <Slider
              className={styles.slider}
              onChange={(value) => {
                brightnessOnChange(value)
              }}
              value={config.brightness}
              max={20}
              min={0}
            />
          </div>
          <div className={styles.item}>
            <TbContrast2Filled size={22} className={styles.icon} />
            <span>Contrast</span>
            <Slider
              className={styles.slider}
              onChange={(value) => {
                contrastOnChange(value)
              }}
              value={config.contrast}
              max={15}
              min={0}
            />
          </div>
          <div className={styles.item}>
            <PiCheckerboardFill size={24} className={styles.icon} />
            <span>Grayscale</span>
            <Slider
              className={styles.slider}
              onChange={(value) => {
                grayscaleOnChange(value)
              }}
              value={config.grayscale}
              max={10}
              min={0}
            />
          </div>
          <div className={styles.item}>
            <FaCameraRetro size={20} className={styles.icon} />
            <span>Sepia</span>
            <Slider
              className={styles.slider}
              onChange={(value) => {
                sepiaOnChange(value)
              }}
              value={config.sepia}
              max={10}
              min={0}
            />
          </div>
        </div>
        {/* <div className={styles.footer}>
          <span></span>
          <Button className={styles.resetButton} onClick={resetAll}>
            <div className={styles.content}>
              <PiPaintBrushHouseholdFill size={18} />
              <span>Reset</span>
            </div>
          </Button>
        </div> */}
      </div>
      <Setting onBack={onBack} />
    </main>
  )
}

export default Popup
