import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import { userActions } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import ChevronDown from "../UI/icons/ChevronDown";
import Dropdown from "../UI/Dropdown";
import axiosInstance from "../../lib/axios/axiosInstance";

export default function Navbar() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logOut());
        dispatch(userActions.logUserOut());
    };

    const links = {
        loggedIn: {
            nav: [
                {
                    title: "Home",
                    to: "/",
                },
            ],
            dropdown: {
                title: "User",
                content: [
                    {
                        title: "Logout",
                        to: "/",
                        onclick: logoutHandler,
                    },
                    {
                        title: "Profile",
                        to: "/auth/user/profile",
                    },
                ],
            },
        },
        loggedOut: [
            {
                title: "Home",
                to: "/",
            },
            {
                title: "Sign In",
                to: "auth/sign-in",
            },
            {
                title: "Sign Up",
                to: "auth/registration/sign-up",
            },
        ],
    };

    const authCtx = useSelector((state) => state.auth);
    const [openDropdown, setOpenDropdown] = useState(false);
    const { isLoggedIn } = authCtx.user;

    const defaultLinkClass = "px-2 py-1 hover:text-sky-700";
    const activeLinkClass = `${defaultLinkClass} text-sky-700`;

    const dropdownHandler = () => {
        setOpenDropdown((prevState) => {
            return !prevState;
        });
    };

    if (isLoggedIn) {
        return (
            <nav>
                <div className="flex flex-row text-sky-500 font-semibold space-x-5 ">
                    {links.loggedIn.nav.map((link, idx) => {
                        return (
                            <NavLink
                                key={idx}
                                className={(navData) =>
                                    navData.isActive
                                        ? activeLinkClass
                                        : defaultLinkClass
                                }
                                to={link.to}
                            >
                                {link.title}
                            </NavLink>
                        );
                    })}

                    <Dropdown
                        onClickAway={() => setOpenDropdown(false)}
                        className={defaultLinkClass + " cursor-pointer "}
                    >
                        <button
                            className="font-semibold flex flex-row items-center"
                            onClick={dropdownHandler}
                        >
                            {links.loggedIn.dropdown.title}
                            <ChevronDown className="mx-1 text-sky-600 " />
                        </button>
                        {openDropdown && (
                            <div className="bg-white border-gray-200 border flex flex-col py-1 mt-3 z-10 absolute w-44 right-0 text-black font-normal">
                                {links.loggedIn.dropdown.content.map(
                                    (link, idx) => (
                                        <NavLink
                                            key={idx}
                                            className=" block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-200 "
                                            onClick={
                                                link.onclick && link.onclick
                                            }
                                            to={link.to}
                                        >
                                            {link.title}
                                        </NavLink>
                                    )
                                )}
                            </div>
                        )}
                    </Dropdown>
                </div>
            </nav>
        );
    }

    // If user is not logged In
    return (
        <nav>
            <ul className="flex flex-row text-sky-500 font-semibold space-x-5">
                {links.loggedOut.map((link, idx) => {
                    return (
                        <NavLink
                            key={idx}
                            className={(navData) =>
                                navData.isActive
                                    ? activeLinkClass
                                    : defaultLinkClass
                            }
                            to={link.to}
                        >
                            {link.title}
                        </NavLink>
                    );
                })}
            </ul>
        </nav>
    );
}
