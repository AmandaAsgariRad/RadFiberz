const baseUrl = "/api/Cart";

export const getCartByUserId = (userId) => {
    return fetch(`${baseUrl}/details/${userId}`, {
        method: "GET",
    }).then((res) => res.json());
}

export const deleteAllByUserId = (userId) => {
    return fetch(`${baseUrl}/delete/${userId}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export const deleteByProductId = (productId) => {
    return fetch(`${baseUrl}/deleteItem/${productId}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export const addItemToCart = (cart) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    });
}

