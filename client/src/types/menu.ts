export type MenuItem = {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export type MenuState = {
  entrees: MenuItem[]
  sides: MenuItem[]
  drinks: MenuItem[]
  sauces: MenuItem[]
  loading: boolean
  error: string | null
}