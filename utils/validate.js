import validator from 'validator';
export const validateRegister = (email, password) => {
    const errors = {};
    if (!email || !password) {
        errors.email = 'email is requried';
        errors.password = 'passoword is required'
    }
    if (!validator.isEmail(email)) {
        errors.email = 'write valid email';
    }
    if (!validator.isLength(password, { min: 8 })) {
        errors.password = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter.'
    }
    if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one number.";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.password = "Password must contain at least one special character.";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
};
export const validateLogin = (email, password) => {
    const errors = {};
    if (!email || !password) {
        errors.email = 'email is required';
        errors.password = 'password is required';
    }
    else if (!validator.isEmail(email)) {
        errors.email = 'enter a valid email address';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
}