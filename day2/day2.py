class CubeSet:
    def __init__(self, cubes):
        self.cubes = cubes

        self.red = 0
        self.green = 0
        self.blue = 0

        for cube in cubes:
            count, color = cube.split()
            count = int(count)
            if color == 'red':
                self.red = count
            elif color == 'green':
                self.green = count
            elif color == 'blue':
                self.blue = count

    def __str__(self):
        return 'red: {}, green: {}, blue: {}'.format(self.red, self.green, self.blue)


class Game:
    def __init__(self, game_data):
        self.cube_sets = []
        for cube_set_data in game_data.split(';'):
            cubes = cube_set_data.strip().split(', ')

            
            
            cube_set = CubeSet(cubes)
            self.cube_sets.append(cube_set)

    def __str__(self):
        result = ""
        for cube_set in self.cube_sets:
            result += str(cube_set) + "\n"
        if self.isInvalid():
            result += "Status: Invalid"
        else:
            result += "Status: Valid"
        return result

    # Check if the game is invalid
    def isInvalid(self):
        limit = {
            'red': 12,
            'green': 13,
            'blue': 14
        }

        for cube_set in self.cube_sets:
            if cube_set.red > limit['red']:
                return True
            if cube_set.green > limit['green']:
                return True
            if cube_set.blue > limit['blue']:
                return True

        return False
        

def part1(input):
    possibleSum = 0
    for game_info in input:
        game_id = game_info.split(': ')[0].split(' ')[1]
        game_data = game_info.split(': ')[1]
        game = Game(game_data)
        
        # print('this is the game{}:'.format(game_id))
        # print(game)
        # print('---')
        
        if not game.isInvalid():
            possibleSum += int(game_id)

    return possibleSum

def part2(input):
    possiblePowerSum = 0
    for game_info in input:
        game_id = game_info.split(': ')[0].split(' ')[1]
        game_data = game_info.split(': ')[1]
        game = Game(game_data)
        

        # print('this is the game{}:'.format(game_id))
        # print(game)
        # print('---')
        maxCubes = [0, 0, 0]
        for cube_set in game.cube_sets:
            if cube_set.red > maxCubes[0]:
                maxCubes[0] = cube_set.red
            if cube_set.green > maxCubes[1]:
                maxCubes[1] = cube_set.green
            if cube_set.blue > maxCubes[2]:
                maxCubes[2] = cube_set.blue

        print('Game[{}] minCubes: {}'.format(game_id, maxCubes))
        possiblePowerSum += maxCubes[0] * maxCubes[1] * maxCubes[2]

    return possiblePowerSum

##### Main #####

import os
from dotenv import load_dotenv
import requests


if __name__ == "__main__":
    
    day = 2
    year = 2023

    with open(f"day{day}/sample_input.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    result = part1(arr)
    print(f"[Sample]This is the part-1 result: {result}")
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

part1_enabled = False
part2_enabled = True

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