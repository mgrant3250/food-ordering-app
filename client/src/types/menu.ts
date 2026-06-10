export type MenuType = "entree" | "side" | "drink" | "sauce"

export type MenuItem = {
  _id: string
  name: string
  description: string
  price: number
  type: MenuType
  imageUrl: string
}

export type MenuResponse = {
  entrees: MenuItem[];
  sides: MenuItem[];
  drinks: MenuItem[];
  sauces: MenuItem[];
};

export type MenuState = {
  entrees: MenuItem[]
  sides: MenuItem[]
  drinks: MenuItem[]
  sauces: MenuItem[]
  loading: boolean
  error: string | null
}

export type MenuByType = Record<MenuType, MenuItem[]>