"""Simple number guessing game."""

import random


def main() -> None:
    print("Guess the Number!")
    secret = random.randint(1, 100)
    attempts = 0

    while True:
        guess_text = input("Enter a number between 1 and 100 (or 'q' to quit): ").strip()
        if guess_text.lower() == "q":
            print(f"Goodbye! The number was {secret}.")
            return

        if not guess_text.isdigit():
            print("Please enter a valid whole number.")
            continue

        guess = int(guess_text)
        attempts += 1

        if guess < secret:
            print("Too low!")
        elif guess > secret:
            print("Too high!")
        else:
            print(f"Correct! You guessed the number in {attempts} tries.")
            return


if __name__ == "__main__":
    main()



