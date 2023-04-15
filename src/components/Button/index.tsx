import { useState, useEffect } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface ButtonProps {
  children: any
  className?: string
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
      className={cls(styles.button, props.className)}
      onClick={() => {
        clickHandler()
      }}
    >
      <span>{props.children}</span>
    </button>
  )
}

export default Button
