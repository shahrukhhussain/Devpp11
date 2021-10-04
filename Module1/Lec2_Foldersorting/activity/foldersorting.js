let fs = require("fs");

let extensionsmapping = require("./util.js");

let testpath = "./downloads";

let allfiles = fs.readdirSync(testpath);
//  console.log(allfiles);

for(let i=0 ; i<allfiles.length ; i++){
    sortfiles(allfiles[i]);
}

function getextension(file){
  file = file.split(".");
  return file[1];
}

// module.exports = {
//     "Documents" : ["doc" , "pdf" , "txt"],
//     "Images" : ["jpg" , "img" ,"gif" , "png"],
//     "videos" : ["mp4" , "mkv"],
//     "Audio" : ["mp3"],
//     "Applications" : ["exe"]
// }


function checkextensionfolder(extension){
    let extensionfoldername = testpath;
    // take in loop for accessing key in objects
    
    for(let key in extensionsmapping){
        let extensions = extensionsmapping[key];
        
        if(extensions.includes(extension)){///we also traverse in extensions array here
            extensionfoldername = extensionfoldername + "/" +  key;
            break;
        }
    }
    //"./downloads"
    //let foldertobechecked = testpath + "/" + extensionfoldername;
    
    //extensionfoldername = "./downloads/Documents";
    let folderexists = fs.existsSync(extensionfoldername);
    if(!folderexists){
       fs.mkdirSync(extensionfoldername);
    }
    return extensionfoldername;
}

// function createextensionfolder(extension){

// }

function movefile(file , extensionfoldername){
    let sourcefile = testpath + "/" + file;
    let destinationfile = extensionfoldername + "/" + file;

    //copy file from the source path to destination path
    fs.copyFileSync(sourcefile , destinationfile);

    //then delete the file from the source path;
    fs.unlinkSync(sourcefile);
}

function sortfiles(file){
    // console.log(file);   
    let extension = getextension(file);
    //console.log(extension);
    let extensionfoldername = checkextensionfolder(extension);
     
    movefile(file , extensionfoldername);
    
    // if(folderexist){
    //     // console.log(file + " Folder exist");
    //     //extension folder exist
    //     // movefile(file , extension);
    // }
    // else{
    //     // console.log(file + " Folder Doesn't exist");
    //     //extension folder doesn't exist
    //     createextensionfolder(extension);
    //     // movefile(file , extension);
    // }
}