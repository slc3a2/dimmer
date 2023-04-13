import { useRef, useState, useEffect } from 'react'
import cls from 'classnames'

import Button from '@/components/Button'

import styles from './index.module.scss'

interface DropdownProps {
  list: listItem[]
  onChange: (key: listItem) => void
}

interface listItem {
  name: string
  id: string
}

const Dropdown = (props: DropdownProps) => {
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState(props.list)
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
    <div ref={dropdownRef} className={styles.wrap}>
      <Button onClick={() => setVisible(!visible)}>{value}</Button>
      <ul className={cls(styles.list, visible ? styles.visible : null)}>
        <li
          className={styles.item}
          onClick={() => {
            itemClickHandler({
              name: 'None',
              id: '',
            })
          }}
        >
          None
        </li>
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
