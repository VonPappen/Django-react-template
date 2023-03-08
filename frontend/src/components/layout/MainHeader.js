import React from "react";
import Navbar from "./Navbar";

export default function MainHeader() {
    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Sign In",
            path: "sign-in/",
        },
        {
            name: "Sign Up",
            path: "sign-up/",
        },
    ];

    return (
        <header className="flex flex-row justify-between items-center p-3 bg-white shadow px-10">
            <div className="text-sky-700 font-bold text-xl">myReactApp</div>
            <Navbar></Navbar>
        </header>
    );
}
