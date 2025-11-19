import { API_ENDPOINTS } from "./endpoints";

export const fetchLogin = async(email, password) => {
    const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    return {ok: response.ok, ...data};

}

export const fetchRegister = async(email, password) => {
    const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    return {ok: response.ok, ...data}
}