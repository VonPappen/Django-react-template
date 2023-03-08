import React from "react";
// import classes from "./Spinner.module.css";

export default function Spinner(props) {
    const size = {
        xs: "h-5 w-5",
        sm: "h6 w-6",
        m: "h-8 w-8",
        lg: "h-10 w-10",
        xl: "h-12 w-12",
        "2xl": "h14 w-14",
        "3xl": "h-16 w-16",
    };

    return (
        <div
            className={`${props.size ? size[props.size] : size.md}  
            ${
                props.color ? props.color : "border-t-sky-500"
            } animate-spin rounded-full border-4 ${props.className}`}
        ></div>
    );
}
