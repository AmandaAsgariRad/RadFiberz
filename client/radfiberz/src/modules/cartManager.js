const baseUrl = "/api/Cart";

export const getCartByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}`, {
        method: "GET",
    }).then((res) => res.json());
}

export const deleteAllByUserId = (userId) => {
    return fetch(`${baseUrl}/delete/${userId}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export const deleteByProductColorId = (productColorId) => {
    return fetch(`${baseUrl}/deleteItem/${productColorId}`, {
        method: "DELETE",
    })
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

export const updateCart = (id, cart) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    });
}

