import { useEffect, useState } from "react"
import { getAllProducts } from "../../modules/productManager"

export default function Jewelry() {
    const [products, setProducts] = useState([])
    const [jewelrys, setJewelry] = useState([])

    useEffect(() => {
        getAllProducts().then(data => {
            setProducts(data)
        })
    }, [])

    useEffect(() => {
        const jewelryProducts = products.filter(product => product.isJewelry === true)
        setJewelry(jewelryProducts)
    }, [products])

    const navigateToJewelryDetails = (id) => {
        window.location.href = `/jewelry/${id}`
    }




    return (
        <section>
            <h1>Jewelry</h1>
            {jewelrys.map(jewelry => {
                return (
                    <div key={jewelry.id}>
                        <img src={jewelry.productImage} alt={jewelry.name} onClick={() => navigateToJewelryDetails(jewelry.id)} />
                        <p>{jewelry.name}</p>
                    </div>
                );
            })}
        </section>
    );
}