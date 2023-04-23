import cls from 'classnames'

import styles from './index.module.scss'

interface loadingProps {
  visible?: boolean | undefined
  className?: string
}

const Loading = (props: loadingProps) => {
  return (
    <span
      className={cls(styles.loading, props.className)}
      style={{ opacity: `${props.visible ? 1 : 0}` }}
    />
  )
}

export default Loading
