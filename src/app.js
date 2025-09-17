import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import binRouter from "./routers/bin.routers.js"

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/bin",binRouter);
export default app