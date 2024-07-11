const mongoose = require("mongoose")
const schema = mongoose.Schema

const userschema = new schema ({
    email : {
        type : String
    },
    username:{
        type : String
    },
    password : {
        type : String
    }
})
const user = mongoose.model("user",userschema)
module.exports = user