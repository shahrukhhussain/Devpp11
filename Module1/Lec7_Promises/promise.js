const  fs = require("fs");
//sync function
//async function
//Promisified fxn
                                                         //// **********************/Promise is a Inbuilt fxn of fs******************
// pendingPromise B ki taraf se dekheenge ya sochenege

let pendingPromise = fs.promises.readFile("./f1.txt", "utf8");

console.log(pendingPromise);

// promise ka object uske pass do function then() and catch();

// then function attaches a success callback to the pendingPromise
pendingPromise.then(function(data){
    console.log("inside scb");
    console.log(pendingPromise);
    console.log(data+"");
})

pendingPromise.catch(function(error){
    console.log("inside fcb");
    console.log(error);
})