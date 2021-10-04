let files = ["../f1" , "../f2" , "../f3"];

const fs = require("fs");

for(int i=0 ; i<files.length ; i++){
    fs.readFile(files[i] , function(err , data)){
        console.log(data+"");
    }
}