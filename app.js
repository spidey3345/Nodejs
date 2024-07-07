const express = require("express")
const app = express()

app.set('view engine', 'ejs')

app.get("/", (req,res)=>{
    res.send("<h1>haha, this is about page</h1>")
})

app.get("/about", (req,res) => {
    const name = "Anurag sharma"
    res.render("about.ejs" , {name:name})
})

app.get("/contact", (req,res)=>{
    const name = "ACES WORKSHOP"
    res.render("contact.ejs" , {name})
})

app.listen(3000,()=>{
    console.log("Nodejs project has started at port " + 3000)
})

