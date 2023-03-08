import React from "react";
import Success from "./icons/Success";
import Error from "./icons/Error";

export default function Alert(props) {
    const alertType = {
        success: {
            bg: " bg-green-800 bg-opacity-25 text-green-800 border-green-800",
            title: "text-green-800",
            border: "border-green-800",
        },
        error: {
            bg: " bg-red-800 bg-opacity-25 text-red-800 border-red-800",
            title: "text-red-800",
            border: "border-red-800",
        },
    };

    return (
        <div
            className={
                alertType[props.alertType].bg +
                " max-w-lg  rounded border  border-opacity-50 " +
                props.className
            }
        >
            <div
                className={
                    "flex flex-row items-center space-x-2 p-2 text-xl font-semibold " +
                    alertType[props.alertType].title
                }
            >
                {(() => {
                    switch (props.alertType) {
                        case "success":
                            return <Success />;
                        case "error":
                            return <Error />;
                        default:
                            return <></>;
                    }
                })()}

                <span>{props.title}</span>
            </div>
            <hr className={alertType[props.alertType].border} />
            <div className="p-2">{props.children}</div>
        </div>
    );
}
