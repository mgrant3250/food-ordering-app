import { API_URL } from "../api/endpoints";

export const getImageUrl = (path) => {
    if(!path) return ""
    return path.startsWith("http") ? path : `${API_URL}${path}`
}