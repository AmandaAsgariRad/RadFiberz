import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { addProductColor, getAllProducts } from '../../modules/productManager';
import { Card, CardSubtitle, CardText, CardTitle, CardBody } from 'reactstrap';
import { Col, Row, CardImg, Button } from 'react-bootstrap';
import { getAllColors } from '../../modules/productManager';
import { addItemToCart } from '../../modules/cartManager';
import { addFavorite } from '../../modules/favoriteManager';


export default function ProductDetails() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userProfileId = user.id;

    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [colors, setColors] = useState([])
    const [products, setProducts] = useState([])
    const [cartProduct, setCartProduct] = useState({
        productId: parseInt(id),
        productQuantity: 1,
        userId: userProfileId,
        productColorId: 0,
        orderComplete: false
    })
    const [productColor, setProductColor] = useState({
        productId: parseInt(id),
        colorId: 0,
        userId: userProfileId
    })
    const [favorite, setFavorite] = useState({
        productId: parseInt(id),
        userId: userProfileId
    })

    useEffect(() => {
        getAllProducts().then(data => {
            setProducts(data)
        })
        getAllColors().then(data => {
            setColors(data)
        })
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            const product = products.find(product => product.id === parseInt(id))
            setItem(product)
        }
    }, [products])


    const handleColor = (colorId) => {
        const newColor = {
            productId: parseInt(id),
            colorId: parseInt(colorId),
            userId: userProfileId
        }
        setProductColor(newColor)
    }

    const handleRedirectToCart = () => {
        window.alert("Item added to cart!");
        Navigate("/cart");
    }

    const handleAddToCart = () => {
        addProductColor(productColor)
            .then((data) => {
                console.log(data)
                const tempCartProduct = { ...cartProduct };
                tempCartProduct.productColorId = data;
                setCartProduct(tempCartProduct);
                console.log(tempCartProduct)
                addItemToCart(tempCartProduct)
                handleRedirectToCart();
            })
    };



    const handleAddToFavorite = () => {
        addFavorite(favorite)
            .then(() => {
                window.location.href = '/favorite';
            })
            .catch(error => {
                console.error(error);
            });
    }


    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <Card className="item-card" style={{ marginTop: '10rem' }}>
            <Row className="justify-content-center align-items-center">
                <Col xs={12} md={4} className="text-center">
                    <CardImg variant="top" src={item.productImage} alt={item.name} />
                </Col>
                <Col xs={12} md={8}>
                    <CardBody className="details text-center text-md-start">
                        <CardTitle>{item.name}</CardTitle>
                        <CardSubtitle style={{ marginTop: '1rem' }}>{item.description}</CardSubtitle>
                        <CardText style={{ marginTop: '1rem' }}>Price: ${item.price}</CardText>
                        {item.isMacrame && (
                            <div>
                                <select className="form-select" onChange={(e) => handleColor(e.target.value)}>
                                    <option disabled selected>
                                        Choose a color
                                    </option>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <Button style={{ marginTop: '2rem' }} onClick={handleAddToCart}>Add to Cart</Button>
                        <Button style={{ marginTop: '2rem', marginLeft: '2rem' }} onClick={handleAddToFavorite}>Add to Favorite</Button>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
}

