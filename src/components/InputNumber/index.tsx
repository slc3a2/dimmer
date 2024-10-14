import React, { useState, useEffect, useRef, useMemo } from 'react'
import cls from 'classnames'
import { FiPlus, FiMinus } from 'react-icons/fi'

import styles from './index.module.scss'

interface InputNumberProps {
  placeholder?: string
  onChange?: (value: number) => void
  defaultValue?: number
  className?: string
}

const InputNumber = ({ placeholder = '', onChange, defaultValue, className }: InputNumberProps) => {
  const [value, setValue] = useState<number | string>(defaultValue || 0)

  const extractNumberFromString = (str: string) => {
    let negativeSignCount = 0
    let result = ''
    for (let char of str) {
      if (/[\d-]/.test(char)) {
        if (char === '-' && negativeSignCount === 0 && result === '') {
          result += char
          negativeSignCount++
        } else if (/[\d]/.test(char)) {
          result += char
        } else {
          break
        }
      } else {
        break
      }
    }
    return result
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: newValue },
    } = e
    const result = extractNumberFromString(newValue)
    setValue(result)
  }

  const handlBlur = () => {
    const t = value === '-' ? 0 : Number(value)
    if (onChange) {
      onChange(t)
    }
  }

  const minusBtnOnClick = () => {
    const t = value === '-' ? 0 : Number(value)
    const result = t - 1
    setValue(result)
    if (onChange) {
      onChange(result)
    }
  }

  const plusBtnOnClick = () => {
    const t = value === '-' ? 0 : Number(value)
    const result = t + 1
    setValue(result)
    if (onChange) {
      onChange(result)
    }
  }

  return (
    <div className={cls(className, styles.inputNumberContainer)}>
      <div className={styles.wrapper}>
        <span className={cls(styles.minusButton, styles.btn)} onClick={minusBtnOnClick}>
          <FiMinus size={14} />
        </span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            handleChange(e)
          }}
          onBlur={handlBlur}
        />
        <span className={cls(styles.plusButton, styles.btn)} onClick={plusBtnOnClick}>
          <FiPlus size={14} />
        </span>
      </div>
    </div>
  )
}

export default InputNumber
