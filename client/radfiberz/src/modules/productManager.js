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

//crud productColor function
export const addProductColor = (productColor) => {
    return fetch("/api/ProductColor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productColor),
    });
};

export const getAllColors = () => {
    return fetch("/api/Color", {
        method: "GET",
    }).then((res) => res.json());
};

export const getAllProductColors = () => {
    return fetch("/api/ProductColor", {
        method: "GET",
    }).then((res) => res.json());
}
