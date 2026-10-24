
import streamlit as st
from signs.dictionary import SIGN_DICTIONARY

st.set_page_config(page_title="SIGNOVA", page_icon="🤟")

st.title("SIGNOVA")
st.subheader("News interpretation through an ISL avatar")

st.write("Welcome to SIGNOVA!")
st.write("Enter a news statement to begin.")

news_text = st.text_area(
    "Paste your news statement here",
    placeholder= "Example: Heavy rain is expected in Mumbai today.",
    height=150
)

if st.button("Generate Sign Sequence"):
    if not news_text.strip():
        st.warning("Please enter a news statement first.")
    else:
        st.success("Your news statement has been received.")
        st.write("Your news:", news_text)

        text = news_text.lower()
        st.subheader("Concepts detected")

        found_concepts = []

        for keyword, details in SIGN_DICTIONARY.items():
            if keyword in text:
                found_concepts.append(details)

        if found_concepts:
            st.success(
                f"Detected {len(found_concepts)} supported concepts."
            )
            for concept in found_concepts:
                st.write(
                    f"{concept['category']}: {concept['label']}"
                )
        else:
            st.write("No supported concepts detected yet.")
