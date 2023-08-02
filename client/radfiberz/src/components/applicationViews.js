import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/login";
import Home from "./Home/home";
import About from "./About/about";
import Favorite from "./Favorites/favorite";
import Cart from "./Cart/cart";
import UserProfile from "./UserProfile/userProfile";
import ShopAll from "./ShopAll/shopAll";
import Register from "./Auth/register";
import { Navigate } from "react-router-dom";
import ProductDetails from "./Product/productDetails";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>


        <Route path="/*" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="favorite" element={isLoggedIn ? <Favorite /> : <Navigate to='/login' />} />
        {/* <Route path="macrame" element={<Macrame />} />
        <Route path="jewelry" element={<Jewelry />} /> */}
        <Route path="jewelry/:id" element={<ProductDetails />} />
        <Route path="macrame/:id" element={<ProductDetails />} />
        <Route path="userProfile" element={isLoggedIn ? <UserProfile /> : <Navigate to='/login' />} />
        <Route path="shopAll" element={<ShopAll />} />
        <Route path="cart" element={isLoggedIn ? <Cart /> : <Navigate to='/login' />} />
        <Route path="userProfile/:id" element={isLoggedIn ? <UserProfile /> : <Navigate to='/login' />} />
        <Route path="about" element={<About />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />

      </Routes>

    </main >
  );
};