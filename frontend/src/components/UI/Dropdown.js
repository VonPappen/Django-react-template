import { useRef, useState } from "react";
import useClickAwayWrapper from "../../hooks/use-click-away";

const Dropdown = (props) => {
    const wrapperRef = useRef(null);

    useClickAwayWrapper(wrapperRef, () => props.onClickAway());

    return (
        <div ref={wrapperRef} className={props.className}>
            {props.children}
        </div>
    );
};

export default Dropdown;
