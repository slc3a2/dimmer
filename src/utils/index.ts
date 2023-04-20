const getFileMimeType = (file: File) => {
  const map: Record<string, string> = {
    'FFD8FFE0': 'jpg',
    '89504E47': 'png',
    '47494638': 'gif',
    '52494646': 'webp',
  }

  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      try {
        // @ts-ignore
        let array = new Uint8Array(event.target.result)
        array = array.slice(0, 4)
        let arr = [...array]
        let key = arr.map((item) => item.toString(16).toUpperCase().padStart(2, '0')).join('')
        resolve(map[key])
      } catch (e) {
        reject(e)
      }
    }
  })
}

export { getFileMimeType }
