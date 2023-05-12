let circleTurn = false;
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const gameOver = document.getElementById("game-over");
const winText = document.getElementById("win-text");
const restartBtn = document.getElementById("restart-btn");

cells.forEach(cell => 
    cell.addEventListener('click', cellPress, {once: true})
)

function cellPress(c){
    console.log("clicked");
    const cell = c.target;
    const currentTurn = circleTurn ? 'circle': 'x';
    placeMark(cell, currentTurn);
}
function placeMark(cell, currentTurn){
    cell.classList.add(currentTurn);
    circleTurn = circleTurn ? false: true;

    board.classList.replace(circleTurn ? 'x': 'circle', circleTurn ? 'circle': 'x' )
    if(checkWin()) {
        gameOver.classList.add('show');
        winText.innerText = circleTurn ? "X Wins!": "Circle Wins!";
    }
    if(checkTie()){
        gameOver.classList.add('show');
        winText.innerText = "Tie Game!";
    }
}
function checkWin(){
    let marks = [];
    cells.forEach(cell =>
        marks.push(circleTurn ? cell.classList.contains('x'): cell.classList.contains('circle'))     
    );

    if(marks[0] && marks[1] && marks[2]) return true;
    if(marks[0] && marks[3] && marks[6]) return true;
    if(marks[0] && marks[4] && marks[8]) return true;
    if(marks[1] && marks[4] && marks[7]) return true;
    if(marks[2] && marks[5] && marks[8]) return true;
    if(marks[2] && marks[4] && marks[6]) return true;
    if(marks[3] && marks[4] && marks[5]) return true;
    if(marks[6] && marks[7] && marks[8]) return true;
    
}
function checkTie(){
    let marks = [];
    cells.forEach(cell =>
        marks.push(cell.classList.contains('x') || cell.classList.contains('circle'))     
    );
    console.log(marks);
    if(marks.includes(false)) return false;
    return true;
}
restartBtn.addEventListener('click', function(){
    board.classList = "board x"
    cells.forEach(cell => {
        cell.classList = 'cell'
        cell.removeEventListener('click', cellPress, {once: true})
        cell.addEventListener('click', cellPress, {once: true})
    });
    gameOver.classList = 'game-over';
    winText.innerText = ""
    circleTurn = false;
})
