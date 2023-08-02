import React, { useState, useEffect } from 'react';
import { getAllFavoritesByUserId } from '../../modules/favoriteManager';
import { Card, CardImg, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Navigate } from 'react-router';


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

    // const navigateToProductDetails = (id) => {
    //     Navigate(`/macrame/${id}`) || Navigate(`/jewelry/${id}`)
    // }

    // return (
    //     <section>
    //         <h2>Macrame</h2>
    //         {macrames.map(macrame => (
    //             <div key={macrame.id}>
    //                 <img src={macrame.productImage} alt={macrame.name} onClick={() => navigateToProductDetails(macrame.id)} />
    //                 <p>{macrame.name}</p>
    //             </div>
    //         ))}
    //         <h2>Jewelry</h2>
    //         {jewelrys.map(jewelry => (
    //             <div key={jewelry.id}>
    //                 <img src={jewelry.productImage} alt={jewelry.name} onClick={() => navigateToProductDetails(jewelry.id)} />
    //                 <p>{jewelry.name}</p>
    //             </div>
    //         ))}
    //     </section>
    // );

    return (
        <div>
            <h1>Macrame</h1>
            <Row>
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
            <h1>Jewelry</h1>
            <Row>
                {jewelrys.map(jewelry => (
                    <Col sm={6} md={4} lg={3} key={jewelry.id}>
                        <Card onClick={() => navigateToJewelryDetails(jewelry.product.id)}>
                            <CardImg variant="top" src={jewelry.product.productImage} alt={jewelry.product.name} />
                            <CardBody>
                                <CardTitle>{jewelry.product.name}</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}