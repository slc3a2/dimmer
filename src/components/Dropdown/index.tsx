import { useRef, useState, useEffect } from 'react'
import cls from 'classnames'

import Button from '@/components/Button'

import styles from './index.module.scss'

interface DropdownProps {
  list: listItem[]
  label: string | React.ReactElement
  className?: string
  onChange: (key: listItem) => void
}

interface listItem {
  name: string
  id: string
}

const Dropdown = (props: DropdownProps) => {
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState(props.list)
  const [label, setLabel] = useState(props.label)
  const [value, setValue] = useState('None')
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && visible) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef.current, visible])

  const itemClickHandler = (item: listItem) => {
    props.onChange(item)
    setValue(item.name)
  }

  return (
    <div ref={dropdownRef} className={cls(styles.wrap, props.className)}>
      <Button onClick={() => setVisible(!visible)}>{label || value}</Button>
      <ul className={cls(styles.list, visible ? styles.visible : null)}>
        {list.map((item) => {
          return (
            <li
              className={styles.item}
              key={item.id}
              onClick={() => {
                itemClickHandler(item)
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Dropdown
export type { listItem }
