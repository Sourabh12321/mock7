const express = require("express");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const {userModel} = require("../models/userModel")
const userRouter = express.Router();



userRouter.post("/register",async (req,res)=>{
    try {
        const {name,email,password,address:{street,city,state,country,zip}} = req.body;

        const data = await userModel.findOne({"email":email});
        if(data){
            res.status(404).send("user is already registered");
        }else{
            bcrypt.hash(password,5, async(err,hash)=>{
                if(err){
                    res.status(404).send("something went wrong");
                }else{
                    const value = new userModel({name,email,password:hash,address:{street,city,state,country,zip}})
                    await value.save();
                    res.status(201).send("user registered successfully");
                }
            })
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body;

        const data = await userModel.findOne({"email":email});
        if(data){
            bcrypt.compare(password,data.password,async(err,decode)=>{
                if(decode){
                    let token = jwt.sign({email:data.email},"food",{expiresIn:"7d"});
                    res.status(201).send({"msg":"user login successfully",token});

                }else{
                    res.status(404).send("wrong password");
                }
            })
        }else{
            res.status(404).send("user is not registered");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

userRouter.post("/:id/reset",async (req,res)=>{
    try {
        const {id} = req.params;
        const {newPassword,password} = req.body;

        const data = await userModel.findOne({"_id":id});
        if(data){
            bcrypt.compare(password,data.password,async(err,decode)=>{
                if(decode){
                    bcrypt.hash(newPassword,5, async(err,hash)=>{
                        if(hash){
                            const data = await userModel.findByIdAndUpdate({"_id":id},{password:hash})
                            res.status(204).send({"msg":"password reset successfully"});
                        }else{
                            res.status(404).send("somenthing went wrong");
                        }
                    })
                    
                }else{
                    res.status(404).send("wrong password");
                }
            })
        }else{
            res.status(404).send("user is not registered");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})





module.exports = {
    userRouter
}