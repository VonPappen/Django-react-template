import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../UI/ProfileCard";

export default function UserProfile() {
    const authCtx = useSelector((state) => state.auth);
    console.log(authCtx);
    const { username, email, id } = authCtx.user;
    const { isLoggedIn } = authCtx.user;

    return (
        <>
            {isLoggedIn && (
                <ProfileCard
                    username={username}
                    email={email}
                    id={id}
                ></ProfileCard>
            )}
        </>
    );
}
