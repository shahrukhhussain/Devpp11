let matchlink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

const request = require("request");
const cheerio = require("cheerio");

request(matchlink, function (err, r, data) {
    getHighestSixes(data);
})

function getHighestSixes(data) {
    let HighestSixes = 0;
    let BatsmanName = "";
    let StrikeRate = 0;

    let myDocument = cheerio.load(data);

    let batsmantable = myDocument(".table.batsman");
    for (let i = 0; i < batsmantable.length; i++) {
        let oneteambatsmantable = myDocument(batsmantable[i])

        let alltrs = oneteambatsmantable.find(" tbody tr");



        for (let j = 0; j < alltrs.length; j=j+2) {   ///j is incread by 2 coz hume batsman table main 1 row skip krni h
            let alltds = myDocument(alltrs[j]).find("td");   ///This is called wrapping of data in myDocument using selectors

            
                //  console.log(myDocument(alltds[0]).text());
                //  console.log(myDocument(alltds[6]).text());
                //  console.log(myDocument(alltds[7]).text());

                //  if(alltds.length == 8){

                //  }


                // if(i==0 && j==0){
                //     HighestSixes = myDocument(alltds[6]).text();
                //     BatsmanName = myDocument(alltds[0]).text();
                //     StrikeRate = myDocument(alltds[7]).text();
                // }

                let currentsixes = myDocument(alltds[6]).text();
                let currentstrikerate = myDocument(alltds[7]).text();


                if (currentsixes > HighestSixes || currentsixes == HighestSixes && currentstrikerate > StrikeRate) {
                    HighestSixes = currentsixes;
                    BatsmanName = myDocument(alltds[0]).text();
                    StrikeRate = currentstrikerate;
                }
            


        }



    }
    console.log("BatsmanNmae : " + BatsmanName);
    console.log("HighestSixes : " + HighestSixes);
    console.log("StrikeRate : " + StrikeRate);


}