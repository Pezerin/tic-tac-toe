const gameboard = (function () {
    let values = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    let activePlayer = 1;

    return { values, activePlayer };
})();

const game = (function () {
    const handleMove = (row, col, cell) => {
        if (gameboard.values[row][col] !== "" || displayController.winner.textContent !== "") {
            return;
        }
    
        if (gameboard.activePlayer % 2 !== 0) {
            gameboard.values[row][col] = player1.marker;
            cell.textContent = player1.marker;
        } else {
            gameboard.values[row][col] = player2.marker;
            cell.textContent = player2.marker;
        }
    
        gameboard.activePlayer++;
        
        if (checkWin()) {
            if (gameboard.activePlayer % 2 === 0) {
                displayController.winner.textContent = `${player1.name} wins!`;
            } else {
                displayController.winner.textContent = `${player2.name} wins!`;
            }
            return;
        }
    
        if (checkTie()) {
            displayController.winner.textContent = "Tie!";
        }
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
    
    const checkTie = () => {
        return displayController.cells.every(cell => cell.textContent !== "");
    };

    const resetGame = () => {
        gameboard.values = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    
        gameboard.activePlayer = 1;

        displayController.cells.forEach(cell => {
            cell.textContent = "";
        });

        displayController.winner.textContent = "";
    };

    return { handleMove, checkWin, checkTie, resetGame };
})();

const displayController = (function () {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const reset = document.querySelector("button");
    const winner = document.querySelector("#winner");

    reset.addEventListener("click", () => {
        game.resetGame();
    });

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const row = parseInt(cell.id.charAt(0));
            const col = parseInt(cell.id.charAt(1));
            game.handleMove(row, col, cell);
        });
    });

    return { cells, reset, winner };
})();

function createPlayer(name, number) {
    let marker = "";

    if (number === 1) {
        marker = "X";
    } else {
        marker = "O";
    }

    const playerDisplays = Array.from(document.querySelectorAll(".player"));

    const updateName = () => {
        playerDisplays[number - 1].textContent = `${number}: ${name}`;
    };

    return { name, marker, playerDisplays, updateName };
}

name1 = prompt("Player 1: ");
name2 = prompt("Player 2: ");

player1 = createPlayer(name1, 1);
player2 = createPlayer(name2, 2);

player1.updateName();
player2.updateName();