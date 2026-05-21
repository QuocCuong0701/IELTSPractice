import type { Level } from '@/context/LevelContext'

export interface ListeningExercise {
  id: number
  title: string
  instruction: string
  sentences: ListeningSentence[]
}

export interface ListeningSentence {
  text: string
  question: string
  options: string[]
  correctIndex: number
}

export const listeningData: Record<Level, ListeningExercise[]> = {
  'A1-A2': [
    {
      id: 101, title: 'Basic Introductions', instruction: 'Nghe và chọn câu trả lời đúng.',
      sentences: [
        { text: 'Hello, my name is Tom. I am from England.', question: 'Where is Tom from?', options: ['America', 'England', 'Australia', 'Canada'], correctIndex: 1 },
        { text: 'I have one brother and two sisters.', question: 'How many brothers does the speaker have?', options: ['One', 'Two', 'Three', 'None'], correctIndex: 0 },
        { text: 'I get up at six o\'clock every morning.', question: 'What time does the speaker get up?', options: ['5:00', '6:00', '7:00', '8:00'], correctIndex: 1 },
        { text: 'My favorite color is blue.', question: 'What is the speaker\'s favorite color?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctIndex: 1 },
        { text: 'I like apples and bananas.', question: 'What fruit does the speaker like?', options: ['Oranges and grapes', 'Apples and bananas', 'Pears and peaches', 'Cherries and plums'], correctIndex: 1 },
      ],
    },
    {
      id: 102, title: 'Everyday Objects', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'The book is on the table.', question: 'Where is the book?', options: ['Under the table', 'On the table', 'In the bag', 'Next to the chair'], correctIndex: 1 },
        { text: 'My phone is in my bag.', question: 'Where is the phone?', options: ['On the desk', 'In the bag', 'In the car', 'On the bed'], correctIndex: 1 },
        { text: 'There are five pencils in the box.', question: 'How many pencils are in the box?', options: ['Three', 'Four', 'Five', 'Six'], correctIndex: 2 },
        { text: 'The cat is sleeping under the chair.', question: 'Where is the cat sleeping?', options: ['On the chair', 'Under the chair', 'Behind the door', 'In the garden'], correctIndex: 1 },
        { text: 'I have a new red bicycle.', question: 'What color is the bicycle?', options: ['Blue', 'Green', 'Red', 'Black'], correctIndex: 2 },
      ],
    },
  ],

  'B1': [
    {
      id: 1, title: 'Daily Conversations', instruction: 'Nghe và chọn câu trả lời đúng cho mỗi câu hỏi.',
      sentences: [
        { text: 'I usually have breakfast at 7 o\'clock in the morning before going to work.', question: 'When does the person have breakfast?', options: ['6:00', '6:30', '7:00', '7:30'], correctIndex: 2 },
        { text: 'She went to the library yesterday to borrow some books for her research project.', question: 'Where did she go yesterday?', options: ['Bookstore', 'Library', 'School', 'Office'], correctIndex: 1 },
        { text: 'My brother is taller and more outgoing than me. He loves meeting new people.', question: 'What is the brother like?', options: ['Shy and quiet', 'Tall and outgoing', 'Short and funny', 'Serious and hardworking'], correctIndex: 1 },
        { text: 'We are planning to visit our grandparents next weekend.', question: 'When will they visit their grandparents?', options: ['This weekend', 'Next weekend', 'Tomorrow', 'Next month'], correctIndex: 1 },
        { text: 'The weather today is rainy, so don\'t forget to bring an umbrella.', question: 'What is the weather like today?', options: ['Sunny', 'Rainy', 'Windy', 'Snowy'], correctIndex: 1 },
      ],
    },
    {
      id: 2, title: 'Shopping & Prices', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'The red dress costs forty-five dollars, but the blue one is cheaper at thirty dollars.', question: 'How much is the blue dress?', options: ['$30', '$35', '$40', '$45'], correctIndex: 0 },
        { text: 'I bought some apples, oranges, and a loaf of bread at the supermarket.', question: 'What did the person buy at the supermarket?', options: ['Fruits and bread', 'Vegetables and milk', 'Meat and eggs', 'Rice and fish'], correctIndex: 0 },
        { text: 'The store is having a sale today. Everything is twenty percent off.', question: 'What is special about the store today?', options: ['New arrivals', 'A sale with 20% off', 'Free gifts', 'Buy one get one free'], correctIndex: 1 },
        { text: 'Can I try this shirt on? The fitting room is over there, next to the cash register.', question: 'Where is the fitting room?', options: ['Next to the entrance', 'Next to the cash register', 'Next to the shirts', 'Near the exit'], correctIndex: 1 },
        { text: 'I would like to pay by credit card, please.', question: 'How does the person want to pay?', options: ['Cash', 'Credit card', 'Debit card', 'Bank transfer'], correctIndex: 1 },
      ],
    },
    {
      id: 3, title: 'Directions & Places', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'Go straight ahead for two blocks, then turn left. The post office is on your right, next to the bank.', question: 'Where is the post office?', options: ['On the left of the bank', 'On the right of the bank', 'Across from the bank', 'Behind the bank'], correctIndex: 1 },
        { text: 'Excuse me, is there a hospital near here? Yes, there is one about five minutes walking from here.', question: 'How far is the hospital?', options: ['2 minutes', '5 minutes', '10 minutes', '15 minutes'], correctIndex: 1 },
        { text: 'The museum opens at 9am and closes at 5pm. It is closed on Mondays.', question: 'When is the museum closed?', options: ['On Sundays', 'On Saturdays', 'On Mondays', 'On Tuesdays'], correctIndex: 2 },
        { text: 'Take the number 12 bus and get off at the third stop. The park is right across the street.', question: 'Which bus should the person take?', options: ['Number 2', 'Number 10', 'Number 12', 'Number 20'], correctIndex: 2 },
        { text: 'The train to Ho Chi Minh City leaves from Platform 3 at 2:30 pm.', question: 'Which platform does the train leave from?', options: ['Platform 1', 'Platform 2', 'Platform 3', 'Platform 4'], correctIndex: 2 },
      ],
    },
  ],

  'B2': [
    {
      id: 201, title: 'Opinions & Arguments', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'In my opinion, working from home has both advantages and disadvantages. On the one hand, it saves time. On the other hand, it can be lonely.', question: 'What disadvantage of working from home is mentioned?', options: ['It saves time', 'It is expensive', 'It can be lonely', 'It is difficult'], correctIndex: 2 },
        { text: 'The government should invest more in public transportation. It would reduce traffic congestion and air pollution significantly.', question: 'What would be a benefit of better public transport?', options: ['More jobs', 'Less traffic and pollution', 'Cheaper housing', 'Better schools'], correctIndex: 1 },
        { text: 'I believe that technology has improved our lives immensely, but we should not become too dependent on it. Balance is key.', question: 'What does the speaker warn about?', options: ['Technology is too expensive', 'Becoming too dependent on technology', 'Technology is useless', 'Technology is dangerous'], correctIndex: 1 },
        { text: 'Rather than buying fast fashion, we should invest in quality clothes that last longer. It is better for the environment and our wallets.', question: 'What does the speaker recommend?', options: ['Buying more clothes', 'Buying quality clothes that last', 'Shopping online', 'Wearing uniforms'], correctIndex: 1 },
        { text: 'The university has decided to increase tuition fees by 15% next year, which has caused widespread protests among students.', question: 'What caused the protests?', options: ['New buildings', 'Tuition fee increase', 'Exam changes', 'Library closure'], correctIndex: 1 },
      ],
    },
    {
      id: 202, title: 'News Reports', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'A major earthquake measuring 7.2 on the Richter scale struck the coast of Japan early this morning, triggering tsunami warnings for several coastal areas.', question: 'What was the earthquake magnitude?', options: ['6.5', '7.2', '7.8', '8.1'], correctIndex: 1 },
        { text: 'Scientists have announced a breakthrough in battery technology that could double the range of electric vehicles within the next five years.', question: 'What is the breakthrough about?', options: ['Solar power', 'Battery technology', 'Wind energy', 'Hydrogen fuel'], correctIndex: 1 },
        { text: 'The city council has approved a new cycling lane network spanning over 50 kilometers, aimed at encouraging more people to cycle to work.', question: 'How long is the planned cycling network?', options: ['30 km', '40 km', '50 km', '60 km'], correctIndex: 2 },
        { text: 'A study published this week suggests that regular exercise can reduce the risk of developing depression by up to 30%.', question: 'How much can exercise reduce depression risk?', options: ['Up to 20%', 'Up to 30%', 'Up to 40%', 'Up to 50%'], correctIndex: 1 },
        { text: 'The company announced it will invest $500 million in renewable energy projects over the next decade, creating approximately 2,000 new jobs.', question: 'How many jobs will be created?', options: ['1,000', '2,000', '3,000', '5,000'], correctIndex: 1 },
      ],
    },
    {
      id: 203, title: 'Academic Discussions', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'The professor emphasized that correlation does not imply causation. Just because two variables are related does not mean one causes the other.', question: 'What concept did the professor explain?', options: ['Correlation implies causation', 'Correlation does not imply causation', 'All variables are related', 'Statistics are unreliable'], correctIndex: 1 },
        { text: 'According to recent research, students who participate in extracurricular activities tend to perform better academically and develop stronger social skills.', question: 'What benefit of extracurricular activities is mentioned?', options: ['Better sleep', 'Better academic performance', 'More friends online', 'Less homework'], correctIndex: 1 },
        { text: 'The study distinguishes between intrinsic motivation, which comes from within, and extrinsic motivation, which comes from external rewards.', question: 'What is intrinsic motivation?', options: ['Motivation from rewards', 'Motivation from within', 'Motivation from grades', 'Motivation from parents'], correctIndex: 1 },
        { text: 'Urbanization has accelerated dramatically over the past century. In 1900, only about 15% of the world\'s population lived in cities; today that figure is over 55%.', question: 'What percentage of people live in cities today?', options: ['15%', '35%', 'Over 55%', '75%'], correctIndex: 2 },
        { text: 'The assignment requires a comparative analysis of two different economic systems, examining their strengths and weaknesses in relation to sustainable development.', question: 'What type of analysis is required?', options: ['Statistical analysis', 'Comparative analysis', 'Historical analysis', 'Experimental analysis'], correctIndex: 1 },
      ],
    },
  ],

  'C1': [
    {
      id: 301, title: 'Academic Lectures', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'The behavioral economist argued that traditional economic models fail to account for human irrationality, as people consistently make decisions that deviate from what would be considered optimal.', question: 'What is the main criticism of traditional economic models?', options: ['They are too complex', 'They ignore human irrationality', 'They are outdated', 'They are too expensive'], correctIndex: 1 },
        { text: 'Epigenetics refers to changes in gene expression that do not involve alterations to the underlying DNA sequence. Environmental factors can trigger these modifications, which may be heritable.', question: 'What does epigenetics study?', options: ['DNA sequence changes', 'Changes in gene expression without DNA alteration', 'Gene mutations', 'Chromosome structure'], correctIndex: 1 },
        { text: 'The author\'s use of stream of consciousness technique in the novel Ulysses was revolutionary, allowing readers unprecedented access to the protagonist\'s internal thought processes.', question: 'What technique did the author\'s use?', options: ['Flashback', 'Stream of consciousness', 'First person narrative', 'Epistolary form'], correctIndex: 1 },
        { text: 'In their critique of consumer society, the sociologists argued that advertising creates artificial needs, leading individuals to seek fulfillment through material acquisition rather than meaningful experiences.', question: 'What is the sociologists\' critique of advertising?', options: ['It is too expensive', 'It creates artificial needs', 'It is ineffective', 'It targets children'], correctIndex: 1 },
        { text: 'The phenomenon of linguistic relativity suggests that the language we speak influences our perception of reality, though contemporary researchers debate the extent of this influence.', question: 'What does linguistic relativity suggest?', options: ['Language determines thought entirely', 'Language influences perception of reality', 'All languages are the same', 'Language has no effect on thought'], correctIndex: 1 },
      ],
    },
    {
      id: 302, title: 'Documentary Extracts', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'The Great Barrier Reef, stretching over 2,300 kilometers, is the largest living structure on Earth. However, rising ocean temperatures have caused widespread coral bleaching, threatening this natural wonder.', question: 'What threatens the Great Barrier Reef?', options: ['Overfishing', 'Rising ocean temperatures', 'Pollution', 'Tourism'], correctIndex: 1 },
        { text: 'The deforestation rate in the Amazon has decreased significantly since its peak in 2004, thanks to improved law enforcement and conservation initiatives, though recent years have seen a troubling reversal.', question: 'What has caused the decrease in deforestation?', options: ['Economic recession', 'Improved law enforcement and conservation', 'International pressure', 'Natural disasters'], correctIndex: 1 },
        { text: 'Vertical gardens, also known as living walls, are becoming increasingly popular in urban environments. They improve air quality, reduce noise pollution, and provide natural insulation for buildings.', question: 'What is a vertical garden?', options: ['A rooftop garden', 'A living wall', 'A hanging garden', 'A community garden'], correctIndex: 1 },
        { text: 'The Voyager spacecraft, launched in 1977, continues to transmit data from interstellar space, providing invaluable information about the boundary of our solar system.', question: 'When was Voyager launched?', options: ['1967', '1977', '1987', '1997'], correctIndex: 1 },
        { text: 'Traditional medicine systems, such as Traditional Chinese Medicine and Ayurveda, are gaining recognition in Western healthcare for their holistic approach to treating chronic conditions.', question: 'Why are traditional medicine systems gaining recognition?', options: ['They are cheaper', 'Their holistic approach', 'They are faster', 'They are scientifically proven'], correctIndex: 1 },
      ],
    },
  ],

  'C2': [
    {
      id: 401, title: 'Advanced Research Presentations', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'The pharmacokinetic profile of the novel compound demonstrates exceptional bioavailability, with peak plasma concentrations achieved within 45 minutes of oral administration, suggesting rapid gastrointestinal absorption.', question: 'When are peak plasma concentrations achieved?', options: ['15 minutes', '30 minutes', '45 minutes', '60 minutes'], correctIndex: 2 },
        { text: 'The ontological turn in contemporary philosophy challenges the anthropocentric assumptions underlying much of Western metaphysics, advocating instead for a more pluralistic understanding of being.', question: 'What does the ontological turn challenge?', options: ['Scientific methods', 'Anthropocentric assumptions', 'Religious beliefs', 'Political systems'], correctIndex: 1 },
        { text: 'The Warburg effect, characterized by cancer cells\' preference for aerobic glycolysis over oxidative phosphorylation, represents a fundamental metabolic reprogramming that offers potential therapeutic targets.', question: 'What characterizes the Warburg effect?', options: ['Increased cell division', 'Preference for aerobic glycolysis', 'Reduced metabolism', 'Immune system activation'], correctIndex: 1 },
        { text: 'Sociolinguistic studies of code-switching reveal that bilingual speakers strategically alternate between languages not due to linguistic deficiency but as a sophisticated communicative resource indexing social identity and affiliation.', question: 'Why do bilingual speakers code-switch?', options: ['Linguistic deficiency', 'As a sophisticated communicative resource', 'Lack of vocabulary', 'Cultural confusion'], correctIndex: 1 },
        { text: 'The phenomenology of perception, as articulated by Merleau-Ponty, posits that consciousness is fundamentally embodied and embedded in the world, challenging the Cartesian dualism between mind and body.', question: 'What does Merleau-Ponty\'s phenomenology challenge?', options: ['Scientific materialism', 'Cartesian dualism', 'Evolutionary theory', 'Behaviorism'], correctIndex: 1 },
      ],
    },
    {
      id: 402, title: 'Interdisciplinary Debates', instruction: 'Nghe và chọn đáp án đúng.',
      sentences: [
        { text: 'Proponents of effective altruism argue that resources should be allocated to causes where they can do the most good per unit of investment, employing utilitarian calculus to determine charitable priorities.', question: 'What principle does effective altruism employ?', options: ['Emotional appeal', 'Utilitarian calculus', 'Religious values', 'Political ideology'], correctIndex: 1 },
        { text: 'The concept of path dependence explains how historical decisions constrain current possibilities, with initial conditions having disproportionate influence on subsequent trajectories of technological and institutional development.', question: 'What does path dependence explain?', options: ['Future predictions', 'How historical decisions constrain current possibilities', 'Random events', 'Individual choices'], correctIndex: 1 },
        { text: 'Biomimicry, the practice of drawing inspiration from nature\'s time-tested patterns and strategies, has yielded innovations ranging from self-cleaning surfaces inspired by lotus leaves to more efficient wind turbines modeled on humpback whale flippers.', question: 'What does biomimicry draw inspiration from?', options: ['Human inventions', 'Nature\'s patterns', 'Mathematical models', 'Computer simulations'], correctIndex: 1 },
        { text: 'The precautionary principle suggests that when an activity raises threats of serious or irreversible harm to human health or the environment, precautionary measures should be taken even if cause-and-effect relationships are not fully established scientifically.', question: 'When should precautionary measures be taken?', options: ['Only after scientific proof', 'Even without fully established cause-effect relationships', 'Never', 'Only for minor risks'], correctIndex: 1 },
        { text: 'Emergent properties in complex systems—characteristics that arise from the interactions of components but are not present in any individual component—pose fundamental challenges for reductionist approaches to scientific explanation.', question: 'What challenges do emergent properties pose?', options: ['They are easy to predict', 'They challenge reductionist approaches', 'They are irrelevant', 'They support reductionism'], correctIndex: 1 },
      ],
    },
  ],
}

