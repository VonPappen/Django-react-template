import React, { useState } from "react";
import Input from "../UI/Input";
import axiosInstance from "../../lib/axios/axiosInstance";
import useInput from "../../hooks/use-input";
import { isEmail } from "../../utils/validators";
import Spinner from "../UI/Spinner";
import Success from "../UI/icons/Success";

export default function ActivateAccountResend() {
    const [loading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const {
        inputValue: emailInputValue,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        hasError: emailHasError,
        isValid: emailIsValid,
    } = useInput(isEmail);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (emailIsValid) {
            setIsLoading(true);
            try {
                const res = await axiosInstance.post(
                    "/auth/users/resend_activation/",
                    {
                        email: emailInputValue,
                    }
                );
                console.log(res);
                setIsLoading(false);
                setStatus("success");
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setStatus(error);
            }
        }
    };

    return (
        <div className="flex flex-col bg-white p-4 m-5 max-w-sm">
            <div className=" my-2">
                <h3 className="text-xl font-semibold text-center">
                    Resend Activation Email
                </h3>
            </div>
            <hr />
            <form onSubmit={submitHandler} className="my-3 flex flex-col">
                <p className="my-2 text-sm text-center">
                    Please enter your{" "}
                    <span className="font-semibold">email address</span> . We
                    will send you a new email with an activation link
                </p>
                <Input
                    type="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder="email"
                ></Input>
                {emailHasError && (
                    <p className="text-xs text-red-500">
                        Please enter a valid email
                    </p>
                )}
                <div className="flex mt-3 justify-center items-center">
                    {!loading && !status && (
                        <button className="bg-emerald-500 flex-1 text-white font-semibold p-2 rounded shadow">
                            Resend Email
                        </button>
                    )}
                    {loading && <Spinner size="m" />}
                    {!loading && status === "success" && (
                        <div className="text-emerald-700 flex">
                            <Success className="mx-2  " /> <p>Email Sent</p>
                        </div>
                    )}
                </div>
            </form>
            <hr />
            <p className=" my-2 text-xs text-center">
                If this error persists, Please send us a message on{" "}
                <span className="font-semibold">email@address.com</span>
            </p>
        </div>
    );
}
