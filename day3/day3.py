




def isSymbol(char):
    return not char.isdigit() and char != '.'

def part1(input):

    partNumber = []
    visited = {}
    # Get the symbol locations in each line
    symbol_locations = []
    for row, line in enumerate(input):
        for col, char in enumerate(line):
            if isSymbol(char):
                location = (row, col)
                symbol_locations.append(location)

    # Find if there is a digit adjacent to the symbol
    for row, col in symbol_locations:
        for i in range(-1, 2):
            for j in range(-1, 2):

                currRow = row + i
                currCol = col + j

                if (currRow, currCol) in symbol_locations:
                    continue
                elif input[currRow][currCol].isdigit():
                    # Check if the number is already visited
                    found = False
                    if f'row_{currRow}' in visited:
                        for point in visited[f'row_{currRow}']:
                            if point[0] <= currCol <= point[1]:
                                found = True
                                break
                                
                    if found:
                        continue

                    # Find the number, moving left right pointer
                    a = currCol
                    while a >= 0 and input[currRow][a].isdigit():
                        a -= 1
                    left = a + 1

                    b = currCol
                    while b < len(input[currRow]) and input[currRow][b].isdigit():
                        b += 1
                    right = b - 1

                    # Add the number to visited
                    if f'row_{currRow}' not in visited:
                        visited[f'row_{currRow}'] = []
                    visited[f'row_{currRow}'].append((left, right))

                    # Add the number to partNumber
                    number = input[currRow][left:right+1]

                    symbol = input[row][col]
                    # print(f'row: {currRow}, symbol: {symbol}, left: {left}, right: {right}, currcol: {currCol}, number: {number}')

                    # print(visited)
                    partNumber.append(int(number))



    return sum(partNumber)

def part2(input):

    gearRatio = []

    for row, line in enumerate(input):
        for col, char in enumerate(line):
            
            if char != '*':
                continue

            # cr = current row
            # cc = current col
            numberHead = set()

            for cr in [row-1, row, row+1]:
                for cc in [col-1, col, col+1]:
                    # print(f'row: {row}, col: {col}, cr: {cr}, cc: {cc}, input[cr][cc]: {input[cr][cc]}')

                    if cr < 0 or cr >= len(input) or cc < 0 or cc >= len(input[cr]):
                        continue

                    if not input[cr][cc].isdigit():
                        continue                    

                    head = cc
                    while head > 0 and input[cr][head-1].isdigit():
                        head -= 1
                    numberHead.add((cr, head))
            
            if len(numberHead) == 2:
                adjNum = []
                # Careful with name of variable
                # the cr will replace the row , if it has same name
                for cr, a in numberHead:
                    b = a
                    while b < len(input[cr]) and input[cr][b].isdigit():
                        b += 1

                    number = input[cr][a:b]
                    adjNum.append(int(number))

                gearRatio.append(adjNum[0] * adjNum[1])

    return sum(gearRatio)


##### Main #####

import os
from dotenv import load_dotenv
import requests


if __name__ == "__main__":
    
    part1_enabled = False
    # part1_enabled = True
    # part2_enabled = False
    part2_enabled = True

    day = 3
    year = 2023

    with open(f"day{day}/sample_input.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    # result = part1(arr)
    # print(f"[Sample]This is the part-1 result: {result}")
    result = part2(arr)
    print(f"[Sample]This is the part-2 result: {result}")



# Load the environment variables from the .env file
load_dotenv()
# Get the session token from the environment variables
session_token = os.getenv('AOC_SESSION_COOKIE')
# URL
url = f"https://adventofcode.com/{year}/day/{day}/input"
headers = {
    'User-Agent': 'Mozilla/5.0',
}

response = requests.get(url, cookies={'session': session_token}, headers=headers)


if response.status_code == 200:
    data = response.text
    # Process the data as needed
    if part1_enabled:

        result = part1(data.splitlines())
        print(f"[Puzzle]This is the part-1 result: {result}")
    if part2_enabled:
        result = part2(data.splitlines())
        print(f"[Puzzle]This is the part-2 result: {result}")
else:
    print("Error: Failed to fetch data. Status code:", response.status_code)