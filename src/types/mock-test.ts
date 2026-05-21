export interface MockTest {
  id: string
  title: string
  description: string
  bandTarget: number
  sections: MockTestSection[]
}

export interface MockTestSection {
  id: string
  type: 'listening' | 'reading' | 'writing' | 'speaking'
  title: string
  instructions: string
  timeLimit: number
  questions: MockTestQuestion[]
}

export interface MockTestQuestion {
  id: string
  type: 'mcq' | 'tfng' | 'headings' | 'note-completion' | 'writing' | 'speaking'
  questionText: string
  passage?: string
  audioScript?: string
  options?: { label: string; text: string }[]
  correctAnswer: string | string[]
  explanation?: string
}

export interface WritingTask {
  id: string
  taskType: 'task1' | 'task2'
  instructions: string
  visualDescription?: string
  bandLevel: string
}

export interface SpeakingPart {
  id: string
  part: 1 | 2 | 3
  questions: string[] | { instruction: string; points: string[] }
}

export interface MockTestAnswers {
  questions: Record<string, string>
  writing: Record<string, string>
}

export interface SectionResult {
  sectionId: string
  type: string
  title: string
  score: number
  total: number
  percentage: number
  bandEstimate: number
  answers: Record<string, string>
}

export interface MockTestResult {
  id?: number
  testId: string
  date: number
  sectionResults: SectionResult[]
  overallBand: number
}

export function estimateBand(percentage: number): number {
  if (percentage >= 90) return 8.5
  if (percentage >= 80) return 7.5
  if (percentage >= 70) return 6.5
  if (percentage >= 60) return 6.0
  if (percentage >= 50) return 5.5
  if (percentage >= 40) return 5.0
  if (percentage >= 30) return 4.5
  if (percentage >= 20) return 4.0
  return 3.5
}

export function calculateOverallBand(bands: number[]): number {
  if (bands.length === 0) return 0
  const avg = bands.reduce((a, b) => a + b, 0) / bands.length
  return Math.round(avg * 2) / 2
}

export const mockTestList: MockTest[] = [
  {
    id: 'practice-1',
    title: 'Practice Test 1',
    description: 'Full IELTS mock test targeting Band 6.5. Includes Listening, Reading, Writing, and Speaking sections.',
    bandTarget: 6.5,
    sections: [
      {
        id: 'listening',
        type: 'listening',
        title: 'Listening',
        instructions: 'You will hear each recording once only. Answer all questions while you listen.',
        timeLimit: 30,
        questions: [
          {
            id: 'l1',
            type: 'note-completion',
            questionText: 'Complete the form. Write NO MORE THAN TWO WORDS for each answer.',
            audioScript: 'Woman: Hello, I\'d like to book a room for next weekend please.\nMan: Certainly. What date are you looking for?\nWoman: The 15th of March.\nMan: And how many nights?\nWoman: Just two nights, please.\nMan: What type of room would you like?\nWoman: A double room with a sea view, if possible.\nMan: Let me check... Yes, we have one available. That will be £180 per night.\nWoman: That\'s fine. Does that include breakfast?\nMan: Yes, breakfast is included from 7 to 9:30.\nWoman: Great. I\'ll take it.\nMan: Could I have your name, please?\nWoman: Sarah Jenkins.\nMan: And a contact number?\nWoman: 07700 900 382.',
            options: [
              { label: 'A', text: 'Sarah Jenkins' },
              { label: 'B', text: '15th March' },
              { label: 'C', text: 'double room' },
            ],
            correctAnswer: 'A',
            explanation: 'The caller gives her name as Sarah Jenkins.',
          },
          {
            id: 'l2',
            type: 'mcq',
            questionText: 'How many nights will the guest stay?',
            audioScript: 'Woman: Just two nights, please.',
            options: [
              { label: 'A', text: 'One night' },
              { label: 'B', text: 'Two nights' },
              { label: 'C', text: 'Three nights' },
            ],
            correctAnswer: 'B',
            explanation: 'She says "Just two nights, please."',
          },
          {
            id: 'l3',
            type: 'mcq',
            questionText: 'What type of room does the guest request?',
            audioScript: 'Woman: A double room with a sea view, if possible.',
            options: [
              { label: 'A', text: 'Single room' },
              { label: 'B', text: 'Double room with sea view' },
              { label: 'C', text: 'Suite' },
            ],
            correctAnswer: 'B',
            explanation: 'She asks for a double room with a sea view.',
          },
          {
            id: 'l4',
            type: 'note-completion',
            questionText: 'How much does the room cost per night?',
            audioScript: 'Man: That will be £180 per night.',
            options: [
              { label: 'A', text: '£150' },
              { label: 'B', text: '£180' },
              { label: 'C', text: '£200' },
            ],
            correctAnswer: 'B',
            explanation: 'The receptionist says £180 per night.',
          },
          {
            id: 'l5',
            type: 'mcq',
            questionText: 'Is breakfast included in the price?',
            audioScript: 'Man: Yes, breakfast is included from 7 to 9:30.',
            options: [
              { label: 'A', text: 'Yes, it is included' },
              { label: 'B', text: 'No, it costs extra' },
              { label: 'C', text: 'Only on weekends' },
            ],
            correctAnswer: 'A',
            explanation: 'Breakfast is included from 7 to 9:30.',
          },
          {
            id: 'l6',
            type: 'mcq',
            questionText: 'What is the guest\'s contact number?',
            audioScript: 'Woman: 07700 900 382.',
            options: [
              { label: 'A', text: '07700 900 382' },
              { label: 'B', text: '07700 900 283' },
              { label: 'C', text: '07700 908 382' },
            ],
            correctAnswer: 'A',
            explanation: 'The number given is 07700 900 382.',
          },
          {
            id: 'l7',
            type: 'mcq',
            questionText: 'Where is the museum located?',
            audioScript: 'The City Museum is located on Park Street, opposite the central library.',
            options: [
              { label: 'A', text: 'On Park Street, opposite the library' },
              { label: 'B', text: 'On Park Street, next to the station' },
              { label: 'C', text: 'On Main Street, opposite the library' },
            ],
            correctAnswer: 'A',
            explanation: 'It says "on Park Street, opposite the central library."',
          },
          {
            id: 'l8',
            type: 'mcq',
            questionText: 'What is the admission fee for adults?',
            audioScript: 'Admission is free for children under 12, while adults pay £8 and students £5.',
            options: [
              { label: 'A', text: 'Free' },
              { label: 'B', text: '£5' },
              { label: 'C', text: '£8' },
            ],
            correctAnswer: 'C',
            explanation: 'Adults pay £8 admission.',
          },
          {
            id: 'l9',
            type: 'note-completion',
            questionText: 'On which day is the museum closed?',
            audioScript: 'The museum is open from Tuesday to Sunday, 10 AM to 6 PM. We are closed on Mondays.',
            options: [
              { label: 'A', text: 'Sunday' },
              { label: 'B', text: 'Monday' },
              { label: 'C', text: 'Tuesday' },
            ],
            correctAnswer: 'B',
            explanation: 'The museum is closed on Mondays.',
          },
          {
            id: 'l10',
            type: 'mcq',
            questionText: 'Which exhibition is currently showing?',
            audioScript: 'Our current exhibition, "Ancient Egypt: Treasures of the Nile", runs until the end of this month.',
            options: [
              { label: 'A', text: 'Modern Art Collection' },
              { label: 'B', text: 'Ancient Egypt: Treasures of the Nile' },
              { label: 'C', text: 'Victorian Inventions' },
            ],
            correctAnswer: 'B',
            explanation: 'The current exhibition is "Ancient Egypt: Treasures of the Nile".',
          },
        ],
      },
      {
        id: 'reading',
        type: 'reading',
        title: 'Reading',
        instructions: 'Read the passages and answer the questions. You may write on the question paper.',
        timeLimit: 60,
        questions: [
          {
            id: 'r1',
            type: 'tfng',
            passage: 'Sleep is essential for human health and well-being. During sleep, the brain processes information from the day and consolidates memories. Adults typically need 7-9 hours of sleep per night, though this varies between individuals. Research has shown that chronic sleep deprivation can lead to serious health problems including heart disease, diabetes, and weakened immune function. Despite this, many people in modern society fail to get adequate sleep due to work demands and technology use.',
            questionText: 'All adults need exactly 8 hours of sleep per night.',
            options: [
              { label: 'TRUE', text: 'True' },
              { label: 'FALSE', text: 'False' },
              { label: 'NOT_GIVEN', text: 'Not Given' },
            ],
            correctAnswer: 'FALSE',
            explanation: 'The passage says adults need 7-9 hours, not exactly 8.',
          },
          {
            id: 'r2',
            type: 'tfng',
            passage: 'Sleep is essential for human health and well-being. During sleep, the brain processes information from the day and consolidates memories. Adults typically need 7-9 hours of sleep per night, though this varies between individuals. Research has shown that chronic sleep deprivation can lead to serious health problems including heart disease, diabetes, and weakened immune function. Despite this, many people in modern society fail to get adequate sleep due to work demands and technology use.',
            questionText: 'Sleep helps the brain store memories.',
            options: [
              { label: 'TRUE', text: 'True' },
              { label: 'FALSE', text: 'False' },
              { label: 'NOT_GIVEN', text: 'Not Given' },
            ],
            correctAnswer: 'TRUE',
            explanation: 'The passage states it "consolidates memories" which means stores them.',
          },
          {
            id: 'r3',
            type: 'tfng',
            passage: 'Sleep is essential for human health and well-being. During sleep, the brain processes information from the day and consolidates memories. Adults typically need 7-9 hours of sleep per night, though this varies between individuals. Research has shown that chronic sleep deprivation can lead to serious health problems including heart disease, diabetes, and weakened immune function. Despite this, many people in modern society fail to get adequate sleep due to work demands and technology use.',
            questionText: 'Lack of sleep can increase the risk of heart disease.',
            options: [
              { label: 'TRUE', text: 'True' },
              { label: 'FALSE', text: 'False' },
              { label: 'NOT_GIVEN', text: 'Not Given' },
            ],
            correctAnswer: 'TRUE',
            explanation: 'The passage lists heart disease as one consequence of sleep deprivation.',
          },
          {
            id: 'r4',
            type: 'tfng',
            passage: 'Sleep is essential for human health and well-being. During sleep, the brain processes information from the day and consolidates memories. Adults typically need 7-9 hours of sleep per night, though this varies between individuals. Research has shown that chronic sleep deprivation can lead to serious health problems including heart disease, diabetes, and weakened immune function. Despite this, many people in modern society fail to get adequate sleep due to work demands and technology use.',
            questionText: 'Technology use before bed is the main cause of sleep problems.',
            options: [
              { label: 'TRUE', text: 'True' },
              { label: 'FALSE', text: 'False' },
              { label: 'NOT_GIVEN', text: 'Not Given' },
            ],
            correctAnswer: 'NOT_GIVEN',
            explanation: 'Technology is mentioned as one factor, but it is not stated as the main cause.',
          },
          {
            id: 'r5',
            type: 'mcq',
            passage: 'Urban farming, the practice of growing food in cities, has gained popularity in recent years. Rooftop gardens, community plots, and vertical farms are transforming unused urban spaces into productive agricultural land. Advocates argue that urban farming reduces food miles, improves food security, and provides green spaces that help cool cities. However, challenges include limited space, soil contamination, and high startup costs. Despite these obstacles, cities like Singapore and Detroit have successfully integrated urban agriculture into their planning policies.',
            questionText: 'What is the main benefit of urban farming mentioned in the passage?',
            options: [
              { label: 'A', text: 'It is cheaper than traditional farming' },
              { label: 'B', text: 'It reduces food miles and improves food security' },
              { label: 'C', text: 'It requires no special skills' },
            ],
            correctAnswer: 'B',
            explanation: 'The passage states urban farming "reduces food miles, improves food security, and provides green spaces."',
          },
          {
            id: 'r6',
            type: 'mcq',
            passage: 'Urban farming, the practice of growing food in cities, has gained popularity in recent years. Rooftop gardens, community plots, and vertical farms are transforming unused urban spaces into productive agricultural land. Advocates argue that urban farming reduces food miles, improves food security, and provides green spaces that help cool cities. However, challenges include limited space, soil contamination, and high startup costs. Despite these obstacles, cities like Singapore and Detroit have successfully integrated urban agriculture into their planning policies.',
            questionText: 'Which challenge of urban farming is mentioned?',
            options: [
              { label: 'A', text: 'Lack of sunlight' },
              { label: 'B', text: 'Soil contamination' },
              { label: 'C', text: 'Low crop yields' },
            ],
            correctAnswer: 'B',
            explanation: 'Soil contamination is listed as one of the challenges.',
          },
          {
            id: 'r7',
            type: 'mcq',
            passage: 'Urban farming, the practice of growing food in cities, has gained popularity in recent years. Rooftop gardens, community plots, and vertical farms are transforming unused urban spaces into productive agricultural land. Advocates argue that urban farming reduces food miles, improves food security, and provides green spaces that help cool cities. However, challenges include limited space, soil contamination, and high startup costs. Despite these obstacles, cities like Singapore and Detroit have successfully integrated urban agriculture into their planning policies.',
            questionText: 'Which cities are mentioned as examples of successful urban farming integration?',
            options: [
              { label: 'A', text: 'London and Paris' },
              { label: 'B', text: 'Singapore and Detroit' },
              { label: 'C', text: 'Tokyo and Mumbai' },
            ],
            correctAnswer: 'B',
            explanation: 'Singapore and Detroit are mentioned as successful examples.',
          },
          {
            id: 'r8',
            type: 'headings',
            passage: 'Paragraph A: Urban farming refers to the production of food within city limits. This practice has existed for centuries but has recently seen a resurgence due to growing concerns about food security and environmental sustainability.\n\nParagraph B: One of the main advantages of urban agriculture is its contribution to local food systems. By producing food closer to consumers, cities can reduce the carbon footprint associated with long-distance food transportation.\n\nParagraph C: Despite its benefits, urban farming faces significant hurdles. Contaminated soil in former industrial areas can make some land unsuitable for growing food, and the cost of setting up vertical farms can be prohibitive.',
            questionText: 'Choose the correct heading for Paragraph B.',
            options: [
              { label: 'i', text: 'The history of urban farming' },
              { label: 'ii', text: 'Environmental benefits of local food production' },
              { label: 'iii', text: 'Challenges facing urban agriculture' },
            ],
            correctAnswer: 'ii',
            explanation: 'Paragraph B discusses how urban farming reduces carbon footprint, which is an environmental benefit.',
          },
          {
            id: 'r9',
            type: 'headings',
            passage: 'Paragraph A: Urban farming refers to the production of food within city limits. This practice has existed for centuries but has recently seen a resurgence due to growing concerns about food security and environmental sustainability.\n\nParagraph B: One of the main advantages of urban agriculture is its contribution to local food systems. By producing food closer to consumers, cities can reduce the carbon footprint associated with long-distance food transportation.\n\nParagraph C: Despite its benefits, urban farming faces significant hurdles. Contaminated soil in former industrial areas can make some land unsuitable for growing food, and the cost of setting up vertical farms can be prohibitive.',
            questionText: 'Choose the correct heading for Paragraph C.',
            options: [
              { label: 'i', text: 'The history of urban farming' },
              { label: 'ii', text: 'Environmental benefits of local food production' },
              { label: 'iii', text: 'Challenges facing urban agriculture' },
            ],
            correctAnswer: 'iii',
            explanation: 'Paragraph C discusses contaminated soil and high costs, which are challenges.',
          },
          {
            id: 'r10',
            type: 'headings',
            passage: 'Paragraph A: Urban farming refers to the production of food within city limits. This practice has existed for centuries but has recently seen a resurgence due to growing concerns about food security and environmental sustainability.\n\nParagraph B: One of the main advantages of urban agriculture is its contribution to local food systems. By producing food closer to consumers, cities can reduce the carbon footprint associated with long-distance food transportation.\n\nParagraph C: Despite its benefits, urban farming faces significant hurdles. Contaminated soil in former industrial areas can make some land unsuitable for growing food, and the cost of setting up vertical farms can be prohibitive.',
            questionText: 'Choose the correct heading for Paragraph A.',
            options: [
              { label: 'i', text: 'The history of urban farming' },
              { label: 'ii', text: 'Environmental benefits of local food production' },
              { label: 'iii', text: 'Challenges facing urban agriculture' },
            ],
            correctAnswer: 'i',
            explanation: 'Paragraph A discusses how urban farming has existed for centuries and its recent resurgence.',
          },
        ],
      },
      {
        id: 'writing',
        type: 'writing',
        title: 'Writing',
        instructions: 'Complete both tasks. Task 1 should be at least 150 words, Task 2 at least 250 words.',
        timeLimit: 60,
        questions: [
          {
            id: 'w1',
            type: 'writing',
            questionText: 'Task 1: The bar chart below shows the average monthly energy consumption for a typical household in the UK across different seasons. Summarise the information by selecting and reporting the main features.',
            correctAnswer: 'written',
            explanation: 'Your essay will be evaluated on task achievement, coherence, lexical resource, and grammar.',
          },
          {
            id: 'w2',
            type: 'writing',
            questionText: 'Task 2: Some people believe that technology has made our lives more complicated, while others argue that it has made life easier. Discuss both views and give your own opinion.',
            correctAnswer: 'written',
            explanation: 'Aim for 250+ words. Include an introduction, 2 body paragraphs, and a conclusion.',
          },
        ],
      },
      {
        id: 'speaking',
        type: 'speaking',
        title: 'Speaking',
        instructions: 'Record your answers for each part. Part 1: short questions, Part 2: 1 minute preparation + 2 minutes speaking, Part 3: discussion questions.',
        timeLimit: 15,
        questions: [
          {
            id: 's1',
            type: 'speaking',
            questionText: 'Part 1: Answer these questions about your hobbies.\n1. What do you enjoy doing in your free time?\n2. How often do you pursue this hobby?\n3. Do you prefer spending free time alone or with others?',
            correctAnswer: 'spoken',
            explanation: 'Answer each question briefly with 2-3 sentences.',
          },
          {
            id: 's2',
            type: 'speaking',
            questionText: 'Part 2: Describe a book that you have read recently.\nYou should say:\n- What the book was about\n- Why you decided to read it\n- What you liked or disliked about it\n- And whether you would recommend it to others',
            correctAnswer: 'spoken',
            explanation: 'You have 1 minute to prepare. Speak for 1-2 minutes.',
          },
          {
            id: 's3',
            type: 'speaking',
            questionText: 'Part 3: Discuss these questions.\n1. Do you think reading habits have changed in the digital age?\n2. What role should libraries play in modern society?\n3. How can parents encourage children to read more?',
            correctAnswer: 'spoken',
            explanation: 'Give detailed answers with examples.',
          },
        ],
      },
    ],
  },
]
