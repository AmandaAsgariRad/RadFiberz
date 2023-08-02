const baseUrl = "/api/Favorite";

export const getAllFavoritesByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("Favorites data:", data);
            return data;
        });
};
