import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import { isMin6Length } from "../../utils/validators";
import axiosInstance from "../../lib/axios/axiosInstance";

export default function PasswordReset() {
    const [status, setStatus] = useState(null);
    const [loading, setIsLoading] = useState(false);

    const passwordMatch = (confirmNewPassword) => {
        return confirmNewPassword.trim() === newPasswordInputValue;
    };

    const {
        inputValue: currentPasswordInputValue,
        changeHandler: currentPasswordChangeHandler,
        blurHandler: currentPasswordBlurHandler,
        hasError: currentPasswordHasError,
        isValid: currentPasswordIsValid,
    } = useInput(() => true);
    const {
        inputValue: newPasswordInputValue,
        changeHandler: newPasswordChangeHandler,
        blurHandler: newPasswordBlurHandler,
        hasError: newPasswordHasError,
        isValid: newPasswordIsValid,
    } = useInput(isMin6Length);
    const {
        changeHandler: confirmNewPasswordChangeHandler,
        blurHandler: confirmNewPasswordBlurHandler,
        hasError: confirmNewPasswordHasError,
        isValid: confirmNewPasswordIsValid,
    } = useInput(passwordMatch);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (currentPasswordIsValid && newPasswordIsValid) {
            try {
                const res = await axiosInstance.post(
                    "/auth/users/set_password/",
                    {
                        new_password: newPasswordInputValue,
                        current_password: currentPasswordInputValue,
                    }
                );
                console.log(res);

                if (res.status === 204) {
                    setStatus("success");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container flex flex-col space-y-4 p-5 m-5 bg-white border rounded shadow max-w-md">
            <div className="mb-1">
                <h3 className="text-3xl semibold mb-2">Change Password</h3>
                <p className="text-sm">
                    We will send you and Email to confirm your new Password
                </p>
            </div>
            <hr />
            <form onSubmit={submitHandler} className="flex flex-col space-y-2 ">
                <Input
                    label="Current password"
                    type="password"
                    labelClassName="font-semibold"
                    placeholder="Your password"
                    className={
                        currentPasswordHasError
                            ? "px-2 py-1 bg-red-100"
                            : "px-2 py-1 bg-gray-100"
                    }
                    onChange={currentPasswordChangeHandler}
                    onBlur={currentPasswordBlurHandler}
                />
                {currentPasswordHasError && (
                    <p className="text-xs text-red-500">
                        Password must be at least 6 chracters long
                    </p>
                )}
                <Input
                    label="New Password"
                    type="password"
                    labelClassName="font-semibold"
                    placeholder="Your desired password"
                    className={
                        newPasswordHasError
                            ? "px-2 py-1 bg-red-100"
                            : "px-2 py-1 bg-gray-100"
                    }
                    onChange={newPasswordChangeHandler}
                    onBlur={newPasswordBlurHandler}
                />
                {newPasswordHasError && (
                    <p className="text-xs text-red-500">
                        Password must be at least 6 character long
                    </p>
                )}
                <Input
                    label="Confirm New Password"
                    type="password"
                    labelClassName="font-semibold"
                    placeholder="Confirm your new password"
                    className={
                        confirmNewPasswordHasError
                            ? "px-2 py-1 bg-red-100"
                            : "px-2 py-1 bg-gray-100"
                    }
                    onChange={confirmNewPasswordChangeHandler}
                    onBlur={confirmNewPasswordBlurHandler}
                />
                {confirmNewPasswordHasError && (
                    <p className="text-xs text-red-500">Passwords must match</p>
                )}
                <br />
                <hr />
                <button
                    className={
                        "rounded border shadow text-white font-semibold p-2 bg-emerald-500 "
                    }
                >
                    Set New Password
                </button>
            </form>
        </div>
    );
}
