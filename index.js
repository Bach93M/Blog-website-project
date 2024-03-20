import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let blogs = [];

let index;

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogs});

});

app.get("/create", (req, res) => {
    res.render("create.ejs", {blogs: blogs});
});



app.post("/create", (req, res) => {
let blog = {
    name: req.body.name,
    title: req.body.title,
    content: req.body.content
};
    blogs.push(blog);
    res.render("index.ejs", {blogs: blogs});
});

app.get("/view", (req, res) => {
    res.render("view.ejs", {blogs: blogs});
});

app.post("/view", (req, res) => {
    res.render("view.ejs", {blogs: blogs});
});

app.get("/edit", (req, res) => {
    index = req.body.edit;
    
    res.render("edit.ejs", {blogs: blogs, editName: blogs[index].name, editTitle: blogs[index].title, editContent: blogs[index].content});
});

app.post("/edit", (req, res) => {
    index = req.body.edit;

    res.render("edit.ejs", {blogs: blogs, editName: blogs[index].name, editTitle: blogs[index].title, editContent: blogs[index].content});
});


app.post("/change", (req, res) => {
    blogs[index].name = req.body.name;
    blogs[index].title = req.body.title;
    blogs[index].content = req.body.content;

    res.redirect("/view");
});


app.post("/delete", (req, res) => {
    blogs.splice(req.body.delete, 1);
    res.render("view.ejs", {blogs: blogs});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });