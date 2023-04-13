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
    // value: 'linear-gradient(60deg, rgb(255, 110, 196) 0%, rgb(120, 115, 245) 100%)',
    // value: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)'
    // #12d8fa
    // value: '#ee609c'
    value: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)'
  },
  {
    id: 5,
    // value: 'linear-gradient(-225deg, rgb(171, 236, 214) 0%, rgb(251, 237, 150) 100%)',
    // value: 'linear-gradient(to right, #f12711, #f5af19)'
    // value: '#159957'
    value: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)'
  },
  {
    id: 6,
    // value:
    //   'linear-gradient(45deg, rgb(255, 154, 158) 0%, rgb(250, 208, 196) 99%, rgb(250, 208, 196) 100%)',
    // value: '#6a82fb'
    value: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)'
  },
  {
    id: 7,
    // value: 'linear-gradient(45deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)',
    // value: '#12d8fa'
    value: 'linear-gradient(to right, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)'
  },
  {
    id: 8,
    // value: 'linear-gradient(to right, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
    value: 'linear-gradient(to top, #9be15d 0%, #00e3ae 100%)'
  },
  {
    id: 9,
    value: 'linear-gradient(rgb(42, 245, 152) 0%, rgb(0, 158, 253) 100%)',
  },
  {
    id: 10,
    value: 'linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
  },
  {
    id: 11,
    value: 'linear-gradient(to top, #e14fad 0%, #f9d423 100%)',
  },
  {
    id: 12,
    value: 'linear-gradient(180deg, #52ACFF 12%, #FFE32C 50%, #62f215 100%)'
  },
  {
    id: 13,
    value: 'linear-gradient(315deg, #FFDEE9 0%, #B5FFFC 50%, #849dff 100%)'
  },
  {
    id: 14,
    value: 'linear-gradient(315deg, #3e00a0 0%, #dc17cc 33%, #ff003a 66%, #f7ff51 100%)'
    // value: 'linear-gradient(-225deg, rgb(35, 21, 87) 0%, rgb(68, 16, 122) 29%, rgb(255, 19, 97) 67%, rgb(255, 248, 0) 100%)',
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
