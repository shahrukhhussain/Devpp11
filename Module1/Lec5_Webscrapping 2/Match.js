const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

//  let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";


function ProcessMatch(matchLink) {
    request(matchLink, function (error, response, data) {
        processData(data);
    })
}

function processData(html) {
    let myDocument = cheerio.load(html+"");
    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    // console.log(bothInnings.length);
    for (let i = 0; i < bothInnings.length; i++) {
        let oneInning = myDocument(bothInnings[i]);

        let teamName = oneInning.find("h5").text();


        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);

        let alltrs = oneInning.find(".table.batsman tbody tr")
        // console.log(alltrs);
        for (let j = 0; j < alltrs.length; j++) {
            let alltds = myDocument(alltrs[j]).find("td");
            if (alltds.length == 8) {
                let batsmanName = myDocument(alltds[0]).text().trim();
                let runs = myDocument(alltds[2]).text().trim();
                let balls = myDocument(alltds[3]).text().trim();
                let fours = myDocument(alltds[5]).text().trim();
                let sixes = myDocument(alltds[6]).text().trim();
                let strikeRate = myDocument(alltds[7]).text().trim();
                // console.log(`Batsman = ${batsmanName} Runs = ${runs} balsfaced = ${balls} fours = ${fours} sixes = ${sixes} strike rate = ${strikerate}`);
                processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }
        
    }
    console.log("#####################################");
}





function checkTeamFolder(teamName){
    // teamFolderPath = "./IPL/Delhi Capitals"
    let teamFolderPath = `./IPL/${teamName}`;
    return fs.existsSync(teamFolderPath);
}
function checkBatsmanFile(teamName , batsmanName){
    // "./IPL/Delhi Capitals/Rishabh pant.json"
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanFilePath);
}
function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath));
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync( batsmanFilePath , JSON.stringify(batsmanFile) );
}
function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync( batsmanFilePath , JSON.stringify(batsmanFile) );
}
function createTeamFolder(teamName){
    let teamFolderPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamFolderPath);
}

function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let isTeamFolder = checkTeamFolder(teamName);
    if(isTeamFolder){
        let isBatsmanPresent = checkBatsmanFile(teamName , batsmanName);
        if(isBatsmanPresent){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}



module.exports = ProcessMatch;