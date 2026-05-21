import type { Level } from '@/context/LevelContext'

export interface SpeakingTopic {
  id: number
  part: 1 | 2 | 3
  topic: string
  level: Level[]
  question?: string
  cueCard?: {
    instruction: string
    points: string[]
  }
  followUpQuestions?: string[]
  tips?: string[]
  keywords?: string[]
}

export const speakingData: SpeakingTopic[] = [
  // ==================== PART 1 ====================
  {
    id: 101, part: 1, topic: 'Hometown', level: ['A1-A2', 'B1', 'B2'],
    question: 'Where is your hometown? What do you like about it?',
    tips: ['Talk about location, size, and what makes it special.', 'Use adjectives like "peaceful", "crowded", "modern".'],
    keywords: ['hometown', 'located in', 'peaceful', 'crowded', 'friendly people'],
    followUpQuestions: ['Has your hometown changed much since you were a child?', 'Would you recommend visiting your hometown to tourists? Why?'],
  },
  {
    id: 102, part: 1, topic: 'Work & Study', level: ['A1-A2', 'B1', 'B2'],
    question: 'Do you work or are you a student? What do you do?',
    tips: ['Mention your job/study field and what you enjoy about it.', 'Talk about your daily routine briefly.'],
    keywords: ['student', 'major in', 'work as', 'responsible for', 'colleagues'],
    followUpQuestions: ['What is the most interesting part of your job/study?', 'Do you plan to continue in this field?'],
  },
  {
    id: 103, part: 1, topic: 'Hobbies', level: ['A1-A2', 'B1', 'B2'],
    question: 'What do you like to do in your free time? How long have you been doing it?',
    tips: ['Describe the activity and why you enjoy it.', 'Mention how often you do it.'],
    keywords: ['in my free time', 'enjoy', 'relaxing', 'stress relief', 'hobby'],
    followUpQuestions: ['Do you prefer indoor or outdoor activities?', 'Have you recently started any new hobbies?'],
  },
  {
    id: 104, part: 1, topic: 'Travel', level: ['A1-A2', 'B1', 'B2'],
    question: 'Do you like travelling? Where have you been recently?',
    tips: ['Talk about places you have visited and what you liked about them.', 'Mention future travel plans.'],
    keywords: ['travel', 'visited', 'sightseeing', 'local cuisine', 'memorable'],
    followUpQuestions: ['Do you prefer travelling alone or with others?', 'What is the most memorable trip you have taken?'],
  },
  {
    id: 105, part: 1, topic: 'Technology', level: ['B1', 'B2', 'C1', 'C2'],
    question: 'How often do you use the Internet? What do you mainly use it for?',
    tips: ['Talk about both work/study and personal use.', 'Mention both benefits and drawbacks.'],
    keywords: ['internet', 'social media', 'online', 'digital', 'screen time'],
    followUpQuestions: ['Could you live without the Internet for a week?', 'How has technology changed the way people communicate?'],
  },
  {
    id: 106, part: 1, topic: 'Food & Cooking', level: ['A1-A2', 'B1', 'B2', 'C1', 'C2'],
    question: 'What kind of food do you like? Can you cook?',
    tips: ['Name your favourite dishes and why you like them.', 'Mention any cooking skills you have.'],
    keywords: ['favourite food', 'delicious', 'healthy', 'cuisine', 'ingredients'],
    followUpQuestions: ['Do you prefer eating at home or eating out?', 'Is there any food you dislike?'],
  },

  {
    id: 107, part: 1, topic: 'Travel & Holidays', level: ['A1-A2', 'B1', 'B2', 'C1', 'C2'],
    question: 'Do you enjoy travelling? What kind of holidays do you prefer?',
    tips: ['Talk about different types of holidays you enjoy.', 'Describe a memorable travel experience.', 'Mention what you look for in a holiday destination.'],
    keywords: ['travel', 'holiday', 'destination', 'sightseeing', 'adventure'],
    followUpQuestions: ['Do you prefer relaxing or active holidays?', 'What is the best holiday destination you have ever visited?'],
  },
  {
    id: 108, part: 1, topic: 'Weather & Seasons', level: ['A1-A2', 'B1', 'B2'],
    question: 'What is your favourite season? What is the weather like in your country?',
    tips: ['Describe each season briefly.', 'Mention activities you enjoy in different weather.', 'Use weather vocabulary like "sunny", "rainy", "freezing".'],
    keywords: ['season', 'weather', 'climate', 'temperature', 'forecast'],
    followUpQuestions: ['How does the weather affect your mood?', 'Has the weather in your country changed in recent years?'],
  },
  {
    id: 109, part: 1, topic: 'Books & Reading', level: ['B1', 'B2', 'C1', 'C2'],
    question: 'Do you enjoy reading? What kind of books do you like?',
    tips: ['Talk about your favourite genres and authors.', 'Mention how often you read and where.', 'Discuss the benefits of reading.'],
    keywords: ['reading', 'novel', 'genre', 'fiction', 'author'],
    followUpQuestions: ['Do you prefer print books or e-books?', 'What was the last book you read?'],
  },

  // ==================== PART 2 ====================
  {
    id: 201, part: 2, topic: 'Describe a memorable holiday', level: ['B1', 'B2', 'C1'],
    cueCard: {
      instruction: 'Describe a memorable holiday you have had.',
      points: ['Where you went', 'Who you went with', 'What you did there', 'And explain why it was memorable'],
    },
    tips: ['Use past tense consistently.', 'Include specific details to make your story vivid.', 'Explain the significance of this holiday.'],
    keywords: ['memorable', 'holiday', 'amazing experience', 'breathtaking', 'unforgettable'],
    followUpQuestions: ['Do you prefer beach holidays or city breaks?', 'What factors make a holiday successful?'],
  },
  {
    id: 202, part: 2, topic: 'Describe a person who influenced you', level: ['B1', 'B2', 'C1'],
    cueCard: {
      instruction: 'Describe a person who has had a significant influence on your life.',
      points: ['Who this person is', 'How you know them', 'What qualities they have', 'And explain how they influenced you'],
    },
    tips: ['Talk about specific examples of their influence.', 'Use adjectives to describe their character.', 'Explain how you feel about them.'],
    keywords: ['role model', 'admire', 'inspiration', 'supportive', 'guidance'],
    followUpQuestions: ['What qualities make someone a good role model?', 'Do you think famous people can be good role models?'],
  },
  {
    id: 203, part: 2, topic: 'Describe a book you enjoyed reading', level: ['B1', 'B2'],
    cueCard: {
      instruction: 'Describe a book that you enjoyed reading.',
      points: ['What the book is about', 'When you read it', 'Why you decided to read it', 'And explain why you enjoyed it'],
    },
    tips: ['Summarize the plot briefly without spoilers.', 'Talk about what the book made you feel or think.', 'Recommend the book if appropriate.'],
    keywords: ['page-turner', 'captivating', 'well-written', 'thought-provoking', 'plot twist'],
    followUpQuestions: ['Do you prefer fiction or non-fiction?', 'How often do you read?'],
  },
  {
    id: 204, part: 2, topic: 'Describe a skill you want to learn', level: ['B1', 'B2', 'C1'],
    cueCard: {
      instruction: 'Describe a skill that you would like to learn.',
      points: ['What the skill is', 'Why you want to learn it', 'How you plan to learn it', 'And explain how it would benefit you'],
    },
    tips: ['Be realistic about your learning plan.', 'Connect the skill to your personal or professional goals.', 'Show enthusiasm.'],
    keywords: ['skill', 'learn', 'improve', 'challenging', 'rewarding'],
    followUpQuestions: ['Is it better to learn new skills alone or with a teacher?', 'What skills do you think will be important in the future?'],
  },
  {
    id: 205, part: 2, topic: 'Describe an important decision you made', level: ['B2', 'C1', 'C2'],
    cueCard: {
      instruction: 'Describe an important decision you have made in your life.',
      points: ['What the decision was', 'When you made it', 'Who you consulted', 'And explain why it was important'],
    },
    tips: ['Show the decision-making process.', 'Discuss the outcomes and whether you regret it.', 'Use conditional language if relevant.'],
    keywords: ['decision', 'crossroads', 'weigh up', 'consequences', 'turning point'],
    followUpQuestions: ['Do you think people make better decisions alone or in groups?', 'What major decisions do young people face today?'],
  },
  {
    id: 206, part: 2, topic: 'Describe a place with beautiful scenery', level: ['A1-A2', 'B1'],
    cueCard: {
      instruction: 'Describe a place in nature that you find beautiful.',
      points: ['Where it is', 'How you got there', 'What you saw there', 'And explain why you found it beautiful'],
    },
    tips: ['Use descriptive language about colors, sounds, and smells.', 'Explain how the place made you feel.', 'Mention if you would like to go back.'],
    keywords: ['scenic', 'breathtaking', 'tranquil', 'picturesque', 'nature'],
    followUpQuestions: ['Do you prefer natural or urban landscapes?', 'Why do people enjoy spending time in nature?'],
  },

  {
    id: 207, part: 2, topic: 'Describe a place you visited recently', level: ['A1-A2', 'B1', 'B2'],
    cueCard: {
      instruction: 'Describe a place that you visited recently.',
      points: ['Where it is', 'Who you went with', 'What you did there', 'And explain why you enjoyed it'],
    },
    tips: ['Use descriptive language about the atmosphere.', 'Talk about what made the visit special.', 'Mention if you would recommend it to others.'],
    keywords: ['visit', 'explore', 'atmosphere', 'recommend', 'memorable'],
    followUpQuestions: ['Do you prefer visiting new places or returning to familiar ones?', 'What factors make a place enjoyable to visit?'],
  },
  {
    id: 208, part: 2, topic: 'Describe a goal you achieved', level: ['B1', 'B2', 'C1', 'C2'],
    cueCard: {
      instruction: 'Describe a goal that you have achieved in your life.',
      points: ['What the goal was', 'When you set it', 'How you achieved it', 'And explain how you felt when you achieved it'],
    },
    tips: ['Describe the steps you took to reach your goal.', 'Talk about challenges you overcame.', 'Reflect on what you learned from the experience.'],
    keywords: ['goal', 'achievement', 'determination', 'challenge', 'milestone'],
    followUpQuestions: ['What is the next goal you want to achieve?', 'Is it important to set goals in life?'],
  },

  // ==================== PART 3 ====================
  {
    id: 301, part: 3, topic: 'Technology & Society', level: ['B2', 'C1', 'C2'],
    question: 'How has technology changed the way people communicate?',
    tips: ['Discuss both positive and negative impacts.', 'Consider different generations.', 'Mention social media, email, messaging apps.'],
    keywords: ['digital communication', 'social media', 'face-to-face', 'connectivity', 'digital divide'],
    followUpQuestions: [
      'Do you think technology makes people more or less connected?',
      'What are the disadvantages of relying too much on technology for communication?',
      'How do you think communication will change in the next 20 years?',
    ],
  },
  {
    id: 302, part: 3, topic: 'Education', level: ['B1', 'B2', 'C1'],
    question: 'What makes a good teacher? Do you think the education system in your country is effective?',
    tips: ['Talk about qualities like patience, knowledge, and communication.', 'Compare traditional and modern education.', 'Be specific about strengths and weaknesses.'],
    keywords: ['education system', 'qualified teachers', 'curriculum', 'critical thinking', 'exam-oriented'],
    followUpQuestions: [
      'Should education be free for everyone?',
      'How has education changed in the last 20 years?',
      'What role should technology play in education?',
    ],
  },
  {
    id: 303, part: 3, topic: 'Environment', level: ['B2', 'C1', 'C2'],
    question: 'What are the biggest environmental problems facing the world today? How can individuals help?',
    tips: ['Mention climate change, pollution, deforestation.', 'Suggest practical actions individuals can take.', 'Talk about government responsibility too.'],
    keywords: ['climate change', 'carbon footprint', 'sustainable', 'renewable energy', 'conservation'],
    followUpQuestions: [
      'Should governments do more to protect the environment?',
      'Is it too late to reverse climate change?',
      'What can businesses do to operate more sustainably?',
    ],
  },
  {
    id: 304, part: 3, topic: 'Globalization', level: ['C1', 'C2'],
    question: 'What are the effects of globalization on local cultures? Is it mostly positive or negative?',
    tips: ['Discuss cultural exchange vs cultural erosion.', 'Consider economic impacts.', 'Mention food, fashion, language, and traditions.'],
    keywords: ['globalization', 'cultural identity', 'cultural exchange', 'homogenization', 'diversity'],
    followUpQuestions: [
      'How can countries preserve their cultural identity in a globalized world?',
      'Do you think globalization has more benefits or drawbacks?',
      'Has globalization affected your country? How?',
    ],
  },
  {
    id: 305, part: 3, topic: 'Health & Wellbeing', level: ['B1', 'B2'],
    question: 'What can people do to stay healthy? Is the healthcare system in your country good?',
    tips: ['Discuss diet, exercise, sleep, and mental health.', 'Compare public vs private healthcare.', 'Suggest improvements.'],
    keywords: ['healthcare', 'preventive care', 'mental health', 'work-life balance', 'wellness'],
    followUpQuestions: [
      'Should governments spend more on preventive healthcare?',
      'How can workplaces promote employee wellbeing?',
      'What is the biggest health challenge facing your country?',
    ],
  },
  {
    id: 306, part: 3, topic: 'Work & Career', level: ['B2', 'C1'],
    question: 'How has the nature of work changed in recent years? What skills will be important in the future?',
    tips: ['Discuss remote work, gig economy, automation.', 'Talk about soft skills vs technical skills.', 'Mention lifelong learning.'],
    keywords: ['remote work', 'automation', 'work-life balance', 'job market', 'lifelong learning'],
    followUpQuestions: [
      'Will AI replace most jobs in the future?',
      'What is more important: job satisfaction or salary?',
      'How can young people prepare for the future job market?',
    ],
  },
]
