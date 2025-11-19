import { API_ENDPOINTS } from "./endpoints";

export const postOrder = async(token, orderData) => {
    const response = await fetch(API_ENDPOINTS.order, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })

    return await response.json()

}