// module object dealing with UI
const gridDisplay = (function(){
    
    let grid = 0; // initiate grid/board size variable

    const gridButton = document.querySelector('.grid-size');
    const gridContainer = document.querySelector('.game-container');
    const playerButtons = document.querySelectorAll('.start');
    const winnerText = document.querySelector('.winner-text');
    const totalText = document.querySelector('.total-text');
    const resetButton = document.querySelector('.reset');


    gridButton.addEventListener('click', ()=> {
        drawGrid();
    })

    playerButtons.forEach((player) => {
        player.addEventListener('click', (event)=>{
            game.setPlayerValue(event); // set player variable value in game object to associate current player with appropriate player number
        })
    })

    resetButton.addEventListener('click', ()=> {
        clearGridContent();
        game.resetGameBoard(); 
        game.createGameBoard(grid);
    })

    // get board/grid size from input and pass it to function to create gameboard
    function getGridValue() {
        let userInput;

        do {
        userInput = prompt('Please enter grid size number:');
        userInput = parseFloat(userInput); 
        
        if (isNaN(userInput)) {
            alert('Please enter a valid number.');
        } 

        } while (isNaN(userInput));
    
        return userInput;
    };

    function addRowSquareDiv(grid){
    
        for (let i = 1; i <= grid; i++){
    
            const row = document.createElement('div');
            row.classList.add(`row${i}`);
            row.style.cssText = 'display: flex;';
    
    
            for (let j = 1; j <= grid; j++){
                
                const square = document.createElement('div');
                square.classList.add(`col${j}`);
                square.style.cssText = 'width: 80px; height: 80px; border: 4px solid #8b8589; font-size:3rem; display:flex; justify-content: center; align-items: center;';
                
                
                
                square.addEventListener('click', (event)=>{

                    const playerObject = game.getPlayerValue(player); // get player variable from game object to determine current player

                    getRowColValue(event, playerObject); 
                    

                });
    
    
                row.appendChild(square);
    
            }
    
            gridContainer.appendChild(row);
            
        }
    };

    function getRowColValue(event, playerObject) {
        
        // check if player variable is clicked first or grid button clicked is empty 
        if (playerObject.player == ''){
            return 'Please click player button first before starting the game';
        } else if (event.target.textContent != ''){
            return 'Grid already filled, please click on other empty grid ';
        }

        const colValue = event.target.classList.value;
        const rowValue = event.target.parentElement.classList.value;

        const updateValue = playerObject.value;

       

        game.updateGameBoard(event, colValue, rowValue, updateValue, grid); // update gameboard inside game object to track current game progress
        


    }
    
    function clearContainerElement(containerElement) {
        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);// remove game container child if there is still any
        }
    }
    
    function drawGrid(){
    
        grid = getGridValue();
    
        clearContainerElement(gridContainer);
        addRowSquareDiv(grid);

        game.createGameBoard(grid);
    
    
    };

    
    function updateGridDisplay(event, playerValue) {

        
        event.target.textContent = playerValue; 

    };


    function clearGridContent() {
        const rows = document.querySelectorAll('.game-container > div');
    
        rows.forEach(row => {
            const squares = row.querySelectorAll('div');
            squares.forEach(square => {
                if (square.textContent !== '') {
                    square.textContent = '';
                }
            });
        });
    }


    function logWinner(winner, stats){
        winnerText.textContent = `Winner: ${winner}`;
        
        let statsString = "";
        for (const player in stats) {
            if (stats.hasOwnProperty(player)) {
                statsString += `${player}: ${stats[player]}, `;
            }
        }


        statsString = statsString.slice(0, -2);


        totalText.textContent = statsString;
    }


    
    return {getGridValue, clearGridContent, updateGridDisplay, logWinner};


})()

// module object dealing with game logic
const game = (function(){

    this.gameBoard = {forward: [], backward: []} // forward for checking cross win scenario and backward for reverse checking
    this.player = '';
    this.playerTurn = []; // crated array to track current player turn to avoid player moves two time in a row
    const playerValue = {player1: 'x', player2: 'o'};
    const winnerStats = {player1: 0, player2: 0};

    this.turnCount = 0; 


    function setPlayerValue(event){
        player = event.target.value;

    }


    function getPlayerValue(){
        const value = playerValue[player] || '';
        console.log(player)
        console.log(value)
        return {player, value}
    }



    function createGameBoard(grid){

        // loop and add row col number as a key based of grid size
        for (let i = 1; i <= grid; i++) {
            gameBoard[`row${i}`] = []; 
            gameBoard[`col${i}`] = [];
          }
        

    };
    
    
    function updateGameBoard(event, col, row, updateValue, grid){

        // parsing row and col and returning only number element to compare and process
        const numericRow = parseInt(row.match(/\d+/)[0]); 
        const numericCol = parseInt(col.match(/\d+/)[0]);

        // check to avoid player going two times in a row by tracking player turn array
        if ((playerTurn.length == 0) || (playerTurn[turnCount-1] != player)){

            gameBoard[`row${numericRow}`].push(updateValue);
            gameBoard[`col${numericCol}`].push(updateValue);

            console.log(grid)
            updateCrossBoard(numericRow, numericCol, updateValue, grid);
                
            
            playerTurn.push(player);
            turnCount++;


            gridDisplay.updateGridDisplay(event, updateValue); // call function for grid to update display after updating gameboard value


            const winner = findWinner(grid); // try to find winner every time value is pushed
    
            if (winner) {
                
                winnerStats[winner] += 1;
                gridDisplay.logWinner(winner, winnerStats);
                
            }

     
        } else{
            return; 
        }

        

    }
    

    function updateCrossBoard(numericRow, numericCol, updateValue, grid) {
        
        // Check conditions for updating forward and backward to get cross condition winner
   
        if ((numericRow === numericCol) && (numericRow + numericCol === grid + 1)) {
            gameBoard['forward'].push(updateValue);
            gameBoard['backward'].push(updateValue);
        } else if (numericRow + numericCol === grid + 1) {
            gameBoard['backward'].push(updateValue);
        } else if (numericRow === numericCol) {
            gameBoard['forward'].push(updateValue);
        } else{
            return;
        }
    }
    

    function findWinner(grid) {
        for (const key in gameBoard) {
            const values = gameBoard[key];
            
            // check gameboard keys values to get current winner if there is any
            if (values.length === grid && values.every(value => value === values[0])) {
                return ((value) => {
                    for (const playerNumber of Object.keys(playerValue)) {
                        if (playerValue[playerNumber] === value) {
                            return playerNumber;
                        }
                    }
                })(values[0]);
            }
        }
    
        return null; // Return null if no winner is found
    }



    function resetGameBoard() {
        player = '';
        turnCount = 0;

        gameBoard = {forward: [], backward: []};
        playerTurn = [];

    }



    

    return {createGameBoard, updateGameBoard, resetGameBoard, getPlayerValue, setPlayerValue}
    
})();