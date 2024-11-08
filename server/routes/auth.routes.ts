import express from "express"
import * as auth from "../controllers/auth.controller"

const router = express.Router()

router.get("/test", auth.test)

export default router