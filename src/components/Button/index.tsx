import { useState, useEffect, ReactNode } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface ButtonProps {
  children: string | ReactNode
  className?: string
  loading?: boolean
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
      className={cls(styles.button, props.className, props.loading ? styles.disabled : '')}
      onClick={() => {
        clickHandler()
      }}
    >
      {props.loading ? (
        <span className={styles.loading} style={{ opacity: `${props.loading ? 1 : 0}` }}></span>
      ) : null}
      <span className={cls(styles.content, props.loading ? styles.hidden : '')}>
        {props.children}
      </span>
    </button>
  )
}

export default Button
