import axiosInstance from "./axios/axiosInstance";

export const getMessage = async () => {
    const res = await axiosInstance.get("/api/message");

    return res.data;
};
