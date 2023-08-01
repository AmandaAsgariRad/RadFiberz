import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Home from "./home/home";
import About from "./about/about";
import Favorite from "./favorites/favorite";
import Macrame from "./Product/macrame";
import Jewelry from "./Product/jewelry";
import Cart from "./cart/cart";
import UserProfile from "./userProfile/userProfile";
import ShopAll from "./shopAll/shopAll";
import Register from "./auth/register";
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