import { useState } from 'react'
import styles from './popup.module.scss'
import Button from '@/components/Button'

function App() {
  const clickHandler = (type: string) => {
    chrome.runtime.sendMessage({ action: type }, (response) => {
      console.log(response)
      window.close()
    })
  }
  return (
    <main className={styles.main}>
      <Button
        onClick={() => {
          clickHandler('captureVisibleArea')
        }}
      >
        Snap
      </Button>

      <Button
        onClick={() => {
          clickHandler('captureSelectArea')
        }}
      >
        Snap2
      </Button>
    </main>
  )
}

export default App
