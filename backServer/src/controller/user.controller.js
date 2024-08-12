import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'

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

const options = {
    httpOnly: true,
    secure: true
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
    console.log("email:", email);

    if (!(username || email)) {
        throw new ApiError(400, "provide username or password")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) throw new ApiError(401, "account not found")

    const isPassValid = await user.isPasswordCorrect(password)

    if (!isPassValid) {
        throw new ApiError(401, "invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndrefreshTokens(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    console.log("acs: ", accessToken,"ref: ", refreshToken);

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

const logoutUser = asyncHandler(async(req,res)=>{
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

export { registerUser, loginUser, logoutUser }