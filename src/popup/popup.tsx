import { useState, useEffect } from 'react'
import styles from './popup.module.scss'
import Button from '@/components/Button'
import { PiSelectionAllFill } from 'react-icons/pi'
import { BiScreenshot } from 'react-icons/bi'
import { RiUploadCloudFill } from 'react-icons/ri'

function App() {
  const [selectedAreaDisable, setSelectedAreaDisable] = useState(false)
  const clickHandler = (type: string) => {
    chrome.runtime.sendMessage({ action: type }, (response) => {
      console.log(response)
      window.close()
    })
  }

  const checkCurrentPageCanInject = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const url = tabs[0]?.url
        if (url) {
          const isInternalPage = ['chrome://', 'https://chrome.google.com/webstore']
          for (let i = 0, length = isInternalPage.length; i < length; i++) {
            const item = isInternalPage[i]
            if (url.startsWith(item)) {
              setSelectedAreaDisable(true)
              break
            }
          }
        }
      },
    )
  }

  const openUploaderHandler = () => {
    window.open(`${window.location.origin}/options.html`)
  }
  useEffect(() => {
    checkCurrentPageCanInject()
  }, [])

  return (
    <main className={styles.main}>
      <Button
        onClick={() => {
          clickHandler('captureVisibleArea')
        }}
      >
        <div className={styles.content}>
          <PiSelectionAllFill size={20} />
          <span>Visible Area</span>
        </div>
      </Button>

      <Button
        disabled={selectedAreaDisable}
        onClick={() => {
          clickHandler('captureSelectArea')
        }}
      >
        <div className={styles.content}>
          <BiScreenshot size={20} />
          <span>Selected Area</span>
        </div>
      </Button>

      <Button
        onClick={() => {
          openUploaderHandler()
        }}
      >
        <div className={styles.content}>
          <RiUploadCloudFill size={20} />
          <span>Upload & Edit</span>
        </div>
      </Button>
    </main>
  )
}

export default App
