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
  const pickerRef = useRef(null)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const itemClickHandler = (item: PickerItem) => {
    props.onChange(item)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && visible) {
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
        <div className={styles.currentColor}></div>
      </div>
      <div className={cls(styles.list, visible ? styles.visible : null)}>
        {list.map((item) => {
          return (
            <div
              className={styles.item}
              style={{ background: `${item.value}` }}
              key={item.id}
              onClick={() => {
                itemClickHandler(item)
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
