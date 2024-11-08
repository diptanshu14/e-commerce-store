import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { UserType } from "../lib/types"

const userSchema = new mongoose.Schema<UserType>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be atleast 8 characters long"]
    },
    cartItems: [{
        quantity: {
            type: Number,
            default: 0
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    }],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error: any) {
        next(error)
    }
})

userSchema.methods.comparePasswords = async function (password: string) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

export default User