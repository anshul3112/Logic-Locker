import { Router } from 'express';
import { getResponse } from '../controllers/summary.controller.js';
import { verifyJWT } from '../middleware/authMiddleware.js'; // Assuming you want to protect this route

const router = Router();

router.route("/").post(
    verifyJWT,
     getResponse
);

export default router;