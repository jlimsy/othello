/*----- constants -----*/
const playerX = "X";
const playerO = "O";
// Levels represent the number of rows and columns
const GRID_SMALL = 6;
const GRID_MEDIUM = 8;
const GRID_LARGE = 10;

let currPlayer = playerO;

/*----- cached UI elements  -----*/
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell"); 
const currPlayerDisplay = document.getElementById("current")

/*----- event listeners -----*/

//
function setUpButtons() {
  document.querySelector("#buttonEasy").addEventListener("click", )
}

/*----- functions -----*/

function setGrid(){
  tagCellsWithId(matrixOfIds(GRID_SMALL, GRID_SMALL));
  centerIds(GRID_SMALL);
  placeDisc(); 
  scoreReport();
}

function tagCellsWithId(matrix) {
  matrix.forEach( ([row, column]) => {
    const cell = document.createElement('div');
    cell.className = "cell";
    cell.id = `${row},${column}`;
    grid.appendChild(cell);
  }
  )
};

function centerIds(gridWidth){
  let array = [];
  array.push([ (gridWidth-2)/2, (gridWidth-2)/2 ]);
  array.push([ (gridWidth-2)/2, gridWidth/2 ]);
  array.push([ gridWidth/2, (gridWidth-2)/2 ]);
  array.push([ gridWidth/2, gridWidth/2 ]);
  return array;
};

function matrixOfIds(rows, columns){
  let matrix = [];
  for (let i = 0; i < rows; i++){
      for (let j = 0; j < columns; j++){
          matrix.push([i,j]);
      }
  }
  return matrix;
};

function strIdToNum(strId){
  //convert id from string to number
  let idExt = strId.split(",");
  let rowNum = parseInt(idExt[0]); 
  let colNum = parseInt(idExt[1]);
  //pasrseInt does not mutate the original string input, so have to combine them back together, but should I feed it back to original array?
  idExt = [rowNum, colNum];
  //console.log(idExt);
  return idExt;
};

function numIdToStr(array){
  let strX = array[0].toString();
  let strY = array[1].toString();
  let strId = `${strX},${strY}`;
  return strId;
};

function withinGridSize(row, col, gridSize){
  return row >=0 && row < gridSize && col >=0 && col < gridSize
};

function getDirAdjIds(array){
  let dirAdjIds = [];
  let x = array[0];
  let y = array[1];
  dirAdjIds.push(
    [x-1, y],[x+1, y], //vertically adjacent 
    [x, y-1], [x, y+1], //horizontally adjacent
    [x-1, y-1], [x+1, y+1], //diagonally adjacent
    [x-1, y+1], [x+1, y-1], //diagonally adjacent
    ); 

    //how to exclude negative x and y values?

    let validDirAdjIds = dirAdjIds.filter(
      (array) => array.every( 
        (num) => num >= 0 && num < GRID_SMALL)
    );

    return validDirAdjIds;
};

// function getHorAndVerDirAdjIds(array){  
//   let horAndVerdirAdjIds = [];
//   let x = array[0];
//   let y = array[1];
//   horAndVerdirAdjIds.push(
//     [x-1, y],[x+1, y], //vertically adjacent 
//     [x, y-1], [x, y+1], //horizontally adjacent
//   );
//   return horAndVerdirAdjIds;
// };

// function getLineOfCells(array){
//   let lineOfCells = [];
//   let x = array[0];
//   let y = array[1];

//   // horizontal

//   y = array[1];
//   for (x = array[0]-1; x >= 0; x--){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   for (x = array[0]+1; x < GRID_SMALL; x++){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   // vertical

//   x = array[0];
//   for (y = array[1]-1; y >= 0; y--){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   for (y = array[1]+1; y < GRID_SMALL; y++){
//     lineOfCells.push(
//       [x, y]
//       ); 
//   }

//   // diagonal \northwest

//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x < GRID_SMALL && y < GRID_SMALL ; x++, y++){
//       if (x === GRID_SMALL-1 || y === GRID_SMALL-1  ){
//         break;
//       } else {
//         lineOfCells.push(
//           [x+1, y+1],
//           )
//         }
//     }

//   // diagional \southeast

//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x >= 0 && y >= 0 ; x--, y--){
//     if (y === 0 || x === 0){
//       break;
//     } else {
//       lineOfCells.push(
//         [x-1, y-1],
//         )
//       }
//   }

//   //diagonal /northeast

//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x >=0 && y < GRID_SMALL; x--, y++){
//     if (x === 0 || y === GRID_SMALL-1){
//       break;
//     } else {
//       lineOfCells.push(
//         [x-1, y+1],
//         )
//       }
//     }

//   //diagonal /southwest
//   x = array[0];
//   y = array[1];

//   for (x = array[0], y = array[1]; x < GRID_SMALL && y > 0; x++, y--){
//     if (x === GRID_SMALL-1 ){
//       break;
//     } else {
//       lineOfCells.push(
//         [x+1, y-1],
//         )
//       }
//     }

//   return lineOfCells;

// };

function countScore(string){
  let score = 0;
    document.querySelectorAll(".cell").forEach(
      (cell) => {
        if(cell.innerText === string){
          score++;
        }
      })
    //console.log(`count`, score)
    return score;
};



/*----- render functions -----*/
// what goes here?
setGrid();

/*----- code is based on flow rather than MVC -----*/


const startCells = centerIds(GRID_SMALL); // produce an array of the center coordinates from grid size (determined by level) 
document.getElementById(startCells[0].toString()).innerText = playerX;
document.getElementById(startCells[1].toString()).innerText = playerO;
document.getElementById(startCells[2].toString()).innerText = playerO;
document.getElementById(startCells[3].toString()).innerText = playerX;

function placeDisc(){
  let isValidCell = false;



  currPlayerDisplay.innerText = currPlayer
  
  document.querySelectorAll(".cell").forEach(
    (cell) => {
      cell.addEventListener("click", function(event){
        console.log("---------- EVENT TARGET:", event.target.id);
  
        //SPECIFY THE INVALID CELLS
        if (event.target.innerText !== ""){
          document.querySelector('.message').innerText = "Invalid Cell: This cell is not empty.";
          return isValidCell = false;
        }

        let targetNumId = strIdToNum(event.target.id); //event target id is a string - needs to be converted to num
        let dirAdjCells = getDirAdjIds(targetNumId); //numId of event target listener generates an output of ids for adjacent cells
        // console.log("array of ids of directly adjacent cells", dirAdjCells);

        let strIdOfDirAdjCells = dirAdjCells.map(
          (cell) => numIdToStr(cell)
        )
        // console.log("array of ids of directly adjacent cells converted to strings", strIdOfDirAdjCells)

       let allAdjCellsEmpty = strIdOfDirAdjCells.every(
          (cell) => document.getElementById(cell).innerText === "Invalid Cell: Adjacent cells cannot be empty."
       )

       if (allAdjCellsEmpty){
        // console.log("INVALID MOVE: All adjacent cells empty")
        document.querySelector('.message').innerText = "Invalid Move:";
        return isValidCell = false
       };

       // SPECIFY THE VALID CELLS

      function checkAdjCells(array){
        let idsToFlip = [];

        const directions = [
          {x: -1, y: 0}, //up
          {x: +1, y: 0}, //down
          {x: 0, y: -1}, //left
          {x: 0, y: +1}, //right
          {x: +1, y: +1}, //southeast
          {x: -1, y:-1}, //northwest
          {x: -1, y: +1}, //northeast
          {x: +1, y: -1}, //southwest
        ]

        for (let dir in directions){
          let row = array[0] + directions[dir].x;
          let col = array[1] + directions[dir].y;

          let strId = document.getElementById(numIdToStr([row, col]));
          // console.log(strId.id, "innerText:", strId.innerText);

          if (row >=0 && row < GRID_SMALL && col >=0 && col < GRID_SMALL){
            if (strId.innerText === "" || strId.innerText === currPlayer){
              console.log("adjacent cell:", strId.id, "innerText", strId.innerText);
              continue;
            }
            
            if (strId.innerText !== currPlayer) {

              console.log("adjacent cell:", strId.id, "innerText", strId.innerText);
                
              for (let step = 1; step < GRID_SMALL-1; step++){
                let rowChain = array[0] + (step * directions[dir].x);
                let colChain = array[1] + (step * directions[dir].y);
                // console.log("chain of coordinates", rowChain, colChain);

                if (rowChain >=0 && rowChain < GRID_SMALL && colChain >=0 && colChain < GRID_SMALL){

                  let strIdEnd = document.getElementById(numIdToStr([rowChain, colChain]));
                  console.log(strIdEnd.id, `${strIdEnd.innerText}`);
      
                  if (strIdEnd.innerText === currPlayer) {
                    isValidCell = true;
                    document.querySelector('.message').innerText = "Valid Cell";
                    event.target.innerText = currPlayer; //place the disc
                    
                    for (let i = 1; i < step; i++) {
                      let rowFlip = array[0] + i * directions[dir].x;
                      let colFlip = array[1] + i * directions[dir].y;
                      idsToFlip.push([rowFlip, colFlip]);
                    }
                    
                    console.log("idsToFlip:", idsToFlip);
                    break;
                  } else if (strIdEnd.innerText !== currPlayer){
                    isValidCell = false;
                    document.querySelector('.message').innerText = `Invalid Cell: Line of occupied cells does not end with Disc ${currPlayer}`;
                  }
                }
              }
              function flipDiscs(){
                idsToFlip.map(
                  (cell) => {
                    document.getElementById(numIdToStr(cell)).innerText = currPlayer
                  }

                ); 
              }
              flipDiscs();

              // rowChain += directions[dir].x;
              // colChain += directions[dir].y;

            }
          };


        }

        let scoreX = countScore(playerX);
        let scoreO = countScore(playerO);
        document.querySelector("#countX").innerText = scoreX;
        document.querySelector("#countO").innerText = scoreO;
        
      }
      checkAdjCells(targetNumId);

      
      // SWITCH PLAYER INSIDE OF placeDisc() BUT OUTSIDE checkAdjCells();
      
      if(event.target.innerText === currPlayer){
        if (currPlayer === playerX){
          currPlayer = playerO;
          currPlayerDisplay.innerText = currPlayer
        } else if (currPlayer === playerO) {
          currPlayer = playerX;
          currPlayerDisplay.innerText = currPlayer
        }
      }
      
    }
    )
  })
  if (isValidCell === true){
    document.querySelectorAll(".cell").forEach(
      (cell) => {
        cell.addEventListener("mouseover", function(event){

          console.log("hello!")
        }
        )
      })
  }

}

function scoreReport(scoreX, scoreO){              
  if (scoreX > scoreO) {
  let winner = "Player X";
  document.querySelector(".winner").innerText = `${winner} has won!`
} else if (scoreO > scoreX) {
  let winner = "Player O";
  document.querySelector(".winner").innerText = `${winner} has won!`
} else if (scoreX === scoreO) {
  document.querySelector(".winner").innerText = `It's a tie!`
}
}
scoreReport(countScore(playerX), countScore(playerO))

function gameOver(){

}