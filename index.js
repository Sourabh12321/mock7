const express = require("express");
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user")
const {auth} = require("./middleware/auth")
const {restroRouter} = require("./routes/restro")
const {orderRouter} = require("./routes/order")
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use(auth);
app.use("/order",orderRouter);
app.use("/restro",restroRouter);



app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("started the server")
    } catch (error) {
        console.log(error.message);
    }
})