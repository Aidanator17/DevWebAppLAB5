/*
 Authors:
Aidan Christopher A01233406
Illan Sempere A01233382
*/
const express = require("express");
const fs = require('fs')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
    let bod = req.body
    let movies_list = bod.movlist.split(',')
    res.render('pages/index.ejs',{movies_list})
    console.log(movies_list)
});

app.get("/myListQueryString", (req, res) => {
  let movies_list = []
  movies_list.push(req.query.movie1)
  movies_list.push(req.query.movie2)
  console.log(movies_list)
  res.render('pages/index.ejs',{movies_list})
});

app.get("/search/:movieName", (req, res) => {
  fs.readFile('movieDescriptions.txt', "utf8",(callback, description)=>{
    lineslist = description.split('\n')
    for (item in lineslist){
      if (String(lineslist[item]).toLowerCase().includes(String(req.params.movieName))){
        let newlist = String(lineslist[item]).split(':')
        let title = newlist[0]
        let desc = newlist[1]
        console.log(title,desc)
        res.render('pages/searchResult.ejs',{title, desc})
      }
    }
    let title='Movie could not be found'
    let desc = ''
    res.render('pages/searchResult.ejs',{title,desc})
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});