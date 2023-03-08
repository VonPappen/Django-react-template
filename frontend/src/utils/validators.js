// validators function should accept an argument and return true or false

export const isEmail = (email) => {
    return email.trim().includes("@");
};

export const isMin6Length = (password) => {
    return password.trim().length >= 6;
};
