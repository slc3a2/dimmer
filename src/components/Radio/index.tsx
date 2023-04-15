import { useState } from 'react'
import cls from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import Item from './components/item/index'
import { RadioList, RadioItem } from './types'
import styles from './index.module.scss'

interface RadioProps {
  list: RadioList,
  onChange: (item: RadioItem) => void
}

const Radio = (props: RadioProps) => {
  const [list, setList] = useState<RadioList>(props.list || [])
  const [current, setCurrent] = useState<string>(props.list[0].id)
  const clickHandler = (item: RadioItem) => {
    setCurrent(item.id)
    if (props.onChange) {
      props.onChange(item)
    }
  }
  return (
    <div className={styles.radioWrap}>
      {list.map((item) => {
        return (
          <Item
            className={cls(
              styles.item,
              current === item.id ? styles.current : ''
            )}
            id={item.id}
            key={item.label}
            onClick={() => {
              clickHandler(item)
            }}
          >
            {item.label}
          </Item>
        )
      })}
    </div>
  )
}

export default Radio
export type { RadioItem }
