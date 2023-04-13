import { useState, useEffect } from 'react'
import styles from './index.module.scss'

interface ButtonProps {
  children: any
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const clickHandler = () => {
    if (props.onClick) {
      props.onClick()
    }
  }
  return (
    <button
      className={styles.button}
      onClick={() => {
        clickHandler()
      }}
    >
      <span>{props.children}</span>
    </button>
  )
}

export default Button
