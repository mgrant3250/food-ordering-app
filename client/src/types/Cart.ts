// export type CartItem = {
//   cartItemId?: string;
//   quantity?: number;
//   baseItem?: {
//     _id: string;
//     name: string;
// };options?: {
//     side?: string;
//     sauce?: string;
//     drink?: string;
//   }
// };


export type CartOptions = {
  side?: string;
  drink?: string;
  sauce?: string;
};

export type BaseItem = {
  _id: string;
  name: string;
};

export type CartItem = {
  cartItemId: string
  totalPrice: number
  quantity: number
  baseItem: BaseItem;

  options?: CartOptions;
}

export type CartState = {
  items: CartItem[];
  total: number;
}