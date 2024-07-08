const express = require("express")
const connectToDb = require("./database/databseConnection")
const Blog = require("./model/blogmodel")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
connectToDb()
Blog


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

app.get("/createblog", (req,res)=> {
    res.render("./blog/create.ejs")
})

app.post("/createblog",async(req,res) => {
    // const title = req.body.title
    // const subtitle = req.body.subtitle
    // const description = req.body.description
    const{title, subtitle ,description} = req.body
    console.log(title,subtitle,description)

    await Blog.create({

        //  we could also do this is name are same 
        //  title,
        //  subtitle,
        title : title,
        subtitle : subtitle,
        description : description
    })

    res.send("Blog Created Successfully")
})

app.listen(3000,()=>{
    console.log("Nodejs project has started at port " + 3000)
})

