import React, { useState, useEffect } from 'react';
import { getAllFavoritesByUserId } from '../../modules/favoriteManager';
import { Card, CardImg, CardBody, CardTitle, Row, Col, Container } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { deleteFavorite } from '../../modules/favoriteManager';


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


    const handleRemoveFromFavorites = (id) => {
        deleteFavorite(id);
        window.alert("Item removed from favorites");
        getAllFavoritesByUserId(userProfileId).then(data => {
            setFavorites(data);

        })

    };


    // const handleRemoveFromFavorites = (id) => {
    //     const confirmDelete = window.confirm("Are you sure you want to remove this item from your favorites?");
    //     if (confirmDelete) {
    //         deleteFavorite(id)
    //             .then(() => {
    //                 window.location.href = "/favorite";
    //             });
    //     } else {
    //         alert("There was an error removing this item from your favorites.");
    //     }
    // };



    return (

        <Container>
            <div id='favorites-header'>
                <h1 className="mt-5 mb-4 text-center">Favorites</h1>
            </div>
            <div className="lead text-center" id='favorites-container'>
                <h3 style={{ marginTop: '5rem' }}>Macrame</h3>
                <Row style={{ marginTop: '3rem' }}>
                    {macrames.map(macrame => (
                        <Col sm={6} md={4} lg={3} key={macrame.id} style={{ marginBottom: '2rem' }}>
                            <Card onClick={() => navigateToMacrameDetails(macrame.product.id)}>
                                <CardImg variant="top" src={macrame.product.productImage} alt={macrame.product.name} style={{ height: '300px', objectFit: 'cover' }} />
                                <CardBody>
                                    <CardTitle>{macrame.product.name}</CardTitle>
                                    <Button style={{ marginTop: '1rem' }} onClick={() => handleRemoveFromFavorites(macrame.product.id)}>Remove</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <h3 style={{ marginTop: '5rem' }}>Jewelry</h3>
                <Row style={{ marginTop: '3rem', paddingBottom: '10rem' }}>
                    {jewelrys.map(jewelry => (
                        <Col sm={6} md={4} lg={3} key={jewelry.id} style={{ marginBottom: '2rem' }}>
                            <Card onClick={() => navigateToJewelryDetails(jewelry.product.id)}>
                                <CardImg variant="top" src={jewelry.product.productImage} alt={jewelry.product.name} style={{ height: '300px', objectFit: 'cover' }} />
                                <CardBody>
                                    <CardTitle>{jewelry.product.name}</CardTitle>
                                    <Button style={{ marginTop: '1rem' }} onClick={() => handleRemoveFromFavorites(jewelry.product.id)}>Remove</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}
