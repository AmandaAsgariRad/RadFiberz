import { Collapse, Nav } from "react-bootstrap"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle"
import { NavLink as RRNavLink } from "react-router-dom"
import { Navbar, NavItem, NavLink } from "reactstrap"
import React, { useState } from 'react'
import { logout } from "../modules/authManager"


export default function Header({ isLoggedIn, user }) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarToggle onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/*">Home</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>

                                <NavItem>
                                    <a className="nav-link" onClick={logout}>Logout</a>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/favorite">Favorites</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to={`userProfile/${user.id}`}>Profile</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/cart">Cart</NavLink>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/*">Home</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Favorites</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Profile</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Cart</NavLink>
                                </NavItem>
                            </>
                        }

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}
