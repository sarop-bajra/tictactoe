$(document).ready(function(){                          // DOM ready

  const player1 = "X";                                 // Setting X to player1
  const player2 = "O";                                 // Setting O to player2

  let currentTurn = 1;                                 // Setting currentTurn to 1
  let movesMade = 0;                                   // Setting moves made to 0

  const winnerContainer = $('.winner');                // Created const for css selector class winner
  const reset = $('.reset');                           // Created const for css selector class reset
  const sqr = $(".square");                            // Created const for css selector class square



    sqr.on('click',function(event) {                   // When any squares are clicked
      movesMade++;                                     // Clicks on squares adds 1 to movesMade

      if(event.target.innerHTML === ''){               // Checks whether square is empty or not

        if(currentTurn === 1){                         // Since current turn is set to 1 initially, first player is "X"
          event.target.innerHTML = player1;
          currentTurn++;
      } else {
          event.target.innerHTML = player2;
          currentTurn--;
      }
    }
      if(checkForWinner()){
        if(currentTurn === 1){
          declareWinner(player2);
        } else {
          declareWinner(player1);
        }
      }
    });


    function checkForWinner(){
        let sqr = $('.square');
        let moves = Array.prototype.slice.call($(".square"));
        let results = moves.map(function(square){
          return square.innerHTML;
        });
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

        return winningCombos.find(function(combo) {
          if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
              return true;
          } else {
              return false;
          }
      });

    };

    function declareWinner(winner) {
      winnerContainer.css('display',"inline");
      reset.css('display',"inline");
      if(winner === player1){
        winner = "X";
      } else {
        winner = "O";
      }
      winnerContainer.html(`${winner} Wins!`);

    };

    reset.on('click',function(){
      let moves = Array.prototype.slice.call($(".square"));
      let results = moves.map(function(square){
        return square.innerHTML = "";
      });
      winnerContainer.html("");
      winnerContainer.css('display',"none");
      currentTurn = 1;
      movesMade = 0;
    });


 });
