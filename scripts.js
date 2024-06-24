/*const boardSize = 10;
const ladders = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 63: 81, 71: 91 };
const snakes = { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78 };
let currentPlayers = 1;
let playerPosition = [1,1]


// create the game board

const gameBoard = document.getElementById('game-board')
for(let i = 100; i > 0; i--){
    const cell = document.createElement('div');
    cell.id = 'cell-'+i;
    cell.textContent = i;
    gameBoard.appendChild(cell)

    // // ladders
    // if(ladders[i])
    //     cell.classList.add('ladder-start')

    // // snakes
    // if(snakes[i])
    //     cell.classList.add('snake-head')
}

// drawing ladders
for(const [start, end] of Object.entries(ladders)){
    drawArrow(start, end, 'ladder')
}


// drawing snakes
for(const [start, end] of Object.entries(snakes)){
    drawArrow(start, end, 'snake')
}

const player1Piece = document.createElement('div');
player1Piece.classList.add('player', 'player1');
document.getElementById('cell-1').appendChild(player1Piece);

const player2Piece = document.createElement('div');
player2Piece.classList.add('player', 'player2');
document.getElementById('cell-1').appendChild(player2Piece);


// Roll dice

document.getElementById('roll-dice').addEventListener('click', ()=>{
    const diceResult = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').textContent = 'Dice Result: ' + diceResult
    movePlayer(diceResult)
})

// movePlayer

function movePlayer(diceResult){
    let currentPosition = playerPosition[currentPlayers - 1]
    let newPosition = playerPosition[currentPlayers - 1] + diceResult;

    if(newPosition > 100) newPosition = 100 - (newPosition - 100)

    if (ladders[newPosition])
        newPosition = ladders[newPosition]
    else if(snakes[newPosition])
        newPosition = snakes[newPosition]

    const playerPiece = currentPlayers === 1 ? player1Piece : player2Piece
    const oldCell = document.getElementById('cell-' + playerPosition[currentPlayers -1])
    const newCell = document.getElementById('cell-' + newPosition)

    // move piece

    playerPosition[currentPlayers - 1] = newPosition;
    animateMove(playerPiece, oldCell, newCell)

    if(newPosition === 100){
        document.getElementById('game-message').textContent = `Player ${currentPlayers} wins!`;
        document.getElementById('roll-dice').disabled = true;
    }else{
        currentPlayers = currentPlayers === 1 ? 2 : 1;
        document.getElementById('game-message').textContent = `Player ${currentPlayers}'s turn`;
    }

}

// animate player move 

function animateMove(playerPiece, oldCell, newCell){
    const oldRect = oldCell.getBoundingClientRect();
    const newRect = newCell.getBoundingClientRect();
    const deltaX = newRect.left - oldRect.left;
    const deltaY = newRect.top - newRect.top;

    playerPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`

    setTimeout(() => {
        newCell.appendChild(playerPiece);
        playerPiece.style.transform = ''
    }, 500);
}


function drawArrow(start, end, type){
    const startCell = document.getElementById('cell-' + start);
    const endCell = document.getElementById('cell-' + end);

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const centerX1 = startRect.left + startRect.width / 2;
    const centerY1 = startRect.top + startRect.height / 2;
    const centerX2 = endRect.left + endRect.width / 2;
    const centerY2 = endRect.top + endRect.height / 2;

    // const deltaX = endRect.left - startRect.left;
    // const deltaY = endRect.top - startRect.top;

    const deltaX = centerX2 - centerX1;
    const deltaY = centerY2 - centerY1;

    const arrow = document.createElement('div');
    arrow.classList.add(type + '-arrow');
    arrow.style.width = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + 'px';
    arrow.style.transform = `rotate(${Math.atan2(deltaY, deltaX)}rad)`;
    arrow.style.left = startRect.left + 'px';
    arrow.style.top = startRect.top + 'px';

    document.body.appendChild(arrow)
}*/


const boardSize = 10
const ladders = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 63: 81, 71: 91 };
const snakes = { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78 };
// const randomColors = ['#ff6347', '#ffd700', '#7fffd4', '#9370db', '#00ced1'];
// const sequentialColors = ['#ff6347', '#ffd700', '#7fffd4', '#9370db', '#00ced1'];
const sequentialColors = [
    'rgba(255, 99, 71, 0.7)',   // Red with opacity 0.7
    'rgba(255, 215, 0, 0.7)',  // Gold with opacity 0.7
    'rgba(127, 255, 212, 0.7)', // Aquamarine with opacity 0.7
    'rgba(147, 112, 219, 0.7)', // Medium Purple with opacity 0.7
    'rgba(0, 206, 209, 0.7)'   // Dark Turquoise with opacity 0.7
];
let currentPlayer = 1;
let playerPosition = [1, 1];
let colorIndex = 0

const gameBoard = document.getElementById('game-board');

for(let row = 10; row > 0; row--){
    for(let col = 1; col <= 10; col++){
        const cell = document.createElement('div');
        const cellNumber = (row - 1) * 10 + col;
        cell.id = 'cell-' + cellNumber;
        cell.textContent = cellNumber;

        // Calculate color index based on row and column offset
        const colorIndex = (row + col - 1) % sequentialColors.length;
        cell.style.backgroundColor = sequentialColors[colorIndex];

        // Check if cell is the start of a ladder or head of a snake
        if (ladders[cellNumber]) {
            cell.classList.add('ladder-start');
            drawArrow(cell, 'up')
        }
        if (snakes[cellNumber]) {
            cell.classList.add('snake-head');
            drawArrow(cell, 'down')
        }

        gameBoard.appendChild(cell);
    }
}

// for(let i = 100; i > 0; i--){
//     const cell = document.createElement('div')
//     cell.id = 'cell-' + i;
//     cell.textContent = i

//     // const randomColorsIndex = Math.floor(Math.random() * randomColors.length)

//     // colorIndex = (colorIndex + 1) % sequentialColors.length
//     const colorIndex = (row + col - 1) % sequentialColors.length;
//     cell.style.backgroundColor = sequentialColors[colorIndex]

//     if(ladders[i])
//         cell.classList.add('ladder-start')

//     if(snakes[i])
//         cell.classList.add('snake-head')

//     gameBoard.appendChild(cell)
// }

const player1Piece = document.createElement('div');
player1Piece.classList.add('player', 'player1');
document.getElementById('cell-1').appendChild(player1Piece);

const player2Piece = document.createElement('div');
player2Piece.classList.add('player', 'player2');
document.getElementById('cell-1').appendChild(player2Piece);

document.getElementById('roll-dice').addEventListener('click', () => {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').textContent = 'Dice Result: ' + diceResult
    movePlayer(diceResult)
})


function movePlayer(diceResult){
    let currentPosition = playerPosition[currentPlayer - 1];

    let newPosition = currentPosition + diceResult;
    if(newPosition > 100) newPosition = 100 - (newPosition - 100)

    if(ladders[newPosition])
        newPosition = ladders[newPosition]
    else if(snakes[newPosition])
        newPosition = snakes[newPosition]

    const playerPiece = currentPlayer === 1 ? player1Piece : player2Piece;
    const oldCell = document.getElementById('cell-' + currentPosition)
    const newCell = document.getElementById('cell-' + newPosition)

    playerPosition[currentPlayer - 1] = newPosition
    // animateMove(playerPiece, oldCell, newCell)
    animateMove(playerPiece, oldCell, newCell, currentPosition + 1, newPosition)

    if(newPosition === 100){
        document.getElementById('game-message').textContent = `Player ${currentPlayer} wins!`
        document.getElementById('roll-dice').disabled = true
    }else{
        currentPlayer = currentPlayer === 1 ? 2 : 1
        document.getElementById('game-message').textContent = `Player ${currentPlayer} turn`
    }
}


// function animateMove(playerPiece, oldCell, newCell){
//     const oldRect = oldCell.getBoundingClientRect();
//     const newRect = newCell.getBoundingClientRect();
//     const deltaX = newRect.left - oldRect.left;
//     const deltaY = newRect.top - oldRect.top;


//     playerPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
//     setTimeout(() => {
//         newCell.appendChild(playerPiece);
//         playerPiece.style.transform = ''
//     }, 500);
// }


// function animateMove(playerPiece, oldCell, newCell){
//     const steps = 10
//     const oldRect = oldCell.getBoundingClientRect();
//     const newRect = newCell.getBoundingClientRect();
//     const deltaX = newRect.left - oldRect.left;
//     const deltaY = newRect.top - oldRect.top;


//     function step(timestamp, currentStep){
//         if(!currentStep) currentStep = 0

//         const x = oldRect.left + deltaX * currentStep
//         const y = oldRect.top + deltaY * currentStep
//         playerPiece.style.transform = `translate(${x}px, ${y}px)`;

//         if(currentStep < steps){
//             window.requestAnimationFrame((timestamp) => {
//                 step(timestamp, currentStep + 1)
//             })
//         }else{
//             newCell.appendChild(playerPiece);
//             playerPiece.style.transform = ''
//         }
//     }

//     window.requestAnimationFrame((timestamp) => {
//         step(timestamp)
//     })


//     // playerPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
//     // setTimeout(() => {
//     //     newCell.appendChild(playerPiece);
//     //     playerPiece.style.transform = ''
//     // }, 500);
// }


function animateMove(playerPiece, oldCell, newCell, start, end){
    if(start > end) return

    const currentCell = document.getElementById('cell-'+start)
    if(!currentCell) return

    const currentRect = currentCell.getBoundingClientRect();
    const nextPosition = start + 1

    const deltaX = currentRect.left - oldCell.getBoundingClientRect().left
    const deltaY = currentRect.top - oldCell.getBoundingClientRect().top

    playerPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`

    setTimeout(() => {
        animateMove(playerPiece, oldCell, newCell, nextPosition, end)
    }, 200);

    if(start === end){
        setTimeout(() => {
            newCell.appendChild(playerPiece);
            playerPiece.style.transform = ''
        }, 200);
    }
}

function drawArrow(cell, direction){
    const arrow = document.createElement('div')
    arrow.classList.add('arrow', direction);
    cell.appendChild(arrow)
}


