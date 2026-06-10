export type OrderItem = {
  cartItemId: string;
  baseItem: {
    _id: string;
    name: string;
  };
  options?: {
    side?: string;
    drink?: string;
    sauce?: string;
  };
  quantity: number;
  totalPrice: number;
};

export type Order = {
  _id: string;
  email: string;
  cart: OrderItem[];
  total: number;
  createdAt: string | Date;
};