def part1(input):

    pts = 0

    for i, card in enumerate(input):
        count = 0
        
        card_data = card.split(': ')[1]
        num, winNum = card_data.split(' | ')

        num = num.split()
        winNum = winNum.split()

        count = sum(n in winNum for n in num)

        print(f'count: {count}')
        
        if count == 0:
            continue

        pts += 1 << (count-1)   # 2^(count-1)


    return pts

def part2(input):

    # get a list of card and its match num
    countMap = {}
    for i, card in enumerate(input):
        count = 0
        
        card_data = card.split(': ')[1]
        num, winNum = card_data.split(' | ')

        num = num.split()
        winNum = winNum.split()

        count = sum(n in winNum for n in num)

        countMap[i+1] = count

    print(countMap)

    total = 0
    for id in countMap:
        total += part2_recur(id, countMap)
        print(f'id: {id}, curr: {total}')

    return total

def part2_recur(ID, countMap):
    # Base : No match = no new card
    if countMap[ID] == 0:
        return 1

    curr = 1
    match = countMap[ID]

    for new in range(ID+1, ID+match+1):
        if new > len(countMap):
            break

        # print(f'[{ID}] new: {new}, curr: {curr}')
        curr += part2_recur(new, countMap)

    return curr

##### Main #####

import os
from dotenv import load_dotenv
import requests


if __name__ == "__main__":
    
    part1_enabled = False
    # part1_enabled = True
    # part2_enabled = False
    part2_enabled = True

    day = 4
    year = 2023

    with open(f"day{day}/sample_input.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    
    result = part1(arr)
    print(f"[Sample]This is the part-1 result: {result}")
    print("===============")

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