const express = require("express")
const connectToDb = require("./database/databseConnection")
const Blog = require("./model/blogmodel")
const app = express()
// const multer = require("./middleware.multiConfig").multer

const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage:storage})


app.use(express.json())
app.use(express.urlencoded({extended : true}))
connectToDb()

app.use(express.static("./storage"))
app.set('view engine', 'ejs')

app.get("/", async(req,res)=>{
    const blogs = await Blog.find()//always returns array
    if(blogs.length === 0){
    console.log("nothing is found")
    }
    res.render("./blog/home.ejs" , {blogs})
})

app.get("/about", (req,res) => {
    const name = "Anurag sharma"
    res.render("about.ejs" , {name:name})
})

app.get("/blog/:id",async (req,res)=>{
    // console.log(req.params.id)
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.render("./blog/singleblog",{blog})
})
app.get("/deleteblog/:id" ,async (req,res)=>{
    const  id =req.params.id
   await Blog.findByIdAndDelete(req.params.id)
   res.redirect("/")
})
app.get("/editblog/:id",async(req,res)=>{
    const id= req.params.id
    const blog = await Blog.findById(id)
    res.render("./blog/editblog",{blog})
})

app.get("/contact", (req,res)=>{
    const name = "ACES WORKSHOP"
    res.render("contact.ejs" , {name})
})

app.get("/createblog", (req,res)=> {
    res.render("./blog/create.ejs")
})

app.post("/createblog",upload.single('image') ,async(req,res) => {
    // const title = req.body.title
    // const subtitle = req.body.subtitle
    // const description = req.body.description
    const filename = req.file.filename;
    console.log(filename)
    const{title, subtitle ,description,image} = req.body
    console.log(title,subtitle,description)

    await Blog.create({

        //  we could also do this is name are same 
        //  title,
        //  subtitle,
        title : title,
        subtitle : subtitle,
        description : description,
        image : filename
    })

    res.send("Blog Created Successfully")
})

app.listen(3000,()=>{
    console.log("Nodejs project has started at port " + 3000)
})

