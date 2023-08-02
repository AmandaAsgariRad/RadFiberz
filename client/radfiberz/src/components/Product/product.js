import { useEffect, useState } from "react"
import { getAllProducts } from "../../modules/productManager"
import { Navigate } from "react-router"
import { Card, Col, Row } from "react-bootstrap"
import { CardBody, CardImg, CardTitle } from "reactstrap"

export default function Macrame() {
    const [products, setProducts] = useState([])
    const [macrames, setMacrames] = useState([])
    const [jewelrys, setJewelry] = useState([])

    useEffect(() => {
        getAllProducts().then(data => {
            setProducts(data)
        })
    }, [])

    useEffect(() => {
        const macrameProducts = products.filter(product => product.isMacrame === true)
        setMacrames(macrameProducts)
    }, [products])

    useEffect(() => {
        const jewelryProducts = products.filter(product => product.isJewelry === true)
        setJewelry(jewelryProducts)
    }, [products])

    const navigateToProductDetails = (id) => {
        Navigate(`/macrame/${id}`) || Navigate(`/jewelry/${id}`)
    }


    return (
        <div>
            <h1>Macrame</h1>
            <Row>
                {products.filter(product => product.category === 'macrame').map(macrame => (
                    <Col sm={6} md={4} lg={3} key={macrame.id}>
                        <Card onClick={() => navigateToProductDetails(macrame.id)}>
                            <CardImg variant="top" src={macrame.imageUrl} alt={macrame.name} />
                            <CardBody>
                                <CardTitle>{macrame.name}</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h1>Jewelry</h1>
            <Row>
                {products.filter(product => product.category === 'jewelry').map(jewelry => (
                    <Col sm={6} md={4} lg={3} key={jewelry.id}>
                        <Card onClick={() => navigateToProductDetails(jewelry.id)}>
                            <CardImg variant="top" src={jewelry.productImage} alt={jewelry.name} />
                            <CardBody>
                                <CardTitle>{jewelry.name}</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}