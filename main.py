import random

MAX_LINE=3
MIN_BET=100
MAX_BET=500

rows=3
cols=3

symbol_count={
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

def get_slot_machine_spin(rows,cols,symbols):
    all_symbols=[]
    for symbol, symbol_count in symbols.items():
        for _ in range(symbol_count):
            all_symbols.append(symbol)

    columns=[]
    for _ in range(cols):
        column=[]
        current_symbols=all_symbols[:]
        for _ in range(rows):
            value=random.choice(current_symbols)
            current_symbols.remove(value)
            column.append(value)
        columns.append(column)
    return columns

def print_slot_machine_spin(columns):
    for row in range(len(columns[0])):
        for col, column in enumerate(columns):
            if col != len(columns)-1:
                print(column[row], end=" | ")
            else:
                print(column[row], end="")
        print()
 
def deposit():
    while True:
        #asks what would you like to deposit
        amount = input("What would you like to deposit? $")
        #checks if the amount is a number
        if amount.isdigit():
            amount = int(amount)
            #checks if the amount is greater than 0
            if amount > 0:
                break;
            else:
                print("Amount must be greater than 0");
        else:
            print("Please enter a number")
    return amount

def get_number_of_lines():
    while True:
        lines = input("Enter the number of lines you would like to bet on (1-" + str(MAX_LINE) + "): ")
        if lines.isdigit():
            lines = int(lines)
            if 1 <= lines <= MAX_LINE:
                break
            else:
                print("Please enter a number between 1 and " + str(MAX_LINE))
        else:
            print("Please enter a number")
    return lines

def get_bet():
    while True:
        amount = input("What would you like to bet on each line? $")
        if amount.isdigit():
            amount = int(amount)
            if MIN_BET <= amount <= MAX_BET:
                break
            else:
                print(f"Amount must be between ${MIN_BET} and ${MAX_BET}.")
        else:
            print("Please enter a number")
    return amount

def main():
    balance = deposit()
    lines = get_number_of_lines()
    while True:
        bet = get_bet()
        total_bet = bet * lines
        if total_bet > balance:
            print(f"You do not have enough balance. Your balance is ${balance}")
        else:
            break
    print(f"You are betting ${bet} on {lines} lines. Total bet is equal to: ${bet*lines}")
    
    # Generate and print the slot machine spin at the very end
    slots = get_slot_machine_spin(rows, cols, symbol_count)
    print_slot_machine_spin(slots)

main()  