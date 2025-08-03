import { Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { getAllSnippets, loginUser, logoutUser, registerUser, updateAccessToken } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(
    registerUser
)

router.route('/login').post(
    loginUser
)

router.route('/logout').post(
    verifyJWT,
    logoutUser
)

router.route('/update-access-token').post(
    verifyJWT,
    updateAccessToken
)

router.route('/get-all-snippets').post(
    verifyJWT,
    getAllSnippets
)

export default router