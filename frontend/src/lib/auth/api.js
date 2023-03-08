import axiosInstance from "../axios/axiosInstance";

export const loginRequest = async (params) => {
    const res = await axiosInstance.post("/auth/jwt/create", {
        ...params,
    });
    return res.data;
};

export const getUserInfo = async (params) => {
    const res = await axiosInstance.get("/auth/users/me", {});
    return res.data;
};
