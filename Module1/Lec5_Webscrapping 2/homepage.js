let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

request(matchlink, function (err, res, data) {
    processData(data);
});


function processData(html){
    let myDocument = cheerio.load(html+"");

    //1.)
    let atag = myDocument(".widget-items.cta-link a");///jab bhi koi selector se laate h to usko cheerio vale myDocument m WRAP krna hota h
    // let a = myDocument(atag[0]).attr("href");
    // console.log("https://www.espncricinfo.com" + a);//using chherio fxn of finding attribute

    // 2.)
    let allMatchLink = "https://www.espncricinfo.com" + atag.attr("href"); 

    //3.)
    // let allMatchLink = "https://www.espncricinfo.com" + atag["0"].attribs.href;
    // console.log(allMatchLink);
   
    getAllMatches(allMatchLink);

}
 
