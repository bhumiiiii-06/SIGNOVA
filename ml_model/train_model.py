
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score, classification_report

# 1. Load the training dataset
data = pd.read_csv("training_data.csv")

# 2. Clean the dataset
data["text"] = data["text"].astype(str).str.strip().str.lower()
data["label"] = data["label"].astype(str).str.strip().str.upper()
data = data.dropna(subset=["text", "label"])
data = data[data["text"] != ""]

# 3. Check that enough examples exist
print("Training examples:", len(data))
print("\nExamples per concept:")
print(data["label"].value_counts())

if data["label"].nunique() < 2:
    raise ValueError("Add examples for at least two concepts.")

# 4. Split the dataset for evaluation
train_texts, test_texts, train_labels, test_labels = train_test_split(
    data["text"],
    data["label"],
    test_size=0.25,
    random_state=42,
    stratify=data["label"]
)

# 5. Build the text-classification pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(analyzer="char", ngram_range=(2, 5))),
    ("classifier", LinearSVC(class_weight="balanced"))
])

# 6. Train the model
model.fit(train_texts, train_labels)

# 7. Evaluate on held-out examples
predictions = model.predict(test_texts)

print("\nTest accuracy:", round(accuracy_score(test_labels, predictions), 3))
print("\nClassification report:")
print(classification_report(
    test_labels,
    predictions,
    zero_division=0
))

# 8. Train the final model on all available examples
model.fit(data["text"], data["label"])

# 9. Save the trained model
joblib.dump(model, "samvaad_word_model.joblib")

print("\nModel saved as samvaad_word_model.joblib")
