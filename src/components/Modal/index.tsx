import React from 'react'
import cls from 'classnames'
import { IoMdClose } from 'react-icons/io'
import styles from './index.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  overlayClass?: string
  modalClass?: string
  closeOnClickModal?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayClass = '',
  modalClass = '',
  closeOnClickModal = true,
}) => {
  if (!isOpen) return null

  const close = () => {
    onClose()
  }

  const overlayOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnClickModal) {
      close()
    }
  }

  return (
    <div className={cls(styles.overlay, overlayClass)} onClick={overlayOnClick}>
      <div className={cls(styles.modal, modalClass)}>
        <div className={styles.closeButton} onClick={onClose}>
          <IoMdClose size={20} onClick={close} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
