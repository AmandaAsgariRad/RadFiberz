import React, { useState, useEffect } from 'react';
import { getAllFavoritesByUserId } from '../../modules/favoriteManager';
import { Card, CardImg, CardBody, CardTitle, Row, Col, Container } from 'reactstrap';
import { Button } from 'react-bootstrap';



export default function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const [jewelrys, setJewelry] = useState([]);
    const [macrames, setMacrames] = useState([]);
    const [userId, setUserId] = useState(0);

    const user = JSON.parse(localStorage.getItem("user"));
    const userProfileId = user.id;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userProfileId = user.id;
        setUserId(userProfileId);

        getAllFavoritesByUserId(userProfileId).then(data => {
            setFavorites(data);
            const macrameProducts = data.filter(favorite => favorite.product.isMacrame === true);
            setMacrames(macrameProducts);
            const jewelryProducts = data.filter(favorite => favorite.product.isJewelry === true);
            setJewelry(jewelryProducts);
        });
    }, []);

    const navigateToMacrameDetails = (id) => {
        window.location.href = `/macrame/${id}`
    }

    const navigateToJewelryDetails = (id) => {
        window.location.href = `/jewelry/${id}`
    }

    // const handleRemoveFromFavorites = (id) => {
    //     if (window.confirm("Are you sure you want to remove this item from your favorites?")) {

    //     }

    return (
        <Container>
            <div id='favorites-header'>
                <h1>Favorites</h1>
            </div>
            <div id='favorites-container'>
                <h3 style={{ marginTop: '5rem' }}>Macrame</h3>
                <Row style={{ marginTop: '3rem' }}>
                    {macrames.map(macrame => (
                        <Col sm={6} md={4} lg={3} key={macrame.id}>
                            <Card onClick={() => navigateToMacrameDetails(macrame.product.id)}>
                                <CardImg variant="top" src={macrame.product.productImage} alt={macrame.product.name} />
                                <CardBody>
                                    <CardTitle>{macrame.product.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <h3 style={{ marginTop: '5rem' }}>Jewelry</h3>
                <Row style={{ marginTop: '3rem' }}>
                    {jewelrys.map(jewelry => (
                        <Col sm={6} md={4} lg={3} key={jewelry.id}>
                            <Card onClick={() => navigateToJewelryDetails(jewelry.product.id)}>
                                <CardImg variant="top" src={jewelry.product.productImage} alt={jewelry.product.name} />
                                <CardBody>
                                    <CardTitle>{jewelry.product.name}</CardTitle>
                                    {/* <Button onClick={() => handleRemoveFromFavorites(jewelry.product.id)}>Remove from Favorites</Button> */}
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}
