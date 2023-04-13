import React, { useState, useEffect, useRef, useMemo } from 'react'
import cls from 'classnames'
import styles from './index.module.scss'

const throttle = (fun: any, delay: number) => {
  let prev = Date.now()
  return function (...args: any) {
    let now = Date.now()
    if (now - prev >= delay) {
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
}

const Slider = ({
  onChange,
  max = 100,
  min = 0,
  step = 1,
  defaultValue,
  visibleBar = false,
}: SliderProps) => {
  const [value, setValue] = useState(defaultValue || 0)
  const [isDragging, setIsDragging] = useState(false)
  const track = useRef(null)

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

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
    // e.preventDefault()
    // isDragging = true
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
        setValue(x)
      }
    }
  }, 0)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const trackEle = track.current
    if (trackEle) {
      const rect = (trackEle as HTMLElement).getBoundingClientRect()
      // const x = e.clientX - rect.left
      // const percent = (x / rect.width) * 100
      // setValue(Math.round(percent))
      const x =
        Math.round((((e.clientX - rect.left) / rect.width) * (max - min)) / step) * step + min
      if (x < 0) {
        return
      }
      if (rect.left + rect.width <= e.clientX) {
        return
      }
      setValue(x)
    }
  }

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.sliderTrack}
        ref={track}
        onClick={(e) => {
          handleClick(e)
        }}
      >
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
