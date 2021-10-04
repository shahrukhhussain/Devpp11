let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

undo.addEventListener("click" , undoLine);
redo.addEventListener("click" , redoLine);

let undoDone;
function redoLine(){
   if(undoDone){
       
   }
}

function undoLine(){
    if(linesDB.length){
        linesDB.pop();
    
        // clear canvas
        ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    
        drawLinesFromDB();
    }
}

function drawLinesFromDB(){
    undoDone=true;
    for(let i=0 ; i<linesDB.length ; i++){
        let line = linesDB[i];
        for(let i=0 ; i<line.length ; i++){
            let pointObject = line[i];
            if(pointObject.type == "md"){
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.stroke();
            }
        }
    }
}