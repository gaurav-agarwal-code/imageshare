import Router from 'express'
import multer from 'multer'
import { loginUser, logoutUser, registerUser,  userData } from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()
const upload = multer()

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(upload.none(), loginUser);

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/data").post(verifyJWT, userData)

export default router