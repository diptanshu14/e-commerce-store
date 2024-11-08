import mongoose from "mongoose"

export type UserType = {
    name: string
    email: string
    password: string
    cartItems: Array<{
        quantity: number
        product: mongoose.Schema.Types.ObjectId
    }>
    role: "customer" | "admin"
}