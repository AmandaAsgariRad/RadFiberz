import { getCartByUserId } from "../../modules/cartManager";
import { useEffect, useState } from "react";
import { getAllColors, getAllProductColors } from "../../modules/productManager";
import { updateCart } from "../../modules/cartManager";
import { deleteByProductColorId } from "../../modules/cartManager";
import { Card, CardBody, CardTitle, CardSubtitle, Container, CardText, Button, Row, Col, CardImg } from 'reactstrap';


export default function Cart() {
    const [cart, setCart] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [userId, setUserId] = useState(0);
    const [colors, setColors] = useState([]);


    const user = JSON.parse(localStorage.getItem("user"));
    const userProfileId = user.id;

    useEffect(() => {
        setUserId(userProfileId);

        getCartByUserId(userProfileId).then(cart => {
            setCart(cart);

        });

        getAllColors().then(data => {
            setColors(data);
        });

        getAllProductColors(userProfileId).then(data => {
            setProductColor(data);
        });
    }, []);

    const handleDelete = (event, productColorId) => {
        event.stopPropagation();
        deleteByProductColorId(productColorId);
        window.alert("Item removed from cart");
        setCart(cart.filter((item) => item.productColorId !== productColorId));
    };


    const handleEditColor = (cartId, newProductColorId) => {
        const cartItem = cart.find((item) => item.id === cartId);

        if (cartItem?.productColorId !== newProductColorId) {
            if (window.confirm("Are you sure you want to update your cart?")) {
                const updatedCart = {
                    colorId: newProductColorId

                };

                updateCart(cartId, updatedCart).then((updatedCartItem) => {
                    const updatedCartItemWithColor = {
                        ...updatedCartItem,
                        productColor: colors.find(
                            (item) => item.id === newProductColorId
                        ),
                    };

                    setCart([
                        ...cart.filter((item) => item.id !== cartId),
                        updatedCartItemWithColor,
                    ]);
                    window.location.reload();
                });
            }
        }
    };
    // const handleEditColor = (cartId, newProductColorId) => {

    //     const cartItem = cart.find(item => item.id === cartId);

    //     // Check if the user selected a new color
    //     if (cartItem.productColorId !== newProductColorId) {
    //         // Show a confirmation dialog
    //         if (window.confirm("Are you sure you want to update your cart?")) {
    //             const updatedCart = {
    //                 id: cartId,
    //                 userId: userId,
    //                 productId: cartItem.product.id,
    //                 productColorId: newProductColorId,
    //                 productQuantity: cartItem.productQuantity,
    //                 productImage: cartItem.product.productImage,
    //             };

    //             updateCart(updatedCart).then(updatedCartItem => {
    //                 // Update the product color of the cart item in the state
    //                 const updatedCartItemWithColor = {
    //                     ...updatedCartItem,
    //                     productColor: colors.find(item => item.id === newProductColorId)
    //                 };
    //                 setCart([
    //                     ...cart.filter(item => item.id !== cartId),
    //                     updatedCartItemWithColor
    //                 ]);
    //             });
    //         }
    //     }
    // };


    // const handleEditColor = (cartId, newProductColorId) => {
    //     const cartItem = cart.find(item => item.id === cartId);
    //     const updatedCart = {
    //         id: cartId,
    //         userId: userId,
    //         productId: cartItem.product.id,
    //         productColorId: newProductColorId,
    //         quantity: cartItem.quantity
    //     };

    //     updateCart(updatedCart).then(updatedCartItem => {
    //         // Update the product color of the cart item in the state
    //         const updatedCartItemWithColor = {
    //             ...updatedCartItem,
    //             productColor: colors.find(item => item.id === newProductColorId)
    //         };
    //         setCart([
    //             ...cart.filter(item => item.id !== cartId),
    //             updatedCartItemWithColor
    //         ]);
    //     });
    // };


    return (
        <Container>
            <div>
                <h1 className="mt-5 mb-4 text-center">Shopping Cart</h1>
                <div className="mt-3 lead text-center">
                    <p>Total Price: ${cartTotalPrice.toFixed(2)}</p>
                    <p>Total Quantity: {cartTotalQuantity}</p>
                </div>
                <Button style={{ marginTop: '1rem' }} href="/checkout" color="primary" className="mr-2">Confirm Checkout</Button>
                <Row className="lead text-center" style={{ marginTop: '3rem' }}>
                    {cart.map(item => (
                        <Col key={`item--${item.id}`} sm={6} md={4} lg={3} style={{ marginBottom: '2rem' }}>
                            <Card style={{ marginTop: '2rem' }}>
                                <CardImg variant="top" src={item?.product?.productImage} alt={item?.product?.name} style={{ height: '300px', objectFit: 'cover' }} />
                                <CardBody>
                                    <CardTitle style={{ marginTop: '1rem' }}>{item?.product?.name}</CardTitle>
                                    <CardSubtitle style={{ marginTop: '1rem' }}>
                                        Color:&nbsp;
                                        {item?.product?.color?.name}
                                    </CardSubtitle>
                                    <CardText style={{ marginTop: '1rem' }}>
                                        Price:
                                        ${item?.product?.price?.toFixed(2)}
                                    </CardText>
                                    <Button style={{ marginBottom: '1rem' }} color="primary" className="mr-2" onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(event, item?.productColorId);
                                    }}>
                                        Remove</Button>
                                    <select className="form-control d-inline-block w-auto" value={item?.productColor?.id || ""}
                                        onChange={(event) => {
                                            handleEditColor(item?.productColorId, parseInt(event.target.value))
                                        }}>
                                        <option value="">Edit Color</option>
                                        {colors.map(color => (
                                            <option key={color.id} value={color.id}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>
        </Container>
    );
}
{/* <Card style={{ marginTop: '2rem' }} onClick={() => navigateToProductDetails(item.product.id)}></Card> */ }

// const navigateToProductDetails = (id) => {
//     const item = cart.find(item => item.product.id === id);
//     if (item.product.isJewelry === true) {
//         window.location.href = `/jewelry/${id}`;
//     } else {
//         window.location.href = `/macrame/${id}`;
//     }
// };





//     //render using cart.map
//     //add buttons to delete items from cart
//     //create handleDelete function that performs a cascade delete of cart and productColor
//     //create a button to edit color of item in cart (edit productColor)


// .then(() => {
//     setCart(prevCart => {
//         const updatedCart = prevCart.map(item => {
//             if (item.productColor && item.productColor.id === productColorId) {
//                 // If the item's product color ID matches the deleted product color's ID, reduce the quantity by 1
//                 return {
//                     ...item,
//                     quantity: item.quantity - 1
//                 };
//             } else {
//                 // Otherwise, return the original item
//                 return item;
//             }
//         });
//         // Remove any items with a quantity of 0 from the cart
//         const filteredCart = updatedCart.filter(item => item.quantity > 0);
//         setCartTotalQuantity(
//             filteredCart.reduce((total, item) => total + item.quantity, 0)
//         );
//         return filteredCart;
//     });
// });
