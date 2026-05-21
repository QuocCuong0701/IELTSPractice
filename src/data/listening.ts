import type { Level } from '@/context/LevelContext'

export type QuestionType = 'mcq' | 'note-completion' | 'form-completion' | 'map-labelling' | 'matching'

export interface BaseQuestion {
  id: number
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq'
  question: string
  options: string[]
  correctIndex: number
}

export interface NoteCompletionQuestion extends BaseQuestion {
  type: 'note-completion'
  context: string
  answer: string
  acceptableAnswers?: string[]
}

export interface MapLabellingQuestion extends BaseQuestion {
  type: 'map-labelling'
  instruction: string
  description: string
  locations: string[]
  labels: string[]
  correctAnswers: number[]
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching'
  instruction: string
  items: string[]
  options: string[]
  correctMatches: number[]
}

export type ListeningQuestion = MCQQuestion | NoteCompletionQuestion | MapLabellingQuestion | MatchingQuestion

export interface ListeningExercise {
  id: number
  title: string
  section: 1 | 2 | 3 | 4
  instruction: string
  transcript: string
  audioSrc?: string
  questions: ListeningQuestion[]
}

export const listeningData: Record<Level, ListeningExercise[]> = {
  'A1-A2': [
    {
      id: 101, title: 'Basic Introductions', section: 1, instruction: 'Section 1 — Nghe đoạn hội thoại và trả lời câu hỏi.',
      transcript: 'Hello, my name is Tom. I am from England. I have one brother and two sisters. I get up at six o\'clock every morning. My favourite colour is blue. I like apples and bananas.',
      questions: [
        { id: 1, type: 'mcq', question: 'Where is Tom from?', options: ['America', 'England', 'Australia', 'Canada'], correctIndex: 1 },
        { id: 2, type: 'mcq', question: 'How many brothers does Tom have?', options: ['One', 'Two', 'Three', 'None'], correctIndex: 0 },
        { id: 3, type: 'mcq', question: 'What time does Tom get up?', options: ['5:00', '6:00', '7:00', '8:00'], correctIndex: 1 },
        { id: 4, type: 'note-completion', context: 'Tom\'s favorite color is ______.', answer: 'blue', acceptableAnswers: ['blue'] },
        { id: 5, type: 'mcq', question: 'What fruit does Tom like?', options: ['Oranges and grapes', 'Apples and bananas', 'Pears and peaches', 'Cherries and plums'], correctIndex: 1 },
      ],
    },
    {
      id: 102, title: 'Everyday Objects', section: 2, instruction: 'Section 2 — Nghe đoạn miêu tả và chọn đáp án đúng.',
      transcript: 'The book is on the table. My phone is in my bag. There are five pencils in the box. The cat is sleeping under the chair. I have a new red bicycle.',
      questions: [
        { id: 1, type: 'mcq', question: 'Where is the book?', options: ['Under the table', 'On the table', 'In the bag', 'Next to the chair'], correctIndex: 1 },
        { id: 2, type: 'mcq', question: 'Where is the phone?', options: ['On the desk', 'In the bag', 'In the car', 'On the bed'], correctIndex: 1 },
        { id: 3, type: 'note-completion', context: 'There are ______ pencils in the box.', answer: 'five', acceptableAnswers: ['five', '5'] },
        { id: 4, type: 'mcq', question: 'Where is the cat sleeping?', options: ['On the chair', 'Under the chair', 'Behind the door', 'In the garden'], correctIndex: 1 },
        { id: 5, type: 'note-completion', context: 'The bicycle is ______ in color.', answer: 'red', acceptableAnswers: ['red'] },
      ],
    },
  ],

  'B1': [
    {
      id: 1, title: 'Daily Conversations', section: 1, instruction: 'Section 1 — Nghe đoạn hội thoại và chọn đáp án đúng.',
      transcript: 'I usually have breakfast at 7 o\'clock in the morning before going to work. She went to the library yesterday to borrow some books for her research project. My brother is taller and more outgoing than me. He loves meeting new people. We are planning to visit our grandparents next weekend. The weather today is rainy, so don\'t forget to bring an umbrella.',
      questions: [
        { id: 1, type: 'mcq', question: 'When does the person have breakfast?', options: ['6:00', '6:30', '7:00', '7:30'], correctIndex: 2 },
        { id: 2, type: 'mcq', question: 'Where did she go yesterday?', options: ['Bookstore', 'Library', 'School', 'Office'], correctIndex: 1 },
        { id: 3, type: 'mcq', question: 'What is the brother like?', options: ['Shy and quiet', 'Tall and outgoing', 'Short and funny', 'Serious and hardworking'], correctIndex: 1 },
        { id: 4, type: 'note-completion', context: 'They are visiting their grandparents ______ weekend.', answer: 'next', acceptableAnswers: ['next'] },
        { id: 5, type: 'mcq', question: 'What is the weather like today?', options: ['Sunny', 'Rainy', 'Windy', 'Snowy'], correctIndex: 1 },
      ],
    },
    {
      id: 2, title: 'Shopping & Prices', section: 1, instruction: 'Section 1 — Nghe và điền thông tin vào chỗ trống.',
      transcript: 'The red dress costs forty-five dollars, but the blue one is cheaper at thirty dollars. I bought some apples, oranges, and a loaf of bread at the supermarket. The store is having a sale today. Everything is twenty percent off. Can I try this shirt on? The fitting room is over there, next to the cash register. I would like to pay by credit card, please.',
      questions: [
        { id: 1, type: 'note-completion', context: 'The blue dress costs $______.', answer: '30', acceptableAnswers: ['30', 'thirty'] },
        { id: 2, type: 'mcq', question: 'What did the person buy at the supermarket?', options: ['Fruits and bread', 'Vegetables and milk', 'Meat and eggs', 'Rice and fish'], correctIndex: 0 },
        { id: 3, type: 'note-completion', context: 'Everything is ______ percent off.', answer: '20', acceptableAnswers: ['20', 'twenty', 'twenty percent', '20%'] },
        { id: 4, type: 'mcq', question: 'Where is the fitting room?', options: ['Next to the entrance', 'Next to the cash register', 'Next to the shirts', 'Near the exit'], correctIndex: 1 },
        { id: 5, type: 'mcq', question: 'How does the person want to pay?', options: ['Cash', 'Credit card', 'Debit card', 'Bank transfer'], correctIndex: 1 },
      ],
    },
    {
      id: 3, title: 'Directions & Places', section: 2, instruction: 'Section 2 — Nghe hướng dẫn và chọn đáp án đúng.',
      transcript: 'Go straight ahead for two blocks, then turn left. The post office is on your right, next to the bank. Excuse me, is there a hospital near here? Yes, there is one about five minutes walking from here. The museum opens at 9am and closes at 5pm. It is closed on Mondays. Take the number 12 bus and get off at the third stop. The park is right across the street. The train to Ho Chi Minh City leaves from Platform 3 at 2:30 pm.',
      questions: [
        { id: 1, type: 'mcq', question: 'Where is the post office?', options: ['On the left of the bank', 'On the right of the bank', 'Across from the bank', 'Behind the bank'], correctIndex: 1 },
        { id: 2, type: 'mcq', question: 'How far is the hospital?', options: ['2 minutes', '5 minutes', '10 minutes', '15 minutes'], correctIndex: 1 },
        { id: 3, type: 'mcq', question: 'When is the museum closed?', options: ['On Sundays', 'On Saturdays', 'On Mondays', 'On Tuesdays'], correctIndex: 2 },
        { id: 4, type: 'note-completion', context: 'Take the number ______ bus to the park.', answer: '12', acceptableAnswers: ['12', 'twelve'] },
        { id: 5, type: 'note-completion', context: 'The train leaves from Platform ______ at 2:30 pm.', answer: '3', acceptableAnswers: ['3', 'three'] },
      ],
    },
  ],

  'B2': [
    {
      id: 201, title: 'Opinions & Arguments', section: 2, instruction: 'Section 2 — Nghe đoạn độc thoại và trả lời câu hỏi.',
      transcript: 'In my opinion, working from home has both advantages and disadvantages. On the one hand, it saves time. On the other hand, it can be lonely. The government should invest more in public transportation. It would reduce traffic congestion and air pollution significantly. I believe that technology has improved our lives immensely, but we should not become too dependent on it. Balance is key. Rather than buying fast fashion, we should invest in quality clothes that last longer. It is better for the environment and our wallets. The university has decided to increase tuition fees by 15% next year, which has caused widespread protests among students.',
      questions: [
        { id: 1, type: 'mcq', question: 'What disadvantage of working from home is mentioned?', options: ['It saves time', 'It is expensive', 'It can be lonely', 'It is difficult'], correctIndex: 2 },
        { id: 2, type: 'mcq', question: 'What would be a benefit of better public transport?', options: ['More jobs', 'Less traffic and pollution', 'Cheaper housing', 'Better schools'], correctIndex: 1 },
        { id: 3, type: 'mcq', question: 'What does the speaker warn about technology?', options: ['It is too expensive', 'Becoming too dependent on it', 'It is useless', 'It is dangerous'], correctIndex: 1 },
        { id: 4, type: 'note-completion', context: 'The speaker recommends investing in quality clothes that last ______.', answer: 'longer', acceptableAnswers: ['longer'] },
        { id: 5, type: 'note-completion', context: 'Tuition fees will increase by ______% next year.', answer: '15', acceptableAnswers: ['15', 'fifteen'] },
      ],
    },
    {
      id: 202, title: 'News Reports', section: 3, instruction: 'Section 3 — Nghe các đoạn tin tức và chọn đáp án đúng.',
      transcript: 'A major earthquake measuring 7.2 on the Richter scale struck the coast of Japan early this morning, triggering tsunami warnings for several coastal areas. Scientists have announced a breakthrough in battery technology that could double the range of electric vehicles within the next five years. The city council has approved a new cycling lane network spanning over 50 kilometers, aimed at encouraging more people to cycle to work. A study published this week suggests that regular exercise can reduce the risk of developing depression by up to 30%. The company announced it will invest $500 million in renewable energy projects over the next decade, creating approximately 2,000 new jobs.',
      questions: [
        { id: 1, type: 'mcq', question: 'What was the earthquake magnitude?', options: ['6.5', '7.2', '7.8', '8.1'], correctIndex: 1 },
        { id: 2, type: 'mcq', question: 'What is the breakthrough about?', options: ['Solar power', 'Battery technology', 'Wind energy', 'Hydrogen fuel'], correctIndex: 1 },
        { id: 3, type: 'note-completion', context: 'The cycling network will span over ______ km.', answer: '50', acceptableAnswers: ['50', 'fifty'] },
        { id: 4, type: 'mcq', question: 'How much can exercise reduce depression risk?', options: ['Up to 20%', 'Up to 30%', 'Up to 40%', 'Up to 50%'], correctIndex: 1 },
        { id: 5, type: 'note-completion', context: 'The company will invest $______ million in renewable energy.', answer: '500', acceptableAnswers: ['500', 'five hundred'] },
      ],
    },
    {
      id: 203, title: 'Academic Discussions', section: 3, instruction: 'Section 3 — Nghe đoạn thảo luận học thuật và trả lời câu hỏi.',
      transcript: 'The professor emphasized that correlation does not imply causation. Just because two variables are related does not mean one causes the other. According to recent research, students who participate in extracurricular activities tend to perform better academically and develop stronger social skills. The study distinguishes between intrinsic motivation, which comes from within, and extrinsic motivation, which comes from external rewards. Urbanization has accelerated dramatically over the past century. In 1900, only about 15% of the world\'s population lived in cities; today that figure is over 55%. The assignment requires a comparative analysis of two different economic systems, examining their strengths and weaknesses in relation to sustainable development.',
      questions: [
        { id: 1, type: 'mcq', question: 'What concept did the professor explain?', options: ['Correlation implies causation', 'Correlation does not imply causation', 'All variables are related', 'Statistics are unreliable'], correctIndex: 1 },
        { id: 2, type: 'mcq', question: 'What benefit of extracurricular activities is mentioned?', options: ['Better sleep', 'Better academic performance', 'More friends online', 'Less homework'], correctIndex: 1 },
        { id: 3, type: 'note-completion', context: 'Intrinsic motivation comes from ______.', answer: 'within', acceptableAnswers: ['within', 'inside', 'within oneself'] },
        { id: 4, type: 'note-completion', context: 'Over ______% of the world\'s population now lives in cities.', answer: '55', acceptableAnswers: ['55', 'fifty-five'] },
        { id: 5, type: 'mcq', question: 'What type of analysis is required?', options: ['Statistical analysis', 'Comparative analysis', 'Historical analysis', 'Experimental analysis'], correctIndex: 1 },
        { id: 6, type: 'matching', instruction: 'Match each term with its correct description.', items: ['Correlation', 'Intrinsic motivation', 'Extrinsic motivation', 'Urbanisation'], options: ['Motivation from within', 'Relationship between variables', 'Motivation from external rewards', 'Growth of city populations'], correctMatches: [1, 0, 2, 3] },
      ],
    },
  ],

  'C1': [
    {
      id: 301, title: 'Academic Lectures', section: 4, instruction: 'Section 4 — Nghe bài giảng học thuật và trả lời câu hỏi.',
      transcript: 'The behavioural economist argued that traditional economic models fail to account for human irrationality, as people consistently make decisions that deviate from what would be considered optimal. Epigenetics refers to changes in gene expression that do not involve alterations to the underlying DNA sequence. Environmental factors can trigger these modifications, which may be heritable. The author\'s use of stream of consciousness technique in the novel Ulysses was revolutionary, allowing readers unprecedented access to the protagonist\'s internal thought processes. In their critique of consumer society, the sociologists argued that advertising creates artificial needs, leading individuals to seek fulfilment through material acquisition rather than meaningful experiences. The phenomenon of linguistic relativity suggests that the language we speak influences our perception of reality, though contemporary researchers debate the extent of this influence.',
      questions: [
        { id: 1, type: 'mcq', question: 'What is the main criticism of traditional economic models?', options: ['They are too complex', 'They ignore human irrationality', 'They are outdated', 'They are too expensive'], correctIndex: 1 },
        { id: 2, type: 'note-completion', context: 'Epigenetics studies changes in gene expression without altering the ______ sequence.', answer: 'DNA', acceptableAnswers: ['DNA', 'DNA sequence', 'genetic'] },
        { id: 3, type: 'mcq', question: 'What technique did the author use in Ulysses?', options: ['Flashback', 'Stream of consciousness', 'First person narrative', 'Epistolary form'], correctIndex: 1 },
        { id: 4, type: 'mcq', question: 'What is the sociologists\' critique of advertising?', options: ['It is too expensive', 'It creates artificial needs', 'It is ineffective', 'It targets children'], correctIndex: 1 },
        { id: 5, type: 'note-completion', context: 'Linguistic relativity suggests language influences our perception of ______.', answer: 'reality', acceptableAnswers: ['reality', 'the world', 'truth'] },
        { id: 6, type: 'map-labelling', instruction: 'Listen and label the locations on the campus map.', description: 'The campus has a central quadrangle. The library is north of the quad, the science building is east, the student union is south, and the administration office is west.', locations: ['North of quad', 'East of quad', 'South of quad', 'West of quad'], labels: ['Library', 'Science Building', 'Student Union', 'Administration Office'], correctAnswers: [0, 1, 2, 3] },
      ],
    },
    {
      id: 302, title: 'Documentary Extracts', section: 2, instruction: 'Section 2 — Nghe đoạn phim tài liệu và trả lời câu hỏi.',
      transcript: 'The Great Barrier Reef, stretching over 2,300 kilometers, is the largest living structure on Earth. However, rising ocean temperatures have caused widespread coral bleaching, threatening this natural wonder. The deforestation rate in the Amazon has decreased significantly since its peak in 2004, thanks to improved law enforcement and conservation initiatives, though recent years have seen a troubling reversal. Vertical gardens, also known as living walls, are becoming increasingly popular in urban environments. They improve air quality, reduce noise pollution, and provide natural insulation for buildings. The Voyager spacecraft, launched in 1977, continues to transmit data from interstellar space, providing invaluable information about the boundary of our solar system. Traditional medicine systems, such as Traditional Chinese Medicine and Ayurveda, are gaining recognition in Western healthcare for their holistic approach to treating chronic conditions.',
      questions: [
        { id: 1, type: 'note-completion', context: 'The Great Barrier Reef stretches over ______ kilometers.', answer: '2300', acceptableAnswers: ['2300', '2,300', 'two thousand three hundred'] },
        { id: 2, type: 'mcq', question: 'What threatens the Great Barrier Reef?', options: ['Overfishing', 'Rising ocean temperatures', 'Pollution', 'Tourism'], correctIndex: 1 },
        { id: 3, type: 'note-completion', context: 'The deforestation rate in the Amazon has decreased since its peak in ______.', answer: '2004', acceptableAnswers: ['2004'] },
        { id: 4, type: 'mcq', question: 'What is a vertical garden also known as?', options: ['A rooftop garden', 'A living wall', 'A hanging garden', 'A community garden'], correctIndex: 1 },
        { id: 5, type: 'mcq', question: 'Why are traditional medicine systems gaining recognition?', options: ['They are cheaper', 'Their holistic approach', 'They are faster', 'They are scientifically proven'], correctIndex: 1 },
      ],
    },
  ],

  'C2': [
    {
      id: 401, title: 'Advanced Research Presentations', section: 4, instruction: 'Section 4 — Nghe bài thuyết trình nghiên cứu nâng cao.',
      transcript: 'The pharmacokinetic profile of the novel compound demonstrates exceptional bioavailability, with peak plasma concentrations achieved within 45 minutes of oral administration, suggesting rapid gastrointestinal absorption. The ontological turn in contemporary philosophy challenges the anthropocentric assumptions underlying much of Western metaphysics, advocating instead for a more pluralistic understanding of being. The Warburg effect, characterized by cancer cells\' preference for aerobic glycolysis over oxidative phosphorylation, represents a fundamental metabolic reprogramming that offers potential therapeutic targets. Sociolinguistic studies of code-switching reveal that bilingual speakers strategically alternate between languages not due to linguistic deficiency but as a sophisticated communicative resource indexing social identity and affiliation. The phenomenology of perception, as articulated by Merleau-Ponty, posits that consciousness is fundamentally embodied and embedded in the world, challenging the Cartesian dualism between mind and body.',
      questions: [
        { id: 1, type: 'note-completion', context: 'Peak plasma concentrations are achieved within ______ minutes.', answer: '45', acceptableAnswers: ['45', 'forty-five'] },
        { id: 2, type: 'mcq', question: 'What does the ontological turn challenge?', options: ['Scientific methods', 'Anthropocentric assumptions', 'Religious beliefs', 'Political systems'], correctIndex: 1 },
        { id: 3, type: 'mcq', question: 'What characterizes the Warburg effect?', options: ['Increased cell division', 'Preference for aerobic glycolysis', 'Reduced metabolism', 'Immune system activation'], correctIndex: 1 },
        { id: 4, type: 'mcq', question: 'Why do bilingual speakers code-switch?', options: ['Linguistic deficiency', 'As a communicative resource', 'Lack of vocabulary', 'Cultural confusion'], correctIndex: 1 },
        { id: 5, type: 'note-completion', context: 'Merleau-Ponty\'s phenomenology challenges the ______ dualism between mind and body.', answer: 'Cartesian', acceptableAnswers: ['Cartesian', 'Descartes\''] },
      ],
    },
    {
      id: 402, title: 'Interdisciplinary Debates', section: 3, instruction: 'Section 3 — Nghe đoạn thảo luận liên ngành và chọn đáp án đúng.',
      transcript: 'Proponents of effective altruism argue that resources should be allocated to causes where they can do the most good per unit of investment, employing utilitarian calculus to determine charitable priorities. The concept of path dependence explains how historical decisions constrain current possibilities, with initial conditions having disproportionate influence on subsequent trajectories of technological and institutional development. Biomimicry, the practice of drawing inspiration from nature\'s time-tested patterns and strategies, has yielded innovations ranging from self-cleaning surfaces inspired by lotus leaves to more efficient wind turbines modeled on humpback whale flippers. The precautionary principle suggests that when an activity raises threats of serious or irreversible harm to human health or the environment, precautionary measures should be taken even if cause-and-effect relationships are not fully established scientifically. Emergent properties in complex systems pose fundamental challenges for reductionist approaches to scientific explanation.',
      questions: [
        { id: 1, type: 'mcq', question: 'What principle does effective altruism employ?', options: ['Emotional appeal', 'Utilitarian calculus', 'Religious values', 'Political ideology'], correctIndex: 1 },
        { id: 2, type: 'note-completion', context: 'Path dependence explains how ______ decisions constrain current possibilities.', answer: 'historical', acceptableAnswers: ['historical', 'past', 'prior'] },
        { id: 3, type: 'mcq', question: 'What does biomimicry draw inspiration from?', options: ['Human inventions', 'Nature\'s patterns', 'Mathematical models', 'Computer simulations'], correctIndex: 1 },
        { id: 4, type: 'mcq', question: 'When should precautionary measures be taken?', options: ['Only after scientific proof', 'Even without full established cause-effect', 'Never', 'Only for minor risks'], correctIndex: 1 },
        { id: 5, type: 'note-completion', context: 'Emergent properties challenge ______ approaches to scientific explanation.', answer: 'reductionist', acceptableAnswers: ['reductionist', 'reductionistic'] },
      ],
    },
  ],
}
