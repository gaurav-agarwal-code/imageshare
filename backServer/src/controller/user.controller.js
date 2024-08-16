import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { Image } from '../models/image.model.js'
import jwt from 'jsonwebtoken';

const base_url= process.env.BASE_URI

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV==="production",
    path: "/",
    expires: new Date(Date.now() + 86400000)
}

const generateAccessAndrefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    console.log("Request Body:", req.body);

    const { username, email, password } = req.body;
    console.log("email:", email);

    if ([username, email, password].some((fields) => fields?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExist) throw new ApiError(401, "username/email already exist")

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id)

    if (!createdUser) throw new ApiError(500, "Error while registering user")

    return res.status(200).json(
        new ApiResponse(201, createdUser, "registered succesfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Provide username or email");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) throw new ApiError(401, "Account not found");

    const isPassValid = await user.isPasswordCorrect(password)

    if (!isPassValid) {
        throw new ApiError(401, "invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndrefreshTokens(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: loggedUser, accessToken, refreshToken
                },

                "user logged in...."
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    // console.log("till controller log out");
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const shareImage = asyncHandler(async (req, res) => {
    const fileObj = {
        imagePath: req.file.path,
        name: req.file.originalname
    };
    try {
        const file = await Image.create(fileObj);
        res.status(200).json(`${base_url}/api/v1/user/file/${file._id}`);
    } catch (error) {
        console.log("Controller share error:", error);
        res.status(500).json({ message: "Error uploading file", error: error.message });
    }
});

const downloadImage = asyncHandler(async (req, res) => {
    try {
        const file = await Image.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        file.downloadContent += 1;
        await file.save();

        res.download(file.imagePath, file.name);
    } catch (error) {
        console.log("Download controller error:", error);
        res.status(500).json({ message: "Error downloading file", error: error.message });
    }
});

const userData = asyncHandler(async (req, res) => {
    try {
        const user = req.user
        return res.status(200).json(user)
    } catch (error) {
        throw new ApiError(500, "user fetch controller error")
    }
})

export { registerUser, loginUser, logoutUser, refreshAccessToken, shareImage, downloadImage, userData }