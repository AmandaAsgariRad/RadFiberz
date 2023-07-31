const baseUrl = "/api/Product";

export const getAllProducts = () => {
    return fetch(baseUrl, {
        method: "GET",
    }).then((res) => res.json());
};

export const getProductById = (id) => {
    return fetch(`${baseUrl}/details/${id}`, {
        method: "GET",
    }).then((res) => res.json());
};
