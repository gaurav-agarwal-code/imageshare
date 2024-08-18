import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'


const app=express()

app.use(cors({
    origin: "http://localhost:5173" || "http://localhost:8000",
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.static('public'));


app.use("/api/v1/user", userRouter)

export {app}