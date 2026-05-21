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
