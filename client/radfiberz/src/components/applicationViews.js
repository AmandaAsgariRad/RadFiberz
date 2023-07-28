import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./home";
import Favorites from "./favorites";
import Macrame from "./macrame";
import Jewelry from "./jewelry";
import UserProfile from "./userProfile";
import ShopAll from "./shopAll";
import Register from "./auth/register";


export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>


                <Route path="/*" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="macrame" element={<Macrame />} />
                <Route path="jewelry" element={<Jewelry />} />
                <Route path="userProfile" element={<UserProfile />} />
                <Route path="shopAll" element={<ShopAll />} />
                <Route path="home" element={<Home />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />


            </Routes>
            {/*  */}




            {/* Example
            <Route path="edit/:catName" element={
              isLoggedIn && role === "Admin"
                ? <CategoryForm />
                : <Navigate to="/login" />
            }
            />
          </Route> */}






        </main >
    );
};