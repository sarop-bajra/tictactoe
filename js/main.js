  // DOM ready
  $(document).ready(function(){

  // 'X' to player1 and 'O' to player2
    const player1 = "X";
    const player2 = "O";

  // currentTurn to 1 and moves made to 0
    let currentTurn = 1;
    let movesMade = 0;

  // css selectors for class winner, reset and square
    const winnerContainer = $('.winner');
    const reset = $('.reset');
    const block = $(".square");

  // When any of the squares are clicked
  // Clicks on squares adds 1 to movesMade
  // Checks whether square is empty or not
  // Since current turn is set to 1 initially, first player is "X"
  // Reverses to "O" on currentTurn counter
      block.on('click',function(event) {
        movesMade++;

        if(event.target.innerHTML === ''){

          if(currentTurn === 1){
            event.target.innerHTML = player1;
            currentTurn++;
        } else {
            event.target.innerHTML = player2;
            currentTurn--;
        }
      } // end if

  // Calls the checkForWinner function and passes it into declareWinner function
        if(checkForWinner()){
          if(currentTurn === 1){
            declareWinner(player2);
          } else {
            declareWinner(player1);
          }
        }
      }); // end of block

  // Array.prototype.slice.call() converts class square to an array
  // moves.map() creates a new array with the results
      function checkForWinner(){
          let block = $('.square');
          let moves = Array.prototype.slice.call($(".square"));
          let results = moves.map(function(square){
            return square.innerHTML;
          }); // end of map

  // Winnning Combination
          const winningCombos = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6]
              ];

  // Check if the results is a winning combination
          return winningCombos.find(function(combo) {
            if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                return true;
            } else {
                return false;
            }
        }); // end of winningCombos

      }; // end of checkForWinner

  // Checks who the the winner is player1 or player2 and then displays the winner
      function declareWinner(winner) {
        winnerContainer.css('display',"inline");
        reset.css('display',"inline");
        if(winner === player1){
          winner = "X";
        } else {
          winner = "O";
        }
        winnerContainer.html(`${winner} Wins!`);

      }; // end of declareWinner

  // Resets the board by emptying the squares, removing the winner display, taking the currentTurn to 1 and movesMade to 0
      reset.on('click',function(){
        let moves = Array.prototype.slice.call($(".square"));
        let results = moves.map(function(square){
          return square.innerHTML = "";
        });
        winnerContainer.html("");
        winnerContainer.css('display',"none");
        currentTurn = 1;
        movesMade = 0;
      }); // end of reset


  }); // end DOM
