import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";

const verifyJWT = asyncHandler(async (req,_,next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!token)
        {
            throw new ApiError(401,"Unauthorized request, Missing token");
        }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401,"Invalid token access");
        }
    
        req.user = user;

        next();
    }
    catch(err){
        throw new ApiError(401,"Invalid access token");
    }
})

export {
    verifyJWT
}