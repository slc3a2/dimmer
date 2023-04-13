import { useRef, useState, useEffect } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'
import { LIST, PickerItem } from './constant'

interface PickerProps {
  onChange: (key: PickerItem) => void
}

const Picker = (props: PickerProps) => {
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState(LIST)
  const [current, setCurrent] = useState(LIST[6].value)
  const pickerRef = useRef(null)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const itemClickHandler = (item: PickerItem, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onChange(item)
    setCurrent(item.value)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const isItem = (e.target as HTMLElement)?.classList.contains('picker-item')
      if (pickerRef.current && visible && !isItem) {
        setVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [pickerRef.current, visible])

  return (
    <div className={styles.wrap} ref={pickerRef}>
      {/* <Button onClick={() => toggleVisible()}>
        <div className={styles.currentColor}></div>
      </Button> */}
      <div className={styles.switch} onClick={() => toggleVisible()}>
        <div className={styles.currentColor} style={{background: `${current}`}}></div>
      </div>
      <div className={cls(styles.list, visible ? styles.visible : null)}>
        {list.map((item) => {
          return (
            <div
              className={cls(
                styles.item,
                item.id === 0 ? styles.transparent : '',
                current === item.value ? styles.current : '',
                'picker-item'
              )}
              style={{ background: `${item.id !== 0 && item.value}` }}
              key={item.id}
              onClick={(e) => {
                itemClickHandler(item, e)
              }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default Picker
export { LIST }
export type { PickerItem }
