import { useEffect, useState } from "react"
import { getAllProducts } from "../../modules/productManager"


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
        <section>
            <h1>Shop All Products</h1>
            <h2>Macrame</h2>
            {macrames.map(macrame => {
                return (
                    <div key={macrame.id}>
                        <img src={macrame.imageUrl} alt={macrame.name} onClick={() => navigateToMacrameDetails(macrame.id)} />
                        <p>{macrame.name}</p>
                    </div>
                );
            })}
            <h2>Jewelry</h2>
            {jewelrys.map(jewelry => {
                return (
                    <div key={jewelry.id}>
                        <img src={jewelry.imageUrl} alt={jewelry.name} onClick={() => navigateToJewelryDetails(jewelry.id)} />
                        <p>{jewelry.name}</p>
                    </div>
                );
            })}
        </section>
    );
}