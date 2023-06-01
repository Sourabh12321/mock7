const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {

        const decode = jwt.verify(token, process.env.KEY);
        if (decode) {
            next()
        } else {
            res.send("login again");
        }
    } catch (error) {
        res.send("login again");
        console.log("login again");
    }
}

module.exports = {
    auth
}