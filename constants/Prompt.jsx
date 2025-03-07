import dedent from "dedent";

export default {
  IDEA: dedent`:As your are coaching teacher
    - User want to learn about the topic
    - Generate 5-7 Course title for study (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,
  `,

  // - Chapter Explain in HTML Form, (Code example if required),
  COURSE: dedent`: As you are a coaching teacher
    - User want to learn about all topics
    - Create the course with Course Title, Description, minimum of 4 and maximum of 7 Chapters.
    - Each chapter generated should have a minimum of 2 and maximum of 5 elements (i.e. ChapterName and content, refer to the schema below)
    - Make sure to add chapters with all learning materials like text, code, example, etc.
    - Add CourseBanner Image from ('/banner1.jpg','/banner2.jpg', '/banner3.jpg', '/banner4.jpg', '/banner5.jpg', '/banner6.jpg')
    - Explain the chapter content as detailed tutorial
    - Generate 5 Quiz, 10 Flashcard and 5 Questions answer
    - Tag the course to one of the category from : ['Tech & Coding', 'Buisness & Finance', 'Design', 'Marketing', 'Personal Development', 'Photography', 'Health & Fitness', 'Lifestyle', 'Language']
    - Note: Keep the length of the total content generated (output token length) strictly less than or equal to 8000 characters.
    
    - Output in JSON Format only
    - "courses": [
      {
        "courseTitle": "",
        "description": "",
        "banner": "/banner1.png",
        "category": "",
        "chapters": [
          {
            "chapterName": "",
            "content": [
                {
                    "topic": '<Topic in 2 to 4 words>',
                    "explaination": '<Detailed Explanation Tutorial>',
                    "code": 'Code example if required, else null',
                    "example": 'Example if required, else null'
                }
            ],
          }
        ],
        "quiz": [
          {
            "question": "",
            "options": ['a', 'b', 'c', 'd'],
            "correctAnswer": ""
          }
        ],
        "flashcards": [
          {
            "front": "",
            "back": ""
          }
        ],
        "qa": [
          {
            "question": "",
            "answer": ""
          }
        ]
      }
    ]
  `,
};
