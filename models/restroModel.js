const mongoose = require("mongoose");


const restroSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{
        name: String,
        description: String,
        price: Number,
        image: String
    }]
})

const restroModel = mongoose.model("restro", restroSchema);

module.exports = {
    restroModel
}