import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';



// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'



const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

// SAVE IMAGES
app.use(express.static('public')); 
app.use('/images', express.static('images'));



// MIDDLEWARE

dotenv.config()

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>app.listen(process.env.PORT, ()=> console.log(`Server is running now at ${process.env.PORT}`)
)).catch((error) => console.log(error))


// USAGE OF ROUTES
app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)