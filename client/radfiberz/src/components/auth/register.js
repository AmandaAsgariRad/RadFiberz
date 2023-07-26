import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(string);
    const [lastName, setLastName] = useState(string);
    const [email, setEmail] = useState(string);
    const [streetAddress, setStreetAddress] = useState(string);
    const [city, setCity] = useState(string);
    const [state, setState] = useState(string);
    const [zipCode, setZipCode] = useState(int)
    const [phoneNumber, setPhoneNumber] = useState(string)
    const [password, setPassword] = useState(string);
    const [confirmPassword, setConfirmPassword] = useState(string);

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                firstName,
                lastName,
                streetAddress,
                city,
                state,
                zipCode,
                phoneNumber,
                email,


            };

            register(userProfile, password).then(() => navigate("/"));

        }
    };


    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                        id="streetAddress"
                        type="text"
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="state">State</Label>
                    <Input
                        id="state"
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                        id="zip"
                        type="text"
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}