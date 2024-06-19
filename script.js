const MAX_LINE = 3;
const MIN_BET = 100;
const MAX_BET = 500;

const rows = 3;
const cols = 3;

const symbolCount = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

function checkWinnings(columns, lines, bet, values) {
    let winnings = 0;
    let winningLines = [];
    for (let line = 0; line < lines; line++) {
        let symbol = columns[0][line];
        let allMatch = true;
        for (let col of columns) {
            if (col[line] !== symbol) {
                allMatch = false;
                break;
            }
        }
        if (allMatch) {
            winnings += values[symbol] * bet;
            winningLines.push(line + 1);
        }
    }
    return { winnings, winningLines };
}

function getSlotMachineSpin(rows, cols, symbols) {
    let allSymbols = [];
    for (let symbol in symbols) {
        for (let i = 0; i < symbols[symbol]; i++) {
            allSymbols.push(symbol);
        }
    }

    let columns = [];
    for (let i = 0; i < cols; i++) {
        let column = [];
        let currentSymbols = [...allSymbols];
        for (let j = 0; j < rows; j++) {
            let value = currentSymbols.splice(Math.floor(Math.random() * currentSymbols.length), 1)[0];
            column.push(value);
        }
        columns.push(column);
    }
    return columns;
}

function printSlotMachineSpin(columns) {
    let output = "";
    for (let row = 0; row < columns[0].length; row++) {
        for (let col = 0; col < columns.length; col++) {
            output += columns[col][row];
            if (col !== columns.length - 1) {
                output += " | ";
            }
        }
        output += "\n";
    }
    return output;
}

function deposit() {
    let amount = prompt("What would you like to deposit? $");
    while (isNaN(amount) || amount <= 0) {
        amount = prompt("Please enter a valid number greater than 0:");
    }
    return parseInt(amount);
}

function getNumberOfLines() {
    let lines = prompt(`Enter the number of lines you would like to bet on (1-${MAX_LINE}):`);
    while (isNaN(lines) || lines < 1 || lines > MAX_LINE) {
        lines = prompt(`Please enter a number between 1 and ${MAX_LINE}:`);
    }
    return parseInt(lines);
}

function getBet() {
    let amount = prompt(`What would you like to bet on each line? $`);
    while (isNaN(amount) || amount < MIN_BET || amount > MAX_BET) {
        amount = prompt(`Amount must be between $${MIN_BET} and $${MAX_BET}.`);
    }
    return parseInt(amount);
}

function spin(balance) {
    const lines = getNumberOfLines();
    let bet;
    let totalBet;
    while (true) {
        bet = getBet();
        totalBet = bet * lines;
        if (totalBet > balance) {
            alert(`You do not have enough balance. Your balance is $${balance}`);
        } else {
            break;
        }
    }
    alert(`You are betting $${bet} on ${lines} lines. Total bet is equal to: $${totalBet}`);

    const slots = getSlotMachineSpin(rows, cols, symbolCount);
    document.getElementById("slots-output").innerText = printSlotMachineSpin(slots);
    const { winnings, winningLines } = checkWinnings(slots, lines, bet, symbolCount);
    alert(`You won $${winnings}`);
    alert(`You won on lines: ${winningLines.join(", ")}`);
    return balance + winnings - totalBet;
}

document.getElementById("play-button").addEventListener("click", function() {
    main();
});

document.getElementById("quit-button").addEventListener("click", function() {
    alert("Thank you for playing!");
    window.location.reload();
});

function main() {
    let balance = deposit();
    while (true) {
        alert(`Current balance is $${balance}`);
        const answer = prompt("Press enter to play (q to quit).");
        if (answer === "q") {
            break;
        }
        balance = spin(balance);
        alert(`You are left with $${balance}.`);
        document.getElementById("balance-output").innerText = `Current balance: $${balance}`;
    }
}
