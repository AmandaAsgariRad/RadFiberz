import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />


                {/* Example
            <Route path="edit/:catName" element={
              isLoggedIn && role === "Admin"
                ? <CategoryForm />
                : <Navigate to="/login" />
            }
            />
          </Route> */}




                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Routes>
        </main>
    );
};