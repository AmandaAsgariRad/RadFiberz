import { getToken } from "./authManager";

const baseUrl = "/api/UserProfile";

export const getByUserId = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}