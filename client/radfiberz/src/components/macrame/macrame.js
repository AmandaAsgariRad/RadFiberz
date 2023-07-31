import { useEffect, useState } from "react"
import { getAllProducts } from "../../modules/productManager"

export default function Macrame() {
    const [products, setProducts] = useState([])
    const [macrames, setMacrames] = useState([])

    useEffect(() => {
        getAllProducts().then(data => {
            setProducts(data)
        })
    }, [])

    useEffect(() => {
        const macrameProducts = products.filter(product => product.isMacrame === true)
        setMacrames(macrameProducts)
    }, [products])

    const navigateToMacrameDetails = (id) => {
        window.location.href = `/macrame/${id}`
    }




    return (
        <section>
            <h1>Macrame</h1>
            {macrames.map(macrame => {
                return (
                    <div key={macrame.id}>
                        <img src={macrame.imageUrl} alt={macrame.name} onClick={() => navigateToMacrameDetails(macrame.id)} />
                        <p>{macrame.name}</p>
                    </div>
                );
            })}
        </section>
    );
}