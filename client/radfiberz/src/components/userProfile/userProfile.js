import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getByUserId } from '../../modules/userProfileManager';
import { CardBody, CardTitle, CardText } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import { Card } from 'reactstrap';
import { Button } from 'react-bootstrap';

export default function UserProfile({ UserProfile }) {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});
    const { id } = useParams();


    useEffect(() => {
        getByUserId(id).then(data => {
            setUserProfile(data)
        })
    }, [])

    return (
        <Card>
            <CardHeader>
                <h1>User Profile</h1>
            </CardHeader>
            <CardBody>
                <CardTitle>{userProfile.firstName} {userProfile.lastName}</CardTitle>
                <CardText>
                    <div><strong>Address:</strong> {userProfile.streetAddress}, {userProfile.city}, {userProfile.state} {userProfile.zipCode}</div>
                    <div><strong>Phone:</strong> {userProfile.phoneNumber}</div>
                    <div><strong>Email:</strong> {userProfile.email}</div>
                </CardText>
                <Button onClick={() => navigate("/userProfile/edit")}>Edit</Button>
            </CardBody>
        </Card>
    );
}

    // return (
    //     <section>
    //         <h1>User Profile</h1>
    //         <h2>{userProfile.firstName} {userProfile.lastName}</h2>
    //         <h3>{userProfile.streetAddress}</h3>
    //         <h3>{userProfile.city}, {userProfile.state} {userProfile.zipCode}</h3>
    //         <h3>{userProfile.phoneNumber}</h3>
    //         <h3>{userProfile.email}</h3>
    //         <Button onClick={() => navigate("/userProfile/edit")}>Edit</Button>

    //     </section>
    // )

