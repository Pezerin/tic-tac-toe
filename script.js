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
            return;
        }
    }

    console.log("Tie!");
    gameboard.resetGame();
};

const checkRows = () => {
    let marker = "";

    if (gameboard.activePlayer % 2 === 0) {
        marker = "X";
    } else {
        marker = "O";
    }

    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (gameboard.values[i][j] !== marker) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }

    return false;
};

const checkColumns = () => {
    let marker = "";

    if (gameboard.activePlayer % 2 === 0) {
        marker = "X";
    } else {
        marker = "O";
    }

    for (let i = 0; i < 3; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (gameboard.values[j][i] !== marker) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }

    return false;
};

const checkDiagonals = () => {
    let marker = "";

    if (gameboard.activePlayer % 2 === 0) {
        marker = "X";
    } else {
        marker = "O";
    }

    let win = true;
    for (let i = 0; i < 3; i++) {
        if (gameboard.values[i][i] !== marker) {
            win = false;
            break;
        }
    }
    if (win) {
        return true;
    }

    win = true;
    for (let i = 0; i < 3; i++) {
        if (gameboard.values[i][2 - i] !== marker) {
            win = false;
            break;
        }
    }
    return win;
};

const checkWin = () => {
    return checkRows() || checkColumns() || checkDiagonals();
};

playGame();