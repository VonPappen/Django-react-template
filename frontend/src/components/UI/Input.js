import React from "react";

export default function Input(props) {
    return (
        <>
            <label className={props.labelClassName} htmlFor="">
                {props.label}
            </label>
            <input
                className={
                    "p-2 border rounded border-gray-500 " + props.className
                }
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </>
    );
}
