import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";
import { Container, Button } from "reactstrap";


export default function Home() {
    const location = useLocation();
    const userProfile = location.state?.userProfile;

    return (
        <Container>
            <h1 className="mt-5 mb-4 text-center">Home</h1>
            <div className="d-flex lead justify-content-center">
                <Button style={{ marginTop: '1rem' }} tag={Link} to="/shopAll" color="primary">
                    Shop All
                </Button>
            </div>
        </Container>
    );
}