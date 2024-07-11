const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("root is working");
})

main()
.then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookHub');

}

app.use("/listings",books);