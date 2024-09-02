import { useState, useEffect } from 'react'
import styles from './popup.module.scss'
import Button from '@/components/Button'

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
        Visible Area
      </Button>

      <Button
        disabled={selectedAreaDisable}
        onClick={() => {
          clickHandler('captureSelectArea')
        }}
      >
        Selected Area
      </Button>

      <Button
        onClick={() => {
          openUploaderHandler()
        }}
      >
        Upload and Edit
      </Button>
    </main>
  )
}

export default App
