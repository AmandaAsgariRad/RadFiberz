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
            <h1 className="mt-5 mb-4 text-center">User Profile</h1>
            <CardBody style={{ paddingBottom: '10rem' }} className="mt-3 lead text-center">
                <CardTitle>{userProfile.firstName} {userProfile.lastName}</CardTitle>
                <CardText>
                    <div>{userProfile.streetAddress}, {userProfile.city}, {userProfile.state} {userProfile.zipCode}</div>
                    <div>{userProfile.phoneNumber}</div>
                    <div>{userProfile.email}</div>
                </CardText>
                <Button style={{ marginTop: '1rem' }} class="btn btn-success" onClick={() => navigate("/userProfile/edit")}>Edit</Button>
            </CardBody>
        </Card>
    );
}

