import React, { useState, useEffect, useRef, useMemo } from 'react'
import cls from 'classnames'
import styles from './index.module.scss'

interface SwitchProps {
  value: boolean
  onChange?: (v: boolean) => void
  className?: string
}

const Switch = ({ onChange, className, value }: SwitchProps) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(value)
  }, [value])

  const onClick = () => {
    const t = !checked
    setChecked(t)
    if (onChange) {
      onChange(t)
    }
  }

  return (
    <div className={cls(styles.switchContainer, className)}>
      <div className={styles['toggle-switch']}>
        <input
          className={styles['toggle-input']}
          id="toggle"
          type="checkbox"
          checked={checked}
          onChange={onClick}
        />
        <label className={styles['toggle-label']} htmlFor="toggle"></label>
      </div>
    </div>
  )
}

export default Switch
