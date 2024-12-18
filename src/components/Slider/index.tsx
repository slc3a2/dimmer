import React, { useState, useEffect, useRef, useMemo } from 'react'
import cls from 'classnames'
import styles from './index.module.scss'

const throttle = (fun: any, delay: number) => {
  let prev = Date.now()
  return function (...args: any) {
    let now = Date.now()
    if (now - prev >= delay) {
      // @ts-ignore
      fun.apply(this, args)
      prev = Date.now()
    }
  }
}

const useThrottle = (fn: any, delay: number) => {
  return throttle(fn, delay)
}

interface SliderProps {
  onChange?: (v: number) => void
  max?: number
  min?: number
  step?: number
  defaultValue?: number
  visibleBar?: boolean
  className?: string
  value?: number
}

const Slider = ({
  onChange = () => {},
  max = 100,
  min = 0,
  step = 1,
  defaultValue,
  visibleBar = false,
  className = '',
  value: _value, // 是否为受控组件
}: SliderProps) => {
  const [value, setValue] = useState(_value ? _value : defaultValue || 0)
  const [isDragging, setIsDragging] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const track = useRef(null)

  useEffect(() => {
    if (!isFirstRender) {
      onChange(value)
    }
  }, [value])

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    if (_value !== undefined) {
      setValue(_value)
    }
  }, [_value])

  useEffect(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp as (...args: any) => void)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp as (...args: any) => void)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp as (...args: any) => void)
    }
  }, [track.current, isDragging])

  const process = useMemo(() => {
    const t = (value / max) * 100
    return Math.round(t)
  }, [value, max])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const handleMouseMove = useThrottle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      const trackEle = track.current
      if (trackEle) {
        const rect = (trackEle as HTMLElement).getBoundingClientRect()
        const x =
          Math.round((((e.clientX - rect.left) / rect.width) * (max - min)) / step) * step + min
        if (x < 0) {
          return
        }
        if (rect.left + rect.width <= e.clientX) {
          return
        }
        if (_value) {
          onChange(x)
        } else {
          setValue(x)
        }
      }
    }
  }, 0)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const trackEle = track.current
    if (trackEle) {
      const rect = (trackEle as HTMLElement).getBoundingClientRect()
      const x =
        Math.round((((e.clientX - rect.left) / rect.width) * (max - min)) / step) * step + min
      if (x < min) {
        return
      }
      if (rect.left + rect.width <= e.clientX) {
        return
      }
      if (_value) {
        onChange(x)
      } else {
        setValue(x)
      }
    }
  }

  return (
    <div
      className={cls(styles.sliderContainer, className)}
      onClick={(e) => {
        handleClick(e)
      }}
    >
      <div className={styles.sliderTrack} ref={track}>
        <div className={styles.process} style={{ width: `${process}%` }}></div>
        <div
          className={cls(styles.sliderThumb, isDragging ? styles.press : '')}
          style={{ left: `${process}%` }}
          onMouseDown={(e) => {
            handleMouseDown(e)
          }}
          onMouseUp={(e) => {
            handleMouseUp(e)
          }}
        />
        <p
          className={cls(
            styles.value,
            isDragging ? styles.press : '',
            visibleBar ? styles.visible : '',
          )}
          style={{ left: `${process}%` }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

export default Slider
