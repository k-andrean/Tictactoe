const grid = (function(){

    let grid = 0;
    let player = '';
    const playerValue = {player1: 'x', player2: 'o'};


    const gridButton = document.querySelector('.grid-size');
    const gridContainer = document.querySelector('.game-container');
    const playerButtons = document.querySelectorAll('.start');


    gridButton.addEventListener('click', ()=> {
        drawGrid();
    })

    playerButtons.forEach((player) => {
        player.addEventListener('click', (event)=>{
            setPlayerValue(event);
        })
    })

    function setPlayerValue(event){
        player = event.target.value;

    }

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

    function addRowSquareDiv(u){
    
        for (let i = 0; i < grid; i++){
    
            const row = document.createElement('div');
            row.classList.add(`row${i}`);
            row.style.cssText = 'display: flex;';
    
    
            for (let j =0; j < grid; j++){
                
                const square = document.createElement('div');
                square.classList.add(`col${i}`);
                square.style.cssText = 'flex: 1; width: 100px; height: 100px; background-color: blue; border: 1px solid #8b8589;';
                
                
                
                square.addEventListener('click', (event)=>{

                    const valuePlayerContent = playerValue[player];

                    getRowColValue(event, valuePlayerContent);
                    updateGridDisplay(event, valuePlayerContent);

                }
    
    
                row.appendChild(square);
    
            }
    
            container.appendChild(row);
            
        }
    };
    
    function clearContainerElement(containerElement) {
        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);
        }
    }
    
    function drawGrid(){
    
        grid = getGridValue();
    
        clearContainerElement(gridContainer);
        addRowSquareDiv(grid);

        game.createGameBoard(grid);
    
    
    };

    function getRowColValue(event, playerValue) {
        
        if (player == ''){
            return 'Please click player button first before starting the game';
        } else if (event.target.textContent != ''){
            return 'Grid already filled, please click on other empty grid ';
        }

        const colValue = event.target.classList;
        const rowValue = event.target.parentElement.classList;

       
        game.updateGameBoard(colValue, rowValue, player, playerValue);
        


    }

    function updateGridDisplay(event, playerValue) {

        
        event.target.textContent = playerValue; 

    }


})()

const game = (function(){

    const rowBoard = {};
    const colBoard = {};
    const crossBoard = [];
    const playerTurn = [];

    let turnCount;

    function createGameBoard(grid){
        
        for (let i = 0; i < grid; i++) {
            rowBoard[`row${i}`] = [];
            colBoard[`col${i}`] = [];
          }
        

    };

    function updateGameBoard(col, row, player, playerValue){

        if ((playerTurn.length == 0) || (playerTurn[turnCount-1] != player)){

            rowBoard[row[row]].push(playerValue);
            colBoard[col[col]].push(playerValue);
            playerTurn.push(player);

            turnCount++;

        } else {
            return 'Please change player by clicking player button'
        }
        

    }  
    

})()