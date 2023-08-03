import { Collapse, Nav } from "react-bootstrap"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle"
import { NavLink as RRNavLink } from "react-router-dom"
import { Navbar, NavItem, NavLink } from "reactstrap"
import React, { useState } from 'react'
import { logout } from "../modules/authManager"
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"
import { NavbarBrand } from "reactstrap"


function LogoNav() {
    return (
        <Navbar color="white" light expand="md">
            <NavbarBrand href="/">
                <img
                    src="https://i.imgur.com/G2ZVxRi.jpg"
                    alt="logo"
                    style={{ maxWidth: "25%", maxHeight: "25%" }}
                />
            </NavbarBrand>
        </Navbar>
    );
}



export default function Header({ isLoggedIn, user }) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div>
            <LogoNav />
            <Navbar color="light" light expand="md">
                <NavbarToggle onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mx-auto ml-auto" navbar>
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/*">
                                        Home
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/about">
                                        About
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <a className="nav-link" onClick={logout}>
                                        Logout
                                    </a>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/favorite">
                                        <FaHeart />
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to={`userProfile/${user.id}`}>
                                        <FaUser />
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/cart">
                                        <FaShoppingCart />
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/*">
                                        Home
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/about">
                                        About
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <FaHeart />
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <FaUser />
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <FaShoppingCart />
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>

        </div>

    );

}