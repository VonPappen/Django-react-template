import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../lib/axios/axiosInstance";
import { Link } from "react-router-dom";
import Success from "../UI/icons/Success";

export default function ActivateAccount() {
    const location = useLocation();
    const [isActivated, setIsActivated] = useState(false);

    const pathContent = location.pathname.split("/");

    const uid = pathContent[pathContent.length - 2];
    const token = pathContent[pathContent.length - 1];

    const activationHandler = async () => {
        try {
            const res = await axiosInstance.post("/auth/users/activation/", {
                uid,
                token,
            });
            if (res.status === 204) {
                setIsActivated(true);
            } else {
                throw new Error(res.statusText);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    if (!isActivated) {
        return (
            <div className="m-5">
                <h4 className="my-3 text-2xl text-center"> Almost there!</h4>
                <hr />

                <button
                    onClick={activationHandler}
                    className="m-5 p-2 bg-emerald-500 rounded shadow text-white font-semibold hover:scale-[1.05] hover:shadow-md transition-all active:scale-100  "
                >
                    {" "}
                    Click here to activate your account
                </button>
            </div>
        );
    }

    return (
        <div className="container max-w-md border p-3 m-5 rounded">
            <div className="flex items-center justify-center text-emerald-700 p-2 an">
                <Success></Success>
                <span className="ml-1 text-xl font-semibold">
                    Account Activated!
                </span>
            </div>

            <hr />
            <p className="py-3 text-sm text-center">
                You may now{" "}
                <Link to="/auth/sign-in" className="text-sky-500 font-semibold">
                    Log In{" "}
                </Link>{" "}
            </p>
        </div>
    );
}
