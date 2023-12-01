def calculate_sum(arr):
    sum = 0

    for line in arr:
        first_digit = None
        last_digit = None
        for char in line:
            if char.isdigit():
                if first_digit is None:
                    first_digit = char
                last_digit = char

        calibration = int(first_digit + last_digit)
        sum += calibration

    return sum

if __name__ == "__main__":
    # Part 1
    with open("day1/input1.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    result = calculate_sum(arr)
    print(f"This is the test result: {result}")
 
    # Part 1
    with open("day1/puzzle_input.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    result = calculate_sum(arr)
    print(f"This is the test result: {result}")