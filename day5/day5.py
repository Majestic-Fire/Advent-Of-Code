def part1(input):

    seeds, *blocks = input.split("\n\n")

    seeds = list(map(int, seeds.split(': ')[1].split()))

    maps = []
    for block in blocks:
        range = []
        #splitline, and remove the first line[1:]
        for line in block.splitlines()[1:]:    
            dest, src, len = line.split()
            range.append((int(dest), int(src), int(len)))

        maps.append(range)


    new = []
    for seed in seeds:
        # print(f'Checking {seed}')
        for num, mapping in enumerate(maps):
            for dest, src, len in mapping:
                if src <= seed < src + len:
                    # print(f'[map {num}] {seed} ->', end=' ')
                    seed = seed + dest - src
                    # print(f'{seed}')
                    break 
        new.append(seed)

    return min(new)


def part2(input):
   return 0


##### Main #####

import os
from dotenv import load_dotenv
import requests


if __name__ == "__main__":
    
    part1_enabled = False
    # part1_enabled = True
    part2_enabled = False
    # part2_enabled = True

    day = 5
    year = 2023

    with open(f"day{day}/sample_input.txt", "r") as file:
        input = file.read()   
    
    result = part1(input)
    print(f"[Sample]This is the part-1 result: {result}")

    print("===============")
    
    result = part2(input)
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
        result = part1(data)
        print(f"[Puzzle]This is the part-1 result: {result}")
    if part2_enabled:
        result = part2(data)
        print(f"[Puzzle]This is the part-2 result: {result}")
else:
    print("Error: Failed to fetch data. Status code:", response.status_code)