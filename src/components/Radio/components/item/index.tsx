import { useState, useEffect } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

interface RadioItemProps {
  children: any
  id: string
  className?: string
  onClick?: () => void
}


const RadioItem = (props: RadioItemProps) => {
  const clickHandler = () => {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <div
      className={cls(styles.radioItem, props.className)}
      onClick={() => {
        clickHandler()
      }}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <input type="radio" id={props.id} />
    </div>
  )
}

export default RadioItem
