import { useState } from 'react'
import styles from './popup.module.scss'
import Button from '@/components/Button'

function App() {
  const clickHandler = () => {
    chrome.runtime.sendMessage({ action: 'captureVisibleArea' }, (response) => {
      console.log(response)
    })
  }
  return (
    <main className={styles.main}>
      <Button
        onClick={() => {
          clickHandler()
        }}
      >
        Snap
      </Button>
    </main>
  )
}

export default App
