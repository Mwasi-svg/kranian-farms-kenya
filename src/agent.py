import google.generativeai as genai

genai.configure(api_key="AIzaSyDd5bDQUz5hTC8rNOYEKjfUsPPzpRbN1iI")

model = genai.GenerativeModel("gemini-pro")

while True:
    prompt = input("You: ")
    if prompt.lower() in ["exit", "quit"]:
        break
    response = model.generate_content(prompt)
    print("Gemini:", response.text)
