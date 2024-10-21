import { useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BsBugFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { RiGlobalLine } from 'react-icons/ri'
import { FaAngleRight } from 'react-icons/fa'
import { FaAngellist } from 'react-icons/fa'

import styles from './index.module.scss'

import Button from '@/components/Button'
import Switch from '@/components/Switch'

interface Setting {
  onBack: () => void
}

const Setting = ({ onBack }: Setting) => {
  const [global, setGlobal] = useState<boolean>(false)

  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getGlobal' }, (response) => {
      if (response) {
        const { isGlobal } = response.state
        setGlobal(isGlobal)
      }
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
          if (tab.id) {
            let message = {
              info: 'changeMode',
            }
            chrome.tabs.sendMessage(tab.id, message, (res) => {})
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
            <span>Global</span>
          </div>
          <Switch value={global} onChange={switchOnChange} className={styles.switch} />
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <FaHeart size={20} className={styles.icon} />
            <span>Rate</span>
          </div>
          <span>
            <FaAngleRight size={20} className={styles.rightIcon} />
          </span>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <BsBugFill size={20} className={styles.icon} />
            <span>Feedback</span>
          </div>
          <span>
            <FaAngleRight size={20} className={styles.rightIcon} />
          </span>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <FaAngellist size={20} className={styles.icon} />
            <span>Colora</span>
          </div>
          <span>
            <FaAngleRight size={20} className={styles.rightIcon} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Setting
