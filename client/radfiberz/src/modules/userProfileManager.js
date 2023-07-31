import { getToken } from "./authManager";

const baseUrl = "/api/UserProfile";

export const getUserDetailsById = (userId) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/details/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}