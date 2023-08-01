import { useEffect, useState } from "react"
import { getAllProducts } from "../../modules/productManager"
import { Navigate } from "react-router"



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
            {macrames.map(macrame => {
                return (
                    <div key={macrame.id}>
                        <img src={macrame.imageUrl} alt={macrame.name} onClick={() => navigateToProductDetails(macrame.id)} />
                        <p>{macrame.name}</p>
                    </div>
                );
            })}
            <h1>Jewelry</h1>
            {jewelrys.map(jewelry => {
                return (
                    <div key={jewelry.id}>
                        <img src={jewelry.productImage} alt={jewelry.name} onClick={() => navigateToProductDetails(jewelry.id)} />
                        <p>{jewelry.name}</p>
                    </div>
                );
            })}
        </div>
    );
}

//     if (product.isMacrame) {
//         return (
//             <div>
//                 <h1>Macrame</h1>
//                 {macrames.map(macrame => {
//                     return (
//                         <div key={macrame.id}>
//                             <img src={macrame.imageUrl} alt={macrame.name} onClick={() => navigateToMacrameDetails(macrame.id)} />
//                             <p>{macrame.name}</p>
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     }
//     else {
//         return (
//             <section>
//                 <h1>Jewelry</h1>
//                 {jewelrys.map(jewelry => {
//                     return (
//                         <div key={jewelry.id}>
//                             <img src={jewelry.productImage} alt={jewelry.name} onClick={() => navigateToJewelryDetails(jewelry.id)} />
//                             <p>{jewelry.name}</p>
//                         </div>
//                     );
//                 })}
//             </section>
//         );
//     }
// }