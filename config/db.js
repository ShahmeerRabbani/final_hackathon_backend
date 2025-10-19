const mongoose = require("mongoose")

const connectDB = async () => {
    mongoose.connect("mongodb+srv://ShahmeerSaleem:shAhmEer32492@cluster0.iz89k.mongodb.net/").then((res) => {
        console.log("Mongodb Connected Successfully")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB