const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/mernharry";

const connectiondb = async()=>{
    try {
        await mongoose.connect(URL,{

        })
        console.log("Mongodb is Connected!!!")
    } catch (error) {
        console.log(error + "failed to connect")
    }
}


module.exports = connectiondb;