const mongoose = require("mongoose")


async function connectToDb (){
   await mongoose.connect("mongodb+srv://anurag3342507:Qmos8ppI6uogSa55@cluster0.alw8pfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   console.log("Database Connected")
}

module.exports = connectToDb