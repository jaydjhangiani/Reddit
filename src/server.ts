import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import morgan  from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

import authRoutes from './routes/auth'
import postRoutes from './routes/post'
import subRoutes from './routes/sub'
import miscRoutes from './routes/misc'
import userRoutes from './routes/users'

import trim from './middleware/trim'

const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
}))
app.use(express.static('public'))

app.get('/',(_,res) => res.send('Hello World!'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api/users', userRoutes)

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`)

    try {
        await createConnection()
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.log("error", error)
    }
})
