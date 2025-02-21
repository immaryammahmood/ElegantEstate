import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.js'
import cors from "cors"

app.use(cors({
    origin: "https://elegant-estate.vercel.app/",
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}))


dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDb is connected succesfully...");
}).catch((err) =>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
