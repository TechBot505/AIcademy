const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateTopicsAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Learn Python : : As your are coaching teacher\n\n- User want to learn about the topic\n- Generate 5-7 Course title for study (Short)\n- Make sure it is releated to description\n- Output will be ARRAY of String in JSON FORMAT only\n- Do not add any plain text in output,"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"course_titles\": [\n    \"Python Fundamentals: A Beginner's Journey\",\n    \"Data Analysis with Python: A Practical Guide\",\n    \"Web Development with Flask: Building Web Apps\",\n    \"Machine Learning with Python: Core Concepts\",\n    \"Python for Automation: Scripting Your Way\",\n    \"Object-Oriented Programming in Python\",\n    \"Advanced Python: Design Patterns and Best Practices\"\n  ]\n}\n```\n"},
      ],
    },
  ],
});

export const generateCourseAIModel = model.startChat({
    generationConfig,
    history: [],
});
