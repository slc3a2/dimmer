import { useState, useEffect } from 'react'
import cls from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import styles from './index.module.scss'

interface RadioItemProps {
  children: any
  className?: string
  onClick?: () => void
}

const id = uuidv4()

const RadioItem = (props: RadioItemProps) => {
  const clickHandler = () => {
    if (props.onClick) {
      props.onClick()
    }
  }
  // useEffect(() => {

  // })
  return (
    // <button
    //   className={cls(styles.radioItem, props.className)}
    //   onClick={() => {
    //     clickHandler()
    //   }}
    // >
    //   <span>{props.children}</span>
    // </button>
    <div
      className={cls(styles.radioItem, props.className)}
      onClick={() => {
        clickHandler()
      }}
    >
      <label htmlFor={id}>{props.children}</label>
      <input type="radio" id={id} />
    </div>
  )
}

export default RadioItem
