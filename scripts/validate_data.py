# scripts/validate_data.py
import json
import os

def validate_profiles():
    data_dir = "src/data"
    for filename in os.listdir(data_dir):
        with open(f"{data_dir}/{filename}") as f:
            user = json.load(f)
            # Ensure every profile has a name and bio
            assert "name" in user, f"{filename} is missing a name!"
            assert "bio" in user, f"{filename} is missing a bio!"
    print("All profiles are valid!")

if __name__ == "__main__":
    validate_profiles()