import Router from 'express'
import upload from '../middleware/multer.middleware.js'
import { loginUser, logoutUser, registerUser, shareImage, downloadImage, userData } from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(upload.none(), loginUser);

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/data").post(verifyJWT, userData)

//share
router.route("/share").post(upload.single('file'), shareImage)
router.route("/file/:fileId").get(downloadImage);

export default router