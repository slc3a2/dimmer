import { useState, useEffect, ReactNode } from 'react'
import cls from 'classnames'

import Loading from '@/components/Loading'

import styles from './index.module.scss'

interface ButtonProps {
  children: string | ReactNode
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const clickHandler = () => {
    if (props.loading || props.disabled) return;
    if (props.onClick) {
      props.onClick()
    }
  }
  return (
    <button
      className={cls(styles.button, props.className, props.loading || props.disabled ? styles.disabled : '')}
      onClick={() => {
        clickHandler()
      }}
    >
      <Loading visible={props.loading} />
      <span className={cls(styles.content, props.loading ? styles.hidden : '')}>
        {props.children}
      </span>
    </button>
  )
}

export default Button
