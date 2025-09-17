import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import binRouter from "./routers/bin.routers.js"

const app = express()

app.use(cors({
  origin: "https://smartbin-theta.vercel.app",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/bin",binRouter);
export default app