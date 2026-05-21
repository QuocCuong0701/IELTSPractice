import type { Level } from '@/context/LevelContext'

export interface ReadingPassage {
  id: number
  title: string
  level: string
  text: string
  questions: ReadingQuestion[]
}

export interface ReadingQuestion {
  question: string
  options: string[]
  correctIndex: number
}

export const readingData: Record<Level, ReadingPassage[]> = {
  'A1-A2': [
    {
      id: 101, title: 'My Family', level: 'A1',
      text: 'Hello! My name is Mai. I am 10 years old. I live in Hanoi with my family. There are four people in my family: my father, my mother, my brother and me. My father is a teacher. My mother is a nurse. My brother is 15 years old. He is a student. I love my family very much.',
      questions: [
        { question: 'How old is Mai?', options: ['8', '10', '12', '15'], correctIndex: 1 },
        { question: 'How many people are in Mai\'s family?', options: ['Three', 'Four', 'Five', 'Six'], correctIndex: 1 },
        { question: 'What does Mai\'s mother do?', options: ['Teacher', 'Nurse', 'Doctor', 'Student'], correctIndex: 1 },
        { question: 'How old is Mai\'s brother?', options: ['10', '12', '15', '20'], correctIndex: 2 },
        { question: 'Where does Mai live?', options: ['Ho Chi Minh City', 'Da Nang', 'Hanoi', 'Hue'], correctIndex: 2 },
      ],
    },
    {
      id: 102, title: 'A Day at the Park', level: 'A1',
      text: 'Today is Sunday. The weather is nice. It is sunny and warm. My friend Nam and I go to the park. There are many trees and flowers in the park. We play football. Then we sit on a bench and eat ice cream. We see two dogs playing. They are cute. We have a lot of fun. We go home at 5pm.',
      questions: [
        { question: 'What day is it?', options: ['Saturday', 'Sunday', 'Monday', 'Friday'], correctIndex: 1 },
        { question: 'What is the weather like?', options: ['Rainy', 'Cold', 'Sunny', 'Windy'], correctIndex: 2 },
        { question: 'What do Nam and his friend do in the park?', options: ['Swim', 'Play football', 'Read books', 'Ride bikes'], correctIndex: 1 },
        { question: 'What do they eat?', options: ['Cake', 'Ice cream', 'Pizza', 'Fruit'], correctIndex: 1 },
        { question: 'What time do they go home?', options: ['3pm', '4pm', '5pm', '6pm'], correctIndex: 2 },
      ],
    },
    {
      id: 103, title: 'My Pet Dog', level: 'A1',
      text: 'I have a pet dog. His name is Bong. He is brown and white. He is three years old. Bong is very friendly. He likes to play with me. Every morning, I take Bong for a walk. He likes to run in the park. He also likes to eat chicken and rice. Bong sleeps in a small basket next to my bed. I love Bong very much.',
      questions: [
        { question: 'What is the pet\'s name?', options: ['Dong', 'Bong', 'Long', 'Song'], correctIndex: 1 },
        { question: 'How old is the dog?', options: ['2', '3', '4', '5'], correctIndex: 1 },
        { question: 'What color is Bong?', options: ['Brown', 'White', 'Brown and white', 'Black'], correctIndex: 2 },
        { question: 'Where does Bong sleep?', options: ['In the garden', 'In a basket', 'On the sofa', 'In the kitchen'], correctIndex: 1 },
        { question: 'What does Bong like to eat?', options: ['Fish and rice', 'Chicken and rice', 'Bread and milk', 'Meat and potatoes'], correctIndex: 1 },
      ],
    },
    {
      id: 104, title: 'My School', level: 'A1',
      text: 'I go to Nguyen Du Primary School. My school is big and beautiful. There are 20 classrooms. There is a big playground in front of the school. I go to school from Monday to Friday. I have many subjects: Maths, Vietnamese, English and Art. I like English the most. My English teacher is Miss Lan. She is kind and funny. I love going to school.',
      questions: [
        { question: 'How many classrooms are there?', options: ['10', '15', '20', '25'], correctIndex: 2 },
        { question: 'What is in front of the school?', options: ['A garden', 'A playground', 'A library', 'A pool'], correctIndex: 1 },
        { question: 'Which subject does the writer like best?', options: ['Maths', 'Vietnamese', 'English', 'Art'], correctIndex: 2 },
        { question: 'What is Miss Lan like?', options: ['Strict', 'Kind and funny', 'Quiet', 'Serious'], correctIndex: 1 },
        { question: 'When does the writer go to school?', options: ['Every day', 'Monday to Friday', 'Saturday and Sunday', 'Only Monday'], correctIndex: 1 },
      ],
    },
  ],

  'B1': [
    { id: 1, title: 'My Daily Routine', level: 'B1', text: 'My name is Linh and I am a university student. I usually wake up at 6 o\'clock in the morning. After waking up, I do some light exercise for about 15 minutes. Then I take a shower and have breakfast. I usually have bread with eggs and a glass of milk for breakfast.\n\nI go to university by bus. The bus ride takes about 30 minutes. My classes start at 8am and finish at 12pm. I have lunch at the university canteen with my friends. In the afternoon, I often go to the library to study or do my homework.\n\nIn the evening, I have dinner with my family. After dinner, I watch TV or read books for about an hour. Sometimes I practice English by watching videos on the Internet. I usually go to bed at 11pm.\n\nOn weekends, I like to meet my friends and go shopping. We often go to the cinema or eat out together. I enjoy my weekends because I can relax and do things I like.', questions: [{ question: 'What time does Linh wake up?', options: ['5:30', '6:00', '6:30', '7:00'], correctIndex: 1 }, { question: 'How does Linh go to university?', options: ['By bike', 'By bus', 'On foot', 'By car'], correctIndex: 1 }, { question: 'How long does it take to get to university?', options: ['15 minutes', '20 minutes', '30 minutes', '45 minutes'], correctIndex: 2 }, { question: 'What does Linh do after dinner?', options: ['Go to bed', 'Watch TV or read books', 'Study', 'Go out with friends'], correctIndex: 1 }, { question: 'What does Linh NOT mention doing on weekends?', options: ['Meeting friends', 'Going shopping', 'Going to the cinema', 'Playing sports'], correctIndex: 3 }] },
    { id: 2, title: 'A Healthy Lifestyle', level: 'B1', text: 'Staying healthy is very important for everyone. There are several things you can do to keep your body and mind healthy.\n\nFirst, you should eat a balanced diet. This means eating different kinds of food, including fruits, vegetables, grains, and protein. You should eat at least five portions of fruits and vegetables every day. It is also important to drink enough water, about 1.5 to 2 liters per day.\n\nSecond, regular exercise is necessary for good health. You should exercise for at least 30 minutes a day, five times a week. You can choose activities that you enjoy, such as walking, running, swimming, or cycling. Exercise not only keeps your body fit but also helps you sleep better.\n\nThird, getting enough sleep is very important. Adults need about 7 to 8 hours of sleep every night. Good sleep helps your brain work well and keeps your mood stable.\n\nFinally, you should avoid bad habits like smoking, drinking too much alcohol, or eating too much junk food. These habits can cause serious health problems in the long term.\n\nBy following these simple tips, you can live a healthier and happier life.', questions: [{ question: 'How many portions of fruits and vegetables should you eat per day?', options: ['At least 3', 'At least 4', 'At least 5', 'At least 6'], correctIndex: 2 }, { question: 'How much water should you drink daily?', options: ['1-1.5 liters', '1.5-2 liters', '2-2.5 liters', '2.5-3 liters'], correctIndex: 1 }, { question: 'How many minutes of exercise is recommended per day?', options: ['20 minutes', '25 minutes', '30 minutes', '40 minutes'], correctIndex: 2 }, { question: 'How much sleep do adults need each night?', options: ['5-6 hours', '6-7 hours', '7-8 hours', '8-9 hours'], correctIndex: 2 }, { question: 'Which of the following is NOT mentioned as a bad habit?', options: ['Smoking', 'Drinking too much alcohol', 'Eating too much junk food', 'Drinking coffee'], correctIndex: 3 }] },
    { id: 3, title: 'My Favorite City', level: 'B1', text: 'Da Nang is one of the most beautiful cities in Vietnam. It is located in the central part of the country, between Hanoi and Ho Chi Minh City. The city is famous for its beautiful beaches, especially My Khe Beach, which has soft white sand and clear blue water.\n\nOne of the most popular attractions in Da Nang is the Dragon Bridge. This bridge is shaped like a dragon and it breathes fire and water every weekend night. Many tourists come to watch this amazing show. Another famous landmark is the Marble Mountains, a group of five marble hills with many caves and tunnels to explore.\n\nThe city is also known for its delicious food. You should try Mi Quang, a type of noodle dish that is special to this region. The seafood in Da Nang is also very fresh and tasty because the city is next to the sea.\n\nThe people in Da Nang are very friendly and welcoming. The city is clean and well-organized. There are many parks and green spaces where people can relax and enjoy the fresh air.\n\nI love Da Nang because it has both modern buildings and natural beauty. It is a perfect place for a holiday.', questions: [{ question: 'Where is Da Nang located?', options: ['Northern Vietnam', 'Central Vietnam', 'Southern Vietnam', 'Highland Vietnam'], correctIndex: 1 }, { question: 'What is special about the Dragon Bridge?', options: ['It is very long', 'It is made of gold', 'It breathes fire and water', 'It is the oldest bridge'], correctIndex: 2 }, { question: 'What is Mi Quang?', options: ['A type of soup', 'A noodle dish', 'A seafood dish', 'A cake'], correctIndex: 1 }, { question: 'Which beach is mentioned in the passage?', options: ['China Beach', 'Non Nuoc Beach', 'My Khe Beach', 'Bac My An Beach'], correctIndex: 2 }, { question: 'What does the writer think about Da Nang?', options: ['It is too modern', 'It is expensive', 'It is a perfect holiday place', 'It is too crowded'], correctIndex: 2 }] },
    { id: 4, title: 'Learning English', level: 'B1', text: 'Learning English is very important in today\'s world. It is the most common language used in international communication, business, and technology. Many people want to improve their English skills for work, study, or travel.\n\nThere are four main skills in learning English: listening, speaking, reading, and writing. To improve your listening, you can watch English movies, listen to English songs, or watch videos on the Internet. It is helpful to listen to the same thing many times until you understand most of it.\n\nFor speaking, you should practice as much as possible. You can talk to yourself in English, join a conversation club, or find a language partner online. Don\'t be afraid of making mistakes. Mistakes are a normal part of learning.\n\nReading is a great way to learn new words and grammar. You should read things that interest you, such as short stories, news articles, or blogs. Try to guess the meaning of new words from the context before using a dictionary.\n\nFor writing, you can start a diary in English, write short paragraphs about your daily life, or join online forums. It is important to practice writing regularly.\n\nThe most important thing is to be patient and consistent. Learning a language takes time, but if you practice a little every day, you will improve step by step. Good luck with your English learning journey!', questions: [{ question: 'What is English described as in the passage?', options: ['A difficult language', 'The most common international language', 'A language for travel only', 'A new language'], correctIndex: 1 }, { question: 'How many main skills are mentioned?', options: ['Two', 'Three', 'Four', 'Five'], correctIndex: 2 }, { question: 'What suggestion is given for improving speaking?', options: ['Read more books', 'Practice with others', 'Watch movies', 'Write a diary'], correctIndex: 1 }, { question: 'How should you deal with new words while reading?', options: ['Look them up immediately', 'Skip them', 'Guess from context', 'Write them 10 times'], correctIndex: 2 }, { question: 'What is the most important thing in learning English according to the writer?', options: ['Being talented', 'Having a teacher', 'Being patient and consistent', 'Living abroad'], correctIndex: 2 }] },
    { id: 5, title: 'The Internet and Our Daily Life', level: 'B1', text: 'The Internet has changed the way we live, work, and communicate. Today, almost everyone uses the Internet for different purposes. It has become an important part of our daily life.\n\nOne of the most common uses of the Internet is communication. We can send emails, chat with friends on social media, or make video calls with family members who live far away. This helps us stay connected with people around the world.\n\nAnother important use is getting information. With the Internet, we can find information about almost anything in just a few seconds. We can read news, search for recipes, learn new skills, or do research for school projects. The Internet is like a huge library that is open 24 hours a day.\n\nOnline shopping is also very popular now. We can buy almost everything online, from clothes and books to electronics and food. Many people prefer online shopping because it is convenient and we can compare prices easily.\n\nHowever, the Internet also has some disadvantages. Some people spend too much time online and forget about real-life activities. There is also the risk of getting false information or being cheated online. Therefore, we should use the Internet wisely and safely.\n\nIn conclusion, the Internet brings many benefits to our lives, but we must be careful about how we use it.', questions: [{ question: 'What is one of the most common uses of the Internet according to the passage?', options: ['Shopping', 'Communication', 'Gaming', 'Watching movies'], correctIndex: 1 }, { question: 'How is the Internet described in terms of information?', options: ['A small library', 'A huge library open 24/7', 'A newspaper', 'A television'], correctIndex: 1 }, { question: 'Why do many people prefer online shopping?', options: ['It is cheaper', 'It is convenient', 'It is faster', 'It has better quality'], correctIndex: 1 }, { question: 'What disadvantage of the Internet is mentioned?', options: ['It is expensive', 'It is slow', 'People spend too much time online', 'It is difficult to use'], correctIndex: 2 }, { question: 'What is the main message of the passage?', options: ['The Internet is dangerous', 'We should not use the Internet', 'The Internet is useful but we must be careful', 'The Internet is only for young people'], correctIndex: 2 }] },
    { id: 6, title: 'A Special Holiday', level: 'B1', text: 'Last summer, my family and I went on a holiday to Phu Quoc Island. It was the best holiday I have ever had. We stayed there for five days.\n\nWe flew from Hanoi to Phu Quoc. The flight took about two hours. When we arrived, we took a taxi to our hotel. The hotel was near the beach, and our room had a beautiful view of the sea. The first thing we did was to go for a swim in the clear blue water.\n\nDuring our stay, we did many interesting activities. We visited the night market and tried different kinds of seafood. The grilled fish and squid were delicious. We also took a boat trip to explore the smaller islands around Phu Quoc. On the boat, we saw many colorful fish and corals through the glass bottom.\n\nOne day, we went to a pepper farm. Phu Quoc is famous for its pepper. The farmer showed us how they grow and dry the pepper. We bought some pepper to bring home as gifts for our relatives.\n\nOn the last day, we watched the sunset on the beach. The sky turned orange and pink, and it was the most beautiful sunset I have ever seen. I took many photos to remember this wonderful trip.\n\nI felt a little sad when we had to go back home. But I promised myself that I would come back to Phu Quoc again someday.', questions: [{ question: 'How long did the family stay in Phu Quoc?', options: ['Three days', 'Four days', 'Five days', 'One week'], correctIndex: 2 }, { question: 'How did they go to Phu Quoc?', options: ['By train', 'By bus', 'By plane', 'By ship'], correctIndex: 2 }, { question: 'What did they see on the boat trip?', options: ['Whales', 'Dolphins', 'Colorful fish and corals', 'Sea turtles'], correctIndex: 2 }, { question: 'What is Phu Quoc famous for according to the passage?', options: ['Rice', 'Coffee', 'Pepper', 'Silk'], correctIndex: 2 }, { question: 'How did the writer feel when leaving Phu Quoc?', options: ['Happy', 'Sad', 'Angry', 'Excited'], correctIndex: 1 }] },
  ],

  'B2': [
    {
      id: 201, title: 'Remote Work Revolution', level: 'B2',
      text: `The COVID-19 pandemic fundamentally changed the way we work. What began as a temporary measure for many companies has evolved into a permanent shift towards remote and hybrid working models. According to recent studies, over 60% of employees now prefer to work remotely at least part of the time.

There are numerous advantages to remote work. Employees save time and money on commuting, enjoy greater flexibility, and often report higher job satisfaction. Companies, in turn, benefit from reduced overhead costs and access to a wider talent pool, as they are no longer limited by geographical boundaries.

However, remote work also presents significant challenges. Many employees struggle with feelings of isolation and find it difficult to separate work from personal life. The lack of face-to-face interaction can hinder collaboration and innovation. Furthermore, not all jobs can be performed remotely, which creates inequality between different sectors of the economy.

Companies are now experimenting with various hybrid models to strike a balance. Some require employees to come into the office two or three days a week, while others have adopted fully remote policies. The key is to maintain productivity while ensuring employee well-being.

As technology continues to advance, the trend towards remote work is likely to persist. Organizations that adapt to this change will be better positioned to attract and retain top talent in the future.`,
      questions: [
        { question: 'What percentage of employees prefer remote work at least part-time?', options: ['40%', '50%', 'Over 60%', '75%'], correctIndex: 2 },
        { question: 'Which is NOT mentioned as an advantage of remote work?', options: ['Saving commuting time', 'Higher job satisfaction', 'Better salary', 'Access to wider talent pool'], correctIndex: 2 },
        { question: 'What challenge of remote work is mentioned?', options: ['Technical issues', 'Isolation', 'Lower salary', 'Longer hours'], correctIndex: 1 },
        { question: 'What are companies experimenting with?', options: ['Fully office-based work', 'Hybrid models', 'Four-day work weeks', 'Job sharing'], correctIndex: 1 },
        { question: 'What is the writer\'s view on the future of remote work?', options: ['It will disappear', 'It will persist', 'It will decrease', 'It is uncertain'], correctIndex: 1 },
      ],
    },
    {
      id: 202, title: 'The Rise of Social Media Influencers', level: 'B2',
      text: `In the past decade, social media influencers have emerged as a powerful force in the marketing world. These individuals, who have built substantial followings on platforms like Instagram, YouTube, and TikTok, now command the attention of millions and can significantly impact consumer behavior.

The appeal of influencers lies in their perceived authenticity. Unlike traditional celebrities, influencers often share their daily lives, opinions, and experiences with their followers, creating a sense of personal connection. This relationship makes their recommendations feel more genuine and trustworthy.

Brands have been quick to recognize this potential. The influencer marketing industry is now worth billions of dollars, with companies allocating substantial portions of their marketing budgets to influencer partnerships. Micro-influencers, those with smaller but highly engaged followings, are particularly valued for their niche expertise and higher engagement rates.

Nevertheless, the industry is not without controversy. Critics argue that influencers often promote products without adequate disclosure, misleading their followers. There are also concerns about the impact of influencer culture on mental health, particularly among young people who may feel pressured to live up to unrealistic standards.

Regulatory bodies are increasingly stepping in to address these issues. Many countries now require influencers to clearly label sponsored content. As the industry matures, transparency and ethical practices are becoming more important for long-term sustainability.`,
      questions: [
        { question: 'Why are influencers considered more authentic than traditional celebrities?', options: ['They are richer', 'They share their daily lives', 'They are more famous', 'They have better products'], correctIndex: 1 },
        { question: 'What are micro-influencers known for?', options: ['Having millions of followers', 'Niche expertise and high engagement', 'Being more expensive', 'Working for free'], correctIndex: 1 },
        { question: 'What criticism of influencers is mentioned?', options: ['They are too expensive', 'They lack disclosure', 'They are not famous enough', 'They don\'t use social media'], correctIndex: 1 },
        { question: 'What concern is raised about influencer culture?', options: ['Environmental impact', 'Mental health impact', 'Economic inequality', 'Political influence'], correctIndex: 1 },
        { question: 'How are regulatory bodies responding?', options: ['Banning influencers', 'Requiring disclosure labels', 'Taxing influencers', 'Limiting followers'], correctIndex: 1 },
      ],
    },
    {
      id: 203, title: 'Sustainable Tourism', level: 'B2',
      text: `As international travel continues to grow, so does concern about its environmental and cultural impact. Sustainable tourism has emerged as a crucial concept, aiming to minimize the negative effects of tourism while maximizing its benefits for local communities.

Mass tourism has been linked to numerous problems. Popular destinations often struggle with overcrowding, which puts pressure on local infrastructure and natural resources. Venice, for example, has seen its resident population decline as the city becomes increasingly geared towards tourists. Similarly, Thailand's Maya Bay was closed to visitors for several years to allow its ecosystem to recover.

Sustainable tourism, on the other hand, promotes responsible travel practices. This includes choosing eco-friendly accommodations, supporting local businesses, respecting local customs, and minimizing waste. Tourists are encouraged to travel during off-peak seasons to reduce overcrowding and to stay longer in fewer places rather than rushing through multiple destinations.

Local communities play a vital role in sustainable tourism. When tourism revenue stays within the community, it can fund conservation efforts and improve living standards. Community-based tourism projects have been successful in many developing countries, allowing visitors to experience authentic local culture while providing economic opportunities for residents.

The future of travel lies in finding a balance between exploration and preservation. Travelers are becoming more conscious of their impact and are demanding more sustainable options from the industry. Ultimately, sustainable tourism is not just a trend but a necessity for the preservation of our planet's most precious destinations.`,
      questions: [
        { question: 'What problem caused by mass tourism is mentioned?', options: ['Higher prices', 'Overcrowding', 'Air pollution', 'Noise pollution'], correctIndex: 1 },
        { question: 'Why was Maya Bay closed?', options: ['For renovation', 'For ecosystem recovery', 'Political reasons', 'Lack of visitors'], correctIndex: 1 },
        { question: 'Which is NOT a practice of sustainable tourism?', options: ['Choosing eco-friendly hotels', 'Supporting local businesses', 'Traveling during peak season', 'Minimizing waste'], correctIndex: 2 },
        { question: 'What is the role of local communities in sustainable tourism?', options: ['They receive all profits', 'They benefit from tourism revenue', 'They control all tourism', 'They replace tourists'], correctIndex: 1 },
        { question: 'How is the future of travel described?', options: ['More expensive', 'Less frequent', 'Balanced between exploration and preservation', 'Fully online'], correctIndex: 2 },
      ],
    },
    {
      id: 204, title: 'Artificial Intelligence in Healthcare', level: 'B2',
      text: `Artificial Intelligence is revolutionizing the healthcare industry in unprecedented ways. From diagnosing diseases to discovering new drugs, AI applications are transforming how medical professionals work and how patients receive care.

One of the most promising applications of AI is in medical imaging. AI algorithms can analyze X-rays, MRIs, and CT scans with remarkable accuracy, often detecting abnormalities that human radiologists might miss. In some studies, AI systems have demonstrated diagnostic accuracy comparable to or even exceeding that of experienced doctors.

AI is also making significant contributions to drug discovery. Traditional drug development is a time-consuming and expensive process, often taking over a decade and costing billions of dollars. AI can analyze vast amounts of data to identify potential drug candidates much faster, potentially reducing development time by several years.

Personalized medicine is another area where AI shows great promise. By analyzing a patient's genetic information, lifestyle, and medical history, AI can help doctors tailor treatments to individual patients. This approach has already shown remarkable results in cancer treatment, where AI helps identify the most effective therapies based on a patient's specific genetic markers.

However, the integration of AI in healthcare also raises important ethical questions. Concerns about data privacy, algorithmic bias, and the potential loss of human touch in medicine must be carefully addressed. The goal should be to use AI as a tool to augment, not replace, human healthcare providers.

Despite these challenges, the potential benefits of AI in healthcare are immense. As technology continues to advance, we can expect AI to play an increasingly important role in improving patient outcomes and making healthcare more accessible and affordable.`,
      questions: [
        { question: 'In which area has AI shown remarkable accuracy comparable to doctors?', options: ['Surgery', 'Medical imaging', 'Patient counseling', 'Hospital management'], correctIndex: 1 },
        { question: 'How does AI help in drug discovery?', options: ['By testing drugs on patients', 'By analyzing data to find candidates', 'By manufacturing drugs', 'By prescribing medications'], correctIndex: 1 },
        { question: 'What is personalized medicine?', options: ['Medicine made by individuals', 'Treatment tailored to individual patients', 'Medicine sold personally', 'Alternative medicine'], correctIndex: 1 },
        { question: 'What ethical concern about AI in healthcare is mentioned?', options: ['Cost', 'Data privacy', 'Speed', 'Availability'], correctIndex: 1 },
        { question: 'What is the author\'s view on AI in healthcare?', options: ['It should replace doctors', 'It should augment doctors', 'It is too dangerous', 'It is unnecessary'], correctIndex: 1 },
      ],
    },
    {
      id: 205, title: 'Global Food Security Challenges', level: 'B2',
      text: `Global food security remains one of the most pressing challenges of the twenty-first century. Despite significant advances in agricultural technology, approximately 800 million people worldwide still suffer from chronic hunger, while the global population continues to grow.

Climate change poses a major threat to food production. Rising temperatures, changing rainfall patterns, and more frequent extreme weather events are already affecting crop yields in many regions. Small-scale farmers in developing countries are particularly vulnerable, as they often lack the resources to adapt to changing conditions.

Food waste is another critical issue. According to the United Nations, approximately one-third of all food produced globally is lost or wasted each year. This waste occurs at every stage of the supply chain, from farms to households. In developed countries, consumers are responsible for a significant portion of food waste, while in developing nations, the majority of waste occurs during harvest, storage, and transportation.

Technological innovations offer potential solutions. Precision agriculture uses sensors and data analytics to optimize water usage, fertilizer application, and pest control, reducing waste and increasing yields. Vertical farming, which involves growing crops in stacked layers, allows food production in urban areas with minimal land and water use.

Addressing food security requires a comprehensive approach involving governments, businesses, and individuals. Sustainable farming practices, reduced food waste, improved distribution systems, and investment in agricultural research are all essential components of creating a food-secure future for all.`,
      questions: [
        { question: 'How many people suffer from chronic hunger worldwide?', options: ['500 million', '800 million', '1 billion', '2 billion'], correctIndex: 1 },
        { question: 'Why are small-scale farmers particularly vulnerable?', options: ['They lack land', 'They lack resources to adapt', 'They grow only rice', 'They are uneducated'], correctIndex: 1 },
        { question: 'What percentage of food is wasted globally?', options: ['One-quarter', 'One-third', 'One-half', 'Two-thirds'], correctIndex: 1 },
        { question: 'Where does most food waste occur in developing countries?', options: ['In households', 'During harvest and storage', 'In supermarkets', 'In restaurants'], correctIndex: 1 },
        { question: 'What is vertical farming?', options: ['Farming on slopes', 'Growing crops in stacked layers', 'Farming without soil', 'Underwater farming'], correctIndex: 1 },
      ],
    },
    {
      id: 206, title: 'The Psychology of Habit Formation', level: 'B2',
      text: `Understanding how habits form is key to changing our behavior. According to research in psychology, habits are automatic behaviors triggered by specific cues in our environment. They develop through a process called "chunking," where the brain converts a sequence of actions into an automatic routine.

The habit loop, popularized by Charles Duhigg, consists of three elements: cue, routine, and reward. The cue triggers the behavior, the routine is the behavior itself, and the reward is the benefit you get from it. For example, feeling stressed (cue) might lead you to eat chocolate (routine), which makes you feel better (reward).

To change a bad habit, experts recommend keeping the same cue and reward but changing the routine. If stress triggers eating, you could replace eating with a short walk or deep breathing. This approach is often more effective than trying to eliminate the habit entirely.

The key to forming good habits is consistency. Research suggests that it takes an average of 66 days for a new behavior to become automatic, although this varies widely depending on the complexity of the behavior and individual differences. Starting small, maintaining consistency, and gradually increasing the difficulty are proven strategies for successful habit formation.

Environmental design also plays a crucial role. Making desired behaviors easy and undesired behaviors difficult can significantly impact our ability to form habits. For instance, keeping fruit visible on the counter and hiding junk food in the cupboard can nudge us towards healthier eating without conscious effort.`,
      questions: [
        { question: 'What are habits according to the passage?', options: ['Conscious decisions', 'Automatic behaviors triggered by cues', 'Random actions', 'Genetic traits'], correctIndex: 1 },
        { question: 'What are the three elements of the habit loop?', options: ['Start, middle, end', 'Cue, routine, reward', 'Thought, action, result', 'Trigger, behavior, consequence'], correctIndex: 1 },
        { question: 'What is recommended for changing a bad habit?', options: ['Eliminate the cue', 'Change the routine, keep cue and reward', 'Remove the reward', 'Ignore the cue'], correctIndex: 1 },
        { question: 'How many days does it take on average for a habit to form?', options: ['21 days', '30 days', '66 days', '90 days'], correctIndex: 2 },
        { question: 'What is environmental design in habit formation?', options: ['Decorating your room', 'Making good behaviors easy and bad ones hard', 'Designing apps', 'Changing your wardrobe'], correctIndex: 1 },
      ],
    },
  ],

  'C1': [
    {
      id: 301, title: 'The Economics of Climate Change', level: 'C1',
      text: `The economic implications of climate change are profound and far-reaching, extending well beyond the environmental concerns that typically dominate public discourse. Recent analyses by leading economists suggest that the global economy could lose up to 18% of GDP by 2050 if current emission trends continue unabated.

The mechanisms through which climate change affects economic output are multifaceted. Extreme weather events, including hurricanes, floods, and droughts, cause direct damage to infrastructure and property. Agricultural productivity is declining in many regions due to changing weather patterns, leading to higher food prices and increased volatility in commodity markets. Furthermore, rising sea levels threaten coastal cities, which house a disproportionate share of global economic activity.

The concept of "stranded assets" has gained particular attention in financial circles. As governments implement stricter environmental regulations, fossil fuel reserves that were once considered valuable may become economically unviable to extract. This could trigger a significant revaluation of assets held by energy companies and the financial institutions that have invested in them.

However, the transition to a low-carbon economy also presents substantial economic opportunities. The renewable energy sector has experienced exponential growth, with solar and wind power now cheaper than fossil fuels in many markets. The global market for environmental goods and services is projected to reach trillions of dollars annually, creating millions of jobs in fields such as energy efficiency, sustainable transportation, and circular economy.

Carbon pricing mechanisms, including carbon taxes and cap-and-trade systems, have emerged as the most economically efficient approaches to reducing emissions. By putting a price on carbon, these mechanisms internalize the environmental costs of emissions, encouraging businesses and consumers to shift towards cleaner alternatives while generating revenue that can be used to support the transition.`,
      questions: [
        { question: 'What percentage of GDP could be lost by 2050 if trends continue?', options: ['Up to 10%', 'Up to 15%', 'Up to 18%', 'Up to 25%'], correctIndex: 2 },
        { question: 'What are "stranded assets"?', options: ['Abandoned factories', 'Fossil fuel reserves that may become unviable', 'Lost investments', 'Unsold products'], correctIndex: 1 },
        { question: 'Which sector has experienced exponential growth?', options: ['Fossil fuels', 'Nuclear energy', 'Renewable energy', 'Hydroelectric power'], correctIndex: 2 },
        { question: 'What are carbon pricing mechanisms?', options: ['Subsidies for carbon', 'Taxes on carbon emissions', 'Rebates for carbon', 'Carbon trading bans'], correctIndex: 1 },
        { question: 'What is the author\'s overall perspective on climate economics?', options: ['It is only negative', 'It is only positive', 'It has both risks and opportunities', 'It is insignificant'], correctIndex: 2 },
      ],
    },
    {
      id: 302, title: 'Cognitive Biases in Decision Making', level: 'C1',
      text: `Despite our self-perception as rational beings, human decision-making is profoundly influenced by cognitive biases—systematic patterns of deviation from rationality that affect our judgments and choices. Understanding these biases is crucial for making better decisions in both personal and professional contexts.

Confirmation bias, perhaps the most well-documented cognitive bias, refers to our tendency to seek out, interpret, and remember information that confirms our pre-existing beliefs while giving disproportionately less attention to contradictory evidence. This bias is particularly pervasive in the age of social media, where algorithmic content curation often creates echo chambers that reinforce our existing views.

The anchoring effect demonstrates how initial information serves as a reference point that influences subsequent judgments. For instance, the first price we see for a product can anchor our perception of what constitutes a fair price, making subsequent prices seem either expensive or cheap by comparison. This effect is widely exploited in retail pricing strategies and negotiations.

Overconfidence bias leads us to overestimate our own abilities, knowledge, and the accuracy of our predictions. Studies show that when people express 90% confidence in their judgments, they are correct only about 75% of the time. This disparity has significant implications in fields such as financial trading, medical diagnosis, and strategic planning.

The availability heuristic causes us to overestimate the likelihood of events that are easily recalled, typically because they are recent, vivid, or emotionally charged. This explains why people often overestimate dramatic but rare causes of death (such as plane crashes) while underestimating more common but less memorable ones (such as heart disease).

Awareness of these biases does not eliminate them, but it can help us implement strategies to mitigate their effects. Techniques such as considering alternative viewpoints, seeking disconfirming evidence, and using structured decision-making frameworks can improve the quality of our decisions.`,
      questions: [
        { question: 'What is confirmation bias?', options: ['Seeking evidence that contradicts beliefs', 'Seeking evidence that confirms beliefs', 'Ignoring all evidence', 'Making quick decisions'], correctIndex: 1 },
        { question: 'How does the anchoring effect work?', options: ['Final information anchors decisions', 'Initial information influences subsequent judgments', 'Emotions anchor decisions', 'Logic anchors decisions'], correctIndex: 1 },
        { question: 'What does overconfidence bias lead to?', options: ['Underestimating abilities', 'Overestimating abilities and prediction accuracy', 'Being too cautious', 'Avoiding risks'], correctIndex: 1 },
        { question: 'How accurate are people when they express 90% confidence?', options: ['90%', 'About 75%', 'About 50%', 'About 60%'], correctIndex: 1 },
        { question: 'Does awareness of biases eliminate them?', options: ['Yes, completely', 'No, but can help mitigate effects', 'Yes, partially', 'No, awareness has no effect'], correctIndex: 1 },
      ],
    },
    {
      id: 303, title: 'The Neuroscience of Memory', level: 'C1',
      text: `Memory is not a single entity but a complex system comprising multiple interconnected processes. Contemporary neuroscience has identified distinct types of memory, each mediated by different brain structures and neural pathways. Understanding these distinctions has profound implications for education, clinical psychology, and our understanding of consciousness itself.

Explicit or declarative memory involves conscious recall of facts and events. This category is further divided into episodic memory, which stores personal experiences and autobiographical events, and semantic memory, which holds general knowledge about the world. The hippocampus, a seahorse-shaped structure deep within the temporal lobe, is critical for forming new explicit memories. Damage to this area can result in anterograde amnesia, the inability to form new memories while retaining those formed before the damage.

Implicit or non-declarative memory operates below conscious awareness. Procedural memory, which enables us to perform skilled actions like riding a bicycle or typing on a keyboard without conscious thought, relies primarily on the basal ganglia and cerebellum. Priming and classical conditioning are other forms of implicit memory that influence our behavior without our awareness.

The process of memory consolidation involves the transfer of information from short-term to long-term storage. Contrary to previous beliefs, consolidation is not a one-time event but an ongoing process. During sleep, particularly during slow-wave sleep and REM sleep, the brain reactivates and strengthens neural connections associated with newly acquired information. This explains why sleep is so crucial for learning.

One of the most fascinating aspects of memory is its malleability. Each time we recall a memory, it becomes temporarily unstable and must be reconsolidated. During this window of instability, memories can be modified, strengthened, weakened, or even altered with new information. This phenomenon, known as reconsolidation, has significant implications for treating conditions like post-traumatic stress disorder and has led to the development of new therapeutic approaches.`,
      questions: [
        { question: 'How many main types of memory are described in the passage?', options: ['Two', 'Three', 'Four', 'Five'], correctIndex: 0 },
        { question: 'What brain structure is critical for forming explicit memories?', options: ['Cerebellum', 'Hippocampus', 'Amygdala', 'Brain stem'], correctIndex: 1 },
        { question: 'What is procedural memory?', options: ['Memory of facts', 'Memory of skills performed without conscious thought', 'Memory of events', 'Memory of faces'], correctIndex: 1 },
        { question: 'When does memory consolidation occur?', options: ['Only during waking hours', 'Particularly during sleep', 'Only during REM sleep', 'Continuously at all times'], correctIndex: 1 },
        { question: 'What is memory reconsolidation?', options: ['Memories never change after formation', 'Memories become unstable and can be modified when recalled', 'Memories are permanently fixed after sleep', 'Memories are only stored once'], correctIndex: 1 },
      ],
    },
    {
      id: 304, title: 'The Evolution of Human Language', level: 'C1',
      text: `The origin of human language remains one of the most intriguing unanswered questions in science. Unlike other human abilities, language does not leave direct fossil evidence, forcing researchers to piece together clues from diverse fields including archaeology, genetics, anthropology, and comparative psychology.

Current evidence suggests that language evolved gradually rather than appearing suddenly. The FOXP2 gene, often called the "language gene," plays a crucial role in the development of brain areas involved in speech. Neanderthals shared this gene with modern humans, suggesting that the capacity for complex vocal communication may have existed in our common ancestor over 500,000 years ago.

The anatomical prerequisites for speech include a descended larynx, which allows for the production of a wide range of vowel sounds. Studies of fossil skull bases indicate that this anatomical feature may have emerged around 350,000 years ago with Homo heidelbergensis. However, the presence of a descended larynx alone does not necessarily indicate language, as some non-human species also possess this feature.

The cognitive requirements for language are equally important. Theory of mind—the ability to understand that others have thoughts and intentions different from one's own—is essential for effective communication. Working memory capacity and the ability to process recursive structures are also crucial cognitive prerequisites.

The emergence of symbolic thought, evidenced by the creation of art and personal adornment, is generally considered a significant milestone in language evolution. The earliest known cave paintings, dating back at least 45,000 years, demonstrate the capacity for symbolic representation, which is fundamental to language.

Debate continues about whether language emerged primarily for social bonding, as a tool for transmitting practical information, or as a byproduct of general cognitive development. Most researchers now believe that multiple factors contributed to the evolution of this uniquely human capacity, which has fundamentally shaped our species' trajectory.`,
      questions: [
        { question: 'Why is the origin of language difficult to study?', options: ['Because it is too recent', 'Because it leaves no direct fossil evidence', 'Because no one studies it', 'Because it is too simple'], correctIndex: 1 },
        { question: 'What is the FOXP2 gene associated with?', options: ['Physical strength', 'Language capacity', 'Memory', 'Vision'], correctIndex: 1 },
        { question: 'When did the descended larynx likely emerge?', options: ['100,000 years ago', '350,000 years ago', '500,000 years ago', '1 million years ago'], correctIndex: 1 },
        { question: 'What is "theory of mind"?', options: ['A psychological theory', 'Understanding others have different thoughts', 'A language teaching method', 'A type of memory'], correctIndex: 1 },
        { question: 'What is considered evidence of early symbolic thought?', options: ['Tools', 'Cave paintings', 'Housing', 'Fire'], correctIndex: 1 },
      ],
    },
  ],

  'C2': [
    {
      id: 401, title: 'Quantum Computing and Its Implications', level: 'C2',
      text: `Quantum computing represents a paradigm shift in computational capability, harnessing the principles of quantum mechanics to process information in ways that are fundamentally impossible for classical computers. Unlike classical bits, which exist in a state of either 0 or 1, quantum bits—or qubits—can exist in superposition, occupying multiple states simultaneously. This property, combined with quantum entanglement, enables quantum computers to perform certain calculations exponentially faster than their classical counterparts.

The implications of quantum computing extend across virtually every scientific and industrial domain. In cryptography, Shor's algorithm theoretically renders many current encryption methods obsolete, prompting urgent research into post-quantum cryptography. The pharmaceutical industry stands to benefit enormously, as quantum simulations of molecular interactions could dramatically accelerate drug discovery by modeling complex chemical reactions that classical computers cannot simulate with sufficient accuracy.

However, significant technical challenges impede the realization of practical quantum computers. Qubits are extraordinarily sensitive to environmental interference, a phenomenon known as decoherence, which introduces errors that scale with system complexity. Maintaining coherence requires extreme conditions, typically temperatures approaching absolute zero. Current error correction techniques require thousands of physical qubits to create a single logical qubit, placing practical quantum computing with error correction—so-called fault-tolerant quantum computing—years or decades away from widespread implementation.

The advent of quantum computing also raises profound philosophical questions. If a quantum computer could simulate consciousness, what would be the ethical implications? More immediately, quantum supremacy—the point at which a quantum computer can perform a calculation beyond the reach of any classical computer—has already been claimed for specific narrow tasks, though the practical significance of these demonstrations remains debated.

Policymakers face the challenge of preparing for a post-quantum world while the technology remains nascent. National strategies for quantum technology development have been announced by numerous countries, recognizing that leadership in this field will confer substantial economic and strategic advantages. The race to build the first fully functional quantum computer is not merely a scientific competition but a geopolitical one.`,
      questions: [
        { question: 'How do qubits differ from classical bits?', options: ['They are faster', 'They can exist in multiple states simultaneously', 'They use more energy', 'They are smaller'], correctIndex: 1 },
        { question: 'What threat does quantum computing pose to cryptography?', options: ['It improves encryption', 'It could make current encryption obsolete', 'It has no effect', 'It creates new encryption methods'], correctIndex: 1 },
        { question: 'What is decoherence?', options: ['An error correction method', 'Sensitivity to environmental interference', 'A type of qubit', 'A quantum algorithm'], correctIndex: 1 },
        { question: 'What conditions are required to maintain qubit coherence?', options: ['Room temperature', 'Temperatures near absolute zero', 'High pressure', 'Vacuum'], correctIndex: 1 },
        { question: 'Why is quantum computing described as a geopolitical competition?', options: ['It is military technology', 'Countries seek economic and strategic advantages', 'It creates weapons', 'It is a United Nations project'], correctIndex: 1 },
      ],
    },
    {
      id: 402, title: 'The Epistemology of Artificial Intelligence', level: 'C2',
      text: `The rapid advancement of artificial intelligence, particularly in the domain of deep learning, has resurrected fundamental questions in epistemology—the philosophical study of knowledge and justified belief. When a neural network achieves superhuman performance in tasks ranging from game-playing to medical diagnosis, can we legitimately claim that it "knows" anything? If so, how does machine knowledge differ from human knowledge?

Contemporary AI systems operate primarily through pattern recognition on an enormous scale. A large language model like GPT-4, trained on trillions of tokens, does not store facts in a database but rather encodes statistical regularities in its parameters. When asked a question, it generates responses based on probability distributions learned during training, without anything resembling human understanding or intentionality. This raises the question of whether such systems possess knowledge in any meaningful sense, or merely simulate knowledge through sophisticated pattern matching.

The "black box" problem compounds these epistemological concerns. Deep neural networks learn representations that are distributed across millions of parameters in ways that are largely opaque to human interpretation. Even their creators often cannot definitively explain why a network arrives at a particular output. This opacity poses significant challenges for high-stakes applications such as autonomous vehicles, criminal justice, and medical diagnosis, where understanding the reasoning behind decisions is not merely desirable but ethically imperative.

The Chinese Room argument, proposed by philosopher John Searle, remains relevant to this discussion. Searle argued that a system could manipulate symbols according to rules without genuine understanding—and that this distinction matters. Critics counter that the argument may place undue emphasis on consciousness rather than functional capability, suggesting that if a system reliably produces correct outputs, whether it "understands" in a human sense may be irrelevant.

As AI systems become increasingly integrated into knowledge production across scientific disciplines, epistemology itself may need to evolve. The traditional conception of knowledge as justified true belief, attributed to Plato, may prove inadequate for a world where algorithms discover patterns imperceptible to human cognition. The question of what constitutes knowledge in partnership with machines represents one of the defining intellectual challenges of our era.`,
      questions: [
        { question: 'What philosophical question does AI advancement raise?', options: ['Can AI be conscious?', 'Can machines legitimately be said to know anything?', 'Will AI replace humans?', 'Is AI dangerous?'], correctIndex: 1 },
        { question: 'How do large language models generate responses?', options: ['By understanding the question', 'Based on probability distributions from training', 'By searching databases', 'By logical reasoning'], correctIndex: 1 },
        { question: 'What is the "black box" problem?', options: ['AI systems are physically sealed', 'AI decision-making is opaque to human interpretation', 'AI systems cannot communicate', 'AI systems are too fast to observe'], correctIndex: 1 },
        { question: 'What is the Chinese Room argument about?', options: ['Translation accuracy', 'The distinction between symbol manipulation and genuine understanding', 'Room design', 'Chinese language learning'], correctIndex: 1 },
        { question: 'What does the author suggest about epistemology?', options: ['It is complete', 'It may need to evolve for the age of AI', 'It is irrelevant', 'It has been replaced by AI'], correctIndex: 1 },
      ],
    },
    {
      id: 403, title: 'Geopolitical Dimensions of the Energy Transition', level: 'C2',
      text: `The global transition from fossil fuels to renewable energy sources represents not merely a technological transformation but a fundamental reconfiguration of geopolitical power dynamics that have shaped international relations for over a century. The energy transition is, in essence, a redistribution of power—both literally and metaphorically.

The existing energy order has been dominated by nations endowed with abundant fossil fuel reserves. Countries such as Saudi Arabia, Russia, and Venezuela have leveraged their hydrocarbon wealth to project geopolitical influence, often with limited regard for democratic governance or human rights. The strategic importance of oil has been a recurring theme in twentieth-century history, from the two World Wars to the formation of OPEC and the various conflicts in the Middle East.

The renewable energy landscape is fundamentally different. Solar and wind resources are distributed far more evenly across the globe than oil and gas reserves. Every country receives sunlight and wind; the key variables are technological capacity and capital investment rather than geological endowment. This democratization of energy resources could potentially level the international playing field, reducing the strategic importance of the Persian Gulf and empowering nations that currently lack significant energy resources.

However, the energy transition also creates new dependencies. The production of solar panels, wind turbines, and batteries requires rare earth elements and other critical minerals, the reserves of which are geographically concentrated. China currently dominates the processing of these materials, controlling approximately 60% of rare earth mining and over 80% of processing. This concentration of supply chains represents a potential vulnerability for importing nations.

Furthermore, the intermittency of renewable energy sources necessitates massive investment in energy storage and grid infrastructure. Nations that lead in battery technology, smart grid systems, and hydrogen production may emerge as the energy superpowers of the twenty-first century. The geopolitics of energy is thus metamorphosing from a contest over territorial reserves to a competition for technological and manufacturing supremacy.

The transition also has profound implications for existing petrostates. Nations whose economies are heavily dependent on fossil fuel revenues face the prospect of stranded assets and economic contraction. The pace and management of this transition will determine whether it unfolds relatively smoothly or becomes a source of international instability, as declining revenues exacerbate existing tensions within and between vulnerable states.`,
      questions: [
        { question: 'How does the author describe the energy transition?', options: ['A purely technological change', 'A fundamental reconfiguration of geopolitical power', 'An economic adjustment', 'An environmental policy'], correctIndex: 1 },
        { question: 'Why are solar and wind resources considered more democratic?', options: ['They are cheaper', 'They are distributed more evenly than fossil fuels', 'They are more efficient', 'They require less investment'], correctIndex: 1 },
        { question: 'What new dependency does the energy transition create?', options: ['Dependence on OPEC', 'Dependence on rare earth element supply chains', 'Dependence on coal', 'Dependence on nuclear power'], correctIndex: 1 },
        { question: 'What may determine energy superpowers in the future?', options: ['Oil reserves', 'Technology and manufacturing leadership', 'Military power', 'Population size'], correctIndex: 1 },
        { question: 'What risk do petrostates face?', options: ['Increased revenue', 'Stranded assets and economic contraction', 'Energy independence', 'Technological advancement'], correctIndex: 1 },
      ],
    },
    {
      id: 404, title: 'Consciousness and Integrated Information Theory', level: 'C2',
      text: `Integrated Information Theory (IIT), developed by neuroscientist Giulio Tononi, represents one of the most ambitious and controversial attempts to solve the hard problem of consciousness—explaining why and how physical processes give rise to subjective experience. Unlike functionalist approaches that equate consciousness with information processing, IIT proposes that consciousness is identical to a specific property of physical systems: their capacity to integrate information.

At the core of IIT is the concept of Phi (Φ), a mathematical measure of a system's integrated information. Phi quantifies the extent to which a system's information is irreducible to its parts. A system with high Phi cannot be decomposed into independent modules without losing information; it possesses a degree of causal interdependence that gives rise to a unified conscious experience. According to IIT, the level of consciousness in a system corresponds to its Phi value.

The theory produces several counterintuitive predictions. It suggests that certain simple systems, such as a photodiode that integrates information from its inputs, may possess minimal consciousness—a claim that has generated substantial controversy. Conversely, it implies that some sophisticated information-processing systems, such as feedforward neural networks that process information in a largely serial manner, may have low Phi despite their computational capabilities.

IIT also offers a framework for understanding the quality or "texture" of conscious experience. The theory posits that the specific quality of a conscious state—the way red looks or the particular feeling of melancholy—is determined by the "shape" of the system's informational structure in a high-dimensional space called qualia space. This conceptual architecture provides a potential bridge between the objective, third-person description of brain activity and the subjective, first-person experience.

Critics of IIT raise several objections. Some argue that the theory's mathematical framework is too complex to be practically applied to systems of realistic size. Others contend that IIT conflates information integration with consciousness without providing a compelling explanation for why they should be connected. The theory also faces the challenge of explaining why certain brain structures seem to support consciousness while others, such as the cerebellum with its vast number of neurons, apparently do not.

Despite these criticisms, IIT has significantly influenced contemporary consciousness research by providing a testable framework for investigating the neural correlates of consciousness and by connecting philosophical questions to empirical predictions that can, in principle, be experimentally evaluated.`,
      questions: [
        { question: 'What does IIT propose consciousness is identical to?', options: ['A specific brain region', 'The capacity to integrate information', 'Neural firing rate', 'Behavioral output'], correctIndex: 1 },
        { question: 'What does Phi (Φ) measure?', options: ['Brain size', 'A system\'s integrated information', 'Neuron count', 'Processing speed'], correctIndex: 1 },
        { question: 'What controversial claim does IIT make?', options: ['Only humans are conscious', 'Simple systems may have minimal consciousness', 'Consciousness is an illusion', 'Computers cannot be conscious'], correctIndex: 1 },
        { question: 'How does IIT explain the quality of conscious experience?', options: ['Through brain chemistry', 'Through the shape of informational structure in qualia space', 'Through evolutionary history', 'Through language'], correctIndex: 1 },
        { question: 'What is one criticism of IIT mentioned?', options: ['It is too simple', 'Its mathematical framework is complex to apply practically', 'It has no predictions', 'It contradicts physics'], correctIndex: 1 },
      ],
    },
  ],
}

