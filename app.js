const express = require("express");
const connectToDb = require("./database/databseConnection");
const Blog = require("./model/blogmodel");
const app = express();
const bcrypt = require("bcrypt");
// const multer = require("./middleware.multiConfig").multer

const { multer, storage } = require("./middleware/multerConfig");
const user = require("./model/authecmodel");
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();

app.use(express.static("./storage"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const blogs = await Blog.find(); //always returns array
  if (blogs.length === 0) {
    console.log("nothing is found");
  }
  res.render("./blog/home.ejs", { blogs });
});

app.get("/about", (req, res) => {
  const name = "Anurag sharma";
  res.render("about.ejs", { name: name });
});

app.get("/blog/:id", async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  const blog = await Blog.findById(id);
  res.render("./blog/singleblog", { blog });
});
app.get("/deleteblog/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
app.get("/editblog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  res.render("./blog/editblog", { blog });
});

app.post("/editblog/:id", async (req, res) => {
  const id = req.params.id;
  // const title = req.body.title
  // const subtitle = req.body.subtitle
  // const desc
  const { title, subtitle, description } = req.body;
  await Blog.findByIdAndUpdate(id, {
    title: title,
    subtitle: subtitle,
    description: description,
  });
  res.redirect("/blog/" + id);
});

app.get("/contact", (req, res) => {
  const name = "ACES WORKSHOP";
  res.render("contact.ejs", { name });
});
app.get("/register", (req, res) => {
  res.render("./blog/register");
});
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);
  await user.create({
    email: email,
    username: username,
    password: bcrypt.hashSync(password, 12),
  });
  res.send("User registered successfully");
});
app.get("/login", (req, res) => {
  res.render("./blog/login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const data = await user.find({
    username,
  });

  if (data.length === 0) {
    res.send("user not registeres");
  } else {
    const ismatched = bcrypt.compareSync(password,data[0].password)
    if(!ismatched){
        res.send("invalid password")
    }else{
        res.send("logged in")
    }

  }
});

app.get("/createblog", (req, res) => {
  res.render("./blog/create.ejs");
});

app.post("/createblog", upload.single("image"), async (req, res) => {
  // const title = req.body.title
  // const subtitle = req.body.subtitle
  // const description = req.body.description
  const filename = req.file.filename;
  console.log(filename);
  const { title, subtitle, description, image } = req.body;
  console.log(title, subtitle, description);

  await Blog.create({
    //  we could also do this is name are same
    //  title,
    //  subtitle,
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  });

  res.send("Blog Created Successfully");
});

app.listen(3000, () => {
  console.log("Nodejs project has started at port " + 3000);
});
