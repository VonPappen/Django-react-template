import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Input Handling
import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import Spinner from "../UI/Spinner";
import { isEmail, isMin6Length } from "../../utils/validators";

// Login Handling
import { authActions } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../lib/axios/axiosInstance";

export default function LoginForm() {
    const authContext = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        inputValue: emailInputValue,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        hasError: emailHasError,
        isValid: emailIsValid,
    } = useInput(isEmail);
    const {
        inputValue: passwordInputValue,
        changeHandler: passwordChangeHandler,
        blurHandler: passwordBlurHandler,
        hasError: passwordHasError,
        isValid: passwordIsValid,
    } = useInput(isMin6Length);

    const formIsValid = passwordIsValid && emailIsValid;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formIsValid) {
            try {
                setIsLoading(true);
                const loginRes = await axiosInstance.post("/auth/jwt/create", {
                    email: emailInputValue,
                    password: passwordInputValue,
                });
                dispatch(authActions.setTokens(loginRes.data));

                const userRes = await axiosInstance.get("/auth/users/me");
                dispatch(authActions.setUserDetails(userRes.data));
                setIsLoading(false);
                navigation("/");
            } catch (error) {
                setIsLoading(false);
                setError(error.response.data.detail);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="container flex flex-col space-y-4 p-5 m-5 bg-white border rounded shadow max-w-md">
            <div className="">
                <h3 className="text-3xl semibold mb-3 text-center">Sign In</h3>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <hr />
            </div>
            <form onSubmit={submitHandler} className="flex flex-col space-y-2 ">
                <Input
                    className={
                        (emailHasError ? " bg-red-100" : "") +
                        " border-gray-600"
                    }
                    placeholder="Email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailHasError && (
                    <p className="text-xs text-red-500">
                        Please enter a valid email
                    </p>
                )}
                <Input
                    placeholder="Password"
                    className={passwordHasError ? " bg-red-100" : ""}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                />
                {passwordHasError && (
                    <p className="text-xs text-red-500">
                        Password must be at least 6 chracters long
                    </p>
                )}
                <Link
                    to="/auth/user/set-password/"
                    className="text-xs text-sky-700 ml-auto"
                >
                    Forgot Password?
                </Link>

                <br />
                <hr />
                <div className="flex flex-row justify-between items-center">
                    <Link
                        to="/auth/registration/sign-up"
                        className="text-xs text-sky-700"
                    >
                        Don't have an account yet? Sign up!
                    </Link>
                    {loading ? (
                        <Spinner
                            size="m"
                            color="border-t-emerald-500"
                        ></Spinner>
                    ) : (
                        <button
                            disabled={!formIsValid}
                            className={
                                "rounded border shadow text-white font-semibold p-2 " +
                                (formIsValid
                                    ? "bg-emerald-500 "
                                    : " bg-gray-500  cursor-not-allowed")
                            }
                        >
                            Login
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
