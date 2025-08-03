import { Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { createSnippet, deleteSnippet, updateSnippet, viewSnippet } from "../controllers/snippet.controller.js";

const router = Router(); // snippet router

router.route('/create').post(
    verifyJWT,
    createSnippet
)

router.route('/delete/:id').delete(
    verifyJWT,
    deleteSnippet  
)

router.route('/update/:id').patch(
    verifyJWT,
    updateSnippet  
)

router.route('/:id').post(
    verifyJWT,
    viewSnippet
)

export default router;