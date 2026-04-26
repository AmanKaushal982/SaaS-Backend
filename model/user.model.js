import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    subscribe: {
        type: Boolean,
        default: false
    },
    authProvider: {
        type: String,
        enum: ["local", "google", "apple", "binance", "wallet"],
        default: "local"
    },
    providerId: {
        type: String,
        default: null
    }
}, { timestamp: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


const User = mongoose.model("User", userSchema);
export default User;
