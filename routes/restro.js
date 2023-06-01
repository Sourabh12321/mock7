const express = require("express");

const { restroModel } = require("../models/restroModel");
const restroRouter = express.Router();


restroRouter.post("/", async (req, res) => {
    try {
        const data = new restroModel(req.body);
        await data.save();
        res.status(204).send("restraunt added successfully");
    } catch (error) {
        res.status(404).send(error.message);

    }
})

restroRouter.get("/restaurants", async (req, res) => {
    try {
        const data = await restroModel.find();
        res.send(data)
    } catch (error) {
        res.status(404).send(error.message);

    }
})

restroRouter.get("/restaurants/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await restroModel.findOne({ "_id": id });
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message);

    }
})

restroRouter.get("/restaurants/:id/menu", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await restroModel.findOne({ "_id": id });
        res.status(200).send(data.menu)
    } catch (error) {
        res.status(404).send(error.message);

    }
})

restroRouter.post("/restaurants/:id/menu", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await restroModel.findOne({ "_id": id });
        console.log(data);
        if (data) {
            data.menu.push(req.body);
            await data.save();
            res.status(200).send("item added successfully")
            // res.send("item added successfully");
        }else{
            res.send("restro is not available");
        }

    } catch (error) {
        res.status(404).send(error.message);

    }
})

restroRouter.delete("/restaurants/:id1/menu/:id2", async (req, res) => {
    try {
        const { id1,id2 } = req.params;
        console.log(id1,id2);
        const data = await restroModel.findByIdAndUpdate({ "_id": id1},{$pull :{menu:{"_id":id2}}},{new:true});
       
        res.send("menu deleted successfully");


    } catch (error) {
        res.status(404).send(error.message);

    }
})

module.exports = {
    restroRouter
}