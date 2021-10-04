let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const { find } = require("cheerio/lib/api/traversing");

// request is a high order function
request(matchlink , cb);

function cb(error , response , data){
    // console.log(data);
    // fs.writeFileSync("./match.html" , data);
    getHighestWicketTaker(data);
}

// let htmlkadata = fs.readFileSync("match.html" , "");

// console.log(myDocument);
// let matchinfo = myDocument(".status-text span").text();
// console.log(matchinfo);


function getHighestWicketTaker(data){
    let myDocument = cheerio.load(data);
    let bowlingtables = myDocument(".table.bowler");
     fs.writeFileSync("./bowlingtables.html" , bowlingtables+"");
    
     // console.log(bowlingtables);
 
    let highestwicketname;
    let highestwickettaken;
    let economyofhighestwickettaker;

     for(let i=0 ; i<bowlingtables.length ; i++){
         let singlebowlingtable = myDocument(bowlingtables[i]);
         let alltablerows = singlebowlingtable.find("tbody tr");

         for(let j=0 ; j<alltablerows.length ; j++){
             let alltds =  myDocument(alltablerows[j]).find("td");

             if(i==0 && j==0){
                 highestwicketname = myDocument(alltds[0]).text();
                 highestwickettaken = myDocument(alltds[4]).text();
                 economyofhighestwickettaker = myDocument(alltds[5]).text();
             }
             else{
                 let currentwickets = myDocument(alltds[4]).text();
                 let currenteconomy = myDocument(alltds[5]).text();
                 if(currentwickets > highestwickettaken && currenteconomy < economyofhighestwickettaker){
                    highestwicketname = myDocument(alltds[0]).text();
                    highestwickettaken = currenteconomy
                    economyofhighestwickettaker =currenteconomy;
                 }
             }
         }
     }
     console.log("highestWicketTaker : " + highestwicketname);
     console.log("highestWicketsTaken : " + highestwickettaken);
     console.log("Best Economy : " + economyofhighestwickettaker);
}
    