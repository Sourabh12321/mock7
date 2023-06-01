const express = require("express");

const { orderModel } = require("../models/orderModel");
const orderRouter = express.Router();

orderRouter.post("/orders", async (req, res) => {
    try {
        const data = new orderModel(req.body);
        await data.save();
        res.status(201).send("restraunt added successfully");
    } catch (error) {
        res.status(404).send(error.message);

    }
})

orderRouter.get("/orders/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const data = await orderModel.findOne({"_id":id});
       
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);

    }
})

orderRouter.patch("/orders/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const data = await orderModel.findByIdAndUpdate({"_id":id},{status:status});
       
        res.send("status updated successfully");
    } catch (error) {
        res.status(404).send(error.message);

    }
})


module.exports = {
    orderRouter
}
