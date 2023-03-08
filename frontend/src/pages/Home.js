import React from "react";
import useHttp from "../hooks/use-http";
import Spinner from "../components/UI/Spinner";
import Django from "../components/UI/logos/django";
import Alert from "../components/UI/Alert";
import { getMessage } from "../lib/apiTest";
import { useSelector } from "react-redux";
import UserProfile from "../components/auth/UserProfile";

export default function Home() {
    const { sendRequest, status, error, data } = useHttp(getMessage);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const connectionHandler = async (e) => {
        sendRequest();
    };

    return (
        <div className="flex flex-grow flex-col justify-center items-center m-8 max-w-xl">
            <div
                className="flex flex-col items-center p-2 font-semibold border border-emerald-700 rounded shadow bg-white"
                onClick={connectionHandler}
            >
                <span>Test connection with</span>
                <Django className="" />
            </div>

            {status === "error" && (
                <Alert
                    alertType="error"
                    title="Something went Wrong!"
                    className="p-2 m-4"
                >
                    {error}
                </Alert>
            )}
            {status === "success" && (
                <Alert
                    alertType="success"
                    title="Connection successful"
                    className="p-2 m-4"
                >
                    {JSON.stringify(data[0].message)}
                </Alert>
            )}

            {status === "pending" && (
                <Spinner size="m" className="my-4"></Spinner>
            )}
            {isLoggedIn && <UserProfile></UserProfile>}
        </div>
    );
}
