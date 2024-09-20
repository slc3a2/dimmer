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
    value: '#999',
  },
  {
    id: 3,
    value: '#333',
  },
  {
    id: 4,
    value: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
  },
  {
    id: 5,
    value: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
  },
  {
    id: 6,
    value: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',
  },
  {
    id: 7,
    value: 'linear-gradient(to right, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
  },
  {
    id: 8,
    value: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
  },
  {
    id: 9,
    value: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
  },
  {
    id: 10,
    value:
      'linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
  },
  {
    id: 11,
    value: 'linear-gradient(to top, #e14fad 0%, #f9d423 100%)',
  },
  {
    id: 12,
    value: 'linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%)',
  },
  {
    id: 13,
    value: 'linear-gradient(315deg, #FFDEE9 0%, #B5FFFC 50%, #849dff 100%)',
  },
  {
    id: 14,
    value: 'linear-gradient(315deg, #3e00a0 0%, #dc17cc 33%, #ff003a 66%, #f7ff51 100%)',
  },
  {
    id: 15,
    value: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
  },
]

interface PickerItem {
  id: number
  value: string
}

type PickerList = PickerItem[]

export { LIST }
export type { PickerItem, PickerList }
