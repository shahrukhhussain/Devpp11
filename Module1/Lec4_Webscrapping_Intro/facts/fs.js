//In dev pp11
//npm init -y
//npm install cheerio

const fs = require("fs");
const cheerio = require("cheerio");

let htmlkadata = fs.readFileSync("./index.html" , "utf8");
// console.log(htmlkadata);

//html file is loaded in cheerio
let myDocument = cheerio.load(htmlkadata);

let h1kadata = myDocument("h2").text();
console.log(h1kadata);