import re

def find_first_last_digits(string, before, after):
    # Define the valid "digits"
    valid_digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

    # Define the numerical representation of the digits
    digit_mapping = {
        'zero': '0',
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9'
    }

    # Find all occurrences of valid digits in the string
    matches_before = re.search('|'.join(valid_digits), string[:before])
    
    pattern = f"(?s:.*)({'|'.join(valid_digits)})"
    matches_after = re.findall(pattern, string[after+1:]) 
    
    print(f"Line: {string}")
    print(f"Trimmed string b4: {string[:before]}")
    print(f"Trimmed string after: {string[after+1:]}")

    # Extract the first and last occurrence of valid digits
    first_digit_word = matches_before[0] if matches_before else None
    last_digit_word = matches_after[-1] if matches_after else None

    # Convert digit words to numerical representation
    first_digit = digit_mapping[first_digit_word] if first_digit_word else None
    last_digit = digit_mapping[last_digit_word] if last_digit_word else None

    return first_digit, last_digit



def calculate_sum(arr):
    sum = 0

    for line in arr:
        first_digit = None
        last_digit = None
        first_digit_index = 999
        last_digit_index = 0
        for index, char in enumerate(line):
            if char.isdigit():
                if first_digit is None:
                    first_digit = char
                    first_digit_index = index
                last_digit = char
                last_digit_index = index

        first_l_digit, last_l_digit = find_first_last_digits(line, first_digit_index, last_digit_index)
        if first_l_digit is not None:
            first_digit = first_l_digit
        if last_l_digit is not None:
            last_digit = last_l_digit

        calibration = int(first_digit + last_digit)
        print(f"Calibration: {calibration} \n")

        sum += calibration

    return sum

if __name__ == "__main__":
    # Part 1
    with open("day1/input2.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    result = calculate_sum(arr)
    print(f"This is the test result: {result}")
 
    # Part 1
    with open("day1/puzzle_input.txt", "r") as file:
        arr = [line.strip() for line in file.readlines()]   
    result = calculate_sum(arr)
    print(f"This is the test result: {result}")