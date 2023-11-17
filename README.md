# Tictactoe


- create object gameboard to store player input and run the main flow, and count variable to store round
- create player object constructor factory and method for players to check stats
- create button for player 1 and 2 to click, assigning the right player variable for gameboard to store and evaluate
- evaluate state of game after at least 3 round of game passed (possible player win)
- function to evaluate game state, straight = using for loop to check whether any row or column has continuing player 1/2 input, cross = create two array for two possible number combination for cross, check whether array of both players input contain any of these two array numbers


- add grid button prompt for user input to use for creating/drawing grid
- add event listener and number to grid created to track index value and update div/grid content
- create two player button to click and assign correct player number
- create object mark for both players to save what text content to assign based on player number
- track event listener for button clicked, after click check whether the content of grid/div if it is empty, style the div based on player object marking, pass the value to main game logic function to evaluate
-create gameboard object to hold player input value and position in gameboard
- get button value, player index, grid length/input, from button clicked. add new key with empty value based on grid length inside gameboard.
- assign value for the key inside gameboard based on player input, if object value is empty or value is same then reassign the same value clicked, else return already have value to avoid overwriting two player input
- create variable player1 and player2 count to track player input, if it is more than 3(chance to win), run function to evaluate gameboard
- rowcount, columncount for object, combination (based on grid length) for cross evaluation