import { useEffect, useState } from "react"
import { getAllProducts } from "../../modules/productManager"
import { Card, CardImg, CardBody, CardTitle, Row, Col, Container } from 'reactstrap';



export default function ShopAll() {
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

    const navigateToMacrameDetails = (id) => {
        window.location.href = `/macrame/${id}`
    }

    const navigateToJewelryDetails = (id) => {
        window.location.href = `/jewelry/${id}`
    }


    return (
        <Container>
            <div id='shopAll-header'>
                <h1>Shop All Products</h1>
            </div>
            <div id='shopAll-container'>
                <h3 style={{ marginTop: '5rem' }}>Macrame</h3>
                <Row style={{ marginTop: '3rem' }}>
                    {macrames.map(macrame => (
                        <Col sm={6} md={4} lg={3} key={macrame.id}>
                            <Card onClick={() => navigateToMacrameDetails(macrame.id)}>
                                <CardImg variant="top" src={macrame.productImage} alt={macrame.name} />
                                <CardBody>
                                    <CardTitle>{macrame.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <h3 style={{ marginTop: '5rem' }}>Jewelry</h3>
                <Row style={{ marginTop: '3rem' }}>
                    {jewelrys.map(jewelry => (
                        <Col sm={6} md={4} lg={3} key={jewelry.id}>
                            <Card onClick={() => navigateToJewelryDetails(jewelry.id)}>
                                <CardImg variant="top" src={jewelry.productImage} alt={jewelry.name} />
                                <CardBody>
                                    <CardTitle>{jewelry.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>

    );
}
    // return (
    //     <section>
    //         <div>
    //             <h1>Shop All Products</h1>
    //         </div>
    //         <h2>Macrame</h2>
    //         <Row>
    //             {macrames.map(macrame => {
    //                 return (
    //                     <div key={macrame.id}>
    //                         <img src={macrame.imageUrl} alt={macrame.name} onClick={() => navigateToMacrameDetails(macrame.id)} />
    //                         <p>{macrame.name}</p>
    //                     </div>
    //                 );
    //             })}
    //             <h2>Jewelry</h2>
    //             {jewelrys.map(jewelry => {
    //                 return (
    //                     <div key={jewelry.id}>
    //                         <img src={jewelry.imageUrl} alt={jewelry.name} onClick={() => navigateToJewelryDetails(jewelry.id)} />
    //                         <p>{jewelry.name}</p>
    //                     </div>
    //                 );
    //             })}
    //         </Row>
    //     </section>
//     );
// }