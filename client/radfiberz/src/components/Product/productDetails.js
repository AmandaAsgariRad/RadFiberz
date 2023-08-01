import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../modules/productManager';
import { Card, CardSubtitle, CardText, CardTitle, CardBody } from 'reactstrap';
import { Col, Row, CardImg } from 'react-bootstrap';
import { getAllColors } from '../../modules/productManager';


export default function ProductDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [colors, setColors] = useState([])
    const [products, setProducts] = useState([])
    const [cartProduct, setCartProduct] = useState({
        productId: 0,
        quantity: 1,
        userId: 0,
        productColorId: 0,
        orderComplete: false
    })
    const [productColor, setProductColor] = useState({
        productId: 0,
        colorId: 0,
        userId: 0
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


    const handleColor = (event) => {
        const newColor = { ...productColor }
        newColor.colorId = parseInt(event.target.value)
        setProductColor(newColor)
    }

    const handleAddToCart = () => {

    }


    if (!item) {
        return <p>Loading...</p>;
    }


    return (
        <Card className="item-card">
            <Row>
                <Col xs={12} md={4}>
                    <CardImg variant="top" src={item.productImage} alt={item.name} />
                </Col>
                <Col xs={12} md={8}>
                    <CardBody className="details">
                        <CardTitle>{item.name}</CardTitle>
                        <CardSubtitle>{item.description}</CardSubtitle>
                        <CardText>Price: {item.price}</CardText>
                        {item.isMacrame && (
                            <div>
                                <label for="color">Choose a color:</label>
                                <select className="form-select" id="colorDropdown" onChange={handleColor}>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.name}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
}

