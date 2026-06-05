export type CartItem = {
  cartItemId?: string;
  quantity?: number;
  baseItem?: {
    _id: string;
    name: string;
};options?: {
    side?: string;
    sauce?: string;
    drink?: string;
  }
};