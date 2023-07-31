import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMacrameById } from '../../api/macrameApi';
import React from 'react';

export default function JewelryDetails() {
    const { id } = useParams();
    const [jewelry, setJewelry] = useState(null);

    useEffect(() => {
        getJewelryById(id)
            .then(setJewelry)
            .catch(console.error);
    }, [id]);

    if (!jewelry) {
        return <p>Loading...</p>;
    }

    return (
        <div className="m-4 text-center">
            <h1 className="bold">{jewelry.name}</h1>
            <img
                src={jewelry.productImage}
                alt={jewelry.name}
                className="mt-5 mb-5"
                width="100%"
                height="200px"
            />
            <p>{jewelry.description}</p>
            <p>Price: {jewelry.price}</p>
        </div>
    );
}