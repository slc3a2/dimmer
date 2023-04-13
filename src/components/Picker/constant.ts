const LIST: PickerList = [
  {
    id: 0,
    value: 'rgba(0,0,0,0)',
  },
  {
    id: 1,
    value: '#fff',
  },
  {
    id: 2,
    value: '#333',
  },
  {
    id: 3,
    value: '#666',
  },
  {
    id: 4,
    value: 'linear-gradient(rgb(42, 245, 152) 0%, rgb(0, 158, 253) 100%)',
  },
  {
    id: 5,
    value: 'linear-gradient(-225deg, rgb(171, 236, 214) 0%, rgb(251, 237, 150) 100%)',
  },
  {
    id: 6,
    value:
      'linear-gradient(45deg, rgb(255, 154, 158) 0%, rgb(250, 208, 196) 99%, rgb(250, 208, 196) 100%)',
  },
  {
    id: 7,
    value: 'linear-gradient(45deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)',
  },
  {
    id: 8,
    value: 'linear-gradient(to right, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
  },
  {
    id: 9,
    value: 'linear-gradient(60deg, rgb(255, 110, 196) 0%, rgb(120, 115, 245) 100%)',
  },
]

interface PickerItem {
  id: number
  value: string
}

type PickerList = PickerItem[]

export { LIST }
export type { PickerItem, PickerList }
