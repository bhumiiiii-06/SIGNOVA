
import sys
import json
import joblib
from pathlib import Path

MODEL_PATH = Path(__file__).parent / "samvaad_word_model.joblib"

# Only concepts currently supported by SAMVAAD.

SUPPORTED_WORDS = {
    # Weather
    "rain": "RAIN",
    "rainfall": "RAINFALL",
    "precipitation": "PRECIPITATION",
    "storm": "STORM",
    "cyclone": "CYCLONE",
    "drought": "DROUGHT",

    # Disasters
    "flood": "FLOOD",
    "flooding": "FLOOD",
    "landslide": "LANDSLIDE",
    "earthquake": "EARTHQUAKE",
    "tsunami": "TSUNAMI",
    "warning": "WARNING",
    "rescue": "RESCUE",

    # Locations
    "mumbai": "MUMBAI",
    "india": "INDIA",
    "delhi": "DELHI",
    "pune": "PUNE",
    "village": "VILLAGE",
    "city": "CITY",

    # Time
    "today": "TODAY",
    "tomorrow": "TOMORROW",
    "yesterday": "YESTERDAY",
    "morning": "MORNING",
    "evening": "EVENING",
    "night": "NIGHT",

    # Education
    "school": "SCHOOL",
    "schools": "SCHOOL",
    "college": "COLLEGE",
    "student": "STUDENT",
    "teacher": "TEACHER",
    "exam": "EXAM",

    # Health
    "hospital": "HOSPITAL",
    "doctor": "DOCTOR",
    "health": "HEALTH",
    "medicine": "MEDICINE",
    "emergency": "EMERGENCY",

    # Transport
    "train": "TRAIN",
    "bus": "BUS",
    "road": "ROAD",
    "traffic": "TRAFFIC",
    "airport": "AIRPORT",

    # Government and public services
    "government": "GOVERNMENT",
    "police": "POLICE",
    "public": "PUBLIC",
    "announcement": "ANNOUNCEMENT",
    "help": "HELP",

    # Environment
    "environment": "ENVIRONMENT",
    "pollution": "POLLUTION",
    "water": "WATER",
    "air": "AIR",
    "temperature": "TEMPERATURE",

    # General news
    "news": "NEWS",
    "alert": "ALERT",
    "update": "UPDATE",
    "important": "IMPORTANT",
    "information": "INFORMATION",
}


def main():
    text = " ".join(sys.argv[1:]).strip().lower()

    if not text:
        print(json.dumps({
            "gloss_sequence": [],
            "unsupported": []
        }))
        return

    model = joblib.load(MODEL_PATH)
    words = text.split()
    gloss_sequence = []
    unsupported = []

    for word in words:
        # Keep punctuation out of individual words.
        cleaned = "".join(char for char in word if char.isalpha())

        if not cleaned:
            continue

        if cleaned not in SUPPORTED_WORDS:
            if cleaned not in unsupported:
                unsupported.append(cleaned)
            continue

        prediction = model.predict([cleaned])[0]
        if prediction == SUPPORTED_WORDS[cleaned]:
            if prediction not in gloss_sequence:
                gloss_sequence.append(prediction)
        else:
            unsupported.append(cleaned)

    print(json.dumps({
        "gloss_sequence": gloss_sequence,
        "unsupported": unsupported
    }))

if __name__ == "__main__":
    main()
