export type ImageType = {
  code?: string
  image?: string
  images?: {
    svg: string
    png: string
  }
  suit?: string
  value?: string
}

export type ListUserType = {
  name: string
  coins: number
  user: boolean
  index: number
  status: boolean
  nameWL: string
  value: number
  statusMoney: string
  checkMoney: boolean
  images?: ImageType[]
}

export type CardType = {
  cards: ImageType[]
  deck_id?: string
  remaining?: number
  success?: boolean
}

