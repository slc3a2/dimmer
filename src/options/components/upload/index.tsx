import react, { useEffect, useState } from 'react'
import cls from 'classnames'
import styles from './index.module.scss'

interface UploaderProps {
  onChange: (url: string) => void
}

const Uploader = (props: UploaderProps) => {
  const [loading, setLoading] = useState(false)

  const onDragOver = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const fileHandler = (file: any) => {
    setLoading(true)
    if (loading) return
    const reader = new FileReader()
    reader.readAsDataURL(file[0])
    reader.onload = () => {
      props.onChange(reader.result as string)
    }
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
    if (loading) return
    fileHandler(e.target.files)
  }

  const onPaste = (e: any) => {
    if (loading) return
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
      <label htmlFor="upload">
        <div className={styles.main}>
          {loading ? (
            <span className={styles.loading} style={{ opacity: `${loading ? 1 : 0}` }}></span>
          ) : (
            <p>👋 Drop、Click、Paste to Upload </p>
          )}
        </div>
      </label>
      <input
        type="file"
        accept='image/png,image/jpeg,image/jpg,image/bmp,image/webp'
        id="upload"
        onChange={(e) => {
          onFileChange(e)
        }}
      />
    </section>
  )
}

export default Uploader
