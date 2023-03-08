import { useReducer, useCallback } from "react";

const initialState = {
    status: "",
    error: null,
    data: null,
};

const httpReducer = (state, action) => {
    switch (action.type) {
        case "PENDING": {
            return {
                status: "pending",
                error: null,
                data: null,
            };
        }
        case "SUCCESS": {
            return {
                status: "success",
                error: null,
                data: action.data,
            };
        }
        case "ERROR": {
            return {
                status: "error",
                error: action.error,
                data: null,
            };
        }

        default:
            return initialState;
    }
};

const useHttp = (requestFunction) => {
    const [state, dispatch] = useReducer(httpReducer, initialState);

    const sendRequest = useCallback(
        async (params) => {
            try {
                dispatch({
                    type: "PENDING",
                });
                const res = await requestFunction(params);

                // if (!res.ok) {
                //     throw new Error(res.statusText);
                // }
                // const data = await res.json();

                dispatch({ type: "SUCCESS", data: res });
            } catch (error) {
                dispatch({ type: "ERROR", error: error.message });
            }
        },
        [requestFunction]
    );

    return {
        sendRequest,
        status: state.status,
        error: state.error,
        data: state.data,
    };
};

export default useHttp;
