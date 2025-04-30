import express from "express";
import { PrismaClient } from "@prisma/client";
import {generateToken} from "../services/Jwt.js";

const Auth=express.Router();
const prisma = new PrismaClient();

Auth.post("/api/signup", async (req ,res )=>{
    const {name,email,password}=req.body;
    try{
        await prisma.user.create({
            data:{
                name,
                email,
                password,
                usage:0.0
            }
        });
        res.status(200).json({
            message:"user created successfully"
        })

    }catch(error){
        console.log( "error while registoring user:"+error);
        console.log(error.code);
        if(error.code == 'P2002' ){
            res.status(400).json({"error":"User with this email is already exists"});
        }else{
            res.status(500).json({"error":"internal server error"});
        }
    }
});

Auth.post("/api/signin",async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        });
        if(user){
            if(user.password == password){
                const token=generateToken(user);
                res.status(200).json({token});
            }else{
                res.status(403).json({message:"wrong password"});
            }
        }else{
            res.status(404).json({error:"email not found"});
        }
    } catch(error){
        console.log( "error while registoring user:"+error);
        console.log(error.code);
        res.status(500).json({"error":"internal server error"});
    }
});

export default Auth;