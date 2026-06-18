import ApiError from "../utils/ApiError.utils.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.accessToken

    if(!token){
        throw new ApiError()
    }


    
    
    console.log(token)
}