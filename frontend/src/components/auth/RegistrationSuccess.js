import React, { useState } from "react";
import Success from "../UI/icons/Success";
import { Link } from "react-router-dom";

export default function RegistrationSuccess() {
    return (
        <>
            {" "}
            <div className="text-center flex flex-col justify-center items-center m-5">
                <div className="container max-w-md border p-3 m-5 rounded bg-white">
                    <div className="flex items-center justify-center text-emerald-700 p-2 an">
                        <Success></Success>
                        <span className="ml-1 text-xl font-semibold">
                            Registration Successful
                        </span>
                    </div>

                    <hr />
                    <p className="py-3 text-sm text-center">
                        <span className="font-semibold">
                            Only few more steps!
                        </span>
                        <br />
                        Please Check your{" "}
                        <span className="font-semibold">email</span>. An
                        activation link has been sent to you. Follow the
                        instructions to{" "}
                        <span className="font-semibold">
                            activate your account.
                        </span>
                    </p>
                    <br />
                </div>

                <Link
                    to="/auth/registration/activate/resend"
                    className="text-sm text-sky-700 cursor-pointer"
                >
                    Didn't receive any email?
                </Link>
            </div>
        </>
    );
}
