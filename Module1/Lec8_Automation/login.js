//puppeteer is a fxn created by google for testing
const puppeteer = require("puppeteer");
const id = "nalax19381@edmondpt.com";
const pw = "123456";
let tab;
let idx;
let gCode;



//puppeteer gves a promisified fxn
let BrowserkaPromise = puppeteer.launch({ headless: false, defaultViewport: null, args: ["--start-maximized"], });
// console.log(BrowserkaPromise);//This will give us pending promise
BrowserkaPromise.then(function (browser) {

  //  console.log(BrowserkaPromise);
  console.log("Browser is Opened")
  return browser.pages();
})
  .then(function (pages) {
    tab = pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login");
  })
  .then(function () {
    console.log("On Hackerank page homepage");
  })
  .then(function () {
    return tab.type("#input-1", id);
  })
  .then(function () {
    return tab.type("#input-2", pw);
  })
  .then(function () {
    return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"); // login hojata hai click se
  })
  //   .then(function(){
  //       return tab.waitForSelector("#base-card-1-link" , {visible : true});
  //   })
  //   .then(function(){
  //     return tab.click("#base-card-1-link");
  // })
  // .then(function(){
  //     return tab.waitForSelector("#base-card-7-link" , {visible : true});
  // })
  // .then(function(){
  //   return tab.click("#base-card-7-link");
  // })


  .then(function () {
    return waitAndClick("#base-card-1-link");
  })
  .then(function () {
    return waitAndClick(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled");
  })
  .then(function () {
    return tab.waitForSelector(".js-track-click.challenge-list-item", { visible: true });
  })
  .then(function () {
    return tab.$$(".js-track-click.challenge-list-item")///document.queryselectorAll is running here at the same browser
  })
  .then(function (allQuesArray) {
    let allPendingPromise = [];
    for (let i = 0; i < allQuesArray.length; i++) {
      let oneQtag = allQuesArray[i];
      let pendingPromise = tab.evaluate(function (element) {
        return element.getAttribute("href");
      }, oneQtag)
      allPendingPromise.push(pendingPromise);
    }
    let allPromiseCombined = Promise.all(allPendingPromise);
    // console.log(allPromiseCombined)
    return allPromiseCombined;
  })
  .then(function (allQLinks) {
    // console.log(allQLinks);

      //  *******************SERIES CHAINING used here *********************

    let oneQSolvePromise = solveQues(allQLinks[0]);
    for (let i = 1; i < allQLinks.length; i++) {
      oneQSolvePromise = oneQSolvePromise.then(function () {
        let nextQsolvePromise = solveQues(allQLinks[i]);
        return nextQsolvePromise;
      })
    }
    return oneQSolvePromise;///.then(function(data){ console.log(data)});
  })
  .then(function () {
    console.log("All Q Solved Successfully")
  })

  .catch(function (err) {
    console.log(err);
  });

function handleLockBtn() {
  return new Promise(function (scb, fcb) {
    let waitForLockBtn = tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled" , {visible:true , timeout:5000});
    waitForLockBtn.then(function () {
      return tab.$(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
    })
    .then(function(Button){
      // return Button.click();
      return tab.evaluate(function(ele){ return ele.click()} , Button);
    })
      .then(function () {
        console.log("Lock Found");
        scb();
      })
      .catch(function () {
        console.log("Lock Not Found!!")
        scb();
      })
  })
}

function getCode() {
  return new Promise(function (scb, fcb) {
  
    let waitkaPromise = tab.waitForSelector(".hackdown-content h3", { visible: true });

    waitkaPromise.then(function () {
      return tab.$$(".hackdown-content h3");//queryselectorall fxn is running on DOM
    })
      .then(function (getAllh3tags) {
        //[<h3>c++</h3> , <h3>Python</h3> , <h3>Java</h3>]
        let allCodeNamePromise = [];
        for (let i = 0; i < getAllh3tags.length; i++) {
          let CodeNamePromise = tab.evaluate(function (elem) { return elem.textContent }, getAllh3tags[i])
          allCodeNamePromise.push(CodeNamePromise);
        }
        let combinedPromise = Promise.all(allCodeNamePromise);
        return combinedPromise;
      })
      .then(function (allCodesNames) {
        for (let i = 0; i < allCodesNames.length; i++) {
          if (allCodesNames[i] == "C++") {
            idx = i;
            break;
          }
        }
        return tab.$$(".hackdown-content .highlight");
      })
      .then(function (allCodeDiv) {
        let codeDiv = allCodeDiv[idx];
        return tab.evaluate(function (elem) { return elem.textContent; }, codeDiv);
      })
      .then(function (code) {
        // console.log(code);
        gCode = code;
        scb();
      })
      .catch(function (err) {
        console.log(err);
        fcb(err);
      })
  })
}

function pasteCode() {
  return new Promise(function (scb, fcb) {
    let waitkaPromise = waitAndClick(".checkbox-input");
    waitkaPromise.then(function () {
      return tab.waitForTimeout(2000);

    })
      .then(function () {
        // console.log("On Checkbox page");
        return tab.type(".custominput", gCode);
      })
      .then(function () {
        return tab.keyboard.down("Control");
      })
      .then(function () {
        return tab.keyboard.press("A");
      })
      .then(function () {
        return tab.keyboard.press("X");
      })
      .then(function () {
        return tab.click(".hr-monaco-editor-parent")
      })
      .then(function () {
        return tab.keyboard.press("A");
      })
      .then(function () {
        return tab.keyboard.press("V");
      })
      .then(function () {
        return tab.keyboard.up("Control");
      })
      .then(function () {
        scb();
      })
      .catch(function (err) {
        fcb(err);
      })
  })
}


function waitAndClick(selector) {
  return new Promise(function (scb, fcb) {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise.then(function () {
      return tab.click(selector)
    })
      .then(function () {
        scb();
      })
      .catch(function () {
        fcb();
      });
  })
}

function solveQues(QLink) {
  return new Promise(function (scb, fcb) {
    let gotoPromise = tab.goto("https://www.hackerrank.com" + QLink);
    gotoPromise.then(function () {
      console.log("On editorial page")
      return waitAndClick('div[data-attr2="Editorial"]')
    })
      .then(function () {
        return handleLockBtn();
      })
      .then(function(){
        return tab.waitForTimeout(3000);
      })
      .then(function () {
        return getCode();
      })
      .then(function () {
        return tab.click(".tab-item");///go to problem statement
      })
      .then(function () {
        return pasteCode();
      })
      .then(function () {
        return tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
      })
      .then(function () {
        scb();
      })
      .catch(function (err) {
        fcb(err);
      })
  })
}
// const puppeteer = require("puppeteer");
// const id = "yipopi7999@geekale.com";
// const pw = "123456"
// let tab;
// let idx;
// let gCode;

// // puppeteer has promisfied functions

// // by default headless = true

// let browserOpenPromise = puppeteer.launch({
//   headless: false,
//   defaultViewport: null,
//   args: ["--start-maximized"],
// });

// browserOpenPromise
//   .then(function (browser) {
//     console.log("browser is opened !");
//     return browser.pages();
//   })
//   .then(function (pages) {
//     tab = pages[0];
//     return tab.goto("https://www.hackerrank.com/auth/login");
//   })
//   .then(function () {
//     return tab.type("#input-1", id);
//   })
//   .then(function () {
//     return tab.type("#input-2", pw);
//   })
//   .then(function () {
//     return tab.click(
//       ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
//     ); // login hojata hai click se
//   })
//   .then(function () {
//     return waitAndClick("#base-card-1-link");
//   })
//   .then(function () {
//     return waitAndClick('a[data-attr1="warmup"]');
//   })
//   .then(function () {
//     return tab.waitForSelector(".js-track-click.challenge-list-item", {
//       visible: true,
//     });
//   })
//   .then(function () {
//     // tab.$() // document.querySelector;
//     return tab.$$(".js-track-click.challenge-list-item"); // it will run document.querySelectorAll in the browser and gives you array of all the elements
//   })
//   .then(function (allQuesArray) {
//     // [<a /> , <a /> , <a /> , <a />];
//     let allPendingPromises = [];
//     for (let i = 0; i < allQuesArray.length; i++) {
//       let oneATag = allQuesArray[i];
//       let pendingPromise = oneATag.evaluate(function (element) { return element.getAttribute("href");}  , oneATag);
//       allPendingPromises.push(pendingPromise);
//     }
//     // [ Promise<Pending> , Promise<Pending> , Promise<Pending> , Promise<Pending> ];
//     let allPromisesCombined = Promise.all(allPendingPromises);
//     // Promise<Pending>
//     return allPromisesCombined;
//   })
//   .then(function(allQuesLinks){
//     let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);
//     return oneQuesSolvePromise;
//   })
//   .then(function(){
//     console.log("First Ques Solved Succesfully !!!!");
//   })
//   .catch(function(err){
//     console.log(err);
//   });

//   function getCode(){
//     return new Promise(function(scb , fcb){
//       let waitPromise = tab.waitForSelector(".hackdown-content h3" , {visible:true});
//       waitPromise.then(function(){
//         return tab.$$(".hackdown-content h3");
//       })
//       .then(function(allCodeNamesElement){
//         // [<h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3> ]
//         let allCodeNamesPromise = [];

//         for(let i=0 ; i<allCodeNamesElement.length ; i++){
//           let codeNamePromise = tab.evaluate( function(elem){  return elem.textContent;   }  , allCodeNamesElement[i]  );
//           allCodeNamesPromise.push(codeNamePromise);
//         }
//         // allCodeNamesPromise = [Promise<data> , Promise<data> , Promise<data> ];
//         let combinedPromise = Promise.all( allCodeNamesPromise );
//         // Promise<Pending> => Promise< [data,data,data] >
//         return combinedPromise;
//       })
//       .then(function(allCodeNames){
//         // [C++ , Python , Java];
//         for(let i= 0 ;i<allCodeNames.length ; i++){
//           if(allCodeNames[i] == "C++"){
//             idx = i;
//             break;
//           }
//         }
//         return tab.$$(".hackdown-content .highlight"); // document.querySelectorAll
//       })
//       .then(function(allCodeDiv){
//         // [<div></div> , <div></div> , <div></div>];
//         let codeDiv = allCodeDiv[idx];
//         return tab.evaluate(function(elem){ return elem.textContent;   }  , codeDiv);
//       })
//       .then(function(code){
//         gCode = code;
//         scb();
//       })
//       .catch(function(error){
//         fcb(error);
//       })
//     })
//   }

//   function pasteCode(){
//     return new Promise(function(scb , fcb){
//       let waitAndClickPromise = waitAndClick('.checkbox-input');
//       waitAndClickPromise.then(function(){
//         return tab.waitForTimeout(2000);
//       })
//       .then(function(){
//         return tab.type('.custominput' , gCode);
//       })
//       .then(function(){
//         return tab.keyboard.down("Control");
//       })
//       .then(function(){
//         return tab.keyboard.press("A");
//       })
//       .then(function(){
//         return tab.keyboard.press("X");
//       })
//       .then(function(){
//         return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
//       })
//       .then(function(){
//         return tab.keyboard.press("A");
//       })
//       .then(function(){
//         return tab.keyboard.press("V");
//       })
//       .then(function(){
//         return tab.keyboard.up("Control");
//       })
//       .then(function(){
//         scb();
//       })
//     })
//   }

//   function solveQuestion(quesLink){
//     return new Promise( function(scb , fcb){
//       let gotoPromise = tab.goto("https://www.hackerrank.com"+quesLink);
//       gotoPromise.then(function(){
//        return waitAndClick('div[data-attr2="Editorial"]');
//       })
//       .then(function(){
//         return getCode();
//       })
//       .then(function(){
//         return tab.click('div[data-attr2="Problem"]');
//       })
//       .then(function(){
//         return pasteCode();
//       })
//       .then(function(){
//         return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary');
//       })
//       .then(function(){
//         scb();
//       })
//       .catch(function(error){
//         fcb(error);
//       })
//     });
//   }


// function waitAndClick(selector) {
//   return new Promise(function (scb, fcb) {
//     let waitPromise = tab.waitForSelector(selector, { visible: true });
//     waitPromise
//       .then(function () {
//         return tab.click(selector);
//       })
//       .then(function () {
//         scb();
//       })
//       .catch(function () {
//         fcb();
//       });
//   });
// }