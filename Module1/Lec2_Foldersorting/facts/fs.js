//fs = file system
const fs = require("fs");

//utf = format for plain text
console.log(fs);

 let fskadata = fs.readFileSync("./f1.txt");
 console.log(fskadata + "");  

 fs.writeFileSync("./index.html" , "Hey");
 fs.writeFileSync("../activity/activity.js" , "sjbahcjhjhcjh");