import { getTotalItemCount } from "./cartUtils";

describe("getTotalItemCount", () => {
    it('gets total count of items in cart'), () => {
         const cart = {Fries: {price: 2.99, quantity: 2},
                       Hamburger: {price: 6.99, quantity: 5}}

        const total = getTotalItemCount(cart)

        expect(total).toEqual(7)
    }
})