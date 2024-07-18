const gameboard = (function () {
    let values = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const printValues = () => {
        for (let i = 0; i < values.length; i++) {
            console.log(values[i].join(" | "));
        }
        console.log("\n");
    };

    let activePlayer = 1;

    const resetGame = () => {
        values = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    
        activePlayer = 1;
    };

    return { values, printValues, activePlayer, resetGame };
})();

const playGame = () => {
    for (let i = 0; i < 9; i++) {
        gameboard.printValues();


        const row = parseInt(prompt("Row: (1-3)")) - 1;
        const column = parseInt(prompt("Column: (1-3)")) - 1;

        if (gameboard.activePlayer % 2 !== 0) {
            gameboard.values[row][column] = "X";
            gameboard.activePlayer++;
        } else {
            gameboard.values[row][column] = "O";
            gameboard.activePlayer++;
        }

        gameboard.printValues();
        
        if (checkWin()) {
            if (gameboard.activePlayer % 2 === 0) {
                console.log("Player 1 wins!");
            } else {
                console.log("Player 2 wins");
            }

            gameboard.resetGame();
            break;
        }
    }

    console.log("Tie!");
    gameboard.resetGame();
};

const checkWin = () => {
    return false;
};

playGame();