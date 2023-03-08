import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Input Handling
import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import { isEmail, isMin6Length } from "../../utils/validators";

// // Login Handling
import axiosInstance from "../../lib/axios/axiosInstance";
import Spinner from "../UI/Spinner";

export default function LoginForm() {
    const [responseError, setResponseError] = useState({
        email: null,
        username: null,
        password: null,
    });
    const [loading, setIsLoading] = useState(false);
    const navigation = useNavigate();

    const passwordMatch = (confirmPassword) => {
        return confirmPassword.trim() === passwordInputValue;
    };

    const {
        inputValue: usernameInputValue,
        changeHandler: usernameChangeHandler,
        blurHandler: usernameBlurHandler,
        hasError: usernameHasError,
        isValid: usernameIsValid,
    } = useInput(isMin6Length);
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
    const {
        changeHandler: passwordConfirmChangeHandler,
        blurHandler: passwordConfirmBlurHandler,
        hasError: passwordConfirmHasError,
        isValid: passwordConfirmIsValid,
    } = useInput(passwordMatch);

    const formIsValid =
        passwordIsValid &&
        emailIsValid &&
        passwordConfirmIsValid &&
        usernameIsValid;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formIsValid) {
            try {
                setIsLoading(true);
                await axiosInstance.post("/auth/users/", {
                    username: usernameInputValue,
                    email: emailInputValue,
                    password: passwordInputValue,
                });
                setIsLoading(false);
                navigation("/auth/registration/success");
            } catch (error) {
                setResponseError(error.response.data);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="container flex flex-col space-y-4 p-5 m-5 bg-white border rounded shadow max-w-lg">
            <div className="">
                <h3 className="text-3xl semibold mb-3 text-center">Sign Up</h3>
                <hr />
            </div>
            <form onSubmit={submitHandler} className="flex flex-col space-y-2 ">
                <Input
                    // label="Username"
                    type="text"
                    labelClassName="font-semibold"
                    className={usernameHasError ? " bg-red-100" : " "}
                    placeholder="Desired Username"
                    onChange={usernameChangeHandler}
                    onBlur={usernameBlurHandler}
                />
                {usernameHasError && (
                    <p className="text-xs text-red-500">
                        Username must be least 6 character long
                    </p>
                )}
                {responseError.username && (
                    <p className="text-xs text-red-500">
                        {responseError.username}
                    </p>
                )}
                <Input
                    // label="Email"
                    type="email"
                    labelClassName="font-semibold"
                    className={emailHasError ? " bg-red-100" : " "}
                    placeholder="Email Address"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailHasError && (
                    <p className="text-xs text-red-500">
                        Please enter a valid email
                    </p>
                )}
                {responseError.email && (
                    <p className="text-xs text-red-500">
                        {responseError.email}
                    </p>
                )}
                <Input
                    // label="Password"
                    type="password"
                    labelClassName="font-semibold"
                    placeholder="Desired Password"
                    className={passwordHasError ? " bg-red-100" : " "}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                />
                {passwordHasError && (
                    <p className="text-xs text-red-500">
                        Password must be at least 6 chracters long
                    </p>
                )}
                {responseError.password && (
                    <p className="text-xs text-red-500">
                        {responseError.password}
                    </p>
                )}
                <Input
                    // label="Confirm your Password"
                    type="password"
                    labelClassName="font-semibold"
                    placeholder="Confirm Password"
                    className={passwordConfirmHasError ? " bg-red-100" : " "}
                    onChange={passwordConfirmChangeHandler}
                    onBlur={passwordConfirmBlurHandler}
                />
                {passwordConfirmHasError && (
                    <p className="text-xs text-red-500">
                        Passwords must match!
                    </p>
                )}
                <br />
                <hr />
                <div className="flex flex-row justify-between items-center">
                    <Link to="/auth/sign-in" className="text-xs text-sky-700">
                        Already have an account? Sign In
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
                                "p-2 rounded border shadow text-white font-semibold" +
                                (formIsValid
                                    ? " bg-emerald-500 "
                                    : " bg-gray-500  cursor-not-allowed")
                            }
                        >
                            Create Account
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

// import useForm from "../../hooks/use-form";

// function Form() {
//     const { formRender, formData, formValid } = useForm(
//         [
//             {
//                 inputValue: "",
//                 type: "text",
//                 name: "username",
//                 placeHolder: "Your desired Username",
//                 errorMessage: "Username must be at least 6 character long",
//                 validate(input, formData) {
//                     return input.trim().length >= 6;
//                 },
//             },
//             {
//                 inputValue: "",
//                 type: "email",
//                 name: "email",
//                 className: "",
//                 errorMessage: "Invalid Email",
//                 errorClassName: "",
//                 validate(input) {
//                     return input.trim().includes("@");
//                 },
//                 placeHolder: "Enter your Email Here",
//             },
//             {
//                 inputValue: "",
//                 type: "password",
//                 name: "password",
//                 errorMessage: "Invalid Password",
//                 validate(input) {
//                     return input.trim().length > 6;
//                 },
//                 placeHolder: "enter your password",
//             },
//         ],
//         (formData) => console.dir(formData)
//     );
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("submit");
//     };

//     const [responseError, setResponseError] = useState({
//         email: null,
//         username: null,
//         password: null,
//     });
//     const [loading, setIsLoading] = useState(false);
//     const navigation = useNavigate();

//     const submitHandler = async (e) => {
//         e.preventDefault();

//         if (formValid) {
//             try {
//                 setIsLoading(true);
//                 console.log(formData);
//                 await axiosInstance.post("/auth/users/", {
//                     username: formData.username.inputValue,
//                     email: formData.email.inputValue,
//                     password: formData.password.inputValue,
//                 });
//                 setIsLoading(false);
//                 navigation("/auth/registration/success");
//             } catch (error) {
//                 setResponseError(error.response.data);
//                 setIsLoading(false);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };
//     console.log(formRender);

//     return (
//         <div className="container flex flex-col space-y-4 p-5 m-5 bg-white border rounded shadow max-w-md">
//             <div className="">
//                 <h3 className="text-3xl semibold mb-3 text-center">Sign Up</h3>
//                 <hr />
//             </div>
//             <form onSubmit={submitHandler} className="flex flex-col space-y-2 ">
//                 {formRender}
//                 <br />
//                 <hr />
//                 <div className="flex flex-row justify-between items-center">
//                     <Link to="/auth/sign-in" className="text-xs text-sky-700">
//                         Already have an account? Sign In
//                     </Link>
//                     {loading ? (
//                         <Spinner
//                             size="m"
//                             color="border-t-emerald-500"
//                         ></Spinner>
//                     ) : (
//                         <button
//                             disabled={!formValid}
//                             className={
//                                 "p-2 rounded border shadow text-white font-semibold" +
//                                 (formValid
//                                     ? " bg-emerald-500 "
//                                     : " bg-gray-500  cursor-not-allowed")
//                             }
//                         >
//                             Create Account
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Form;
