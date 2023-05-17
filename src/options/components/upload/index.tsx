import react, { useEffect, useState } from 'react'
import cls from 'classnames'

import styles from './index.module.scss'

import { getFileMimeType } from '@/utils'
import Loading from '@/components/Loading'

interface UploaderProps {
  onChange: (url: string) => void
}

const Uploader = (props: UploaderProps) => {
  const [loading, setLoading] = useState(false)
  const onDragOver = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const fileHandler = (file: FileList) => {
    if (loading) return
    const currentFile = file[0]
    if (!currentFile) return
    const fileSize = currentFile.size / (1024 * 1024)
    if (fileSize > 3) {
      alert('The file size cannot exceed 3M')
      return
    }
    getFileMimeType(currentFile)
      .then((res) => {
        if (['png', 'jpg', 'webp'].includes(res as string)) {
          setLoading(true)
          const reader = new FileReader()
          reader.readAsDataURL(file[0])
          reader.onload = () => {
            props.onChange(reader.result as string)
            setLoading(false)
          }
        } else {
          alert('Only supports PNG JPG WEBP format')
        }
      })
      .catch((e) => {
        console.log(e)
        alert('File type check error')
      })
  }

  const onDrop = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (loading) return
    if (e.dataTransfer) {
      const files = e.dataTransfer.files
      fileHandler(files)
    }
  }

  const onFileChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    if (loading || !e.target.files) return
    fileHandler(e.target.files)
  }

  const onPaste = (e: ClipboardEvent) => {
    if (loading || !e.clipboardData) return
    fileHandler(e.clipboardData.files)
  }

  useEffect(() => {
    document.addEventListener('drop', onDrop)
    document.addEventListener('dragover', onDragOver)
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('drop', onDrop)
      document.removeEventListener('dragover', onDragOver)
    }
  }, [])

  return (
    <section className={cls(styles.appContainer, loading ? styles.disabled : '')}>
      <label htmlFor="uploader">
        <div className={styles.main}>
          <Loading visible={loading} />
          <p className={cls(styles.infoBlock, loading ? '' : styles.visible)}>
            <span className={styles.info}>
              👋 Drop、Click、Paste「<span className={styles.key}>⌘</span> +{' '}
              <span className={styles.key}>V</span>」 to Upload
            </span>
            <br />
            <span className={styles.tips}>Support PNG JPG WEBP</span>
          </p>
        </div>
      </label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        id="uploader"
        onChange={(e) => {
          onFileChange(e)
        }}
      />
    </section>
  )
}

export default Uploader
