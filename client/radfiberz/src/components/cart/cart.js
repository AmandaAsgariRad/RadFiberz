import { getCartByUserId } from "../../modules/cartManager";
import { useEffect, useState } from "react";


export default function Cart() {
    const [cart, setCart] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [userId, setUserId] = useState(0);

    const user = JSON.parse(localStorage.getItem("user"));
    const userProfileId = user.id;




    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userProfileId = user.id;
        setUserId(userProfileId);

        getCartByUserId(userProfileId).then(cart => {
            setCart(cart)
            setCartTotalQuantity(cart.reduce((total, item) => total + item.quantity, 0));
            setCartTotalPrice(cart.reduce((total, item) => total + (item.quantity * item.product.price), 0));
        })
    }, []);








    return (
        <h1>
            Shopping Cart
        </h1>
    );
}