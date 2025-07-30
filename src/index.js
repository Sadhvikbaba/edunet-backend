import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './DB/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config({
  path : ".env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running on http://localhost:${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("Mongo DB connection failed :",err);
})

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from './routes/auth.routes.js';
import PostRoutes from './routes/post.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/post', PostRoutes);

// Error handling
app.use(errorHandler);