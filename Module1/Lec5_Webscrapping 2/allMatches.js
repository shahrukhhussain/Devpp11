const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const ProcessMatch = require("./Match");

function getAllMatches(allMatchLink) {
    request(allMatchLink, function (err, res, data) {
        processData(data);
    });
}


function processData(html){
    // console.log(html);
    // fs.writeFileSync("./allmatchdetails.html" ,html );
    let myDocument = cheerio.load(html+"");
    let allAtags = myDocument(".match-cta-container a[data-hover='Scorecard']");//.match-cta-container a[data-hover='report']
    //  console.log(allAtags);

    for(let i=0 ; i<allAtags.length ; i++){
         let matchLink = "https://espncricinfo.com" + myDocument(allAtags[i]).attr("href");   
        //  allAtags[i]["43"].attribs.href;
        //console.log("MatchLink :" +  matchLink);
        // console.log(matchLink);
        ProcessMatch(matchLink);
    }
}
    


module.exports = getAllMatches;