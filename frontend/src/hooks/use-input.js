import { useState } from "react";

const useInput = (validateFn) => {
    const [inputValue, setInputValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const changeHandler = (e) => {
        setInputValue(e.target.value);
    };
    const blurHandler = (e) => {
        setIsTouched(true);
    };

    const isValid = validateFn(inputValue);
    const hasError = !isValid && isTouched;

    return {
        inputValue,
        changeHandler,
        blurHandler,
        hasError,
        isValid,
        isTouched,
    };
};

export default useInput;
