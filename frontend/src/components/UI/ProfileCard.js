import React from "react";
import User from "./icons/User";
import Edit from "./icons/Edit";
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
    return (
        <div className=" max-w-md w-4/6 bg-white m-8 border rounded shadow-sm">
            <div className="p-3 text-xl  flex  flex-row items-center justify-between space-x-3 ">
                <div className="flex flex-row space-x-2 items-center">
                    <User className="w-10 h-10 text-sky-700"></User>
                    <div className="flex flex-col">
                        <span className="font-semibold">User Information</span>
                        <span className="text-sm">Account detail</span>
                    </div>
                </div>
                <Link
                    to="/auth/user/set-password"
                    className="  text-sm  text-white bg-orange-600 p-2 rounded shadow  font-semibold  transition-all cursor-pointer "
                >
                    Change Password
                </Link>
            </div>
            <table className="w-full border">
                <tbody>
                    <tr className="border-b ">
                        <td className="bg-gray-200 p-2 text-gray-500">
                            Username
                        </td>
                        <td className="p-2">{props.username}</td>
                        <td className="p-2">
                            <Edit className="w-5 h-5 "></Edit>
                        </td>
                    </tr>
                    <tr className="">
                        <td className="bg-gray-200 p-2 text-gray-500">Email</td>
                        <td className="p-2">{props.email}</td>
                        <td className="p-2">
                            <Edit className="w-5 h-5 "></Edit>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
