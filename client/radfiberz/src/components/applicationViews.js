
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Home from "./home/home";
import About from "./about/about";
import Favorite from "./favorites/favorite";
import Macrame from "./macrame/macrame";
import Jewelry from "./jewelry/jewelry";
import Cart from "./cart/cart";
import UserProfile from "./userProfile/userProfile";
import ShopAll from "./shopAll/shopAll";
import Register from "./auth/register";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>


        <Route path="/*" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="favorites" element={<Favorite />} />
        <Route path="macrame" element={<Macrame />} />
        <Route path="jewelry" element={<Jewelry />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="shopAll" element={<ShopAll />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />

      </Routes>

    </main >
  );
};