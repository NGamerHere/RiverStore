import express from "express";
import dotenv from "dotenv";
import Auth from "./routes/Auth.js";
dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(Auth);

app.all("/api/*",(req,res)=>{
    res.status(404).json({error:"Invalid address not found"})
})

const port=process.env.SERVER_PORT;
app.listen( port,()=>{
    console.log("server was started at the port:"+port);
});