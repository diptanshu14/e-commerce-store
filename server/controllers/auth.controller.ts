import { Request, Response } from "express";

export const test = async (req:Request, res:Response) => {
    res.send("test routes are working")
}