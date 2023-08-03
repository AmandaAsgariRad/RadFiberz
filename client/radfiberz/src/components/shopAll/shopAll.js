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
                <h1 className="mt-5 mb-4 text-center">Shop All Products</h1>
            </div>
            <div className="mt-3 lead text-center" id='shopAll-container'>
                <div className="macrame-decoration" style={{ marginTop: '5rem', paddingBottom: '0.5rem', backgroundColor: '#f2f2f2' }}>
                    <h3 style={{ marginTop: '5rem' }} id="macrame-section" >Macrame</h3>
                    <a href="#jewelry-section">Go to Jewelry</a>
                </div>
                <Row style={{ marginTop: '3rem' }}>
                    {macrames.map(macrame => (
                        <Col sm={6} md={4} lg={3} key={macrame.id} style={{ marginBottom: '2rem' }}>
                            <Card onClick={() => navigateToMacrameDetails(macrame.id)}>
                                <CardImg variant="top" src={macrame.productImage} alt={macrame.name} style={{ height: '300px', objectFit: 'cover' }} />
                                <CardBody>
                                    <CardTitle>{macrame.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="jewelry-decoration" style={{ marginTop: '5rem', paddingBottom: '0.5rem', backgroundColor: '#f2f2f2' }} >
                    <h3 id="jewelry-section">Jewelry</h3>
                    <a href="#macrame-section">Go to Macrame</a>
                </div>
                <Row style={{ marginTop: '3rem' }}>
                    {jewelrys.map(jewelry => (
                        <Col sm={6} md={4} lg={3} key={jewelry.id} style={{ marginBottom: '2rem' }}>
                            <Card onClick={() => navigateToJewelryDetails(jewelry.id)}>
                                <CardImg variant="top" src={jewelry.productImage} alt={jewelry.name} style={{ height: '300px', objectFit: 'cover' }} />
                                <CardBody>
                                    <CardTitle>{jewelry.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </div>

        </Container >

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