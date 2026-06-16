import type { Level } from '@/context/LevelContext'

export interface GrammarLesson {
  id: number
  title: string
  description: string
  explanation: string
  examples: { correct: string; incorrect?: string }[]
  exercises: GrammarExercise[]
}

export interface GrammarExercise {
  type?: 'mcq' | 'transformation' | 'error-correction'
  sentence?: string
  options?: string[]
  correctIndex?: number
  explanation?: string
  instruction?: string
  prompt?: string
  answer?: string
  hint?: string
  error?: string
  correction?: string
}

// Re-export as alias for component usage
export type GrammarExerciseTransformation = GrammarExercise & { type: 'transformation'; instruction: string; prompt: string; answer: string }
export type GrammarExerciseErrorCorrection = GrammarExercise & { type: 'error-correction'; sentence: string; error: string; correction: string }

export interface WritingFunctionGroup {
  id: string
  title: string
  description: string
  functions: string[]
  lessons: number[]  // references lesson IDs
}

export const grammarData: Record<Level, GrammarLesson[]> = {
  'A1-A2': [
    {
      id: 101, title: 'To Be (am/is/are)', description: 'Động từ "to be" ở hiện tại',
      explanation: 'Dùng để giới thiệu bản thân, miêu tả người/vật.\n\nI am (I\'m)\nHe/She/It is (He\'s/She\'s/It\'s)\nWe/You/They are (We\'re/You\'re/They\'re)\n\nPhủ định: I am not, He isn\'t, They aren\'t\nCâu hỏi: Am I...? Is he...? Are you...?',
      examples: [
        { correct: 'I am a student.', incorrect: 'I is a student.' },
        { correct: 'She is very kind.', incorrect: 'She are very kind.' },
        { correct: 'They are from Vietnam.' },
      ],
      exercises: [
        { sentence: 'I ___ a teacher.', options: ['am', 'is', 'are', 'be'], correctIndex: 0, explanation: 'Chủ ngữ "I" đi với "am"' },
        { sentence: 'She ___ very happy today.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: '"She" (ngôi thứ 3 số ít) đi với "is"' },
        { sentence: 'We ___ from Hanoi.', options: ['am', 'is', 'are', 'be'], correctIndex: 2, explanation: '"We" (số nhiều) đi với "are"' },
        { sentence: '___ you a doctor?', options: ['Am', 'Is', 'Are', 'Be'], correctIndex: 2, explanation: '"You" đi với "Are" trong câu hỏi' },
        { sentence: 'The cat ___ on the table.', options: ['am', 'is', 'are', 'be'], correctIndex: 1, explanation: '"The cat" (số ít) đi với "is"' },
      ],
    },
    {
      id: 102, title: 'Have/Has Got', description: 'Có (sở hữu)',
      explanation: 'Dùng để nói về sở hữu, quan hệ gia đình, mô tả ngoại hình.\n\nI/You/We/They have got / have\nHe/She/It has got / has\n\nPhủ định: haven\'t got / hasn\'t got\nCâu hỏi: Have you got...? Has she got...?',
      examples: [
        { correct: 'I have got a brother.', incorrect: 'I has got a brother.' },
        { correct: 'She has got blue eyes.' },
        { correct: 'Have you got a car?' },
      ],
      exercises: [
        { sentence: 'I ___ (have got) a new phone.', options: ['have got', 'has got', 'am got', 'is got'], correctIndex: 0, explanation: '"I" → have got' },
        { sentence: 'He ___ (have got) two sisters.', options: ['have got', 'has got', 'is got', 'are got'], correctIndex: 1, explanation: '"He" → has got' },
        { sentence: '___ you got a pet?', options: ['Has', 'Have', 'Are', 'Do'], correctIndex: 1, explanation: '"You" → Have you got?' },
        { sentence: 'They ___ (have not got) a car.', options: ["haven't got", "hasn't got", "don't have got", "aren't got"], correctIndex: 0, explanation: '"They" → haven\'t got' },
        { sentence: 'She ___ (have got) long hair.', options: ['have got', 'has got', 'is got', 'are got'], correctIndex: 1, explanation: '"She" → has got' },
      ],
    },
    {
      id: 103, title: 'Present Simple', description: 'Thì hiện tại đơn (cơ bản)',
      explanation: 'Dùng cho thói quen và sự thật.\n\nI/You/We/They + V\nHe/She/It + V(s/es)\n\nPhủ định: don\'t/doesn\'t + V\nCâu hỏi: Do/Does + S + V?\n\nDấu hiệu: always, often, usually, every day',
      examples: [
        { correct: 'I get up at 6am every day.' },
        { correct: 'She goes to school by bus.', incorrect: 'She go to school by bus.' },
        { correct: 'He doesn\'t like coffee.' },
      ],
      exercises: [
        { sentence: 'I ___ (get up) at 7am every day.', options: ['get up', 'gets up', 'getting up', 'got up'], correctIndex: 0, explanation: '"I" → get up (nguyên mẫu)' },
        { sentence: 'She ___ (watch) TV in the evening.', options: ['watch', 'watches', 'watching', 'watched'], correctIndex: 1, explanation: '"She" → thêm "es"' },
        { sentence: 'They ___ (not/like) fish.', options: ["don't like", "doesn't like", "not like", "aren't like"], correctIndex: 0, explanation: '"They" → don\'t like' },
        { sentence: '___ he play football?', options: ['Do', 'Does', 'Is', 'Are'], correctIndex: 1, explanation: '"He" → Does' },
        { sentence: 'My mother ___ (cook) dinner every evening.', options: ['cook', 'cooks', 'cooking', 'cooked'], correctIndex: 1, explanation: '"My mother" (số ít) → cooks' },
      ],
    },
    {
      id: 104, title: 'Present Continuous', description: 'Thì hiện tại tiếp diễn (cơ bản)',
      explanation: 'Dùng cho hành động đang xảy ra bây giờ.\n\nS + am/is/are + V-ing\nS + am not/isn\'t/aren\'t + V-ing\n\nDấu hiệu: now, right now, at the moment',
      examples: [
        { correct: 'I am reading a book now.', incorrect: 'I reading a book now.' },
        { correct: 'She is not sleeping at the moment.' },
        { correct: 'Are they playing outside?' },
      ],
      exercises: [
        { sentence: 'I ___ (eat) lunch right now.', options: ['eat', 'am eating', 'eating', 'eats'], correctIndex: 1, explanation: '"right now" → am eating' },
        { sentence: 'She ___ (read) a book at the moment.', options: ['reads', 'is reading', 'read', 'are reading'], correctIndex: 1, explanation: '"She" + "at the moment" → is reading' },
        { sentence: 'The children ___ (play) in the garden now.', options: ['play', 'is playing', 'are playing', 'plays'], correctIndex: 2, explanation: '"The children" (số nhiều) → are playing' },
        { sentence: 'He ___ (not/sleep) now.', options: ["doesn't sleep", "isn't sleeping", "not sleeping", "aren't sleeping"], correctIndex: 1, explanation: '"now" + "He" → isn\'t sleeping' },
        { sentence: '___ they ___ (watch) TV right now?', options: ['Do / watch', 'Are / watching', 'Is / watching', 'Are / watch'], correctIndex: 1, explanation: '"right now" → Are they watching?' },
      ],
    },
    {
      id: 105, title: 'Past Simple (Regular Verbs)', description: 'Quá khứ đơn với động từ có quy tắc',
      explanation: 'Dùng cho hành động đã xong trong quá khứ.\n\nS + V-ed\nS + didn\'t + V\nDid + S + V?\n\nDấu hiệu: yesterday, last night, last week, ago',
      examples: [
        { correct: 'I walked to school yesterday.' },
        { correct: 'She didn\'t watch TV last night.', incorrect: 'She didn\'t watched TV.' },
        { correct: 'Did you visit your grandma?' },
      ],
      exercises: [
        { sentence: 'I ___ (play) football yesterday.', options: ['play', 'played', 'playing', 'plays'], correctIndex: 1, explanation: '"yesterday" → played' },
        { sentence: 'She ___ (not/like) the movie.', options: ["didn't like", "doesn't like", "didn't liked", "not liked"], correctIndex: 0, explanation: '"didn\'t" + V nguyên mẫu → didn\'t like' },
        { sentence: 'We ___ (visit) our grandparents last weekend.', options: ['visit', 'visited', 'visiting', 'visits'], correctIndex: 1, explanation: '"last weekend" → visited' },
        { sentence: '___ you ___ (clean) your room?', options: ['Did / clean', 'Do / clean', 'Did / cleaned', 'Are / cleaning'], correctIndex: 0, explanation: 'Câu hỏi quá khứ → Did you clean?' },
        { sentence: 'He ___ (study) English last night.', options: ['study', 'studied', 'studys', 'studying'], correctIndex: 1, explanation: '"y" → "ied" → studied' },
      ],
    },
    {
      id: 106, title: 'Can / Can\'t', description: 'Động từ khuyết thiếu "can"',
      explanation: 'Dùng để diễn tả khả năng hoặc xin phép.\n\nS + can + V\nS + can\'t + V\nCan + S + V?\n\nKhông thay đổi ở ngôi thứ 3.',
      examples: [
        { correct: 'I can swim very well.' },
        { correct: 'She can\'t speak Chinese.', incorrect: 'She doesn\'t can speak Chinese.' },
        { correct: 'Can you open the door, please?' },
      ],
      exercises: [
        { sentence: 'I ___ (can) play the guitar.', options: ['can', 'cans', 'am can', 'can to'], correctIndex: 0, explanation: '"can" + V nguyên mẫu, không thay đổi' },
        { sentence: 'She ___ (cannot) swim.', options: ["don't can", "can't", "isn't can", "not can"], correctIndex: 1, explanation: 'Phủ định của "can" là "can\'t"' },
        { sentence: '___ you speak English?', options: ['Can', 'Are', 'Do', 'Have'], correctIndex: 0, explanation: 'Hỏi về khả năng → Can you?' },
        { sentence: 'He ___ (can) run very fast.', options: ['can', 'cans', 'is can', 'can to'], correctIndex: 0, explanation: '"He" + can (không thêm s)' },
        { sentence: 'I\'m sorry, I ___ (cannot) help you now.', options: ["don't can", "can't", "am not can", "not can"], correctIndex: 1, explanation: 'Phủ định → can\'t' },
      ],
    },
    {
      id: 107, title: 'Prepositions: In, On, At', description: 'Giới từ chỉ nơi chốn cơ bản',
      explanation: 'IN: trong, ở (quốc gia, thành phố, phòng)\nON: trên (bề mặt), ở (đường phố)\nAT: tại (địa điểm cụ thể)\n\nIn Hanoi, in the kitchen\nOn the table, on Main Street\nAt school, at home, at the airport',
      examples: [
        { correct: 'The book is on the desk.' },
        { correct: 'She lives in Ho Chi Minh City.' },
        { correct: 'I am at home now.' },
      ],
      exercises: [
        { sentence: 'The cat is ___ the box.', options: ['in', 'on', 'at', 'under'], correctIndex: 0, explanation: 'Bên trong hộp → in' },
        { sentence: 'My phone is ___ the table.', options: ['in', 'on', 'at', 'under'], correctIndex: 1, explanation: 'Trên mặt bàn → on' },
        { sentence: 'She is ___ school right now.', options: ['in', 'on', 'at', 'to'], correctIndex: 2, explanation: 'Địa điểm cụ thể → at school' },
        { sentence: 'I live ___ a small apartment.', options: ['in', 'on', 'at', 'to'], correctIndex: 0, explanation: 'Ở trong căn hộ → in' },
        { sentence: 'He is ___ the bus stop.', options: ['in', 'on', 'at', 'under'], correctIndex: 2, explanation: 'Tại điểm xe buýt → at' },
      ],
    },
    {
      id: 108, title: 'There is / There are', description: 'Có (tồn tại)',
      explanation: 'Dùng để nói sự tồn tại của người/vật.\n\nThere is + danh từ số ít\nThere are + danh từ số nhiều\n\nPhủ định: There isn\'t / There aren\'t\nCâu hỏi: Is there...? / Are there...?',
      examples: [
        { correct: 'There is a book on the table.' },
        { correct: 'There are two cats in the garden.', incorrect: 'There is two cats.' },
        { correct: 'Is there a supermarket near here?' },
      ],
      exercises: [
        { sentence: 'There ___ a park near my house.', options: ['is', 'are', 'am', 'be'], correctIndex: 0, explanation: '"A park" (số ít) → There is' },
        { sentence: 'There ___ many students in the class.', options: ['is', 'are', 'am', 'be'], correctIndex: 1, explanation: '"Many students" (số nhiều) → There are' },
        { sentence: '___ there a post office nearby?', options: ['Is', 'Are', 'Am', 'Do'], correctIndex: 0, explanation: '"A post office" (số ít) → Is there?' },
        { sentence: 'There ___ (not) any milk in the fridge.', options: ["isn't", "aren't", "don't", "not"], correctIndex: 0, explanation: '"Milk" (không đếm được) → There isn\'t' },
        { sentence: 'There ___ some apples on the table.', options: ['is', 'are', 'am', 'be'], correctIndex: 1, explanation: '"Some apples" (số nhiều) → There are' },
      ],
    },

    {
      id: 109, title: 'Imperatives & Instructions', description: 'Câu mệnh lệnh và chỉ dẫn',
      explanation: 'Dùng để đưa ra mệnh lệnh, yêu cầu hoặc chỉ dẫn.\n\nCâu khẳng định: V (nguyên mẫu) + ...\n- Open the door.\n- Sit down, please.\n\nCâu phủ định: Don\'t + V (nguyên mẫu) + ...\n- Don\'t run in the hallway.\n- Don\'t be late.\n\nLịch sự hơn: Please + V... / Let\'s + V...\n- Please close the window.\n- Let\'s go to the park.',
      examples: [
        { correct: 'Open your book, please.', incorrect: 'Opening your book, please.' },
        { correct: 'Don\'t touch the hot stove.' },
        { correct: 'Let\'s play football together.' },
      ],
      exercises: [
        { sentence: '___ (close) the door, please.', options: ['Close', 'Closing', 'Closes', 'Closed'], correctIndex: 0, explanation: 'Câu mệnh lệnh dùng động từ nguyên mẫu → Close' },
        { sentence: '___ (not/run) in the classroom.', options: ['Not run', 'Don\'t run', 'No run', 'Not running'], correctIndex: 1, explanation: 'Mệnh lệnh phủ định → Don\'t + V' },
        { sentence: '___ go to the cinema tonight.', options: ['Let', 'Let\'s', 'Lets', 'Let us to'], correctIndex: 1, explanation: '"Let\'s" = rủ ai cùng làm gì' },
        { sentence: '___ make noise. The baby is sleeping.', options: ['Don\'t', 'Not', 'No', 'Aren\'t'], correctIndex: 0, explanation: 'Mệnh lệnh phủ định → Don\'t make noise' },
        { sentence: '___ your hands before eating.', options: ['Wash', 'Washing', 'Washes', 'To wash'], correctIndex: 0, explanation: 'Mệnh lệnh dùng V nguyên mẫu → Wash' },
        { type: 'transformation', instruction: 'Viết câu mệnh lệnh từ gợi ý.', prompt: 'please / open / window', answer: 'Please open the window.', hint: 'Dùng V nguyên mẫu, thêm "please" để lịch sự' },
        { type: 'transformation', instruction: 'Viết câu mệnh lệnh phủ định.', prompt: 'not / be / late / for class', answer: 'Don\'t be late for class.', hint: 'Dùng "Don\'t" + V nguyên mẫu' },
        { type: 'error-correction', sentence: 'Opening the door, please.', error: '"Opening" là V-ing, mệnh lệnh phải dùng "Open"', correction: 'Open the door, please.', hint: 'Câu mệnh lệnh dùng V nguyên mẫu, không thêm -ing' },
        { type: 'error-correction', sentence: 'Not run in the hallway.', error: 'Phủ định của mệnh lệnh phải dùng "Don\'t"', correction: 'Don\'t run in the hallway.', hint: 'Dùng "Don\'t" + V cho mệnh lệnh phủ định' },
        { sentence: '___ (not/forget) your umbrella!', options: ['Not forget', 'Don\'t forget', 'No forget', 'Not forgetting'], correctIndex: 1, explanation: 'Mệnh lệnh phủ định → Don\'t forget' },
        { sentence: '___ me with this heavy bag.', options: ['Help', 'Helps', 'Helping', 'To help'], correctIndex: 0, explanation: 'Mệnh lệnh → Help me' },
        { sentence: 'Please ___ down and listen.', options: ['sit', 'sitting', 'sits', 'to sit'], correctIndex: 0, explanation: '"Please" + V nguyên mẫu → sit' },
      ],
    },
    {
      id: 110, title: 'This / That / These / Those', description: 'Đại từ chỉ định',
      explanation: 'Dùng để chỉ người/vật ở gần hoặc xa.\n\nThis (số ít, gần): cái này\nThat (số ít, xa): cái kia\nThese (số nhiều, gần): những cái này\nThose (số nhiều, xa): những cái kia\n\nCấu trúc câu hỏi: Is this/that...? / Are these/those...?\n→ Is this your book?\n→ Are those your friends?',
      examples: [
        { correct: 'This is my book.', incorrect: 'These is my book.' },
        { correct: 'That car over there is expensive.' },
        { correct: 'These apples are fresh.' },
        { correct: 'Those shoes are beautiful.' },
      ],
      exercises: [
        { sentence: '___ is my pen right here.', options: ['This', 'That', 'These', 'Those'], correctIndex: 0, explanation: '"right here" → gần → This' },
        { sentence: '___ birds over there are singing.', options: ['This', 'That', 'These', 'Those'], correctIndex: 3, explanation: '"over there" + số nhiều → Those' },
        { sentence: '___ are my keys on this table.', options: ['This', 'That', 'These', 'Those'], correctIndex: 2, explanation: '"on this table" + số nhiều → These' },
        { sentence: '___ is a beautiful sunset over there.', options: ['This', 'That', 'These', 'Those'], correctIndex: 1, explanation: '"over there" + số ít → That' },
        { sentence: 'Are ___ your friends standing next to you?', options: ['this', 'that', 'these', 'those'], correctIndex: 2, explanation: '"next to you" + số nhiều → these' },
        { type: 'transformation', instruction: 'Chuyển sang số nhiều.', prompt: 'This is a book.', answer: 'These are books.', hint: '"This" → "These", "is" → "are", thêm "s" vào danh từ' },
        { type: 'transformation', instruction: 'Chuyển sang số ít.', prompt: 'Those are chairs.', answer: 'That is a chair.', hint: '"Those" → "That", "are" → "is", "chairs" → "a chair"' },
        { type: 'error-correction', sentence: 'These book is interesting.', error: '"These" dùng với danh từ số nhiều, phải là "These books" hoặc "This book"', correction: 'This book is interesting.', hint: 'This + danh từ số ít, These + danh từ số nhiều' },
        { type: 'error-correction', sentence: 'That are my shoes.', error: '"That" (số ít) không đi với "are" (số nhiều)', correction: 'Those are my shoes.', hint: 'Số nhiều dùng "Those" + "are"' },
        { sentence: '___ flowers here smell nice.', options: ['This', 'That', 'These', 'Those'], correctIndex: 2, explanation: '"here" + số nhiều → These' },
        { sentence: 'Is ___ your bag on the floor over there?', options: ['this', 'that', 'these', 'those'], correctIndex: 1, explanation: '"over there" + số ít → that' },
        { sentence: '___ students sitting near me are very friendly.', options: ['This', 'That', 'These', 'Those'], correctIndex: 2, explanation: '"near me" + số nhiều → These' },
      ],
    },
    {
      id: 111, title: 'Wh-Questions', description: 'Câu hỏi với từ để hỏi',
      explanation: 'Dùng để hỏi thông tin.\n\nWhat: cái gì (hỏi vật, hành động)\nWhere: ở đâu (hỏi nơi chốn)\nWhen: khi nào (hỏi thời gian)\nWho: ai (hỏi người)\nWhy: tại sao (hỏi lý do)\nHow: như thế nào (hỏi cách thức)\n\nCấu trúc: Wh-word + am/is/are + S?\nWh-word + do/does + S + V?\nWh-word + can + S + V?',
      examples: [
        { correct: 'What is your name?', incorrect: 'What your name is?' },
        { correct: 'Where do you live?' },
        { correct: 'Why are you late?', incorrect: 'Why you are late?' },
      ],
      exercises: [
        { sentence: '___ is your favorite color?', options: ['What', 'Where', 'When', 'Who'], correctIndex: 0, explanation: 'Hỏi về vật → What' },
        { sentence: '___ do you go to school? - By bus.', options: ['What', 'Where', 'How', 'Why'], correctIndex: 2, explanation: 'Hỏi về cách thức → How' },
        { sentence: '___ is your birthday? - In May.', options: ['What', 'Where', 'When', 'Who'], correctIndex: 2, explanation: 'Hỏi về thời gian → When' },
        { sentence: '___ is that man? - He is my teacher.', options: ['What', 'Where', 'When', 'Who'], correctIndex: 3, explanation: 'Hỏi về người → Who' },
        { sentence: '___ are you sad? - Because I lost my phone.', options: ['What', 'Where', 'When', 'Why'], correctIndex: 3, explanation: 'Hỏi về lý do → Why' },
        { type: 'transformation', instruction: 'Đặt câu hỏi với từ để hỏi.', prompt: 'she / live / where ?', answer: 'Where does she live?', hint: 'Dùng "Where" + "does" cho She + V nguyên mẫu' },
        { type: 'transformation', instruction: 'Đặt câu hỏi với từ để hỏi cho câu trả lời.', prompt: 'Answer: I am 12 years old. How...?', answer: 'How old are you?', hint: 'Hỏi về tuổi → How old + am/is/are' },
        { type: 'error-correction', sentence: 'What your name is?', error: 'Câu hỏi phải đảo trợ động từ lên trước chủ ngữ', correction: 'What is your name?', hint: 'Wh-word + is/are + S?' },
        { type: 'error-correction', sentence: 'Where you live?', error: 'Thiếu trợ động từ "do"', correction: 'Where do you live?', hint: 'Với động từ thường, dùng Wh-word + do/does + S + V?' },
        { sentence: '___ does the movie start? - At 7pm.', options: ['What', 'Where', 'When', 'Who'], correctIndex: 2, explanation: 'Hỏi về giờ → When' },
        { sentence: '___ many books do you have?', options: ['What', 'How', 'When', 'Where'], correctIndex: 1, explanation: '"How many" hỏi về số lượng' },
      ],
    },
    {
      id: 112, title: 'Adjectives: Order & Position', description: 'Vị trí và thứ tự tính từ',
      explanation: 'Vị trí: Tính từ đứng trước danh từ hoặc sau động từ "to be".\n- A big house (trước danh từ)\n- The house is big (sau to be)\n\nThứ tự tính từ (khi có nhiều tính từ):\n1. Opinion (quan điểm): beautiful, nice, ugly\n2. Size (kích cỡ): big, small, tall\n3. Age (tuổi): old, young, new\n4. Shape (hình dạng): round, square\n5. Color (màu sắc): red, blue, green\n6. Origin (nguồn gốc): Vietnamese, Japanese\n7. Material (chất liệu): wooden, plastic, silk\n8. Purpose (mục đích): sleeping (bag), running (shoes)\n\nThường chỉ dùng 2-3 tính từ trước danh từ.',
      examples: [
        { correct: 'She has a beautiful big house.', incorrect: 'She has a big beautiful house.' },
        { correct: 'The car is red.' },
        { correct: 'He wears a nice new blue shirt.' },
      ],
      exercises: [
        { sentence: 'She has a ___ (beautiful / small) garden.', options: ['small beautiful', 'beautiful small', 'beautifully small', 'beauty small'], correctIndex: 1, explanation: 'Opinion (beautiful) trước Size (small)' },
        { sentence: 'He bought a ___ (new / red) car.', options: ['red new', 'new red', 'newly red', 'new and red'], correctIndex: 1, explanation: 'Age (new) trước Color (red)' },
        { sentence: 'They live in a ___ (big / old) house.', options: ['old big', 'big old', 'bigly old', 'big and old'], correctIndex: 1, explanation: 'Size (big) trước Age (old)' },
        { sentence: 'The sky is ___.', options: ['blue', 'blueness', 'bluing', 'bluely'], correctIndex: 0, explanation: 'Sau "is" dùng tính từ → blue' },
        { sentence: 'She wears a ___ (nice / green / long) dress.', options: ['green nice long', 'long nice green', 'nice long green', 'nice green long'], correctIndex: 2, explanation: 'Opinion → Size → Color' },
        { type: 'transformation', instruction: 'Sắp xếp các tính từ đúng thứ tự.', prompt: 'a / wooden / big / table', answer: 'a big wooden table', hint: 'Size (big) trước Material (wooden)' },
        { type: 'transformation', instruction: 'Viết lại câu với tính từ.', prompt: 'She / have / a / dress / (beautiful / red)', answer: 'She has a beautiful red dress.', hint: 'Opinion (beautiful) trước Color (red)' },
        { type: 'error-correction', sentence: 'She is a student intelligent.', error: 'Tính từ phải đứng trước danh từ, không phải sau', correction: 'She is an intelligent student.', hint: 'Tính từ + danh từ (adjective + noun)' },
        { type: 'error-correction', sentence: 'He has a red big car.', error: 'Size (big) phải đứng trước Color (red)', correction: 'He has a big red car.', hint: 'Size + Color + Noun' },
        { sentence: 'It was a ___ (hot / sunny) day.', options: ['sunny hot', 'hot sunny', 'hotly sunny', 'hot and sunny'], correctIndex: 1, explanation: 'Cả hai đều là tính từ miêu tả, thường Opinion trước' },
        { sentence: 'I have a ___ (small / round) table.', options: ['round small', 'small round', 'smallly round', 'small and round'], correctIndex: 1, explanation: 'Size (small) trước Shape (round)' },
      ],
    },
  ],

  'B1': [
    {
      id: 1, title: 'Present Simple', description: 'Thì hiện tại đơn',
      explanation: 'Dùng để diễn tả thói quen, sự thật hiển nhiên, lịch trình.\n\nCấu trúc:\n- I/You/We/They + V (nguyên mẫu)\n- He/She/It + V(s/es)\n\nDấu hiệu: always, usually, often, sometimes, never, every day/week/month',
      examples: [
        { correct: 'I usually wake up at 6am.', incorrect: 'I usually waking up at 6am.' },
        { correct: 'She goes to school by bus.', incorrect: 'She go to school by bus.' },
        { correct: 'The sun rises in the east.' },
      ],
      exercises: [
        { sentence: 'She ___ (drink) coffee every morning.', options: ['drink', 'drinks', 'drinking', 'drank'], correctIndex: 1, explanation: 'Chủ ngữ "She" (ngôi thứ 3 số ít) → động từ thêm "s" → drinks' },
        { sentence: 'They ___ (not/like) spicy food.', options: ["don't like", "doesn't like", "not like", "aren't like"], correctIndex: 0, explanation: 'Chủ ngữ "They" (số nhiều) → trợ động từ "do" + not' },
        { sentence: '___ he speak French?', options: ['Do', 'Does', 'Is', 'Has'], correctIndex: 1, explanation: 'Chủ ngữ "he" (ngôi thứ 3 số ít) → trợ động từ "Does"' },
        { sentence: 'My parents ___ (live) in Hanoi.', options: ['live', 'lives', 'living', 'lived'], correctIndex: 0, explanation: 'Chủ ngữ "My parents" (số nhiều) → động từ nguyên mẫu "live"' },
        { sentence: 'The train ___ (arrive) at 7pm every day.', options: ['arrive', 'arrives', 'arriving', 'arrived'], correctIndex: 1, explanation: 'Chủ ngữ "The train" (số ít) → thêm "s" → arrives' },
        { type: 'transformation', instruction: 'Viết lại câu dùng thì hiện tại đơn với chủ ngữ mới.', prompt: 'He / go / school / every day.', answer: 'He goes to school every day.', hint: 'Nhớ thêm "es" vào động từ khi chủ ngữ là He/She/It' },
        { type: 'transformation', instruction: 'Viết lại câu dùng thì hiện tại đơn (phủ định).', prompt: 'They / not / like / coffee.', answer: 'They don\'t like coffee.', hint: 'Dùng "don\'t" cho They/You/We/I' },
        { type: 'error-correction', sentence: 'She go to school by bus.', error: 'Sai chia động từ: "go" với "She" phải là "goes"', correction: 'She goes to school by bus.', hint: '"She" là ngôi thứ 3 số ít' },
        { type: 'error-correction', sentence: 'He don\'t like spicy food.', error: 'Sai trợ động từ: "He" phải dùng "doesn\'t"', correction: 'He doesn\'t like spicy food.', hint: 'Với He/She/It, dùng "doesn\'t" thay vì "don\'t"' },
      ],
    },
    {
      id: 2, title: 'Present Continuous', description: 'Thì hiện tại tiếp diễn',
      explanation: 'Dùng để diễn tả hành động đang xảy ra ngay lúc nói, hoặc kế hoạch trong tương lai gần.\n\nCấu trúc:\n- S + am/is/are + V-ing\n- S + am/is/are + not + V-ing\n- Am/Is/Are + S + V-ing?\n\nDấu hiệu: now, right now, at the moment, today, this week',
      examples: [
        { correct: 'I am studying English right now.', incorrect: 'I studying English right now.' },
        { correct: 'She is reading a book at the moment.' },
        { correct: 'They are not playing football now.', incorrect: 'They not playing football now.' },
      ],
      exercises: [
        { sentence: 'Listen! Someone ___ (sing) outside.', options: ['sings', 'is singing', 'sing', 'are singing'], correctIndex: 1, explanation: '"Listen!" → hành động đang xảy ra → is singing (Someone số ít)' },
        { sentence: 'We ___ (have) dinner at a restaurant tonight.', options: ['have', 'are having', 'having', 'has'], correctIndex: 1, explanation: 'Kế hoạch tối nay → hiện tại tiếp diễn → are having' },
        { sentence: 'She ___ (not/work) right now.', options: ["isn't working", "doesn't work", "not working", "aren't working"], correctIndex: 0, explanation: '"right now" → đang xảy ra, chủ ngữ "She" → is not working' },
        { sentence: '___ they ___ (come) to the party?', options: ['Are / coming', 'Do / come', 'Is / coming', 'Have / come'], correctIndex: 0, explanation: 'Hỏi về kế hoạch → Are they coming?' },
        { sentence: 'Be quiet! The baby ___ (sleep).', options: ['sleeps', 'is sleeping', 'sleep', 'are sleeping'], correctIndex: 1, explanation: '"Be quiet!" → đang xảy ra, "The baby" số ít → is sleeping' },
      ],
    },
    {
      id: 3, title: 'Past Simple', description: 'Thì quá khứ đơn',
      explanation: 'Dùng để diễn tả hành động đã xảy ra và kết thúc trong quá khứ.\n\nCấu trúc:\n- S + V2/ed + ...\n- S + didn\'t + V (nguyên mẫu)\n- Did + S + V (nguyên mẫu)?\n\nDấu hiệu: yesterday, last week/month/year, ago, in 2020',
      examples: [
        { correct: 'I visited my grandma yesterday.', incorrect: 'I visit my grandma yesterday.' },
        { correct: 'She didn\'t go to school last Monday.', incorrect: 'She didn\'t went to school.' },
        { correct: 'Did you watch the movie last night?', incorrect: 'Did you watched the movie?' },
      ],
      exercises: [
        { sentence: 'I ___ (go) to the beach last weekend.', options: ['go', 'went', 'gone', 'going'], correctIndex: 1, explanation: '"last weekend" → quá khứ, "go" là bất quy tắc → went' },
        { sentence: 'She ___ (not/see) the accident.', options: ["didn't saw", "didn't see", "not saw", "doesn't see"], correctIndex: 1, explanation: '"didn\'t" + V nguyên mẫu → didn\'t see' },
        { sentence: '___ you ___ (call) her yesterday?', options: ['Did / call', 'Did / called', 'Do / call', 'Does / call'], correctIndex: 0, explanation: 'Câu hỏi quá khứ → Did + S + V nguyên mẫu' },
        { sentence: 'They ___ (be) very happy at the party.', options: ['was', 'were', 'are', 'be'], correctIndex: 1, explanation: '"They" (số nhiều) ở quá khứ → were' },
        { sentence: 'He ___ (buy) a new car last month.', options: ['buy', 'buys', 'bought', 'buying'], correctIndex: 2, explanation: '"last month" → quá khứ, "buy" bất quy tắc → bought' },
        { type: 'transformation', instruction: 'Đặt câu ở thì quá khứ đơn.', prompt: 'She / visit / her grandma / yesterday.', answer: 'She visited her grandma yesterday.', hint: 'Thêm "ed" cho động từ có quy tắc' },
        { type: 'transformation', instruction: 'Chuyển sang câu phủ định quá khứ.', prompt: 'I / not / go / to the party / last night.', answer: 'I didn\'t go to the party last night.', hint: '"didn\'t" + V nguyên mẫu' },
        { type: 'error-correction', sentence: 'She didn\'t went to school yesterday.', error: 'Sau "didn\'t" phải dùng động từ nguyên mẫu "go", không phải quá khứ "went"', correction: 'She didn\'t go to school yesterday.', hint: 'Nhớ: didn\'t + V (nguyên mẫu)' },
      ],
    },
    { id: 4, title: 'Future Simple', description: 'Thì tương lai đơn', explanation: 'Dùng để diễn tả quyết định tại thời điểm nói, lời hứa, dự đoán không có căn cứ.\n\nCấu trúc:\n- S + will + V (nguyên mẫu)\n- S + won\'t + V (nguyên mẫu)\n- Will + S + V (nguyên mẫu)?\n\nDấu hiệu: tomorrow, next week/month/year, soon, later', examples: [{ correct: 'I will help you with your homework.', incorrect: 'I will helping you.' }, { correct: 'She won\'t come to the meeting.' }, { correct: 'Will you open the window, please?' }], exercises: [{ sentence: 'I promise I ___ (call) you later.', options: ['call', 'will call', 'am calling', 'called'], correctIndex: 1, explanation: 'Lời hứa → will + V nguyên mẫu → will call' }, { sentence: 'It\'s raining. I ___ (take) an umbrella.', options: ['take', 'will take', 'am taking', 'took'], correctIndex: 1, explanation: 'Quyết định tại thời điểm nói → will take' }, { sentence: 'She ___ (not/come) to the party tomorrow.', options: ["won't come", "doesn't come", "isn't coming", "didn't come"], correctIndex: 0, explanation: '"tomorrow" + phủ định tương lai → won\'t come' }, { sentence: '___ you ___ (help) me with this?', options: ['Will / help', 'Do / help', 'Are / help', 'Did / help'], correctIndex: 0, explanation: 'Lời đề nghị → Will you help?' }, { sentence: 'I think it ___ (rain) later.', options: ['rains', 'will rain', 'is raining', 'rained'], correctIndex: 1, explanation: 'Dự đoán → will rain' }] },
    { id: 5, title: 'Present Perfect', description: 'Thì hiện tại hoàn thành', explanation: 'Dùng để diễn tả hành động đã xảy ra nhưng không rõ thời gian, hoặc kéo dài từ quá khứ đến hiện tại.\n\nCấu trúc:\n- S + have/has + V3/ed\n- S + haven\'t/hasn\'t + V3/ed\n- Have/Has + S + V3/ed?\n\nDấu hiệu: ever, never, just, already, yet, since, for, recently', examples: [{ correct: 'I have visited London twice.', incorrect: 'I have visit London twice.' }, { correct: 'She has already finished her homework.' }, { correct: 'Have you ever tried sushi?', incorrect: 'Did you ever try sushi?' }], exercises: [{ sentence: 'I ___ (see) that movie already.', options: ['saw', 'have seen', 'see', 'am seeing'], correctIndex: 1, explanation: '"already" → hiện tại hoàn thành → have seen' }, { sentence: 'She ___ (live) here since 2019.', options: ['lives', 'lived', 'has lived', 'is living'], correctIndex: 2, explanation: '"since 2019" → từ quá khứ đến nay → has lived' }, { sentence: 'We ___ (not/finish) the project yet.', options: ["didn't finish", "haven't finished", "don't finish", "aren't finishing"], correctIndex: 1, explanation: '"yet" → hiện tại hoàn thành, phủ định → haven\'t finished' }, { sentence: '___ you ever ___ (be) to Japan?', options: ['Have / been', 'Did / go', 'Are / been', 'Will / be'], correctIndex: 0, explanation: '"ever" → hiện tại hoàn thành → Have you ever been' },         { sentence: 'He ___ (just / arrive).', options: ['just arrived', 'has just arrived', 'just arrives', 'is just arriving'], correctIndex: 1, explanation: '"just" → hiện tại hoàn thành → has just arrived' },
        { type: 'transformation', instruction: 'Viết câu dùng thì hiện tại hoàn thành.', prompt: 'I / see / that movie / already.', answer: 'I have already seen that movie.', hint: 'Dùng "have" + V3/ed, "already" đứng giữa have và V3' },
        { type: 'error-correction', sentence: 'I have saw that movie already.', error: '"saw" là quá khứ đơn, hiện tại hoàn thành phải dùng "seen"', correction: 'I have seen that movie already.', hint: 'Hiện tại hoàn thành: have/has + V3/ed (seen, not saw)' },
        { type: 'transformation', instruction: 'Viết câu hỏi hiện tại hoàn thành.', prompt: 'she / ever / be / to Japan ?', answer: 'Has she ever been to Japan?', hint: '"Has" cho She, "ever" đứng sau chủ ngữ' }] },
    { id: 6, title: 'Comparatives & Superlatives', description: 'So sánh hơn và so sánh nhất', explanation: 'So sánh hơn:\n- Tính từ ngắn: adj + er + than\n- Tính từ dài: more + adj + than\n\nSo sánh nhất:\n- Tính từ ngắn: the + adj + est\n- Tính từ dài: the most + adj\n\nBất quy tắc: good → better → the best; bad → worse → the worst', examples: [{ correct: 'She is taller than her sister.', incorrect: 'She is more tall than her sister.' }, { correct: 'This book is more interesting than that one.' }, { correct: 'He is the best student in the class.' }], exercises: [{ sentence: 'My house is ___ (big) than yours.', options: ['bigger', 'more big', 'biggest', 'biger'], correctIndex: 0, explanation: 'Tính từ ngắn "big" → gấp đôi phụ âm + er → bigger' }, { sentence: 'This is ___ (good) restaurant in town.', options: ['better', 'the best', 'best', 'more good'], correctIndex: 1, explanation: '"good" bất quy tắc, so sánh nhất → the best' }, { sentence: 'She speaks English ___ (fluently) than me.', options: ['fluentlyer', 'more fluently', 'most fluently', 'fluentlier'], correctIndex: 1, explanation: 'Trạng từ dài "fluently" → more fluently' }, { sentence: 'It\'s ___ (cold) day of the year.', options: ['colder', 'the coldest', 'more cold', 'coldest'], correctIndex: 1, explanation: '"of the year" → so sánh nhất, "cold" ngắn → the coldest' }, { sentence: 'Math is ___ (difficult) than English.', options: ['difficulter', 'more difficult', 'most difficult', 'difficultest'], correctIndex: 1, explanation: 'Tính từ dài "difficult" → more difficult' }] },
    { id: 7, title: 'Conditional Sentences Type 1', description: 'Câu điều kiện loại 1', explanation: 'Dùng để diễn tả điều kiện có thể xảy ra ở hiện tại hoặc tương lai.\n\nCấu trúc:\nIf + S + V (hiện tại), S + will + V (nguyên mẫu)\n\nVí dụ: If it rains, I will stay home.\n\n→ Mệnh đề "If" dùng thì hiện tại đơn, mệnh đề chính dùng will + V', examples: [{ correct: 'If you study hard, you will pass the exam.', incorrect: 'If you will study hard, you will pass.' }, { correct: 'I will call you if I need help.' }, { correct: 'If she doesn\'t hurry, she will miss the bus.' }], exercises: [{ sentence: 'If it ___ (rain), we will stay home.', options: ['will rain', 'rains', 'rained', 'is raining'], correctIndex: 1, explanation: 'Mệnh đề If dùng hiện tại đơn → rains' }, { sentence: 'She ___ (pass) the exam if she studies hard.', options: ['passes', 'will pass', 'passed', 'would pass'], correctIndex: 1, explanation: 'Mệnh đề chính dùng will + V → will pass' }, { sentence: 'If you ___ (not/hurry), you will miss the bus.', options: ["won't hurry", "don't hurry", "didn't hurry", "aren't hurrying"], correctIndex: 1, explanation: 'Mệnh đề If hiện tại đơn, phủ định → don\'t hurry' }, { sentence: 'What ___ you ___ if you lose your job?', options: ['will / do', 'do / do', 'would / do', 'are / doing'], correctIndex: 0, explanation: 'Mệnh đề chính → will + V → will you do' }, { sentence: 'If we ___ (leave) now, we will catch the train.', options: ['will leave', 'leave', 'left', 'are leaving'], correctIndex: 1, explanation: 'Mệnh đề If dùng hiện tại đơn → leave' }] },
    { id: 8, title: 'Passive Voice (Present)', description: 'Câu bị động (hiện tại)', explanation: 'Dùng khi muốn nhấn mạnh hành động hoặc đối tượng chịu tác động.\n\nCấu trúc hiện tại:\n- S + am/is/are + V3/ed + (by O)\n\nChủ động: The cat eats the fish.\nBị động: The fish is eaten by the cat.', examples: [{ correct: 'English is spoken all over the world.', incorrect: 'English is speak all over the world.' }, { correct: 'These cookies are made by my grandmother.' }, { correct: 'The room is cleaned every day.' }], exercises: [{ sentence: 'Rice ___ (grow) in Vietnam.', options: ['is grown', 'grows', 'is growing', 'grew'], correctIndex: 0, explanation: 'Bị động hiện tại, "Rice" số ít → is grown' }, { sentence: 'These songs ___ (sing) by many artists.', options: ['are sung', 'sing', 'are singing', 'sang'], correctIndex: 0, explanation: '"These songs" số nhiều → are sung' }, { sentence: 'Coffee ___ (not/produce) in cold countries.', options: ["doesn't produce", "isn't produced", "aren't produce", "isn't produce"], correctIndex: 1, explanation: '"Coffee" số ít, bị động phủ định → isn\'t produced' }, { sentence: '___ the letters ___ (deliver) every morning?', options: ['Are / delivered', 'Do / deliver', 'Is / delivered', 'Are / delivering'], correctIndex: 0, explanation: '"The letters" số nhiều + câu hỏi bị động → Are...delivered?' }, { sentence: 'The homework ___ (must / do) carefully.', options: ['must be done', 'must do', 'must done', 'must be do'], correctIndex: 0, explanation: 'Động từ khuyết thiếu + be + V3 → must be done' }] },
    { id: 9, title: 'Modal Verbs: Can, Should, Must', description: 'Động từ khuyết thiếu', explanation: 'Can: có thể (khả năng, xin phép)\nShould: nên (lời khuyên)\nMust: phải (bắt buộc)\n\nCấu trúc: S + modal + V (nguyên mẫu)\nKhông thêm "s" ở ngôi thứ 3.\nPhủ định: can\'t, shouldn\'t, mustn\'t', examples: [{ correct: 'You should drink more water.', incorrect: 'You should to drink more water.' }, { correct: 'She can speak three languages.' }, { correct: 'Students must wear uniforms.' }], exercises: [{ sentence: 'You ___ (should) smoke. It\'s bad for health.', options: ['should', 'shouldn\'t', 'must', 'can'], correctIndex: 1, explanation: 'Khuyên không nên hút thuốc → shouldn\'t' }, { sentence: 'I ___ (can) swim when I was five.', options: ['can', 'could', 'can\'t', 'couldn\'t'], correctIndex: 1, explanation: '"when I was five" → quá khứ của "can" → could' }, { sentence: 'You ___ (must) be late for the exam.', options: ['must', 'mustn\'t', 'can', 'should'], correctIndex: 1, explanation: 'Bắt buộc không được trễ → mustn\'t' }, { sentence: '___ I borrow your pen?', options: ['Should', 'Must', 'Can', 'Need'], correctIndex: 2, explanation: 'Xin phép → Can I borrow?' }, { sentence: 'You look tired. You ___ (should) rest.', options: ['should', 'shouldn\'t', 'mustn\'t', 'can'], correctIndex: 0, explanation: 'Lời khuyên → You should rest.' }] },
    { id: 10, title: 'Prepositions of Time & Place', description: 'Giới từ chỉ thời gian và nơi chốn', explanation: 'IN: tháng, năm, mùa, buổi (in May, in 2024, in summer, in the morning)\nON: ngày, thứ (on Monday, on May 5th)\nAT: giờ, địa điểm cụ thể (at 5pm, at the airport, at home)\n\nNơi chốn:\nIN: bên trong, thành phố/quốc gia (in the room, in Hanoi)\nON: trên bề mặt, đường phố (on the table, on Main Street)\nAT: địa điểm cụ thể (at school, at work)', examples: [{ correct: 'I wake up at 7 o\'clock.', incorrect: 'I wake up in 7 o\'clock.' }, { correct: 'She was born in January.' }, { correct: 'The book is on the desk.' }], exercises: [{ sentence: 'I will meet you ___ Monday.', options: ['in', 'on', 'at', 'by'], correctIndex: 1, explanation: 'Trước thứ → dùng "on"' }, { sentence: 'She usually goes to bed ___ night.', options: ['in', 'on', 'at', 'by'], correctIndex: 2, explanation: '"at night" là cụm cố định' }, { sentence: 'My birthday is ___ May 15th.', options: ['in', 'on', 'at', 'since'], correctIndex: 1, explanation: 'Trước ngày cụ thể → dùng "on"' }, { sentence: 'He lives ___ Ho Chi Minh City.', options: ['in', 'on', 'at', 'to'], correctIndex: 0, explanation: 'Trước thành phố → dùng "in"' }, { sentence: 'The keys are ___ the table.', options: ['in', 'on', 'at', 'under'], correctIndex: 1, explanation: 'Trên mặt bàn → dùng "on"' }] },
    { id: 11, title: 'Countable & Uncountable Nouns', description: 'Danh từ đếm được và không đếm được', explanation: 'Countable (đếm được): book → books, apple → apples. Dùng "a/an", "many", "few".\n\nUncountable (không đếm được): water, rice, information, advice. Không có "s", dùng "much", "little", "some".\n\nLưu ý: money, news, furniture là không đếm được.', examples: [{ correct: 'I need some information.', incorrect: 'I need an information.' }, { correct: 'There are many books on the shelf.' }, { correct: 'How much water do you drink?', incorrect: 'How many waters do you drink?' }], exercises: [{ sentence: 'Can I have ___ milk in my coffee?', options: ['a', 'some', 'many', 'a few'], correctIndex: 1, explanation: '"Milk" không đếm được → dùng "some"' }, { sentence: 'She bought ___ apples at the market.', options: ['a', 'much', 'a few', 'a little'], correctIndex: 2, explanation: '"Apples" đếm được số nhiều → "a few"' }, { sentence: 'There isn\'t ___ furniture in the room.', options: ['many', 'much', 'a few', 'several'], correctIndex: 1, explanation: '"Furniture" không đếm được → "much"' }, { sentence: 'How ___ books do you have?', options: ['much', 'many', 'some', 'little'], correctIndex: 1, explanation: '"Books" đếm được → "how many"' }, { sentence: 'I have ___ important news to tell you.', options: ['a', 'some', 'many', 'a few'], correctIndex: 1, explanation: '"News" không đếm được → "some"' }] },
    { id: 12, title: 'Relative Clauses', description: 'Mệnh đề quan hệ', explanation: 'Dùng để bổ nghĩa cho danh từ đứng trước.\n\nWho: chỉ người (chủ ngữ)\nWhom: chỉ người (tân ngữ) - thường bỏ trong văn nói\nWhich: chỉ vật\nThat: chỉ cả người và vật (không dùng trong mệnh đề không xác định)\nWhere: chỉ nơi chốn\nWhen: chỉ thời gian', examples: [{ correct: 'The girl who is standing there is my sister.', incorrect: 'The girl which is standing there is my sister.' }, { correct: 'This is the book that I bought yesterday.' }, { correct: 'The restaurant where we ate was amazing.' }], exercises: [{ sentence: 'The man ___ lives next door is a doctor.', options: ['which', 'who', 'whom', 'where'], correctIndex: 1, explanation: 'Chỉ người, làm chủ ngữ → "who"' }, { sentence: 'This is the house ___ I was born.', options: ['which', 'that', 'where', 'when'], correctIndex: 2, explanation: 'Chỉ nơi chốn → "where"' }, { sentence: 'The film ___ we watched was boring.', options: ['who', 'where', 'which', 'when'], correctIndex: 2, explanation: 'Chỉ vật → "which"' }, { sentence: 'Do you remember the day ___ we first met?', options: ['where', 'which', 'that', 'when'], correctIndex: 3, explanation: 'Chỉ thời gian → "when"' }, { sentence: 'The woman ___ you met is my teacher.', options: ['who', 'whom', 'which', 'whose'], correctIndex: 1, explanation: 'Làm tân ngữ, chỉ người → "whom" (hoặc bỏ)' }] },
    { id: 13, title: 'Reported Speech', description: 'Câu tường thuật', explanation: 'Dùng để thuật lại lời nói của người khác.\n\nLùi thì: \n- Hiện tại đơn → Quá khứ đơn\n- Hiện tại tiếp diễn → Quá khứ tiếp diễn\n- Will → Would\n- Can → Could\n- Must → Had to\n\nThay đổi từ: now → then, today → that day, here → there, this → that', examples: [{ correct: 'She said (that) she was tired.', incorrect: 'She said she is tired.' }, { correct: 'He told me (that) he would come.' }, { correct: 'They said (that) they had finished.' }], exercises: [{ sentence: 'She said, "I am happy." → She said that she ___ happy.', options: ['is', 'was', 'will be', 'has been'], correctIndex: 1, explanation: 'Lùi thì: is → was' }, { sentence: 'He said, "I will call you." → He said that he ___ call me.', options: ['will', 'would', 'can', 'must'], correctIndex: 1, explanation: 'Lùi thì: will → would' }, { sentence: 'They said, "We live here." → They said that they lived ___.', options: ['here', 'there', 'where', 'that'], correctIndex: 1, explanation: 'here → there' }, { sentence: 'She asked, "Do you like coffee?" → She asked if I ___ coffee.', options: ['like', 'liked', 'will like', 'would like'], correctIndex: 1, explanation: 'Câu hỏi Yes/No → dùng "if", lùi thì: like → liked' }, { sentence: 'He said, "I can swim." → He said that he ___ swim.', options: ['can', 'could', 'will', 'would'], correctIndex: 1, explanation: 'Lùi thì: can → could' }] },
    { id: 14, title: 'Connectors: And, But, Or, So, Because', description: 'Liên từ kết nối', explanation: 'And: và (thêm thông tin)\nBut: nhưng (đối lập)\nOr: hoặc (lựa chọn)\nSo: vì vậy (kết quả)\nBecause: bởi vì (nguyên nhân)\n\nNgoài ra: although (mặc dù), however (tuy nhiên), therefore (do đó)', examples: [{ correct: 'I like tea and coffee.', incorrect: 'I like tea but coffee.' }, { correct: 'She was tired, so she went to bed early.' }, { correct: 'He stayed home because it was raining.', incorrect: 'Because it was raining so he stayed home.' }], exercises: [{ sentence: 'I wanted to go out, ___ it started raining.', options: ['and', 'but', 'so', 'or'], correctIndex: 1, explanation: 'Đối lập: muốn đi nhưng trời mưa → "but"' }, { sentence: 'She studied hard ___ she passed the exam.', options: ['but', 'or', 'because', 'so'], correctIndex: 3, explanation: 'Kết quả: học chăm nên đỗ → "so"' }, { sentence: 'He was late ___ he missed the bus.', options: ['so', 'but', 'because', 'or'], correctIndex: 2, explanation: 'Nguyên nhân: trễ vì lỡ xe → "because"' }, { sentence: 'Do you want tea ___ coffee?', options: ['and', 'but', 'or', 'so'], correctIndex: 2, explanation: 'Lựa chọn → "or"' }, { sentence: '___ it rained a lot, they enjoyed the trip.', options: ['Because', 'Although', 'So', 'And'], correctIndex: 1, explanation: 'Tương phản: mặc dù mưa nhưng vui → "Although"' }] },
    { id: 15, title: 'Quantifiers: Some, Any, No, Every', description: 'Lượng từ', explanation: 'Some: một vài (câu khẳng định, lời mời/yêu cầu)\nAny: bất kỳ (câu phủ định, câu hỏi)\nNo: không có (mang nghĩa phủ định)\nEvery: mọi (số ít)\n\nSomeone/somebody: ai đó\nAnything: bất cứ gì\nNothing: không gì\nEverything: mọi thứ', examples: [{ correct: 'There are some apples in the fridge.', incorrect: 'There are any apples in the fridge.' }, { correct: 'I don\'t have any money.', incorrect: 'I don\'t have some money.' }, { correct: 'Everyone needs friends.' }], exercises: [{ sentence: 'Would you like ___ tea?', options: ['some', 'any', 'no', 'every'], correctIndex: 0, explanation: 'Lời mời → dùng "some"' }, { sentence: 'There aren\'t ___ students in the classroom.', options: ['some', 'any', 'no', 'every'], correctIndex: 1, explanation: 'Câu phủ định → "any"' }, { sentence: '___ knows the answer. It\'s very easy.', options: ['Someone', 'Anyone', 'Everyone', 'No one'], correctIndex: 2, explanation: '"It\'s very easy" → mọi người đều biết → "Everyone"' }, { sentence: 'I have ___ idea. Let\'s go to the beach!', options: ['some', 'any', 'no', 'every'], correctIndex: 0, explanation: 'Câu khẳng định → "some"' }, { sentence: 'She looked ___ but didn\'t find her keys.', options: ['somewhere', 'anywhere', 'everywhere', 'nowhere'], correctIndex: 2, explanation: 'Tìm khắp nơi → "everywhere"' }] },

    {
      id: 16, title: 'Present Perfect vs Past Simple', description: 'Phân biệt hiện tại hoàn thành và quá khứ đơn',
      explanation: 'Past Simple: hành động đã xong, rõ thời gian.\n→ I visited London last year.\n\nPresent Perfect: hành động có liên quan đến hiện tại, không rõ thời gian.\n→ I have visited London twice.\n\nDấu hiệu Past Simple: yesterday, last week, ago, in 2020\nDấu hiệu Present Perfect: ever, never, just, already, yet, since, for, recently\n\nCùng một câu gốc nhưng khác ý nghĩa:\n- I lost my keys (hôm qua, nhưng có thể đã tìm thấy)\n- I have lost my keys (bây giờ vẫn chưa tìm thấy)',
      examples: [
        { correct: 'I saw that movie yesterday (Past Simple - rõ thời gian).', incorrect: 'I have seen that movie yesterday.' },
        { correct: 'She has lived here since 2019 (Present Perfect - từ quá khứ đến nay).' },
        { correct: 'He has already finished his homework (Present Perfect - không rõ thời gian).' },
      ],
      exercises: [
        { sentence: 'I ___ (visit) my grandma last weekend.', options: ['have visited', 'visited', 'have visit', 'visiting'], correctIndex: 1, explanation: '"last weekend" → quá khứ đơn → visited' },
        { sentence: 'She ___ (already / finish) her homework.', options: ['already finished', 'has already finished', 'already finishes', 'already finishing'], correctIndex: 1, explanation: '"already" → hiện tại hoàn thành → has already finished' },
        { sentence: 'We ___ (not / see) that movie yet.', options: ["didn't see", "haven't seen", "don't see", "aren't seeing"], correctIndex: 1, explanation: '"yet" → hiện tại hoàn thành, phủ định → haven\'t seen' },
        { sentence: 'He ___ (buy) a new car last month.', options: ['has bought', 'bought', 'buys', 'is buying'], correctIndex: 1, explanation: '"last month" → quá khứ đơn → bought' },
        { sentence: '___ you ever ___ (be) to Japan?', options: ['Have / been', 'Did / go', 'Are / been', 'Will / be'], correctIndex: 0, explanation: '"ever" → hiện tại hoàn thành → Have you ever been?' },
        { type: 'transformation', instruction: 'Chọn thì đúng và viết câu.', prompt: 'I / (see) / that movie / yesterday.', answer: 'I saw that movie yesterday.', hint: '"yesterday" → dùng quá khứ đơn' },
        { type: 'transformation', instruction: 'Chọn thì đúng và viết câu.', prompt: 'She / (live) / here / since 2019.', answer: 'She has lived here since 2019.', hint: '"since 2019" → dùng hiện tại hoàn thành' },
        { type: 'error-correction', sentence: 'I have visited London last year.', error: '"last year" là thời gian xác định trong quá khứ, phải dùng quá khứ đơn', correction: 'I visited London last year.', hint: 'Thời gian xác định trong quá khứ → quá khứ đơn' },
        { type: 'error-correction', sentence: 'She didn\'t finish her homework yet.', error: '"yet" thường dùng với hiện tại hoàn thành, không phải quá khứ đơn', correction: 'She hasn\'t finished her homework yet.', hint: '"yet" → hiện tại hoàn thành' },
        { sentence: 'They ___ (already / leave) when we arrived.', options: ['already left', 'had already left', 'have already left', 'already leave'], correctIndex: 1, explanation: 'Xảy ra trước "arrived" → quá khứ hoàn thành' },
        { sentence: 'My grandmother ___ (die) ten years ago.', options: ['has died', 'died', 'dies', 'is dying'], correctIndex: 1, explanation: '"ten years ago" → quá khứ đơn → died' },
        { sentence: '___ you ___ (do) your homework yet?', options: ['Did / do', 'Have / done', 'Do / do', 'Are / doing'], correctIndex: 1, explanation: '"yet" → hiện tại hoàn thành → Have you done?' },
      ],
    },
    {
      id: 17, title: 'Used to / Would', description: 'Diễn tả thói quen trong quá khứ',
      explanation: 'Used to + V: đã từng (thói quen/trạng thái trong quá khứ, nay không còn).\n- I used to play football every day (but I don\'t now).\n- She used to be shy (but she isn\'t now).\n\nWould + V: đã từng (chỉ hành động lặp lại, không dùng cho trạng thái).\n- When I was young, I would visit my grandma every summer.\n\nPhủ định: didn\'t use to + V\nCâu hỏi: Did + S + use to + V?\n\nKhông dùng "used to" cho hành động chỉ xảy ra một lần.',
      examples: [
        { correct: 'I used to live in the countryside.', incorrect: 'I use to live in the countryside.' },
        { correct: 'When he was a child, he would spend hours reading.' },
        { correct: 'She didn\'t use to like coffee, but now she does.' },
      ],
      exercises: [
        { sentence: 'I ___ (used to / play) the piano, but I stopped.', options: ['used to play', 'used to playing', 'use to play', 'used play'], correctIndex: 0, explanation: '"Used to" + V nguyên mẫu → used to play' },
        { sentence: 'When I was young, we ___ (would / visit) our grandparents every Sunday.', options: ['would visiting', 'would visit', 'used to visiting', 'visit'], correctIndex: 1, explanation: '"Would" + V nguyên mẫu cho hành động lặp lại' },
        { sentence: 'He ___ (not / use to) like spicy food.', options: ["didn't use to", "didn't used to", "not use to", "used not to"], correctIndex: 0, explanation: 'Phủ định: didn\'t use to + V' },
        { sentence: '___ you ___ (use to) live in Hanoi?', options: ['Did / use to', 'Do / use to', 'Did / used to', 'Are / used to'], correctIndex: 0, explanation: 'Câu hỏi: Did + S + use to + V?' },
        { sentence: 'She ___ (used to / be) very shy when she was a child.', options: ['used to be', 'used to being', 'use to be', 'used be'], correctIndex: 0, explanation: '"Used to" + V → used to be (dùng cho trạng thái)' },
        { type: 'transformation', instruction: 'Viết câu với "used to" để diễn tả thói quen trong quá khứ.', prompt: 'I / live / in the countryside. (but now I live in the city)', answer: 'I used to live in the countryside.', hint: '"Used to" + V nguyên mẫu' },
        { type: 'transformation', instruction: 'Chuyển sang phủ định.', prompt: 'She used to eat meat. (now she is vegetarian)', answer: 'She didn\'t use to eat meat.', hint: 'Phủ định: didn\'t use to + V' },
        { type: 'error-correction', sentence: 'I use to play football every day.', error: 'Thói quen trong quá khứ phải dùng "used to", không phải "use to"', correction: 'I used to play football every day.', hint: '"Used to" là quá khứ, "use to" là sai' },
        { type: 'error-correction', sentence: 'She would be a teacher when she was young.', error: '"Would" không dùng cho trạng thái, chỉ dùng "used to"', correction: 'She used to be a teacher when she was young.', hint: 'Trạng thái → dùng "used to", không dùng "would"' },
        { sentence: 'We ___ (would / go) camping every summer when I was a kid.', options: ['would go', 'used to going', 'would going', 'use to go'], correctIndex: 0, explanation: 'Hành động lặp lại → would + V' },
        { sentence: 'My father ___ (used to / smoke), but he quit last year.', options: ['used to smoking', 'used to smoke', 'use to smoke', 'used smoke'], correctIndex: 1, explanation: '"Used to" + V → used to smoke' },
        { sentence: 'I ___ (would / stay) up late watching cartoons.', options: ['would stayed', 'would staying', 'would stay', 'used to staying'], correctIndex: 2, explanation: '"Would" + V nguyên mẫu → would stay' },
      ],
    },
    {
      id: 18, title: 'So / Neither / Nor', description: 'Câu trả lời ngắn: cũng vậy / cũng không',
      explanation: 'Dùng để đồng tình với ý kiến hoặc nói ai đó cũng vậy.\n\nĐồng tình KHẲNG ĐỊNH: So + aux + S\n- A: I like coffee. B: So do I. (Tôi cũng thích)\n\nĐồng tình PHỦ ĐỊNH: Neither / Nor + aux + S\n- A: I don\'t like tea. B: Neither do I. / Nor do I. (Tôi cũng không)\n\nAux (trợ động từ) phải giống với câu gốc:\n- I am tired. → So am I.\n- She can swim. → So can I.\n- They went home. → So did I.',
      examples: [
        { correct: 'A: I am hungry. B: So am I.', incorrect: 'A: I am hungry. B: So I am.' },
        { correct: 'A: I don\'t like spiders. B: Neither do I.', incorrect: 'A: I don\'t like spiders. B: So do I.' },
        { correct: 'A: She can speak French. B: So can her brother.' },
      ],
      exercises: [
        { sentence: 'A: I am tired. B: So ___ I.', options: ['am', 'do', 'can', 'is'], correctIndex: 0, explanation: '"I am" → trợ động từ "am" → So am I' },
        { sentence: 'A: I like pizza. B: So ___ I.', options: ['am', 'do', 'like', 'can'], correctIndex: 1, explanation: '"I like" → trợ động từ "do" → So do I' },
        { sentence: 'A: I can\'t swim. B: ___ can I.', options: ['So', 'Neither', 'Nor', 'Either'], correctIndex: 1, explanation: 'Phủ định → Neither + can + I' },
        { sentence: 'A: I have a car. B: So ___ I.', options: ['have', 'do', 'am', 'has'], correctIndex: 0, explanation: '"I have" → trợ động từ "have" → So have I' },
        { sentence: 'A: I don\'t like coffee. B: Neither ___ I.', options: ['am', 'do', 'don\'t', 'like'], correctIndex: 1, explanation: '"I don\'t" → trợ động từ "do" → Neither do I' },
        { type: 'transformation', instruction: 'Trả lời đồng tình với "So..."', prompt: 'A: I love chocolate. B: ... (also)', answer: 'So do I.', hint: 'Khẳng định → So + aux + I. "love" → trợ động từ "do"' },
        { type: 'transformation', instruction: 'Trả lời đồng tình phủ định với "Neither..."', prompt: 'A: I don\'t eat meat. B: ... (also not)', answer: 'Neither do I.', hint: 'Phủ định → Neither + aux + I' },
        { type: 'error-correction', sentence: 'A: I am a student. B: So do I.', error: '"I am" dùng trợ động từ "am", không phải "do"', correction: 'So am I.', hint: 'Trợ động từ phải giống với câu gốc (am → am)' },
        { type: 'error-correction', sentence: 'A: I don\'t smoke. B: So don\'t I.', error: 'Phủ định phải dùng "Neither" hoặc "Nor", không phải "So"', correction: 'Neither do I.', hint: 'Đồng tình phủ định → Neither/Nor + aux + S' },
        { sentence: 'A: I went to the party. B: So ___ I.', options: ['went', 'do', 'did', 'go'], correctIndex: 2, explanation: '"I went" → trợ động từ "did" → So did I' },
        { sentence: 'A: She has finished the report. B: So ___ I.', options: ['have', 'has', 'did', 'do'], correctIndex: 0, explanation: '"has finished" → trợ động từ "have" → So have I' },
      ],
    },
  ],

  'B2': [
    {
      id: 201, title: 'Past Perfect', description: 'Thì quá khứ hoàn thành',
      explanation: 'Dùng để diễn tả hành động xảy ra trước một hành động khác trong quá khứ.\n\nCấu trúc:\n- S + had + V3/ed\n- S + hadn\'t + V3/ed\n- Had + S + V3/ed?\n\nThường dùng với: when, after, before, already, by the time, never... before',
      examples: [{ correct: 'When I arrived, the train had already left.' }, { correct: 'She had finished her homework before dinner.' }, { correct: 'They had never been to London before.' }],
      exercises: [
        { sentence: 'When we got to the cinema, the movie ___ (start).', options: ['started', 'had started', 'has started', 'was starting'], correctIndex: 1, explanation: 'Hành động xảy ra trước "got" → had started' },
        { sentence: 'She ___ (not/eat) before she went out.', options: ["didn't eat", "hadn't eaten", "hasn't eaten", "wasn't eating"], correctIndex: 1, explanation: 'Xảy ra trước "went" → hadn\'t eaten' },
        { sentence: '___ you ___ (see) the film before?', options: ['Had / seen', 'Have / seen', 'Did / see', 'Were / seeing'], correctIndex: 0, explanation: 'Trong quá khứ, trước một thời điểm → Had you seen?' },
        { sentence: 'After he ___ (finish) work, he went home.', options: ['finished', 'had finished', 'has finished', 'was finishing'], correctIndex: 1, explanation: 'Hoàn thành trước khi về → had finished' },
        { sentence: 'By the time we arrived, they ___ (already/eat).', options: ['already ate', 'had already eaten', 'have already eaten', 'were already eating'], correctIndex: 1, explanation: '"By the time" + quá khứ → had already eaten' },
      ],
    },
    {
      id: 202, title: 'Future Continuous & Perfect', description: 'Tương lai tiếp diễn và hoàn thành',
      explanation: 'Future Continuous (sẽ đang):\nS + will be + V-ing\n→ Hành động sẽ đang xảy ra tại một thời điểm trong tương lai\n\nFuture Perfect (sẽ đã):\nS + will have + V3/ed\n→ Hành động sẽ hoàn thành trước một thời điểm trong tương lai',
      examples: [{ correct: 'This time next week, I will be lying on a beach.' }, { correct: 'By 2026, I will have finished university.' }],
      exercises: [
        { sentence: 'This time tomorrow, I ___ (fly) to Hanoi.', options: ['will fly', 'will be flying', 'will have flown', 'am flying'], correctIndex: 1, explanation: '"This time tomorrow" → will be flying' },
        { sentence: 'By the end of this month, we ___ (save) enough money.', options: ['will save', 'will be saving', 'will have saved', 'are saving'], correctIndex: 2, explanation: '"By the end of" + tương lai → will have saved' },
        { sentence: 'Don\'t call at 8pm; we ___ (have) dinner then.', options: ['will have', 'will be having', 'will have had', 'have'], correctIndex: 1, explanation: 'Tại thời điểm 8pm → will be having' },
        { sentence: '___ you ___ (finish) the report by Friday?', options: ['Will / finish', 'Will / be finishing', 'Will / have finished', 'Are / finishing'], correctIndex: 2, explanation: '"By Friday" (hạn chót) → Will you have finished' },
        { sentence: 'In 2030, I ___ (work) here for ten years.', options: ['will work', 'will be working', 'will have worked', 'am working'], correctIndex: 2, explanation: '"For ten years" → tính đến 2030 → will have worked' },
      ],
    },
    {
      id: 203, title: 'Conditionals Type 2 & 3', description: 'Câu điều kiện loại 2 và 3',
      explanation: 'Type 2 (không có thật ở hiện tại):\nIf + S + V2/ed, S + would + V\n\nType 3 (không có thật ở quá khứ):\nIf + S + had + V3/ed, S + would have V3/ed',
      examples: [{ correct: 'If I had more time, I would travel more.' }, { correct: 'If she had studied harder, she would have passed the exam.' }],
      exercises: [
        { sentence: 'If I ___ (be) you, I would accept the offer.', options: ['am', 'was', 'were', 'be'], correctIndex: 2, explanation: 'Type 2: "If I were you" là cấu trúc cố định' },
        { sentence: 'If it ___ (not/rain) yesterday, we would have gone out.', options: ["didn't rain", "hadn't rained", "wouldn't rain", "wasn't raining"], correctIndex: 1, explanation: 'Type 3: If + had + V3 → hadn\'t rained' },
        { sentence: 'I ___ (help) you if I could, but I\'m busy.', options: ['help', 'would help', 'would have helped', 'will help'], correctIndex: 1, explanation: 'Type 2: would + V nguyên mẫu → would help' },
        { sentence: 'If they had left earlier, they ___ (not/miss) the flight.', options: ["wouldn't miss", "wouldn't have missed", "didn't miss", "won't miss"], correctIndex: 1, explanation: 'Type 3: would have + V3 → wouldn\'t have missed' },
        { sentence: 'She ___ (not/be) upset if you apologized.', options: ["won't be", "wouldn't be", "wouldn't have been", "isn't"], correctIndex: 1, explanation: 'Type 2: would + V → wouldn\'t be' },
        { type: 'transformation', instruction: 'Viết câu điều kiện loại 2.', prompt: 'If I / be / you, I / study / harder.', answer: 'If I were you, I would study harder.', hint: 'Type 2: If + V2/ed (were), would + V' },
        { type: 'transformation', instruction: 'Viết câu điều kiện loại 3.', prompt: 'If she / study / harder, she / pass / the exam.', answer: 'If she had studied harder, she would have passed the exam.', hint: 'Type 3: If + had V3, would have V3' },
        { type: 'error-correction', sentence: 'If I was you, I would accept the offer.', error: 'Trong câu điều kiện loại 2, phải dùng "were" cho tất cả ngôi, không phải "was"', correction: 'If I were you, I would accept the offer.', hint: 'Luôn dùng "were" thay "was" trong câu điều kiện' },
      ],
    },
    {
      id: 204, title: 'Passive Voice (All Tenses)', description: 'Câu bị động (tất cả thì)',
      explanation: 'Cấu trúc chung: S + be (chia thì) + V3/ed + (by O)\n\nHiện tại đơn: am/is/are + V3\nQuá khứ đơn: was/were + V3\nHiện tại hoàn thành: have/has been + V3\nTương lai: will be + V3\n\nKhi không cần nói ai làm, có thể bỏ "by O".',
      examples: [{ correct: 'The Mona Lisa was painted by Da Vinci.' }, { correct: 'A new hospital will be built next year.' }, { correct: 'My car has been stolen!' }],
      exercises: [
        { sentence: 'The bridge ___ (build) in 1999.', options: ['built', 'was built', 'is built', 'has been built'], correctIndex: 1, explanation: 'Quá khứ bị động: was built' },
        { sentence: 'All the cookies ___ (eat) by the children.', options: ['ate', 'were eaten', 'are eaten', 'have eaten'], correctIndex: 1, explanation: 'Quá khứ bị động, "cookies" số nhiều → were eaten' },
        { sentence: 'The exam ___ (already/finish) when I arrived.', options: ['already finished', 'was already finished', 'had already been finished', 'has already been finished'], correctIndex: 2, explanation: 'Quá khứ hoàn thành bị động → had been finished' },
        { sentence: 'The report ___ (should/submit) by Friday.', options: ['should submit', 'should be submitted', 'should submitted', 'should be submit'], correctIndex: 1, explanation: 'Modal + be + V3 → should be submitted' },
        { sentence: 'English ___ (speak) all over the world.', options: ['speaks', 'is spoken', 'is speaking', 'has spoken'], correctIndex: 1, explanation: 'Hiện tại bị động: is spoken' },
        { type: 'transformation', instruction: 'Chuyển câu chủ động sang bị động.', prompt: 'The cat eats the fish. → ?', answer: 'The fish is eaten by the cat.', hint: 'Tân ngữ (fish) → chủ ngữ mới. Động từ: be (chia theo thì) + V3' },
        { type: 'transformation', instruction: 'Chuyển sang bị động (quá khứ).', prompt: 'They built this bridge in 1999. → ?', answer: 'This bridge was built in 1999.', hint: 'Quá khứ bị động: was/were + V3' },
        { type: 'error-correction', sentence: 'The report was wrote by John.', error: '"wrote" là V2, bị động phải dùng V3 "written"', correction: 'The report was written by John.', hint: 'Bị động: be + V3/ed (written, not wrote)' },
        { type: 'error-correction', sentence: 'English is speak all over the world.', error: 'Sau "is" phải là V3/ed, không phải nguyên mẫu', correction: 'English is spoken all over the world.', hint: 'Bị động hiện tại: is/am/are + V3/ed' },
      ],
    },
    {
      id: 205, title: 'Modal Perfects', description: 'Động từ khuyết thiếu hoàn thành',
      explanation: 'must have + V3: chắc hẳn đã\nmight/may have + V3: có lẽ đã\ncould have + V3: đã có thể\nshould have + V3: đáng lẽ nên\nshouldn\'t have + V3: đáng lẽ không nên\n\nDùng để suy luận hoặc hối tiếc về quá khứ.',
      examples: [{ correct: 'She\'s late. She must have missed the bus.' }, { correct: 'You should have told me earlier.' }, { correct: 'I could have become a doctor, but I chose music.' }],
      exercises: [
        { sentence: 'The lights are off. They ___ (must/go) to bed.', options: ['must go', 'must have gone', 'must be going', 'must went'], correctIndex: 1, explanation: 'Suy luận về quá khứ → must have gone' },
        { sentence: 'You ___ (should/call) me yesterday.', options: ['should call', 'should have called', 'should called', 'should be calling'], correctIndex: 1, explanation: 'Hối tiếc về quá khứ → should have called' },
        { sentence: 'He ___ (might/forget) the meeting. He\'s not here.', options: ['might forget', 'might have forgotten', 'might forgotten', 'might be forgetting'], correctIndex: 1, explanation: 'Có thể đã quên → might have forgotten' },
        { sentence: 'I ___ (could/go) to university, but I decided to work.', options: ['could go', 'could have gone', 'could going', 'could went'], correctIndex: 1, explanation: 'Đã có cơ hội nhưng không làm → could have gone' },
        { sentence: 'She ___ (must/be) very tired after the long journey.', options: ['must be', 'must have been', 'must being', 'must was'], correctIndex: 1, explanation: 'Suy luận sau một hành trình → must have been' },
      ],
    },
    {
      id: 206, title: 'Reported Speech (Advanced)', description: 'Câu tường thuật nâng cao',
      explanation: 'Ngoài lùi thì, còn có các dạng:\n\nCâu mệnh lệnh: told + O + to V\nCâu yêu cầu: asked + O + to V\nCâu đề nghị: suggested + V-ing / that S + (should) + V\n\nCâu hỏi Wh-: asked + wh-word + S + V\nCâu hỏi Yes/No: asked + if/whether + S + V',
      examples: [{ correct: 'He told me to open the window.' }, { correct: 'She suggested going for a walk.' }, { correct: 'They asked where I lived.' }],
      exercises: [
        { sentence: '"Please help me," she said. → She ___ me to help her.', options: ['said', 'told', 'asked', 'suggested'], correctIndex: 2, explanation: 'Câu yêu cầu → asked me to help' },
        { sentence: '"Let\'s go to the beach," he said. → He suggested ___ to the beach.', options: ['to go', 'going', 'go', 'went'], correctIndex: 1, explanation: 'Câu đề nghị → suggested + V-ing' },
        { sentence: '"Don\'t be late," he said. → He told me ___ late.', options: ['don\'t be', 'not to be', 'to not be', 'not be'], correctIndex: 1, explanation: 'Mệnh lệnh phủ định → told me not to be' },
        { sentence: '"Where do you live?" she asked. → She asked where I ___.', options: ['live', 'lived', 'living', 'to live'], correctIndex: 1, explanation: 'Lùi thì: live → lived' },
        { sentence: '"Have you finished?" he asked. → He asked if I ___.', options: ['have finished', 'had finished', 'finished', 'was finishing'], correctIndex: 1, explanation: 'Lùi thì: have finished → had finished' },
      ],
    },
    {
      id: 207, title: 'Relative Clauses (Advanced)', description: 'Mệnh đề quan hệ nâng cao',
      explanation: 'Mệnh đề quan hệ không xác định (non-defining):\n- Dùng dấu phẩy\n- Không dùng "that"\n- Cung cấp thông tin thêm, không cần thiết để xác định danh từ\n\nVí dụ: My mother, who is 60, still works.\n\nCác từ nối: which (thay cho cả mệnh đề), whose (của ai), whereby (nhờ đó), wherein (trong đó)',
      examples: [{ correct: 'My car, which I bought last year, is already broken.' }, { correct: 'The man whose car was stolen called the police.' }],
      exercises: [
        { sentence: 'My sister, ___ lives in London, is a doctor.', options: ['which', 'who', 'whom', 'that'], correctIndex: 1, explanation: 'Mệnh đề không xác định, chỉ người → who' },
        { sentence: 'The company ___ I work is very successful.', options: ['which', 'that', 'where', 'when'], correctIndex: 2, explanation: 'Chỉ nơi chốn → where' },
        { sentence: 'He passed the exam, ___ surprised everyone.', options: ['which', 'that', 'what', 'who'], correctIndex: 0, explanation: '"Which" thay cho cả mệnh đề trước đó' },
        { sentence: 'The woman ___ child was saved thanked the doctor.', options: ['who', 'that', 'whose', 'whom'], correctIndex: 2, explanation: 'Của ai → whose' },
        { sentence: 'The reason ___ he quit is still unknown.', options: ['which', 'why', 'where', 'when'], correctIndex: 1, explanation: 'Lý do → why' },
      ],
    },
    {
      id: 208, title: 'Inversion with Negative Adverbials', description: 'Đảo ngữ với trạng từ phủ định',
      explanation: 'Khi trạng từ phủ định đứng đầu câu, đảo trợ động từ lên trước chủ ngữ.\n\nCấu trúc: Negative Word + Aux + S + V\n\nCác từ: never, rarely, seldom, hardly ever, not only... but also, no sooner... than, under no circumstances, at no time',
      examples: [{ correct: 'Never have I seen such a beautiful sunset.' }, { correct: 'Not only did she finish first, but she also broke the record.' }, { correct: 'Seldom do we eat out these days.' }],
      exercises: [
        { sentence: 'Never ___ I ___ (see) such a mess!', options: ['have / seen', 'did / see', 'was / seeing', 'do / see'], correctIndex: 0, explanation: '"Never" đầu câu → have I seen' },
        { sentence: 'Not only ___ she ___ (lose) her job, but she also lost her house.', options: ['did / lose', 'does / lose', 'has / lost', 'was / losing'], correctIndex: 0, explanation: '"Not only" đầu câu → did she lose' },
        { sentence: 'Hardly ever ___ (be) he late for work.', options: ['he is', 'is he', 'he was', 'was he'], correctIndex: 1, explanation: '"Hardly ever" đầu câu → is he' },
        { sentence: 'No sooner ___ we ___ (arrive) than it started raining.', options: ['did / arrive', 'had / arrived', 'have / arrived', 'were / arriving'], correctIndex: 1, explanation: '"No sooner... than" → had we arrived' },
        { sentence: 'Under no circumstances ___ you ___ (tell) anyone.', options: ['you must tell', 'must you tell', 'you should tell', 'you tell'], correctIndex: 1, explanation: '"Under no circumstances" → must you tell' },
      ],
    },
    {
      id: 209, title: 'Wish & If Only', description: 'Câu ước',
      explanation: 'Wish / If only: ước điều gì đó không có thật.\n\nHiện tại: wish + S + V2/ed (were cho tất cả)\nQuá khứ: wish + S + had + V3/ed\nTương lai: wish + S + would + V',
      examples: [{ correct: 'I wish I were taller.' }, { correct: 'If only I had studied harder.' }, { correct: 'I wish it would stop raining.' }],
      exercises: [
        { sentence: 'I wish I ___ (be) rich so I could travel the world.', options: ['am', 'was', 'were', 'will be'], correctIndex: 2, explanation: 'Hiện tại, "were" cho tất cả ngôi' },
        { sentence: 'If only I ___ (not/say) that to her yesterday.', options: ["didn't say", "hadn't said", "wouldn't say", "don't say"], correctIndex: 1, explanation: 'Quá khứ → hadn\'t said' },
        { sentence: 'I wish my neighbors ___ (not/make) so much noise at night.', options: ["don't make", "wouldn't make", "didn't make", "hadn't made"], correctIndex: 2, explanation: 'Hiện tại, than phiền → didn\'t make / wouldn\'t make' },
        { sentence: 'She wishes she ___ (can) fly.', options: ['can', 'could', 'will', 'would'], correctIndex: 1, explanation: 'Hiện tại → could' },
        { sentence: 'If only I ___ (know) about the meeting earlier!', options: ['knew', 'had known', 'would know', 'have known'], correctIndex: 1, explanation: 'Quá khứ (giá mà đã biết sớm hơn) → had known' },
      ],
    },
    {
      id: 210, title: 'Causative Have/Get', description: 'Thể sai khiến',
      explanation: 'Dùng khi thuê/nhờ ai làm gì.\n\nhave + O + V (nguyên mẫu): sai ai làm gì\nhave + O + V3/ed: thuê ai làm gì\n\nget + O + to V: thuyết phục ai làm\nget + O + V3/ed: thuê ai làm gì\n\nVí dụ: I had my hair cut. (tôi đi cắt tóc)',
      examples: [{ correct: 'I had my car repaired yesterday.' }, { correct: 'She got her friend to help her move.' }, { correct: 'I\'ll have the plumber fix the leak.' }],
      exercises: [
        { sentence: 'I ___ my laptop ___ (repair) last week.', options: ['had / repaired', 'had / repair', 'got / repair', 'had / repairing'], correctIndex: 0, explanation: 'Thuê sửa → had my laptop repaired' },
        { sentence: 'She ___ her assistant ___ (prepare) the documents.', options: ['got / prepared', 'had / prepare', 'had / prepared', 'got / preparing'], correctIndex: 1, explanation: 'Sai ai làm → had + O + V' },
        { sentence: 'We need to ___ someone ___ (fix) the roof.', options: ['have / fix', 'have / fixed', 'get / fixed', 'have / fixing'], correctIndex: 0, explanation: 'Cần ai đó làm → have someone fix' },
        { sentence: 'I ___ my photo ___ (take) at the studio.', options: ['had / take', 'had / taken', 'got / take', 'have / taken'], correctIndex: 1, explanation: 'Thuê chụp → had my photo taken' },
        { sentence: 'She ___ her car ___ (wash) every month.', options: ['has / wash', 'has / washed', 'had / wash', 'is / washing'], correctIndex: 1, explanation: 'Thuê rửa xe → has her car washed' },
      ],
    },

    {
      id: 211, title: 'Gerunds & Infinitives', description: 'Danh động từ và động từ nguyên mẫu',
      explanation: 'Gerund (V-ing): dùng như danh từ.\n- Swimming is fun. (chủ ngữ)\n- I enjoy reading. (tân ngữ)\n\nInfinitive (to V): dùng để chỉ mục đích, sau một số động từ.\n- I want to learn English.\n- She needs to rest.\n\nĐộng từ + Gerund: enjoy, avoid, suggest, finish, mind, practice, keep\nĐộng từ + Infinitive: want, need, hope, decide, plan, promise, learn\nĐộng từ + cả hai (nghĩa thay đổi):\n- stop smoking (ngừng hẳn)\n- stop to smoke (dừng lại để hút)\n- remember to call (nhớ phải gọi)\n- remember calling (nhớ đã gọi)',
      examples: [
        { correct: 'I enjoy reading books.', incorrect: 'I enjoy to read books.' },
        { correct: 'She wants to become a doctor.' },
        { correct: 'I stopped smoking last year (ngừng hút thuốc đã lâu).' },
        { correct: 'I stopped to buy some water (dừng lại để mua nước).' },
      ],
      exercises: [
        { sentence: 'I enjoy ___ (read) books in my free time.', options: ['to read', 'reading', 'read', 'reads'], correctIndex: 1, explanation: '"Enjoy" + V-ing → reading' },
        { sentence: 'She wants ___ (become) a doctor.', options: ['becoming', 'to become', 'become', 'becomes'], correctIndex: 1, explanation: '"Want" + to V → to become' },
        { sentence: 'He avoids ___ (eat) too much sugar.', options: ['to eat', 'eating', 'eat', 'eats'], correctIndex: 1, explanation: '"Avoid" + V-ing → eating' },
        { sentence: 'I need ___ (finish) this report by Friday.', options: ['finishing', 'to finish', 'finish', 'finished'], correctIndex: 1, explanation: '"Need" + to V → to finish' },
        { sentence: 'They suggested ___ (go) to the beach.', options: ['to go', 'going', 'go', 'went'], correctIndex: 1, explanation: '"Suggest" + V-ing → going' },
        { type: 'transformation', instruction: 'Hoàn thành câu với Gerund hoặc Infinitive.', prompt: 'She / enjoy / swim / in the ocean.', answer: 'She enjoys swimming in the ocean.', hint: '"Enjoy" + V-ing' },
        { type: 'transformation', instruction: 'Hoàn thành câu với Gerund hoặc Infinitive.', prompt: 'They / plan / travel / to Europe / next year.', answer: 'They plan to travel to Europe next year.', hint: '"Plan" + to V' },
        { type: 'error-correction', sentence: 'I enjoy to read books in my free time.', error: '"Enjoy" phải đi với V-ing, không phải "to V"', correction: 'I enjoy reading books in my free time.', hint: 'Enjoy + V-ing' },
        { type: 'error-correction', sentence: 'She wants becoming a doctor.', error: '"Want" phải đi với "to V", không phải V-ing', correction: 'She wants to become a doctor.', hint: 'Want + to V' },
        { sentence: 'He finished ___ (write) the essay at midnight.', options: ['to write', 'writing', 'write', 'wrote'], correctIndex: 1, explanation: '"Finish" + V-ing → writing' },
        { sentence: 'I hope ___ (see) you again soon.', options: ['seeing', 'to see', 'see', 'saw'], correctIndex: 1, explanation: '"Hope" + to V → to see' },
        { sentence: 'She kept ___ (talk) during the movie.', options: ['to talk', 'talking', 'talk', 'talked'], correctIndex: 1, explanation: '"Keep" + V-ing → talking' },
      ],
    },
    {
      id: 212, title: 'Unreal Past & Wishes', description: 'Quá khứ giả định và câu ước nâng cao',
      explanation: 'Dùng để diễn tả ước muốn trái với thực tế.\n\nI wish / If only + S + V2/ed (hiện tại, trái với hiện tại)\n- I wish I were taller. (Thực tế: tôi không cao)\n\nI wish / If only + S + had V3/ed (quá khứ, trái với quá khứ)\n- I wish I had studied harder. (Thực tế: tôi đã không học chăm)\n\nIt\'s time + S + V2/ed: đã đến lúc ai đó phải làm gì\n- It\'s time you went to bed.\n\nWould rather + S + V2/ed: muốn ai đó làm gì (trái với hiện tại)\n- I\'d rather you didn\'t smoke.\n\nAs if / as though + S + V2/ed: như thể (không có thật)\n- He talks as if he knew everything.',
      examples: [
        { correct: 'I wish I could fly (ước không có thật ở hiện tại).' },
        { correct: 'If only I had listened to your advice (hối tiếc về quá khứ).' },
        { correct: 'It\'s high time you started preparing for the exam.' },
        { correct: 'I\'d rather you didn\'t tell anyone about this.' },
      ],
      exercises: [
        { sentence: 'I wish I ___ (be) taller so I could play basketball.', options: ['am', 'was', 'were', 'will be'], correctIndex: 2, explanation: 'Hiện tại, trái thực tế → were (cho tất cả ngôi)' },
        { sentence: 'If only she ___ (not/say) that yesterday.', options: ["didn't say", "hadn't said", "hasn't said", "wouldn't say"], correctIndex: 1, explanation: 'Quá khứ, hối tiếc → hadn\'t said' },
        { sentence: 'It\'s time you ___ (start) studying for the exam.', options: ['start', 'started', 'starting', 'to start'], correctIndex: 1, explanation: '"It\'s time" + S + V2/ed → started' },
        { sentence: 'I\'d rather you ___ (not/tell) anyone about this.', options: ["don't tell", "didn't tell", "hadn't told", "won't tell"], correctIndex: 1, explanation: '"Would rather" + S + V2/ed → didn\'t tell' },
        { sentence: 'He talks as if he ___ (know) everything, but he doesn\'t.', options: ['knows', 'knew', 'has known', 'is knowing'], correctIndex: 1, explanation: 'Không có thật ở hiện tại → knew' },
        { type: 'transformation', instruction: 'Viết câu ước cho tình huống hiện tại.', prompt: 'I / not / have / a car. (I wish...)', answer: 'I wish I had a car.', hint: 'Hiện tại: wish + S + V2/ed' },
        { type: 'transformation', instruction: 'Viết câu ước cho quá khứ.', prompt: 'She / not / study / for the exam. (She failed) / If only...', answer: 'If only she had studied for the exam.', hint: 'Quá khứ: If only + S + had V3/ed' },
        { type: 'error-correction', sentence: 'I wish I am taller.', error: 'Câu ước hiện tại phải dùng V2/ed, không phải V1', correction: 'I wish I were taller.', hint: 'Ước hiện tại: wish + S + V2/ed (were cho tất cả)' },
        { type: 'error-correction', sentence: 'It\'s time we go home.', error: 'Sau "It\'s time" phải dùng V2/ed', correction: 'It\'s time we went home.', hint: 'It\'s time + S + V2/ed' },
        { sentence: 'I wish I ___ (can) speak Chinese fluently.', options: ['can', 'could', 'will', 'would'], correctIndex: 1, explanation: 'Hiện tại ước → could' },
        { sentence: 'She looks as if she ___ (see) a ghost.', options: ['sees', 'saw', 'has seen', 'had seen'], correctIndex: 1, explanation: 'Không có thật hiện tại → saw' },
      ],
    },
  ],

  'C1': [
    {
      id: 301, title: 'Advanced Inversion', description: 'Đảo ngữ nâng cao',
      explanation: 'Các dạng đảo ngữ khác:\n\nSo... that: So expensive was the car that nobody could buy it.\nSuch... that: Such was his anger that he couldn\'t speak.\n\nNot until: Not until I got home did I realise I lost my phone.\n\nOnly after, only when, only by: Only after finishing work did she relax.\n\nĐảo ngữ với câu điều kiện (bỏ if):\nHad I known (If I had known)\nWere I you (If I were you)\nShould you need (If you need)',
      examples: [{ correct: 'Had I known about the party, I would have gone.' }, { correct: 'Not until later did she understand the situation.' }],
      exercises: [
        { sentence: '___ I known earlier, I would have helped.', options: ['If', 'Had', 'Have', 'Should'], correctIndex: 1, explanation: 'Đảo ngữ câu điều kiện loại 3 → Had I known' },
        { sentence: 'Not until I saw it with my own eyes ___ I ___ (believe) it.', options: ['I believed', 'did I believe', 'I did believe', 'had I believed'], correctIndex: 1, explanation: '"Not until" đầu câu → did I believe' },
        { sentence: 'So ___ (be) the heat that we stayed indoors.', options: ['was', 'did', 'had', 'were'], correctIndex: 0, explanation: '"So...that" → So + adj + be + S' },
        { sentence: '___ you need assistance, please call me.', options: ['Had', 'Were', 'Should', 'If'], correctIndex: 2, explanation: 'Đảo ngữ điều kiện loại 1 → Should you need' },
        { sentence: 'Only after she left ___ I ___ (realise) how much she meant to me.', options: ['I realised', 'did I realise', 'I did realise', 'had I realised'], correctIndex: 1, explanation: '"Only after" đầu câu → did I realise' },
      ],
    },
    {
      id: 302, title: 'Cleft Sentences', description: 'Câu chẻ',
      explanation: 'Dùng để nhấn mạnh một phần của câu.\n\nIt + be + S + who/that + V: ...chính là...\nWhat + S + V + be + ...: Điều mà... là...\nThe reason why... is that...: Lý do... là...\nThe thing that... is...: Điều... là...',
      examples: [{ correct: 'It was John who broke the window.' }, { correct: 'What I need is a holiday.' }, { correct: 'The reason why I\'m late is that my car broke down.' }],
      exercises: [
        { sentence: 'It ___ my mother who taught me to cook.', options: ['is', 'was', 'has been', 'will be'], correctIndex: 1, explanation: 'Câu chẻ quá khứ → It was... who...' },
        { sentence: '___ I want is some peace and quiet.', options: ['That', 'What', 'Which', 'It'], correctIndex: 1, explanation: '"Điều tôi muốn" → What I want' },
        { sentence: 'It was in 2010 ___ I first visited London.', options: ['when', 'that', 'where', 'which'], correctIndex: 1, explanation: 'Nhấn mạnh thời gian → It was... that...' },
        { sentence: 'The reason ___ I left early was that I felt ill.', options: ['why', 'that', 'which', 'when'], correctIndex: 0, explanation: 'Lý do → The reason why' },
        { sentence: '___ really matters is that you\'re safe.', options: ['It', 'What', 'That', 'Which'], correctIndex: 1, explanation: '"Điều thực sự quan trọng" → What really matters' },
      ],
    },
    {
      id: 303, title: 'Hedging & Vague Language', description: 'Ngôn ngữ giảm nhẹ',
      explanation: 'Dùng để làm cho câu nói bớt khẳng định, lịch sự hơn.\n\nĐộng từ: seem, appear, tend, suggest, indicate\nTrạng từ: probably, possibly, presumably, allegedly, relatively\nCụm từ: sort of, kind of, more or less, to some extent, in a way\n\nThường dùng trong văn học thuật và giao tiếp lịch sự.',
      examples: [{ correct: 'This seems to be a serious issue.' }, { correct: 'The results suggest that the treatment is effective.' }, { correct: 'I\'m sort of tired today.' }],
      exercises: [
        { sentence: 'It ___ (seem) that the project was a success.', options: ['seems', 'seem', 'seeming', 'seemed'], correctIndex: 0, explanation: '"It seems that..." là cấu trúc giảm nhẹ' },
        { sentence: 'The data ___ (suggest) that our approach needs improvement.', options: ['suggest', 'suggests', 'suggested', 'is suggesting'], correctIndex: 1, explanation: '"The data" (số ít) → suggests' },
        { sentence: 'He is ___ of a genius, but not quite.', options: ['kind', 'sort', 'type', 'some'], correctIndex: 0, explanation: '"Kind of" = đại loại là' },
        { sentence: 'The situation is ___ (relative) complicated.', options: ['relative', 'relatively', 'relation', 'relating'], correctIndex: 1, explanation: 'Trạng từ bổ nghĩa cho tính từ → relatively' },
        { sentence: 'People ___ (tend) to prefer familiar things.', options: ['tend', 'tends', 'tended', 'are tending'], correctIndex: 0, explanation: '"People" số nhiều → tend' },
      ],
    },
    {
      id: 304, title: 'Ellipsis & Substitution', description: 'Tỉnh lược và thay thế',
      explanation: 'Ellipsis (tỉnh lược): bỏ từ đã hiểu để tránh lặp.\n- I can swim, and she can (swim) too.\n- A: Who broke the vase? B: John (broke it).\n\nSubstitution: dùng từ thay thế\n- So/not: I think so, I hope not.\n- One/ones: I need a pen. Do you have one?\n- Do: She runs faster than I do.\n- Same: A: I\'m tired. B: Same here.',
      examples: [{ correct: 'A: Is it raining? B: I hope not.' }, { correct: 'I don\'t like this shirt. I prefer the blue one.' }],
      exercises: [
        { sentence: 'A: Will you come? B: I hope ___.', options: ['so', 'not', 'it', 'that'], correctIndex: 0, explanation: '"I hope so" = hy vọng là có' },
        { sentence: 'I\'d like the red dress, not the green ___.', options: ['dress', 'one', 'ones', 'that'], correctIndex: 1, explanation: '"One" thay cho danh từ số ít "dress"' },
        { sentence: 'She can sing better than I ___.', options: ['sing', 'can', 'do', 'am'], correctIndex: 1, explanation: 'Tỉnh lược: than I can' },
        { sentence: 'A: I\'m exhausted. B: ___. (Tôi cũng vậy)', options: ['So do I', 'Same here', 'I too', 'Me too'], correctIndex: 1, explanation: '"Same here" = tôi cũng vậy' },
        { sentence: 'He\'s a doctor, or at least he ___ to be.', options: ['seems', 'appears', 'does', 'is'], correctIndex: 1, explanation: '"Appears to be" giảm nhẹ' },
      ],
    },
    {
      id: 305, title: 'Participle Clauses', description: 'Mệnh đề phân từ',
      explanation: 'Rút gọn mệnh đề trạng ngữ bằng phân từ.\n\nHiện tại (V-ing): chủ động\n→ Walking home, I met an old friend. (While I was walking)\n\nQuá khứ (V3/ed): bị động\n→ Exhausted by the journey, she went straight to bed. (Because she was exhausted)\n\nHoàn thành (Having V3/ed): trước hành động chính\n→ Having finished dinner, we went for a walk.',
      examples: [{ correct: 'Realizing she was late, she ran to the bus stop.' }, { correct: 'Written in 1925, the book is still popular today.' }],
      exercises: [
        { sentence: '___ (see) the police, the thief ran away.', options: ['Seeing', 'Seen', 'Having seen', 'Saw'], correctIndex: 0, explanation: 'Chủ động, đồng thời → Seeing' },
        { sentence: '___ (park) the car, she went into the building.', options: ['Parking', 'Parked', 'Having parked', 'Parks'], correctIndex: 2, explanation: 'Xảy ra trước → Having parked' },
        { sentence: '___ (know) the truth, she felt relieved.', options: ['Knowing', 'Known', 'Having known', 'Knew'], correctIndex: 2, explanation: 'Xảy ra trước → Having known' },
        { sentence: '___ (write) by a famous author, the novel was an instant success.', options: ['Writing', 'Written', 'Having written', 'Writes'], correctIndex: 1, explanation: 'Bị động → Written' },
        { sentence: '___ (speak) no English, she had trouble communicating.', options: ['Spoke', 'Spoken', 'Speaking', 'Having spoken'], correctIndex: 2, explanation: 'Chủ động, đồng thời → Speaking' },
      ],
    },
    {
      id: 306, title: 'Fronting & Emphasis', description: 'Đưa thành phần lên đầu câu để nhấn mạnh',
      explanation: 'Đưa thành phần phụ lên đầu để nhấn mạnh.\n\nTân ngữ: That book, I\'ve never read it.\nTính từ: Strange though it may seem, I enjoy the rain.\nCụm giới từ: In the garden stood a beautiful statue.\nĐộng từ nguyên mẫu: Try as I might, I can\'t solve it.\n\nDùng "do/does/did" nhấn mạnh động từ: I do understand.',
      examples: [{ correct: 'That shirt, I bought in Paris.' }, { correct: 'I do believe you\'re right.' }],
      exercises: [
        { sentence: '___ as I tried, I couldn\'t open the door.', options: ['Try', 'Tried', 'Trying', 'To try'], correctIndex: 0, explanation: '"Try as I might" = dù cố gắng thế nào' },
        { sentence: 'I ___ understand how you feel.', options: ['am', 'do', 'have', 'was'], correctIndex: 1, explanation: '"Do" nhấn mạnh: "I do understand"' },
        { sentence: '___, she finally agreed to help us.', options: ['Reluctant though she was', 'She was reluctant', 'Though reluctant', 'Reluctant'], correctIndex: 0, explanation: 'Tính từ + though + S + V → nhấn mạnh' },
        { sentence: '___ a strange story he told us!', options: ['What', 'How', 'Such', 'So'], correctIndex: 0, explanation: '"What a..." câu cảm thán' },
        { sentence: '___ and behold, the cat came back!', options: ['Look', 'See', 'Lo', 'Watch'], correctIndex: 2, explanation: '"Lo and behold" = kìa, ngạc nhiên chưa' },
      ],
    },
    {
      id: 307, title: 'Complex Prepositions', description: 'Giới từ phức',
      explanation: 'Các cụm giới từ thường gặp:\n\nin terms of: về mặt\ndue to / owing to: do bởi\nin spite of / despite: mặc dù\nin addition to: thêm vào đó\nwith regard to: liên quan đến\non behalf of: thay mặt cho\nby means of: bằng cách\nin light of: xét theo\nin the event of: trong trường hợp\nfor the sake of: vì lợi ích của',
      examples: [{ correct: 'In spite of the rain, we enjoyed the picnic.' }, { correct: 'Due to the weather, the event was cancelled.' }],
      exercises: [
        { sentence: '___ of the bad weather, the match was postponed.', options: ['Because', 'Due', 'In spite', 'Regarding'], correctIndex: 1, explanation: '"Due to" = do bởi' },
        { sentence: '___ the rain, we went for a walk.', options: ['Due to', 'In spite of', 'Because of', 'Owing to'], correctIndex: 1, explanation: 'Mặc dù trời mưa → In spite of' },
        { sentence: '___ terms of money, it was a good deal.', options: ['In', 'On', 'At', 'By'], correctIndex: 0, explanation: '"In terms of" = về mặt' },
        { sentence: 'He spoke on ___ of the whole team.', options: ['behalf', 'behalfs', 'behalf of', 'the behalf'], correctIndex: 0, explanation: '"On behalf of" = thay mặt' },
        { sentence: '___ to popular belief, not all snakes are dangerous.', options: ['Thanks', 'Due', 'Contrary', 'Opposite'], correctIndex: 2, explanation: '"Contrary to popular belief" = trái với suy nghĩ thông thường' },
      ],
    },
    {
      id: 308, title: 'Subjunctive Mood', description: 'Thức giả định',
      explanation: 'Dùng sau các động từ chỉ sự yêu cầu, đề nghị, quan trọng.\n\nCấu trúc: S + V (that) + S + (should) + V (nguyên mẫu)\n\nCác động từ: suggest, recommend, insist, propose, demand, request, advise\nCác tính từ: essential, vital, necessary, important, crucial\n\nLưu ý: bỏ "should" trong tiếng Anh trang trọng.',
      examples: [{ correct: 'I suggest that he see a doctor.' }, { correct: 'It is essential that everyone be on time.' }],
      exercises: [
        { sentence: 'The doctor recommended that she ___ (rest) for a week.', options: ['rest', 'rests', 'rested', 'is resting'], correctIndex: 0, explanation: 'Giả định: that + S + V (nguyên mẫu)' },
        { sentence: 'It is vital that the project ___ (complete) on time.', options: ['is completed', 'be completed', 'completes', 'has completed'], correctIndex: 1, explanation: 'Giả định bị động: be completed' },
        { sentence: 'She insisted that he ___ (apologize).', options: ['apologizes', 'apologized', 'apologize', 'would apologize'], correctIndex: 2, explanation: 'Giả định: that he apologize' },
        { sentence: 'It\'s important that you ___ (not/be) late.', options: ["aren't", "not be", "don't be", "won't be"], correctIndex: 1, explanation: 'Giả định phủ định: not be' },
        { sentence: 'I propose that we ___ (delay) the meeting.', options: ['delay', 'delays', 'delayed', 'are delaying'], correctIndex: 0, explanation: 'Giả định: that we delay' },
      ],
    },
    {
      id: 309, title: 'Linking Words & Discourse Markers', description: 'Master linking words and discourse markers to improve the flow of your writing and speaking.',
      explanation: 'Linking words and discourse markers connect ideas and guide the reader through your text. They are essential for achieving a high score in IELTS Coherence and Cohesion.\n\n**Additive** (thêm thông tin):\n- Furthermore / Moreover / In addition: formal, written\n- Besides / What is more: slightly informal\n- Also / Too: neutral, common in speaking\n\n**Adversative** (tương phản):\n- However / Nevertheless / Nonetheless: formal\n- On the other hand: contrasting viewpoints\n- In contrast / Whereas: comparing differences\n- Yet / Still: more common in writing\n\n**Causal** (nguyên nhân - kết quả):\n- Therefore / Consequently / Thus: formal, written\n- As a result / As a consequence: neutral\n- Hence / Accordingly: very formal\n- For this reason: common in essays\n\n**Sequential** (trình tự):\n- Firstly / To begin with: introducing points\n- Subsequently / Following this: continuing\n- Finally / Lastly: concluding\n- Meanwhile / Simultaneously: at the same time\n\n**Clarifying** (giải thích):\n- In other words: rephrasing\n- Namely / That is: specifying\n- To put it another way: simplifying\n- For instance / For example: giving evidence\n\n**Formal vs Informal Examples:**\nFormal: The experiment was inconclusive. Consequently, further research is required.\nInformal: The experiment didn\'t work. So we need to do more research.',
      examples: [
        { correct: 'The government has reduced funding for the arts. Furthermore, several museums have been forced to close.', incorrect: 'The government has reduced funding for the arts. So, several museums have been forced to close.' },
        { correct: 'Many people believe that technology improves productivity. However, excessive screen time can reduce focus.', incorrect: 'Many people believe that technology improves productivity. But, excessive screen time can reduce focus.' },
        { correct: 'Regular exercise improves physical health. In addition, it has been shown to boost mental wellbeing.' },
        { correct: 'The company failed to innovate. Consequently, it lost its market share to competitors.' },
        { correct: 'There are several reasons for this trend. Firstly, urban areas offer more employment opportunities. Secondly, younger generations are drawn to city lifestyles.' },
      ],
      exercises: [
        { sentence: 'Which linking word best completes this sentence? "The new policy was unpopular ___ it led to significant savings."', options: ['however', 'nevertheless', 'nonetheless', 'therefore'], correctIndex: 3, explanation: '"Therefore" shows a cause-effect relationship: unpopular is the contrast but savings are the result.' },
        { type: 'transformation', instruction: 'Rewrite the sentence using a more formal linking word.', prompt: 'The weather was bad, so the event was cancelled.', answer: 'The weather was bad; consequently, the event was cancelled.', hint: 'Replace "so" with "consequently" or "therefore".' },
        { type: 'error-correction', sentence: 'He is very talented. In addition, he lacks confidence.', error: 'In addition', correction: 'However / Nevertheless', hint: 'The second sentence contrasts with the first, not adds to it.' },
        { sentence: 'Which discourse marker is the MOST formal?', options: ['So', 'Thus', 'Also', 'But'], correctIndex: 1, explanation: '"Thus" is the most formal option, commonly used in academic writing.' },
        { type: 'transformation', instruction: 'Rewrite the two sentences as one coherent sentence using a linking word.', prompt: 'Air pollution is harmful to health. The government should introduce stricter emission laws.', answer: 'Since air pollution is harmful to health, the government should introduce stricter emission laws.', hint: 'Use "since", "because", or "therefore" to connect the cause and effect.' },
      ],
    },
    {
      id: 310, title: 'Cohesive Devices: Reference & Substitution', description: 'Use reference words and substitution to create cohesion without repetition.',
      explanation: 'Cohesive devices link sentences and paragraphs by referring back (or forward) to ideas without repeating them. The IELTS Writing marking criteria specifically assesses Coherence and Cohesion.\n\n**1. Personal Reference (Pronouns):**\nReplace nouns with he, she, it, they, him, her, them.\n→ Pollution is a serious issue. It affects millions of people worldwide.\n\n**2. Demonstrative Reference:**\n- This / These: refer to something close or just mentioned\n- That / Those: refer to something distant or previously mentioned\n→ Economic growth has slowed. This has led to rising unemployment.\n\n**3. Comparative Reference:**\nUse such, similar, likewise, the same, similarly, otherwise.\n→ The first experiment failed. A similar approach was attempted with better results.\n\n**4. Substitution:**\n- One/Ones: I prefer the blue shirt to the red one.\n- Do/Does: She speaks French better than I do.\n- So/Not: Do you think it will rain? I hope so. / I hope not.\n- Same: A: I\'m exhausted. B: The same here.\n\n**5. Ellipsis (Tỉnh lược):**\nOmit words that are understood from context.\n→ A: Who wants to go? B: I do. (want to go is elided)\n→ She can sing, but I can\'t. (sing is elided)\n\n**6. Lexical Cohesion:**\nRepetition, synonyms, superordinates, general words.\n→ The problem is complex. This issue requires careful consideration.',
      examples: [
        { correct: 'Some people believe that social media connects us. However, this is not always true, as it can also create isolation.', incorrect: 'Some people believe that social media connects us. However, this thing is not always true, as social media can also create isolation.' },
        { correct: 'I need a pen. Do you have one?', incorrect: 'I need a pen. Do you have a pen?' },
        { correct: 'The population is ageing. This trend presents challenges for healthcare systems.' },
        { correct: 'A: Will you attend the meeting? B: I think so.' },
        { correct: 'Students in urban areas outperform those in rural regions. Similarly, private school students tend to achieve higher scores than their public school counterparts.' },
      ],
      exercises: [
        { sentence: 'Choose the correct reference word: "The economy is recovering. ___ is good news for job seekers."', options: ['This', 'That', 'They', 'It'], correctIndex: 3, explanation: '"It" refers back to "the economy is recovering" as a single idea/statement.' },
        { type: 'error-correction', sentence: 'The experiments were repeated, but these did not produce the same results.', error: 'these', correction: 'they', hint: 'Since the experiments were mentioned in the previous clause, use "they" not "these" for personal reference.' },
        { type: 'transformation', instruction: 'Rewrite the sentence using substitution to avoid repetition.', prompt: 'I like the green dress more than I like the blue dress.', answer: 'I like the green dress more than the blue one.', hint: 'Replace the second "dress" with "one".' },
        { sentence: 'Which cohesive device is used in: "A: Is he coming? B: I hope so."?', options: ['Reference', 'Substitution', 'Ellipsis', 'Lexical cohesion'], correctIndex: 1, explanation: '"So" substitutes for the clause "he is coming".' },
        { type: 'transformation', instruction: 'Combine these sentences using a demonstrative reference word.', prompt: 'The number of cars on the roads has increased dramatically. This increase has led to severe traffic congestion.', answer: 'The number of cars on the roads has increased dramatically. This has led to severe traffic congestion.', hint: 'Replace "This increase" with just "This" to refer back to the whole idea.' },
      ],
    },

    {
      id: 311, title: 'Inversion in Conditionals', description: 'Đảo ngữ trong câu điều kiện',
      explanation: 'Bỏ "if" và đảo trợ động từ lên trước chủ ngữ (văn phong trang trọng).\n\nLoại 1 (có thể xảy ra): Should + S + V, ...\n- Should you need help, call me. (If you need help...)\n\nLoại 2 (không có thật hiện tại): Were + S + to V / Were + S + ..., ...\n- Were I you, I would accept. (If I were you...)\n\nLoại 3 (không có thật quá khứ): Had + S + V3, ...\n- Had I known, I would have come. (If I had known...)\n\nĐảo ngữ với "but for" / "if it weren\'t for":\n- But for your help, I would have failed.',
      examples: [
        { correct: 'Had I known about the meeting, I would have attended.', incorrect: 'If I had known about the meeting, I would have attended.' },
        { correct: 'Were she to arrive early, she would find the office closed.' },
        { correct: 'Should you have any questions, please let me know.' },
      ],
      exercises: [
        { sentence: '___ you need assistance, please call me.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 1, explanation: 'Đảo ngữ điều kiện loại 1 → Should you need' },
        { sentence: '___ I known earlier, I would have helped.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 2, explanation: 'Đảo ngữ điều kiện loại 3 → Had I known' },
        { sentence: '___ I you, I would not take that job.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 3, explanation: 'Đảo ngữ điều kiện loại 2 → Were I you' },
        { sentence: '___ it not been for her support, I would have given up.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 2, explanation: 'Quá khứ giả định → Had it not been' },
        { sentence: '___ she to arrive late, we would miss the flight.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 3, explanation: '"Were + S + to V" → Were she to arrive' },
        { type: 'transformation', instruction: 'Chuyển câu điều kiện thành đảo ngữ.', prompt: 'If I had known, I would have told you. → Had...', answer: 'Had I known, I would have told you.', hint: 'Loại 3: Had + S + V3, bỏ if' },
        { type: 'transformation', instruction: 'Chuyển sang đảo ngữ.', prompt: 'If you need further information, contact us. → Should...', answer: 'Should you need further information, contact us.', hint: 'Loại 1: Should + S + V, bỏ if' },
        { type: 'error-correction', sentence: 'If I were you, I would accept. → Were I to be you, I would accept.', error: 'Dạng đảo ngữ của "If I were you" là "Were I you", không phải "Were I to be you"', correction: 'Were I you, I would accept.', hint: 'Đảo ngữ: Were + S + ... (không có "to be")' },
        { type: 'error-correction', sentence: 'Had she have more time, she would have finished.', error: '"Had" đã mang nghĩa quá khứ hoàn thành, không cần "have"', correction: 'Had she had more time, she would have finished.', hint: 'Had + S + V3/ed (had already contains past perfect meaning)' },
        { sentence: 'But ___ your generosity, we would never have succeeded.', options: ['for', 'if', 'had', 'were'], correctIndex: 0, explanation: '"But for" = nếu không có' },
        { sentence: '___ he to apologize, I would forgive him immediately.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 3, explanation: 'Đảo ngữ → Were he to apologize' },
      ],
    },
    {
      id: 312, title: 'Concession & Contrast', description: 'Nhượng bộ và tương phản',
      explanation: 'Các cấu trúc diễn tả sự nhượng bộ (mặc dù... nhưng...).\n\nAlthough / Even though / Though + clause: mặc dù\n- Although it rained, we enjoyed the picnic.\n\nDespite / In spite of + noun / V-ing: mặc dù\n- Despite the rain, we went out.\n- In spite of being tired, she continued working.\n\nHowever / Nevertheless / Nonetheless: tuy nhiên (đầu câu mới)\n- It was raining. However, we went out.\n\nWhile / Whereas: trong khi (so sánh hai mặt)\n- While I enjoy cooking, my husband prefers eating out.\n\nMuch as + clause: dù... đến mấy\n- Much as I admire him, I cannot agree with his decision.',
      examples: [
        { correct: 'Although she was tired, she finished the race.', incorrect: 'Although she was tired, but she finished the race.' },
        { correct: 'In spite of the bad weather, the flight took off.' },
        { correct: 'He is very rich. Nevertheless, he is not happy.' },
        { correct: 'While some people love city life, others prefer the countryside.' },
      ],
      exercises: [
        { sentence: '___ it was cold, they went swimming.', options: ['Despite', 'Although', 'In spite', 'However'], correctIndex: 1, explanation: '"Although" + clause (S + V)' },
        { sentence: '___ the rain, we enjoyed the trip.', options: ['Although', 'Despite', 'Even', 'However'], correctIndex: 1, explanation: '"Despite" + noun phrase' },
        { sentence: 'She was exhausted. ___, she kept working.', options: ['Despite', 'Although', 'Nevertheless', 'In spite'], correctIndex: 2, explanation: 'Đầu câu mới, tương phản → Nevertheless' },
        { sentence: 'I like tea, ___ my brother prefers coffee.', options: ['although', 'despite', 'whereas', 'however'], correctIndex: 2, explanation: 'So sánh hai mặt → whereas' },
        { sentence: '___ as I admire his talent, I disagree with his views.', options: ['Although', 'Despite', 'Much', 'Even'], correctIndex: 2, explanation: '"Much as" = dù... đến mấy' },
        { type: 'transformation', instruction: 'Viết lại câu với "Despite".', prompt: 'Although she was tired, she continued. → Despite...', answer: 'Despite being tired, she continued.', hint: '"Despite" + V-ing' },
        { type: 'transformation', instruction: 'Viết lại câu với "Although".', prompt: 'In spite of his injury, he played. → Although...', answer: 'Although he was injured, he played.', hint: '"Although" + clause (S + V)' },
        { type: 'error-correction', sentence: 'Although it rained, but we went out.', error: 'Không dùng cả "although" và "but" trong cùng một câu', correction: 'Although it rained, we went out.', hint: 'Chỉ dùng một từ nối: although hoặc but, không dùng cả hai' },
        { type: 'error-correction', sentence: 'Despite the weather was bad, we went out.', error: '"Despite" + noun, không phải clause. Dùng "although" cho clause', correction: 'Although the weather was bad, we went out.', hint: 'Despite + N, Although + S + V' },
        { sentence: '___ the high cost of living, many people move to big cities.', options: ['Although', 'Despite', 'However', 'Whereas'], correctIndex: 1, explanation: '"Despite" + noun phrase' },
        { sentence: 'The team played badly. ___, they managed to win.', options: ['Despite', 'Although', 'Nevertheless', 'Whereas'], correctIndex: 2, explanation: 'Đầu câu mới → Nevertheless' },
        { sentence: '___ some people enjoy winter sports, others find them too dangerous.', options: ['Despite', 'In spite of', 'While', 'However'], correctIndex: 2, explanation: 'So sánh hai nhóm người → While' },
      ],
    },
  ],

  'C2': [
    {
      id: 401, title: 'Linking Complex Structures', description: 'Cấu trúc liên kết phức hợp',
      explanation: 'Kết hợp nhiều cấu trúc trong một câu học thuật.\n\nNot only... but also + inversion\nHardly... when + inversion\nNo sooner... than + inversion\nSuch was... that\nSo + adj + be + S + that\n\nThe more... the more',
      examples: [{ correct: 'The more you practice, the more fluent you become.' }, { correct: 'Hardly had she finished speaking when the doorbell rang.' }],
      exercises: [
        { sentence: 'The ___ you study, the better your results will be.', options: ['more', 'most', 'much', 'many'], correctIndex: 0, explanation: '"The more... the better" = càng... càng' },
        { sentence: 'Hardly ___ we ___ (sit) down when the fire alarm went off.', options: ['had / sat', 'did / sit', 'have / sat', 'were / sitting'], correctIndex: 0, explanation: '"Hardly...when" + quá khứ hoàn thành' },
        { sentence: '___ was her beauty that everyone stared.', options: ['Such', 'So', 'Very', 'Too'], correctIndex: 0, explanation: '"Such was... that" nhấn mạnh danh từ' },
        { sentence: 'Not only did she win, but she ___ set a new record.', options: ['also', 'too', 'as well', 'either'], correctIndex: 0, explanation: '"Not only... but also"' },
        { sentence: 'The more I learn, ___ I realise I don\'t know.', options: ['the less', 'the more', 'less', 'more'], correctIndex: 1, explanation: '"The more... the more" = càng... càng' },
      ],
    },
    {
      id: 402, title: 'Mixed Conditionals', description: 'Câu điều kiện hỗn hợp',
      explanation: 'Kết hợp giữa điều kiện loại 2 và 3.\n\nDạng 1 (quá khứ → hiện tại):\nIf + had + V3, would + V\n→ If I had studied harder (quá khứ), I would have a better job now. (hiện tại)\n\nDạng 2 (hiện tại chung → quá khứ):\nIf + V2/ed, would have + V3\n→ If I were more careful (chung), I wouldn\'t have made that mistake. (quá khứ)',
      examples: [{ correct: 'If she hadn\'t missed the train, she wouldn\'t be late now.' }, { correct: 'If I were you, I wouldn\'t have said that.' }],
      exercises: [
        { sentence: 'If I ___ (know) how to swim, I wouldn\'t have nearly drowned.', options: ['knew', 'had known', 'know', 'would know'], correctIndex: 0, explanation: 'Hiện tại chung → quá khứ: knew' },
        { sentence: 'If she ___ (not/break) her leg, she would be playing in the final now.', options: ["didn't break", "hadn't broken", "wouldn't break", "doesn't break"], correctIndex: 1, explanation: 'Quá khứ → hiện tại: hadn\'t broken' },
        { sentence: 'If I ___ (be) you, I would have accepted the offer.', options: ['am', 'was', 'were', 'had been'], correctIndex: 2, explanation: 'Hiện tại chung: were' },
        { sentence: 'He would be alive today if the doctor ___ (operate) sooner.', options: ['operated', 'had operated', 'would operate', 'operates'], correctIndex: 1, explanation: 'Quá khứ → hiện tại: had operated' },
        { sentence: 'If they ___ (not/own) a car, they would have taken the bus.', options: ["didn't own", "hadn't owned", "wouldn't own", "don't own"], correctIndex: 0, explanation: 'Hiện tại chung → quá khứ: didn\'t own' },
      ],
    },
    {
      id: 403, title: 'Substitution with As & Such', description: 'Thay thế với "as" và "such"',
      explanation: 'As: dùng để thay cho một ý hoặc mệnh đề.\n- As I said, as you know, as expected\n- The same... as: giống như\n- Such as: như là\n\nSuch: thay cho "like that"\n- Such is life!\n- He is a gentleman, or at least he appears as such.\n- Such that: đến nỗi\n\nAs if / as though: như thể (dùng were cho hiện tại giả định)',
      examples: [{ correct: 'He looked at me as if I were crazy.' }, { correct: 'The situation was such that nobody could help.' }],
      exercises: [
        { sentence: 'She acted ___ she didn\'t care.', options: ['as', 'like', 'as if', 'such'], correctIndex: 2, explanation: '"As if" = như thể' },
        { sentence: 'He spends money ___ if he were a millionaire.', options: ['as', 'like', 'such', 'so'], correctIndex: 0, explanation: '"As if" = như thể' },
        { sentence: 'The damage was ___ that the car was written off.', options: ['so', 'such', 'as', 'like'], correctIndex: 1, explanation: '"Such that" = đến nỗi' },
        { sentence: 'As ___ known, the Earth orbits the Sun.', options: ['it is', 'is', 'was', 'being'], correctIndex: 1, explanation: '"As is known" = như đã biết' },
        { sentence: 'I have never seen ___ a beautiful sunset.', options: ['so', 'such', 'as', 'like'], correctIndex: 1, explanation: '"Such a + adj + noun"' },
      ],
    },
    {
      id: 404, title: 'Mood & Modality (Advanced)', description: 'Thể và tình thái nâng cao',
      explanation: 'Các sắc thái tinh tế:\n\nWould rather / sooner: thà... hơn\nI\'d rather you didn\'t smoke. (người khác) \nI\'d rather stay home. (bản thân)\n\nIt\'s high time + S + V2/ed: đã đến lúc phải...\n\nHad better (not): tốt hơn (không) nên… (nếu không sẽ có hậu quả)\n\nFor all I know: theo tôi biết\nAs it were: có thể nói là\nIf need be: nếu cần',
      examples: [{ correct: 'It\'s high time you started preparing for the exam.' }, { correct: 'I\'d rather you didn\'t tell anyone about this.' }],
      exercises: [
        { sentence: 'I\'d rather you ___ (not/tell) anyone about this.', options: ["don't tell", "didn't tell", "hadn't told", "won't tell"], correctIndex: 1, explanation: '"I\'d rather you didn\'t" cho người khác' },
        { sentence: 'It\'s high time we ___ (leave).', options: ['leave', 'left', 'had left', 'are leaving'], correctIndex: 1, explanation: '"It\'s high time" + V2/ed → left' },
        { sentence: 'You\'d better ___ (not/be) late.', options: ["don't be", "not be", "not to be", "aren't"], correctIndex: 1, explanation: '"Had better not" + V (nguyên mẫu)' },
        { sentence: 'I\'d rather ___ (stay) home than go out.', options: ['stay', 'stayed', 'to stay', 'staying'], correctIndex: 0, explanation: '"I\'d rather" + V (nguyên mẫu) cho bản thân' },
        { sentence: '___ it were, he was the leader of the group.', options: ['As', 'Like', 'Such', 'So'], correctIndex: 0, explanation: '"As it were" = có thể nói là' },
      ],
    },
    {
      id: 405, title: 'Nominalisation', description: 'Danh từ hóa',
      explanation: 'Chuyển động từ/tính từ thành danh từ để viết trang trọng hơn.\n\nĐộng từ → Danh từ:\n- complete → completion\n- decide → decision\n- analyze → analysis\n\nTính từ → Danh từ:\n- important → importance\n- responsible → responsibility\n\nThường dùng trong văn học thuật.\nThe completion of the project (thay vì We completed the project).',
      examples: [{ correct: 'The implementation of the new policy was successful.' }, { correct: 'There has been a significant improvement in her performance.' }],
      exercises: [
        { sentence: 'The ___ (develop) of the city was rapid.', options: ['development', 'developing', 'developed', 'develop'], correctIndex: 0, explanation: '"The development of" = sự phát triển' },
        { sentence: 'The ___ (discover) of penicillin changed medicine.', options: ['discovery', 'discovering', 'discovered', 'discover'], correctIndex: 0, explanation: '"The discovery of" = sự khám phá ra' },
        { sentence: 'There is a need for ___ (reduce) in costs.', options: ['reduce', 'reduction', 'reducing', 'reduced'], correctIndex: 1, explanation: '"A need for reduction" = nhu cầu giảm' },
        { sentence: 'His ___ (refuse) to cooperate caused problems.', options: ['refuse', 'refusal', 'refusing', 'refused'], correctIndex: 1, explanation: '"His refusal" = sự từ chối' },
        { sentence: 'The ___ (grow) of the economy is slow.', options: ['growth', 'growing', 'grew', 'grows'], correctIndex: 0, explanation: '"The growth of" = sự tăng trưởng' },
      ],
    },
    {
      id: 406, title: 'Pragmatic Markers & Discourse', description: 'Từ nối và tổ chức diễn ngôn',
      explanation: 'Các từ nối nâng cao để tổ chức văn bản:\n\nGiới thiệu: With reference to, Regarding, As regards, Turning to\nThêm: Furthermore, Moreover, In addition, What is more\nTương phản: Nevertheless, Nonetheless, On the contrary, Conversely\nKết luận: In conclusion, To sum up, In short, On the whole\n\nCác pragmatic marker:\nIndeed: quả thực\nActually/As a matter of fact: thực ra\nApparently: hình như\nPresumably: hẳn là\nUltimately: cuối cùng thì',
      examples: [{ correct: 'Turning to the issue of funding, we need more investment.' }, { correct: 'The results were inconclusive. Nevertheless, we should proceed.' }],
      exercises: [
        { sentence: '___, I\'d like to thank everyone for coming.', options: ['In conclusion', 'Furthermore', 'However', 'Meanwhile'], correctIndex: 0, explanation: 'Mở đầu kết luận → In conclusion' },
        { sentence: 'The company lost money. ___, they decided to expand.', options: ['Moreover', 'Nevertheless', 'Therefore', 'Furthermore'], correctIndex: 1, explanation: 'Tương phản: lỗ vốn nhưng vẫn mở rộng → Nevertheless' },
        { sentence: '___, we need to consider the environmental impact.', options: ['As regards', 'In behalf', 'Due to', 'In spite'], correctIndex: 0, explanation: '"As regards" = liên quan đến' },
        { sentence: 'The project was successful. ___, it exceeded all expectations.', options: ['However', 'Moreover', 'But', 'Yet'], correctIndex: 1, explanation: 'Thêm thông tin: hơn nữa → Moreover' },
        { sentence: '___, it doesn\'t matter what we decide.', options: ['Ultimately', 'Firstly', 'Meanwhile', 'Furthermore'], correctIndex: 0, explanation: 'Kết luận: ultimately = cuối cùng' },
      ],
    },

    {
      id: 407, title: 'Fronting & Inversion for Emphasis', description: 'Đảo thành phần lên đầu câu để nhấn mạnh',
      explanation: 'Đưa thành phần phụ lên đầu câu để nhấn mạnh, kèm đảo ngữ.\n\nTân ngữ + Aux + S + V:\n- Such a beautiful sight had I never seen before.\n\nCụm giới từ + V + S:\n- In the corner of the room stood a mysterious figure.\n\nTính từ / Trạng từ + Aux + S + V:\n- So quickly did she finish that everyone was amazed.\n\nĐộng từ nguyên mẫu + as/though + S + may/might: Dù có...\n- Try as he might, he could not open the door.\n\nCác cấu trúc đặc biệt:\n- Not a single word did she say.\n- At no time was he aware of the danger.\n- On no account should you open this door.\n- In no way am I responsible for this mess.\n\nCấu trúc với "such":\n- Such is the power of social media that news spreads instantly.\n- Such was his anger that he couldn\'t speak.',
      examples: [
        { correct: 'Not a word did he say during the entire meeting.', incorrect: 'Not a word he said during the entire meeting.' },
        { correct: 'So devastating was the storm that many homes were destroyed.' },
        { correct: 'Try as she might, she couldn\'t remember his name.' },
        { correct: 'On no account should you open this door while the engine is running.' },
      ],
      exercises: [
        { sentence: 'Not a single mistake ___ she ___ (make) in the exam.', options: ['she made', 'did she make', 'she did make', 'had she made'], correctIndex: 1, explanation: '"Not a" đầu câu → did she make' },
        { sentence: 'So ___ (powerful) was his speech that it moved everyone to tears.', options: ['powerful', 'powerfully', 'power', 'powered'], correctIndex: 0, explanation: '"So + adj + be + S" → So powerful was...' },
        { sentence: 'Under no circumstances ___ you ___ (leave) the building.', options: ['you must leave', 'must you leave', 'you should leave', 'you leave'], correctIndex: 1, explanation: '"Under no circumstances" → must you leave' },
        { sentence: '___ as he tried, he could not solve the puzzle.', options: ['Try', 'Tried', 'Trying', 'To try'], correctIndex: 0, explanation: '"Try as he might" = dù cố gắng thế nào' },
        { sentence: '___ is the beauty of this place that visitors often cry.', options: ['So', 'Such', 'Very', 'Too'], correctIndex: 1, explanation: '"Such + be + N + that" → Such is the beauty' },
        { type: 'transformation', instruction: 'Viết lại câu với "Not a..." đảo ngữ.', prompt: 'She did not say a single word. → Not a single word...', answer: 'Not a single word did she say.', hint: '"Not a" đầu câu → đảo trợ động từ lên trước S' },
        { type: 'transformation', instruction: 'Viết lại câu với đảo ngữ "So...".', prompt: 'The storm was so powerful that many trees fell. → So powerful...', answer: 'So powerful was the storm that many trees fell.', hint: '"So + adj + be + S" → So powerful was the storm' },
        { type: 'error-correction', sentence: 'Not a word he said during the meeting.', error: 'Sau "Not a word" đầu câu phải đảo trợ động từ', correction: 'Not a word did he say during the meeting.', hint: 'Phủ định đầu câu → đảo aux + S + V' },
        { type: 'error-correction', sentence: 'So beautiful the sunset was that we stopped to watch.', error: 'Với "So... that", phải đảo be lên trước S', correction: 'So beautiful was the sunset that we stopped to watch.', hint: 'So + adj + be + S + that...' },
        { sentence: 'At no time ___ the manager aware of the problem.', options: ['was', 'did', 'is', 'had'], correctIndex: 0, explanation: '"At no time" đầu câu → was the manager aware' },
        { sentence: 'In no way ___ I responsible for this failure.', options: ['am', 'do', 'have', 'was'], correctIndex: 0, explanation: '"In no way" → am I (hiện tại)' },
        { sentence: 'Only by working together ___ we achieve our goals.', options: ['we can', 'can we', 'we could', 'we will'], correctIndex: 1, explanation: '"Only by" đầu câu → can we' },
      ],
    },
  ],
}

export const writingFunctionGroups: WritingFunctionGroup[] = [
  {
    id: 'describe-trends',
    title: 'Describing Trends',
    description: 'Ngữ pháp để mô tả xu hướng và thay đổi (hữu ích cho Writing Task 1)',
    functions: ['Present Simple', 'Past Simple', 'Future Simple', 'Comparatives & Superlatives', 'Passive Voice'],
    lessons: [1, 3, 4, 6, 8],
  },
  {
    id: 'express-opinion',
    title: 'Expressing Opinions',
    description: 'Cấu trúc thể hiện quan điểm, lời khuyên, sự bắt buộc (Writing Task 2)',
    functions: ['Modal Verbs', 'Conditional Sentences', 'Reported Speech', 'Connectors'],
    lessons: [9, 7, 13, 14],
  },
  {
    id: 'compare-contrast',
    title: 'Comparing & Contrasting',
    description: 'Ngữ pháp so sánh, đối lập và tương phản',
    functions: ['Comparatives & Superlatives', 'Connectors', 'Relative Clauses'],
    lessons: [6, 14, 12],
  },
  {
    id: 'time-sequence',
    title: 'Time & Sequence',
    description: 'Diễn tả thời gian, trình tự sự việc (kể chuyện, mô tả quy trình)',
    functions: ['Past Simple', 'Present Perfect', 'Past Perfect', 'Future Continuous'],
    lessons: [3, 5, 201, 202],
  },
  {
    id: 'cause-effect',
    title: 'Cause & Effect',
    description: 'Diễn tả nguyên nhân và kết quả',
    functions: ['Connectors (because, so, therefore)', 'Conditional Sentences', 'Passive Voice'],
    lessons: [14, 7, 8, 204],
  },
]
