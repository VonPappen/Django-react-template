import { useEffect } from "react";

const useClickAwayWrapper = (ref, clickOutsideFunction) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                clickOutsideFunction();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export default useClickAwayWrapper;
