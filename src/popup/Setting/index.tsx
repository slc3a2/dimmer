import { useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BsBugFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { RiGlobalLine } from 'react-icons/ri'
import { FaAngleRight } from 'react-icons/fa'
import { FaAngellist } from 'react-icons/fa'
import { RiEnglishInput } from 'react-icons/ri'
import { RiEmphasisCn } from 'react-icons/ri'
import { LiaLanguageSolid } from 'react-icons/lia'
import { RiFolderForbidLine } from 'react-icons/ri'
import { FaCircleInfo } from 'react-icons/fa6'
import { RiKeyboardLine } from 'react-icons/ri'

import { useTranslation } from 'react-i18next'

import styles from './index.module.scss'

import Button from '@/components/Button'
import Switch from '@/components/Switch'
import Modal from '@/components/Modal'

import { matchWildcardUrls } from '@/utils'
import { EXCLUDE_URLS_KEY } from '@/constant'

interface Setting {
  onBack: () => void
}

const Setting = ({ onBack }: Setting) => {
  const [global, setGlobal] = useState<boolean>(false)
  const [excludeDomainVisible, setExcludeDomainVisible] = useState<boolean>(false)
  const [excludesDomains, setExcludesDomains] = useState<string>(
    localStorage.getItem(EXCLUDE_URLS_KEY) || '',
  )
  const [currentShortcut, setCurrentShortcut] = useState<string>()

  const { i18n, t } = useTranslation()

  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getGlobal' }, (response) => {
      if (response) {
        const { isGlobal } = response.state
        setGlobal(isGlobal)
      }
    })

    chrome.commands.getAll((commands) => {
      const darkModeCommand = commands.find((cmd) => cmd.name === 'toggle_dark_mode')
      setCurrentShortcut(darkModeCommand?.shortcut)
    })
  }, [])

  const backHandler = () => {
    onBack()
  }

  const switchOnChange = () => {
    const t = !global
    setGlobal(t)
    chrome.runtime.sendMessage({
      action: 'setGlobal',
      state: {
        isGlobal: t,
      },
    })
    if (t) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          const { url, id } = tab
          if (url && id) {
            let message = {
              info: 'changeMode',
              data: { exclude: matchWildcardUrls(url) },
            }
            chrome.tabs.sendMessage(id, message, (res) => {})
          }
        })
      })
    } else {
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
  }

  const languageOnClick = () => {
    if (i18n.language === 'zh') {
      i18n.changeLanguage('en')
      localStorage.setItem('lang', 'en')
    } else {
      i18n.changeLanguage('zh')
      localStorage.setItem('lang', 'zh')
    }
  }

  const shortcutSettingOnClick = () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })
  }

  const rateOnClick = () => {
    window.open('https://chromewebstore.google.com/detail/dnidbhhpcjgffjophhebfelbcnonoclh')
  }

  const feedOnClick = () => {
    window.open('https://github.com/slc3a2/dimmer/issues')
  }

  const coloraOnClick = () => {
    window.open('https://chromewebstore.google.com/detail/lajfgofeklkfhemnhomepdojkkljljkp')
  }

  const excludeOnClick = () => {
    setExcludeDomainVisible(true)
  }

  const exludeOnClose = () => {
    setExcludeDomainVisible(false)
  }

  const excludesSubmit = () => {
    const value = excludesDomains
    localStorage.setItem(EXCLUDE_URLS_KEY, value)
    setExcludeDomainVisible(false)
    chrome.runtime.sendMessage({
      action: 'setGlobal',
      state: {
        excludeUrls: value,
      },
    })
    if (global) {
      chrome.tabs.query({}, (tabs) => {
        for (let i = 0, len = tabs.length; i < len; i++) {
          const tab = tabs[i]
          const { url, id } = tab
          if (url && id) {
            let message = {
              info: 'getMode',
            }
            chrome.tabs.sendMessage(id, message, (res = {}) => {
              const { has } = res
              // 若排除域名中包含当前域名，并且当前域名页面处于暗黑模式，那么恢复为正常模式
              let message = {
                info: 'changeMode',
                data: { exclude: matchWildcardUrls(url) },
              }
              chrome.tabs.sendMessage(id, message, (res) => {})
            })
          }
        }
      })
    }
  }

  const excludesInputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExcludesDomains(e.target.value)
  }

  const getExcludeDomainsLength = (v = excludesDomains) => {
    const exactUrls = v
    const notExist = exactUrls === '' || exactUrls === null || exactUrls === undefined
    const patterns = notExist ? [] : exactUrls.split('\n')
    return patterns.filter((i) => i).length
  }

  const versionOnClick = () => {
    window.open('https://github.com/slc3a2/dimmer/releases')
  }

  return (
    <div className={styles.settingPage}>
      <div className={styles.header}>
        <Button className={styles.settingButton} onClick={backHandler}>
          <IoMdArrowRoundBack size={20} />
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <div className={styles.label}>
            <RiGlobalLine size={20} className={styles.icon} />
            <span>{t('global')}</span>
          </div>
          <Switch value={global} onChange={switchOnChange} className={styles.switch} />
        </div>
        {global ? (
          <div className={styles.item} onClick={excludeOnClick}>
            <div className={styles.label}>
              <RiFolderForbidLine size={20} className={styles.icon} />
              <span>{t('excludePath')}</span>
            </div>
            <span className={styles.exludePathRightWrap}>
              {getExcludeDomainsLength(excludesDomains) === 0 ? (
                <FaAngleRight size={20} className={styles.rightIcon} />
              ) : (
                <div className={styles.length}>{getExcludeDomainsLength(excludesDomains)}</div>
              )}
            </span>
          </div>
        ) : null}
        <div className={styles.item} onClick={languageOnClick}>
          <div className={styles.label}>
            <LiaLanguageSolid size={20} className={styles.icon} />
            <span>{t('language')}</span>
          </div>
          <span>
            {i18n.language === 'zh' ? (
              <RiEnglishInput size={20} className={styles.rightIcon} />
            ) : (
              <RiEmphasisCn size={22} className={styles.rightIcon} />
            )}
          </span>
        </div>
        {!global ? (
          <div className={styles.item} onClick={shortcutSettingOnClick}>
            <div className={styles.label}>
              <RiKeyboardLine size={20} className={styles.icon} />
              <span>{t('shortcut')}</span>
            </div>
            <span className={styles.shortcutWrap}>
              <span className={styles.shortcutText}>{currentShortcut || t('notSet')}</span>
              <FaAngleRight size={20} className={styles.rightIcon} />
            </span>
          </div>
        ) : null}
        <div className={styles.item} onClick={rateOnClick}>
          <div className={styles.label}>
            <FaHeart size={20} className={styles.icon} />
            <span>{t('rate')}</span>
          </div>
          <span>
            <FaAngleRight size={20} className={styles.rightIcon} />
          </span>
        </div>
        <div className={styles.item} onClick={feedOnClick}>
          <div className={styles.label}>
            <BsBugFill size={20} className={styles.icon} />
            <span>{t('feedback')}</span>
          </div>
          <span>
            <FaAngleRight size={20} className={styles.rightIcon} />
          </span>
        </div>
        <div className={styles.item} onClick={coloraOnClick}>
          <div className={styles.label}>
            <FaAngellist size={20} className={styles.icon} />
            <span>Colora</span>
          </div>
          <span>
            <FaAngleRight size={20} className={styles.rightIcon} />
          </span>
        </div>
        <div className={styles.item} onClick={versionOnClick}>
          <div className={styles.label}>
            <FaCircleInfo size={20} className={styles.icon} />
            <span>{t('version')}</span>
          </div>
          <span className={styles.versionRightWrap}>
            {chrome.runtime.getManifest()?.version || ''}
          </span>
        </div>
      </div>
      <Modal
        isOpen={excludeDomainVisible}
        onClose={exludeOnClose}
        overlayClass={styles.overlayClass}
        modalClass={styles.modalClass}
        closeOnClickModal={false}
      >
        <div className={styles.modalContentWrap}>
          <textarea
            value={excludesDomains}
            onChange={excludesInputOnChange}
            className={styles.input}
            placeholder={t('excludePlaceholder')}
          />
          <Button className={styles.modalBtn} onClick={excludesSubmit}>
            确定
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Setting
