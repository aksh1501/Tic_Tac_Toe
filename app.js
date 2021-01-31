/*The key idea here is closure as the functions use the variables local(which keep changing) to the enclosing function*/

function startGame()
{
    const X_CLASS = 'x';  /*class containing the styling of an X symbol*/
    const CIRCLE_CLASS='circle';  /*class containing the styling of a circle symbol*/
    
    const cellElements=document.querySelectorAll('[data-cell]');
    const board=document.getElementsByClassName('board')[0];
    
    const WINNING_COMBINATIONS=[    /*O indexed grid where we listed all the ways to win tic tac toe*/
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    const restartButton=document.getElementsByClassName("restartButton")[0];

    const winningMessageElement=document.getElementsByClassName('winning-message')[0];

    const winningMessageTextElement=document.querySelector("[data-winning-message-text]");

    let circleTurn=false;   /*This is the Turn variable if it is true then it */

    function handleClick(e)  //This method handles the placement of X or circle symbol everytime we click the cell
    {
        const cell = e.target;

        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        
        //placeMark at the cell where the player has clicked.
        placeMark(cell,currentClass);

        //Check For Win and end the game by displaying the winner and the replay button
        if(checkWin(currentClass))
        {
            endGame(false);
        }
        //check for draw  and end the game by displaying draw and the replay button
        else if(isDraw())
        {
            endGame(true);
        }
        else //the game is still being played and we switch turns and allow the board to hover with the next players symbol
        {
            swapTurns();
            setBoardHoverClass();
        }
    }   


    function placeMark(cell,currentClass)
    {
        cell.classList.add(currentClass);   /*We just add the X_CLASS or Circle_CLASS and the CSS part takes care of palcing the X or circle in the cells*/
    }

    function swapTurns()    //This will just swap the turn of the players
    {
        circleTurn=!circleTurn;
    }

    function setBoardHoverClass()   /*After placing the X or Circle Symbol we make sure that the new symbol hovers over the board*/
    {
        //First we need to clear the board and later add the symbol which we want to hover over the empty cells so that the player can choose
        
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
    
        if(circleTurn)
        {
            board.classList.add(CIRCLE_CLASS);
        }
        else
        {
            board.classList.add(X_CLASS);
        }
    }

    function checkWin(currentClass) /*This function is called after placing each symbol and checks if the winning combination is there for either X or O player*/
    {   
        return WINNING_COMBINATIONS.some(combination=>{
            return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
            })
        });
    }

    function endGame(draw)   /*This function is called to show the winning message and the Replay button is displayed*/
    {
        if(draw)
        {
            winningMessageTextElement.innerText = "Draw!";
        }
        else{
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        }

        winningMessageElement.classList.add("show");
    }

    function isDraw()  /*This function is called after placing each symbol as it checks that all cells are filled*/
    {
        return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS);
        });
    }


    restartButton.addEventListener('click',startGame);  //We add the click event listener to the replay button so that it restarts when it is clicked

    /*Adding a click based event listener to each of the cells so that we can place the symbol when the player clicks the cell.
    We first remove all the symbols which are already placed there in case of restart.Then add the click event listener waiting for the cells to be clicked.*/
    cellElements.forEach((cell)=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{ once : true });
    });

    //This is for the first player as he has hover of X over all the cells
    setBoardHoverClass();

    //We need to stop showing the winning message once we restart the game so we remove the show class from wiining message div
    winningMessageElement.classList.remove("show");
}


//starting the game
startGame();