import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMacrameById } from '../../api/macrameApi';
import React from 'react';

export default function MacrameDetails() {
    const { id } = useParams();
    const [macrame, setMacrame] = useState(null);

    useEffect(() => {
        getMacrameById(id)
            .then(setMacrame)
            .catch(console.error);
    }, [id]);

    if (!macrame) {
        return <p>Loading...</p>;
    }

    return (
        <div className="m-4 text-center">
            <h1 className="bold">{macrame.name}</h1>
            <img
                src={macrame.productImage}
                alt={macrame.name}
                className="mt-5 mb-5"
                width="100%"
                height="200px"
            />
            <p>{macrame.description}</p>
            <p>Price: {macrame.price}</p>
        </div>
    );
}