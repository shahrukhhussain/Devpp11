let cellsContainer = document.querySelector(".cells");

// init = initialisethe Cells

function initCells(){
    let cellsContent = `<div class="top-left-cell"></div>`;

    cellsContent  += `<div class="top-row">`;
    for(let i=0 ; i<26 ; i++){
        cellsContent += `<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`;
    }
    cellsContent += "</div>"


    cellsContent += '<div class="left-col">';
    for(let i=0 ; i<100 ; i++){
        cellsContent += `<div class="left-col-cells">${i+1}</div>`;
    }
    cellsContent += '</div>';


cellsContent += '<div class="all-cells">';

for(let i=0 ; i<100 ; i++){   ///100=row , 26=Column
    cellsContent += '<div class="row">'
    for(let j=0 ; j<26 ; j++){
        cellsContent += '<div class="cell" contenteditable="true"></div>';
    }
    cellsContent += "</div>";
}
cellsContent += '</div>';
cellsContainer.innerHTML = cellsContent;

}

initCells();