import { useState } from 'react'
import cls from 'classnames'

// import Button from '../Button'
import Item from './components/item/index'
import { RadioList, RadioItem } from './types'
import styles from './index.module.scss'

const Radio = (props: { list: RadioList }) => {
  const [list, setList] = useState<RadioList>(props.list || [])
  const [current, setCurrent] = useState<number | string>('')
  console.log(props.list)
  const clickHandler = (item: RadioItem) => {
    console.log(item)
    setCurrent(item.id)
  }
  return (
    <div className={styles.radioWrap}>
      {list.map((item) => {
        return (
          <Item
            className={cls(styles.item, current === item.id ? styles.current : '')}
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
