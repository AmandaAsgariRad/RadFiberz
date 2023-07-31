import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import { getPostDetails } from "../../modules/postManager";
export default function PostDetails() {
    const { id } = useParams(),
        [p, setP] = useState({})

    useEffect(() => {
        getPostDetails(id).then(setP);
    }, [])

    if (p === null) {
        return <p>404 not found</p>
    }

    else {
        return (
            <div className="m-4 text-center">
                <h1 className="bold">{p.title}</h1>
                <img
                    src={p.imageLocation}
                    alt="blog-header-img"
                    className="mt-5 mb-5"
                    width="100%" height="200px" />
                <p>{p.content}</p>
                <p>Author: {p.userProfile?.displayName} &emsp; Published on {p.publishDateTime}</p>


            </div>
        );
    }
}