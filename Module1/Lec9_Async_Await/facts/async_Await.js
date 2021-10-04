//async => It Can be Used before a Fxn name

//await => it can only be used inside a async fxn!!

//IIFE => Immediately Invoked Function Expressions

const fs = require("fs");

console.log("start");

async function CallMe(){
    try{
console.log("Hello World!!");
console.log("I m inside async fxn !!");
let f1pp = fs.promises.readFile("./f1.txt" , "utf-8");
let f2pp = fs.promises.readFile("./f2.txt" , "utf-8");
let bothFilesData = await Promise.all([f1pp , f2pp]);
console.log(bothFilesData);
    }
    catch{
    console.log(error);
    }
}
CallMe();

console.log("end");