const LIST: PickerList = [
  {
    id: 'i6p5m',
    value: 'rgba(0,0,0,0)',
  },
  {
    id: '1kz8h',
    value: '#fff',
  },
  {
    id: 's9ej1',
    value: '#000',
  },
  {
    id: 'nji3e',
    value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  // ---- 1st row
  {
    id: 'ezmiz',
    value: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
  },
  {
    id: 'krffl',
    value: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',
  },
  {
    id: 'a1bsm',
    value: 'linear-gradient(315deg, #FFDEE9 0%, #B5FFFC 50%, #849dff 100%)',
  },
  {
    id: 'uryfn',
    value: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
  },
  // ---- 2nd row
  {
    id: 'a25jc',
    value: 'linear-gradient(to right, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
  },
  {
    id: 'soesp',
    value: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
  },
  {
    id: 'pwv2f',
    value: 'linear-gradient(to top, #e14fad 0%, #f9d423 100%)',
  },
  {
    id: '7tp56',
    value: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
  },
  // ---- 3rd row
  {
    id: 'ztu5w',
    value:
      'linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
  },
  {
    id: 'ra21k',
    value: 'linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%)',
  },
  {
    id: 'l9r63',
    value: 'linear-gradient(315deg, #3e00a0 0%, #dc17cc 33%, #ff003a 66%, #f7ff51 100%)',
  },
  {
    id: '1d6zt',
    value: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
  },
  // ---- 4th row
  {
    id: 'isyt5',
    value: 'linear-gradient(60deg, #96deda 0%, #50c9c3 100%)',
  },
  {
    id: '6aqjp',
    value: 'linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
  },
  {
    id: '8fvbh',
    value: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
  },
  {
    id: '2gssz',
    value: 'linear-gradient(to top, #e8198b 0%, #c7eafd 100%)',
  },
  // ---- 5th row
]

interface PickerItem {
  id: string
  value: string
}

type PickerList = PickerItem[]

export { LIST }
export type { PickerItem, PickerList }
