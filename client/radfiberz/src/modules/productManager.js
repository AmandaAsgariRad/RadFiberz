import { getToken } from "./authManager";

const baseUrl = "/api/Product";

export const getAllProducts = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const getProductById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
}
