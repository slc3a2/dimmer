interface RadioItem {
  id: string
  label: string
  name?: string
}

type RadioList = RadioItem[]

export type { RadioItem, RadioList }
