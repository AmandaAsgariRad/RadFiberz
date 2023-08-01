import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";
import "./home.css";


export default function Home() {
    const location = useLocation();
    const userProfile = location.state?.userProfile;
    return (
        <section>
            <h1>Home</h1>
            <Link to="/shopAll">Shop All</Link>
        </section>
    )
}