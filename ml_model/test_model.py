from pathlib import Path
import joblib

MODEL_PATH = Path(__file__).parent / "samvaad_word_model.joblib"
model = joblib.load(MODEL_PATH)

test_words = [
    "school",
    "rain",
    "flood",
    "Mumbai",
    "tomorrow",
    "precipitation",
    "hospital",
]

print("SAMVAAD Word Recognition Test")
print("-" * 35)

for word in test_words:
    prediction = model.predict([word])[0]
    print(f"Input: {word:15} -> Predicted concept: {prediction}")
