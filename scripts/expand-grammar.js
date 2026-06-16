const fs = require('fs');
const path = require('path');

const grammarPath = path.join(__dirname, '..', 'src', 'data', 'grammar.ts');
let content = fs.readFileSync(grammarPath, 'utf8');

// ============================================================
// 1) Remove duplicate 'concentrate' (ID 10) from B1
// ============================================================
const duplicateLine = "    { id: 10, word: 'concentrate', meaning: 'tập trung', example: 'I need to concentrate on my studies.', topic: 'Education', partOfSpeech: 'v', pronunciation: '/ˈkɒnsəntreɪt/' },\n";
if (content.includes(duplicateLine)) {
  content = content.replace(duplicateLine, '');
  console.log('✓ Removed duplicate B1 concentrate (ID 10)');
} else {
  console.log('! Duplicate B1 concentrate (ID 10) not found - may already be removed');
}

// ============================================================
// 2) Define NEW GRAMMAR LESSONS
// ============================================================

// --- A1-A2 New Lessons (insert after the A1-A2 section) ---
const newA1A2Lessons = `
    {
      id: 109, title: 'Imperatives & Instructions', description: 'Câu mệnh lệnh và chỉ dẫn',
      explanation: 'Dùng để đưa ra mệnh lệnh, yêu cầu hoặc chỉ dẫn.\\n\\nCâu khẳng định: V (nguyên mẫu) + ...\\n- Open the door.\\n- Sit down, please.\\n\\nCâu phủ định: Don\\'t + V (nguyên mẫu) + ...\\n- Don\\'t run in the hallway.\\n- Don\\'t be late.\\n\\nLịch sự hơn: Please + V... / Let\\'s + V...\\n- Please close the window.\\n- Let\\'s go to the park.',
      examples: [
        { correct: 'Open your book, please.', incorrect: 'Opening your book, please.' },
        { correct: 'Don\\'t touch the hot stove.' },
        { correct: 'Let\\'s play football together.' },
      ],
      exercises: [
        { sentence: '___ (close) the door, please.', options: ['Close', 'Closing', 'Closes', 'Closed'], correctIndex: 0, explanation: 'Câu mệnh lệnh dùng động từ nguyên mẫu → Close' },
        { sentence: '___ (not/run) in the classroom.', options: ['Not run', 'Don\\'t run', 'No run', 'Not running'], correctIndex: 1, explanation: 'Mệnh lệnh phủ định → Don\\'t + V' },
        { sentence: '___ go to the cinema tonight.', options: ['Let', 'Let\\'s', 'Lets', 'Let us to'], correctIndex: 1, explanation: '\"Let\\'s\" = rủ ai cùng làm gì' },
        { sentence: '___ make noise. The baby is sleeping.', options: ['Don\\'t', 'Not', 'No', 'Aren\\'t'], correctIndex: 0, explanation: 'Mệnh lệnh phủ định → Don\\'t make noise' },
        { sentence: '___ your hands before eating.', options: ['Wash', 'Washing', 'Washes', 'To wash'], correctIndex: 0, explanation: 'Mệnh lệnh dùng V nguyên mẫu → Wash' },
        { type: 'transformation', instruction: 'Viết câu mệnh lệnh từ gợi ý.', prompt: 'please / open / window', answer: 'Please open the window.', hint: 'Dùng V nguyên mẫu, thêm \"please\" để lịch sự' },
        { type: 'transformation', instruction: 'Viết câu mệnh lệnh phủ định.', prompt: 'not / be / late / for class', answer: 'Don\\'t be late for class.', hint: 'Dùng \"Don\\'t\" + V nguyên mẫu' },
        { type: 'error-correction', sentence: 'Opening the door, please.', error: '\"Opening\" là V-ing, mệnh lệnh phải dùng \"Open\"', correction: 'Open the door, please.', hint: 'Câu mệnh lệnh dùng V nguyên mẫu, không thêm -ing' },
        { type: 'error-correction', sentence: 'Not run in the hallway.', error: 'Phủ định của mệnh lệnh phải dùng \"Don\\'t\"', correction: 'Don\\'t run in the hallway.', hint: 'Dùng \"Don\\'t\" + V cho mệnh lệnh phủ định' },
        { sentence: '___ (not/forget) your umbrella!', options: ['Not forget', 'Don\\'t forget', 'No forget', 'Not forgetting'], correctIndex: 1, explanation: 'Mệnh lệnh phủ định → Don\\'t forget' },
        { sentence: '___ me with this heavy bag.', options: ['Help', 'Helps', 'Helping', 'To help'], correctIndex: 0, explanation: 'Mệnh lệnh → Help me' },
        { sentence: 'Please ___ down and listen.', options: ['sit', 'sitting', 'sits', 'to sit'], correctIndex: 0, explanation: '\"Please\" + V nguyên mẫu → sit' },
      ],
    },
    {
      id: 110, title: 'This / That / These / Those', description: 'Đại từ chỉ định',
      explanation: 'Dùng để chỉ người/vật ở gần hoặc xa.\\n\\nThis (số ít, gần): cái này\\nThat (số ít, xa): cái kia\\nThese (số nhiều, gần): những cái này\\nThose (số nhiều, xa): những cái kia\\n\\nCấu trúc câu hỏi: Is this/that...? / Are these/those...?\\n→ Is this your book?\\n→ Are those your friends?',
      examples: [
        { correct: 'This is my book.', incorrect: 'These is my book.' },
        { correct: 'That car over there is expensive.' },
        { correct: 'These apples are fresh.' },
        { correct: 'Those shoes are beautiful.' },
      ],
      exercises: [
        { sentence: '___ is my pen right here.', options: ['This', 'That', 'These', 'Those'], correctIndex: 0, explanation: '\"right here\" → gần → This' },
        { sentence: '___ birds over there are singing.', options: ['This', 'That', 'These', 'Those'], correctIndex: 3, explanation: '\"over there\" + số nhiều → Those' },
        { sentence: '___ are my keys on this table.', options: ['This', 'That', 'These', 'Those'], correctIndex: 2, explanation: '\"on this table\" + số nhiều → These' },
        { sentence: '___ is a beautiful sunset over there.', options: ['This', 'That', 'These', 'Those'], correctIndex: 1, explanation: '\"over there\" + số ít → That' },
        { sentence: 'Are ___ your friends standing next to you?', options: ['this', 'that', 'these', 'those'], correctIndex: 2, explanation: '\"next to you\" + số nhiều → these' },
        { type: 'transformation', instruction: 'Chuyển sang số nhiều.', prompt: 'This is a book.', answer: 'These are books.', hint: '\"This\" → \"These\", \"is\" → \"are\", thêm \"s\" vào danh từ' },
        { type: 'transformation', instruction: 'Chuyển sang số ít.', prompt: 'Those are chairs.', answer: 'That is a chair.', hint: '\"Those\" → \"That\", \"are\" → \"is\", \"chairs\" → \"a chair\"' },
        { type: 'error-correction', sentence: 'These book is interesting.', error: '\"These\" dùng với danh từ số nhiều, phải là \"These books\" hoặc \"This book\"', correction: 'This book is interesting.', hint: 'This + danh từ số ít, These + danh từ số nhiều' },
        { type: 'error-correction', sentence: 'That are my shoes.', error: '\"That\" (số ít) không đi với \"are\" (số nhiều)', correction: 'Those are my shoes.', hint: 'Số nhiều dùng \"Those\" + \"are\"' },
        { sentence: '___ flowers here smell nice.', options: ['This', 'That', 'These', 'Those'], correctIndex: 2, explanation: '\"here\" + số nhiều → These' },
        { sentence: 'Is ___ your bag on the floor over there?', options: ['this', 'that', 'these', 'those'], correctIndex: 1, explanation: '\"over there\" + số ít → that' },
        { sentence: '___ students sitting near me are very friendly.', options: ['This', 'That', 'These', 'Those'], correctIndex: 2, explanation: '\"near me\" + số nhiều → These' },
      ],
    },
    {
      id: 111, title: 'Wh-Questions', description: 'Câu hỏi với từ để hỏi',
      explanation: 'Dùng để hỏi thông tin.\\n\\nWhat: cái gì (hỏi vật, hành động)\\nWhere: ở đâu (hỏi nơi chốn)\\nWhen: khi nào (hỏi thời gian)\\nWho: ai (hỏi người)\\nWhy: tại sao (hỏi lý do)\\nHow: như thế nào (hỏi cách thức)\\n\\nCấu trúc: Wh-word + am/is/are + S?\\nWh-word + do/does + S + V?\\nWh-word + can + S + V?',
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
        { type: 'transformation', instruction: 'Đặt câu hỏi với từ để hỏi.', prompt: 'she / live / where ?', answer: 'Where does she live?', hint: 'Dùng \"Where\" + \"does\" cho She + V nguyên mẫu' },
        { type: 'transformation', instruction: 'Đặt câu hỏi với từ để hỏi cho câu trả lời.', prompt: 'Answer: I am 12 years old. How...?', answer: 'How old are you?', hint: 'Hỏi về tuổi → How old + am/is/are' },
        { type: 'error-correction', sentence: 'What your name is?', error: 'Câu hỏi phải đảo trợ động từ lên trước chủ ngữ', correction: 'What is your name?', hint: 'Wh-word + is/are + S?' },
        { type: 'error-correction', sentence: 'Where you live?', error: 'Thiếu trợ động từ \"do\"', correction: 'Where do you live?', hint: 'Với động từ thường, dùng Wh-word + do/does + S + V?' },
        { sentence: '___ does the movie start? - At 7pm.', options: ['What', 'Where', 'When', 'Who'], correctIndex: 2, explanation: 'Hỏi về giờ → When' },
        { sentence: '___ many books do you have?', options: ['What', 'How', 'When', 'Where'], correctIndex: 1, explanation: '\"How many\" hỏi về số lượng' },
      ],
    },
    {
      id: 112, title: 'Adjectives: Order & Position', description: 'Vị trí và thứ tự tính từ',
      explanation: 'Vị trí: Tính từ đứng trước danh từ hoặc sau động từ \"to be\".\\n- A big house (trước danh từ)\\n- The house is big (sau to be)\\n\\nThứ tự tính từ (khi có nhiều tính từ):\\n1. Opinion (quan điểm): beautiful, nice, ugly\\n2. Size (kích cỡ): big, small, tall\\n3. Age (tuổi): old, young, new\\n4. Shape (hình dạng): round, square\\n5. Color (màu sắc): red, blue, green\\n6. Origin (nguồn gốc): Vietnamese, Japanese\\n7. Material (chất liệu): wooden, plastic, silk\\n8. Purpose (mục đích): sleeping (bag), running (shoes)\\n\\nThường chỉ dùng 2-3 tính từ trước danh từ.',
      examples: [
        { correct: 'She has a beautiful big house.', incorrect: 'She has a big beautiful house.' },
        { correct: 'The car is red.' },
        { correct: 'He wears a nice new blue shirt.' },
      ],
      exercises: [
        { sentence: 'She has a ___ (beautiful / small) garden.', options: ['small beautiful', 'beautiful small', 'beautifully small', 'beauty small'], correctIndex: 1, explanation: 'Opinion (beautiful) trước Size (small)' },
        { sentence: 'He bought a ___ (new / red) car.', options: ['red new', 'new red', 'newly red', 'new and red'], correctIndex: 1, explanation: 'Age (new) trước Color (red)' },
        { sentence: 'They live in a ___ (big / old) house.', options: ['old big', 'big old', 'bigly old', 'big and old'], correctIndex: 1, explanation: 'Size (big) trước Age (old)' },
        { sentence: 'The sky is ___.', options: ['blue', 'blueness', 'bluing', 'bluely'], correctIndex: 0, explanation: 'Sau \"is\" dùng tính từ → blue' },
        { sentence: 'She wears a ___ (nice / green / long) dress.', options: ['green nice long', 'long nice green', 'nice long green', 'nice green long'], correctIndex: 2, explanation: 'Opinion → Size → Color' },
        { type: 'transformation', instruction: 'Sắp xếp các tính từ đúng thứ tự.', prompt: 'a / wooden / big / table', answer: 'a big wooden table', hint: 'Size (big) trước Material (wooden)' },
        { type: 'transformation', instruction: 'Viết lại câu với tính từ.', prompt: 'She / have / a / dress / (beautiful / red)', answer: 'She has a beautiful red dress.', hint: 'Opinion (beautiful) trước Color (red)' },
        { type: 'error-correction', sentence: 'She is a student intelligent.', error: 'Tính từ phải đứng trước danh từ, không phải sau', correction: 'She is an intelligent student.', hint: 'Tính từ + danh từ (adjective + noun)' },
        { type: 'error-correction', sentence: 'He has a red big car.', error: 'Size (big) phải đứng trước Color (red)', correction: 'He has a big red car.', hint: 'Size + Color + Noun' },
        { sentence: 'It was a ___ (hot / sunny) day.', options: ['sunny hot', 'hot sunny', 'hotly sunny', 'hot and sunny'], correctIndex: 1, explanation: 'Cả hai đều là tính từ miêu tả, thường Opinion trước' },
        { sentence: 'I have a ___ (small / round) table.', options: ['round small', 'small round', 'smallly round', 'small and round'], correctIndex: 1, explanation: 'Size (small) trước Shape (round)' },
      ],
    },
`;

// --- B1 New Lessons (insert after the B1 closing bracket) ---
const newB1Lessons = `
    {
      id: 16, title: 'Present Perfect vs Past Simple', description: 'Phân biệt hiện tại hoàn thành và quá khứ đơn',
      explanation: 'Past Simple: hành động đã xong, rõ thời gian.\\n→ I visited London last year.\\n\\nPresent Perfect: hành động có liên quan đến hiện tại, không rõ thời gian.\\n→ I have visited London twice.\\n\\nDấu hiệu Past Simple: yesterday, last week, ago, in 2020\\nDấu hiệu Present Perfect: ever, never, just, already, yet, since, for, recently\\n\\nCùng một câu gốc nhưng khác ý nghĩa:\\n- I lost my keys (hôm qua, nhưng có thể đã tìm thấy)\\n- I have lost my keys (bây giờ vẫn chưa tìm thấy)',
      examples: [
        { correct: 'I saw that movie yesterday (Past Simple - rõ thời gian).', incorrect: 'I have seen that movie yesterday.' },
        { correct: 'She has lived here since 2019 (Present Perfect - từ quá khứ đến nay).' },
        { correct: 'He has already finished his homework (Present Perfect - không rõ thời gian).' },
      ],
      exercises: [
        { sentence: 'I ___ (visit) my grandma last weekend.', options: ['have visited', 'visited', 'have visit', 'visiting'], correctIndex: 1, explanation: '\"last weekend\" → quá khứ đơn → visited' },
        { sentence: 'She ___ (already / finish) her homework.', options: ['already finished', 'has already finished', 'already finishes', 'already finishing'], correctIndex: 1, explanation: '\"already\" → hiện tại hoàn thành → has already finished' },
        { sentence: 'We ___ (not / see) that movie yet.', options: [\"didn't see\", \"haven't seen\", \"don't see\", \"aren't seeing\"], correctIndex: 1, explanation: '\"yet\" → hiện tại hoàn thành, phủ định → haven\\'t seen' },
        { sentence: 'He ___ (buy) a new car last month.', options: ['has bought', 'bought', 'buys', 'is buying'], correctIndex: 1, explanation: '\"last month\" → quá khứ đơn → bought' },
        { sentence: '___ you ever ___ (be) to Japan?', options: ['Have / been', 'Did / go', 'Are / been', 'Will / be'], correctIndex: 0, explanation: '\"ever\" → hiện tại hoàn thành → Have you ever been?' },
        { type: 'transformation', instruction: 'Chọn thì đúng và viết câu.', prompt: 'I / (see) / that movie / yesterday.', answer: 'I saw that movie yesterday.', hint: '\"yesterday\" → dùng quá khứ đơn' },
        { type: 'transformation', instruction: 'Chọn thì đúng và viết câu.', prompt: 'She / (live) / here / since 2019.', answer: 'She has lived here since 2019.', hint: '\"since 2019\" → dùng hiện tại hoàn thành' },
        { type: 'error-correction', sentence: 'I have visited London last year.', error: '\"last year\" là thời gian xác định trong quá khứ, phải dùng quá khứ đơn', correction: 'I visited London last year.', hint: 'Thời gian xác định trong quá khứ → quá khứ đơn' },
        { type: 'error-correction', sentence: 'She didn\\'t finish her homework yet.', error: '\"yet\" thường dùng với hiện tại hoàn thành, không phải quá khứ đơn', correction: 'She hasn\\'t finished her homework yet.', hint: '\"yet\" → hiện tại hoàn thành' },
        { sentence: 'They ___ (already / leave) when we arrived.', options: ['already left', 'had already left', 'have already left', 'already leave'], correctIndex: 1, explanation: 'Xảy ra trước \"arrived\" → quá khứ hoàn thành' },
        { sentence: 'My grandmother ___ (die) ten years ago.', options: ['has died', 'died', 'dies', 'is dying'], correctIndex: 1, explanation: '\"ten years ago\" → quá khứ đơn → died' },
        { sentence: '___ you ___ (do) your homework yet?', options: ['Did / do', 'Have / done', 'Do / do', 'Are / doing'], correctIndex: 1, explanation: '\"yet\" → hiện tại hoàn thành → Have you done?' },
      ],
    },
    {
      id: 17, title: 'Used to / Would', description: 'Diễn tả thói quen trong quá khứ',
      explanation: 'Used to + V: đã từng (thói quen/trạng thái trong quá khứ, nay không còn).\\n- I used to play football every day (but I don\\'t now).\\n- She used to be shy (but she isn\\'t now).\\n\\nWould + V: đã từng (chỉ hành động lặp lại, không dùng cho trạng thái).\\n- When I was young, I would visit my grandma every summer.\\n\\nPhủ định: didn\\'t use to + V\\nCâu hỏi: Did + S + use to + V?\\n\\nKhông dùng \"used to\" cho hành động chỉ xảy ra một lần.',
      examples: [
        { correct: 'I used to live in the countryside.', incorrect: 'I use to live in the countryside.' },
        { correct: 'When he was a child, he would spend hours reading.' },
        { correct: 'She didn\\'t use to like coffee, but now she does.' },
      ],
      exercises: [
        { sentence: 'I ___ (used to / play) the piano, but I stopped.', options: ['used to play', 'used to playing', 'use to play', 'used play'], correctIndex: 0, explanation: '\"Used to\" + V nguyên mẫu → used to play' },
        { sentence: 'When I was young, we ___ (would / visit) our grandparents every Sunday.', options: ['would visiting', 'would visit', 'used to visiting', 'visit'], correctIndex: 1, explanation: '\"Would\" + V nguyên mẫu cho hành động lặp lại' },
        { sentence: 'He ___ (not / use to) like spicy food.', options: [\"didn't use to\", \"didn't used to\", \"not use to\", \"used not to\"], correctIndex: 0, explanation: 'Phủ định: didn\\'t use to + V' },
        { sentence: '___ you ___ (use to) live in Hanoi?', options: ['Did / use to', 'Do / use to', 'Did / used to', 'Are / used to'], correctIndex: 0, explanation: 'Câu hỏi: Did + S + use to + V?' },
        { sentence: 'She ___ (used to / be) very shy when she was a child.', options: ['used to be', 'used to being', 'use to be', 'used be'], correctIndex: 0, explanation: '\"Used to\" + V → used to be (dùng cho trạng thái)' },
        { type: 'transformation', instruction: 'Viết câu với \"used to\" để diễn tả thói quen trong quá khứ.', prompt: 'I / live / in the countryside. (but now I live in the city)', answer: 'I used to live in the countryside.', hint: '\"Used to\" + V nguyên mẫu' },
        { type: 'transformation', instruction: 'Chuyển sang phủ định.', prompt: 'She used to eat meat. (now she is vegetarian)', answer: 'She didn\\'t use to eat meat.', hint: 'Phủ định: didn\\'t use to + V' },
        { type: 'error-correction', sentence: 'I use to play football every day.', error: 'Thói quen trong quá khứ phải dùng \"used to\", không phải \"use to\"', correction: 'I used to play football every day.', hint: '\"Used to\" là quá khứ, \"use to\" là sai' },
        { type: 'error-correction', sentence: 'She would be a teacher when she was young.', error: '\"Would\" không dùng cho trạng thái, chỉ dùng \"used to\"', correction: 'She used to be a teacher when she was young.', hint: 'Trạng thái → dùng \"used to\", không dùng \"would\"' },
        { sentence: 'We ___ (would / go) camping every summer when I was a kid.', options: ['would go', 'used to going', 'would going', 'use to go'], correctIndex: 0, explanation: 'Hành động lặp lại → would + V' },
        { sentence: 'My father ___ (used to / smoke), but he quit last year.', options: ['used to smoking', 'used to smoke', 'use to smoke', 'used smoke'], correctIndex: 1, explanation: '\"Used to\" + V → used to smoke' },
        { sentence: 'I ___ (would / stay) up late watching cartoons.', options: ['would stayed', 'would staying', 'would stay', 'used to staying'], correctIndex: 2, explanation: '\"Would\" + V nguyên mẫu → would stay' },
      ],
    },
    {
      id: 18, title: 'So / Neither / Nor', description: 'Câu trả lời ngắn: cũng vậy / cũng không',
      explanation: 'Dùng để đồng tình với ý kiến hoặc nói ai đó cũng vậy.\\n\\nĐồng tình KHẲNG ĐỊNH: So + aux + S\\n- A: I like coffee. B: So do I. (Tôi cũng thích)\\n\\nĐồng tình PHỦ ĐỊNH: Neither / Nor + aux + S\\n- A: I don\\'t like tea. B: Neither do I. / Nor do I. (Tôi cũng không)\\n\\nAux (trợ động từ) phải giống với câu gốc:\\n- I am tired. → So am I.\\n- She can swim. → So can I.\\n- They went home. → So did I.',
      examples: [
        { correct: 'A: I am hungry. B: So am I.', incorrect: 'A: I am hungry. B: So I am.' },
        { correct: 'A: I don\\'t like spiders. B: Neither do I.', incorrect: 'A: I don\\'t like spiders. B: So do I.' },
        { correct: 'A: She can speak French. B: So can her brother.' },
      ],
      exercises: [
        { sentence: 'A: I am tired. B: So ___ I.', options: ['am', 'do', 'can', 'is'], correctIndex: 0, explanation: '\"I am\" → trợ động từ \"am\" → So am I' },
        { sentence: 'A: I like pizza. B: So ___ I.', options: ['am', 'do', 'like', 'can'], correctIndex: 1, explanation: '\"I like\" → trợ động từ \"do\" → So do I' },
        { sentence: 'A: I can\\'t swim. B: ___ can I.', options: ['So', 'Neither', 'Nor', 'Either'], correctIndex: 1, explanation: 'Phủ định → Neither + can + I' },
        { sentence: 'A: I have a car. B: So ___ I.', options: ['have', 'do', 'am', 'has'], correctIndex: 0, explanation: '\"I have\" → trợ động từ \"have\" → So have I' },
        { sentence: 'A: I don\\'t like coffee. B: Neither ___ I.', options: ['am', 'do', 'don\\'t', 'like'], correctIndex: 1, explanation: '\"I don\\'t\" → trợ động từ \"do\" → Neither do I' },
        { type: 'transformation', instruction: 'Trả lời đồng tình với \"So...\"', prompt: 'A: I love chocolate. B: ... (also)', answer: 'So do I.', hint: 'Khẳng định → So + aux + I. \"love\" → trợ động từ \"do\"' },
        { type: 'transformation', instruction: 'Trả lời đồng tình phủ định với \"Neither...\"', prompt: 'A: I don\\'t eat meat. B: ... (also not)', answer: 'Neither do I.', hint: 'Phủ định → Neither + aux + I' },
        { type: 'error-correction', sentence: 'A: I am a student. B: So do I.', error: '\"I am\" dùng trợ động từ \"am\", không phải \"do\"', correction: 'So am I.', hint: 'Trợ động từ phải giống với câu gốc (am → am)' },
        { type: 'error-correction', sentence: 'A: I don\\'t smoke. B: So don\\'t I.', error: 'Phủ định phải dùng \"Neither\" hoặc \"Nor\", không phải \"So\"', correction: 'Neither do I.', hint: 'Đồng tình phủ định → Neither/Nor + aux + S' },
        { sentence: 'A: I went to the party. B: So ___ I.', options: ['went', 'do', 'did', 'go'], correctIndex: 2, explanation: '\"I went\" → trợ động từ \"did\" → So did I' },
        { sentence: 'A: She has finished the report. B: So ___ I.', options: ['have', 'has', 'did', 'do'], correctIndex: 0, explanation: '\"has finished\" → trợ động từ \"have\" → So have I' },
      ],
    },
`;

// --- B2 New Lessons (insert after the B2 closing bracket before C1) ---
const newB2Lessons = `
    {
      id: 211, title: 'Gerunds & Infinitives', description: 'Danh động từ và động từ nguyên mẫu',
      explanation: 'Gerund (V-ing): dùng như danh từ.\\n- Swimming is fun. (chủ ngữ)\\n- I enjoy reading. (tân ngữ)\\n\\nInfinitive (to V): dùng để chỉ mục đích, sau một số động từ.\\n- I want to learn English.\\n- She needs to rest.\\n\\nĐộng từ + Gerund: enjoy, avoid, suggest, finish, mind, practice, keep\\nĐộng từ + Infinitive: want, need, hope, decide, plan, promise, learn\\nĐộng từ + cả hai (nghĩa thay đổi):\\n- stop smoking (ngừng hẳn)\\n- stop to smoke (dừng lại để hút)\\n- remember to call (nhớ phải gọi)\\n- remember calling (nhớ đã gọi)',
      examples: [
        { correct: 'I enjoy reading books.', incorrect: 'I enjoy to read books.' },
        { correct: 'She wants to become a doctor.' },
        { correct: 'I stopped smoking last year (ngừng hút thuốc đã lâu).' },
        { correct: 'I stopped to buy some water (dừng lại để mua nước).' },
      ],
      exercises: [
        { sentence: 'I enjoy ___ (read) books in my free time.', options: ['to read', 'reading', 'read', 'reads'], correctIndex: 1, explanation: '\"Enjoy\" + V-ing → reading' },
        { sentence: 'She wants ___ (become) a doctor.', options: ['becoming', 'to become', 'become', 'becomes'], correctIndex: 1, explanation: '\"Want\" + to V → to become' },
        { sentence: 'He avoids ___ (eat) too much sugar.', options: ['to eat', 'eating', 'eat', 'eats'], correctIndex: 1, explanation: '\"Avoid\" + V-ing → eating' },
        { sentence: 'I need ___ (finish) this report by Friday.', options: ['finishing', 'to finish', 'finish', 'finished'], correctIndex: 1, explanation: '\"Need\" + to V → to finish' },
        { sentence: 'They suggested ___ (go) to the beach.', options: ['to go', 'going', 'go', 'went'], correctIndex: 1, explanation: '\"Suggest\" + V-ing → going' },
        { type: 'transformation', instruction: 'Hoàn thành câu với Gerund hoặc Infinitive.', prompt: 'She / enjoy / swim / in the ocean.', answer: 'She enjoys swimming in the ocean.', hint: '\"Enjoy\" + V-ing' },
        { type: 'transformation', instruction: 'Hoàn thành câu với Gerund hoặc Infinitive.', prompt: 'They / plan / travel / to Europe / next year.', answer: 'They plan to travel to Europe next year.', hint: '\"Plan\" + to V' },
        { type: 'error-correction', sentence: 'I enjoy to read books in my free time.', error: '\"Enjoy\" phải đi với V-ing, không phải \"to V\"', correction: 'I enjoy reading books in my free time.', hint: 'Enjoy + V-ing' },
        { type: 'error-correction', sentence: 'She wants becoming a doctor.', error: '\"Want\" phải đi với \"to V\", không phải V-ing', correction: 'She wants to become a doctor.', hint: 'Want + to V' },
        { sentence: 'He finished ___ (write) the essay at midnight.', options: ['to write', 'writing', 'write', 'wrote'], correctIndex: 1, explanation: '\"Finish\" + V-ing → writing' },
        { sentence: 'I hope ___ (see) you again soon.', options: ['seeing', 'to see', 'see', 'saw'], correctIndex: 1, explanation: '\"Hope\" + to V → to see' },
        { sentence: 'She kept ___ (talk) during the movie.', options: ['to talk', 'talking', 'talk', 'talked'], correctIndex: 1, explanation: '\"Keep\" + V-ing → talking' },
      ],
    },
    {
      id: 212, title: 'Unreal Past & Wishes', description: 'Quá khứ giả định và câu ước nâng cao',
      explanation: 'Dùng để diễn tả ước muốn trái với thực tế.\\n\\nI wish / If only + S + V2/ed (hiện tại, trái với hiện tại)\\n- I wish I were taller. (Thực tế: tôi không cao)\\n\\nI wish / If only + S + had V3/ed (quá khứ, trái với quá khứ)\\n- I wish I had studied harder. (Thực tế: tôi đã không học chăm)\\n\\nIt\\'s time + S + V2/ed: đã đến lúc ai đó phải làm gì\\n- It\\'s time you went to bed.\\n\\nWould rather + S + V2/ed: muốn ai đó làm gì (trái với hiện tại)\\n- I\\'d rather you didn\\'t smoke.\\n\\nAs if / as though + S + V2/ed: như thể (không có thật)\\n- He talks as if he knew everything.',
      examples: [
        { correct: 'I wish I could fly (ước không có thật ở hiện tại).' },
        { correct: 'If only I had listened to your advice (hối tiếc về quá khứ).' },
        { correct: 'It\\'s high time you started preparing for the exam.' },
        { correct: 'I\\'d rather you didn\\'t tell anyone about this.' },
      ],
      exercises: [
        { sentence: 'I wish I ___ (be) taller so I could play basketball.', options: ['am', 'was', 'were', 'will be'], correctIndex: 2, explanation: 'Hiện tại, trái thực tế → were (cho tất cả ngôi)' },
        { sentence: 'If only she ___ (not/say) that yesterday.', options: [\"didn't say\", \"hadn't said\", \"hasn't said\", \"wouldn't say\"], correctIndex: 1, explanation: 'Quá khứ, hối tiếc → hadn\\'t said' },
        { sentence: 'It\\'s time you ___ (start) studying for the exam.', options: ['start', 'started', 'starting', 'to start'], correctIndex: 1, explanation: '\"It\\'s time\" + S + V2/ed → started' },
        { sentence: 'I\\'d rather you ___ (not/tell) anyone about this.', options: [\"don't tell\", \"didn't tell\", \"hadn't told\", \"won't tell\"], correctIndex: 1, explanation: '\"Would rather\" + S + V2/ed → didn\\'t tell' },
        { sentence: 'He talks as if he ___ (know) everything, but he doesn\\'t.', options: ['knows', 'knew', 'has known', 'is knowing'], correctIndex: 1, explanation: 'Không có thật ở hiện tại → knew' },
        { type: 'transformation', instruction: 'Viết câu ước cho tình huống hiện tại.', prompt: 'I / not / have / a car. (I wish...)', answer: 'I wish I had a car.', hint: 'Hiện tại: wish + S + V2/ed' },
        { type: 'transformation', instruction: 'Viết câu ước cho quá khứ.', prompt: 'She / not / study / for the exam. (She failed) / If only...', answer: 'If only she had studied for the exam.', hint: 'Quá khứ: If only + S + had V3/ed' },
        { type: 'error-correction', sentence: 'I wish I am taller.', error: 'Câu ước hiện tại phải dùng V2/ed, không phải V1', correction: 'I wish I were taller.', hint: 'Ước hiện tại: wish + S + V2/ed (were cho tất cả)' },
        { type: 'error-correction', sentence: 'It\\'s time we go home.', error: 'Sau \"It\\'s time\" phải dùng V2/ed', correction: 'It\\'s time we went home.', hint: 'It\\'s time + S + V2/ed' },
        { sentence: 'I wish I ___ (can) speak Chinese fluently.', options: ['can', 'could', 'will', 'would'], correctIndex: 1, explanation: 'Hiện tại ước → could' },
        { sentence: 'She looks as if she ___ (see) a ghost.', options: ['sees', 'saw', 'has seen', 'had seen'], correctIndex: 1, explanation: 'Không có thật hiện tại → saw' },
      ],
    },
`;

// --- C1 New Lessons (insert after the C1 closing bracket before C2) ---
const newC1Lessons = `
    {
      id: 311, title: 'Inversion in Conditionals', description: 'Đảo ngữ trong câu điều kiện',
      explanation: 'Bỏ \"if\" và đảo trợ động từ lên trước chủ ngữ (văn phong trang trọng).\\n\\nLoại 1 (có thể xảy ra): Should + S + V, ...\\n- Should you need help, call me. (If you need help...)\\n\\nLoại 2 (không có thật hiện tại): Were + S + to V / Were + S + ..., ...\\n- Were I you, I would accept. (If I were you...)\\n\\nLoại 3 (không có thật quá khứ): Had + S + V3, ...\\n- Had I known, I would have come. (If I had known...)\\n\\nĐảo ngữ với \"but for\" / \"if it weren\\'t for\":\\n- But for your help, I would have failed.',
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
        { sentence: '___ she to arrive late, we would miss the flight.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 3, explanation: '\"Were + S + to V\" → Were she to arrive' },
        { type: 'transformation', instruction: 'Chuyển câu điều kiện thành đảo ngữ.', prompt: 'If I had known, I would have told you. → Had...', answer: 'Had I known, I would have told you.', hint: 'Loại 3: Had + S + V3, bỏ if' },
        { type: 'transformation', instruction: 'Chuyển sang đảo ngữ.', prompt: 'If you need further information, contact us. → Should...', answer: 'Should you need further information, contact us.', hint: 'Loại 1: Should + S + V, bỏ if' },
        { type: 'error-correction', sentence: 'If I were you, I would accept. → Were I to be you, I would accept.', error: 'Dạng đảo ngữ của \"If I were you\" là \"Were I you\", không phải \"Were I to be you\"', correction: 'Were I you, I would accept.', hint: 'Đảo ngữ: Were + S + ... (không có \"to be\")' },
        { type: 'error-correction', sentence: 'Had she have more time, she would have finished.', error: '\"Had\" đã mang nghĩa quá khứ hoàn thành, không cần \"have\"', correction: 'Had she had more time, she would have finished.', hint: 'Had + S + V3/ed (had already contains past perfect meaning)' },
        { sentence: 'But ___ your generosity, we would never have succeeded.', options: ['for', 'if', 'had', 'were'], correctIndex: 0, explanation: '\"But for\" = nếu không có' },
        { sentence: '___ he to apologize, I would forgive him immediately.', options: ['If', 'Should', 'Had', 'Were'], correctIndex: 3, explanation: 'Đảo ngữ → Were he to apologize' },
      ],
    },
    {
      id: 312, title: 'Concession & Contrast', description: 'Nhượng bộ và tương phản',
      explanation: 'Các cấu trúc diễn tả sự nhượng bộ (mặc dù... nhưng...).\\n\\nAlthough / Even though / Though + clause: mặc dù\\n- Although it rained, we enjoyed the picnic.\\n\\nDespite / In spite of + noun / V-ing: mặc dù\\n- Despite the rain, we went out.\\n- In spite of being tired, she continued working.\\n\\nHowever / Nevertheless / Nonetheless: tuy nhiên (đầu câu mới)\\n- It was raining. However, we went out.\\n\\nWhile / Whereas: trong khi (so sánh hai mặt)\\n- While I enjoy cooking, my husband prefers eating out.\\n\\nMuch as + clause: dù... đến mấy\\n- Much as I admire him, I cannot agree with his decision.',
      examples: [
        { correct: 'Although she was tired, she finished the race.', incorrect: 'Although she was tired, but she finished the race.' },
        { correct: 'In spite of the bad weather, the flight took off.' },
        { correct: 'He is very rich. Nevertheless, he is not happy.' },
        { correct: 'While some people love city life, others prefer the countryside.' },
      ],
      exercises: [
        { sentence: '___ it was cold, they went swimming.', options: ['Despite', 'Although', 'In spite', 'However'], correctIndex: 1, explanation: '\"Although\" + clause (S + V)' },
        { sentence: '___ the rain, we enjoyed the trip.', options: ['Although', 'Despite', 'Even', 'However'], correctIndex: 1, explanation: '\"Despite\" + noun phrase' },
        { sentence: 'She was exhausted. ___, she kept working.', options: ['Despite', 'Although', 'Nevertheless', 'In spite'], correctIndex: 2, explanation: 'Đầu câu mới, tương phản → Nevertheless' },
        { sentence: 'I like tea, ___ my brother prefers coffee.', options: ['although', 'despite', 'whereas', 'however'], correctIndex: 2, explanation: 'So sánh hai mặt → whereas' },
        { sentence: '___ as I admire his talent, I disagree with his views.', options: ['Although', 'Despite', 'Much', 'Even'], correctIndex: 2, explanation: '\"Much as\" = dù... đến mấy' },
        { type: 'transformation', instruction: 'Viết lại câu với \"Despite\".', prompt: 'Although she was tired, she continued. → Despite...', answer: 'Despite being tired, she continued.', hint: '\"Despite\" + V-ing' },
        { type: 'transformation', instruction: 'Viết lại câu với \"Although\".', prompt: 'In spite of his injury, he played. → Although...', answer: 'Although he was injured, he played.', hint: '\"Although\" + clause (S + V)' },
        { type: 'error-correction', sentence: 'Although it rained, but we went out.', error: 'Không dùng cả \"although\" và \"but\" trong cùng một câu', correction: 'Although it rained, we went out.', hint: 'Chỉ dùng một từ nối: although hoặc but, không dùng cả hai' },
        { type: 'error-correction', sentence: 'Despite the weather was bad, we went out.', error: '\"Despite\" + noun, không phải clause. Dùng \"although\" cho clause', correction: 'Although the weather was bad, we went out.', hint: 'Despite + N, Although + S + V' },
        { sentence: '___ the high cost of living, many people move to big cities.', options: ['Although', 'Despite', 'However', 'Whereas'], correctIndex: 1, explanation: '\"Despite\" + noun phrase' },
        { sentence: 'The team played badly. ___, they managed to win.', options: ['Despite', 'Although', 'Nevertheless', 'Whereas'], correctIndex: 2, explanation: 'Đầu câu mới → Nevertheless' },
        { sentence: '___ some people enjoy winter sports, others find them too dangerous.', options: ['Despite', 'In spite of', 'While', 'However'], correctIndex: 2, explanation: 'So sánh hai nhóm người → While' },
      ],
    },
`;

// --- C2 New Lessons (insert after C2 closing bracket) ---
const newC2Lessons = `
    {
      id: 407, title: 'Fronting & Inversion for Emphasis', description: 'Đảo thành phần lên đầu câu để nhấn mạnh',
      explanation: 'Đưa thành phần phụ lên đầu câu để nhấn mạnh, kèm đảo ngữ.\\n\\nTân ngữ + Aux + S + V:\\n- Such a beautiful sight had I never seen before.\\n\\nCụm giới từ + V + S:\\n- In the corner of the room stood a mysterious figure.\\n\\nTính từ / Trạng từ + Aux + S + V:\\n- So quickly did she finish that everyone was amazed.\\n\\nĐộng từ nguyên mẫu + as/though + S + may/might: Dù có...\\n- Try as he might, he could not open the door.\\n\\nCác cấu trúc đặc biệt:\\n- Not a single word did she say.\\n- At no time was he aware of the danger.\\n- On no account should you open this door.\\n- In no way am I responsible for this mess.\\n\\nCấu trúc với \"such\":\\n- Such is the power of social media that news spreads instantly.\\n- Such was his anger that he couldn\\'t speak.',
      examples: [
        { correct: 'Not a word did he say during the entire meeting.', incorrect: 'Not a word he said during the entire meeting.' },
        { correct: 'So devastating was the storm that many homes were destroyed.' },
        { correct: 'Try as she might, she couldn\\'t remember his name.' },
        { correct: 'On no account should you open this door while the engine is running.' },
      ],
      exercises: [
        { sentence: 'Not a single mistake ___ she ___ (make) in the exam.', options: ['she made', 'did she make', 'she did make', 'had she made'], correctIndex: 1, explanation: '\"Not a\" đầu câu → did she make' },
        { sentence: 'So ___ (powerful) was his speech that it moved everyone to tears.', options: ['powerful', 'powerfully', 'power', 'powered'], correctIndex: 0, explanation: '\"So + adj + be + S\" → So powerful was...' },
        { sentence: 'Under no circumstances ___ you ___ (leave) the building.', options: ['you must leave', 'must you leave', 'you should leave', 'you leave'], correctIndex: 1, explanation: '\"Under no circumstances\" → must you leave' },
        { sentence: '___ as he tried, he could not solve the puzzle.', options: ['Try', 'Tried', 'Trying', 'To try'], correctIndex: 0, explanation: '\"Try as he might\" = dù cố gắng thế nào' },
        { sentence: '___ is the beauty of this place that visitors often cry.', options: ['So', 'Such', 'Very', 'Too'], correctIndex: 1, explanation: '\"Such + be + N + that\" → Such is the beauty' },
        { type: 'transformation', instruction: 'Viết lại câu với \"Not a...\" đảo ngữ.', prompt: 'She did not say a single word. → Not a single word...', answer: 'Not a single word did she say.', hint: '\"Not a\" đầu câu → đảo trợ động từ lên trước S' },
        { type: 'transformation', instruction: 'Viết lại câu với đảo ngữ \"So...\".', prompt: 'The storm was so powerful that many trees fell. → So powerful...', answer: 'So powerful was the storm that many trees fell.', hint: '\"So + adj + be + S\" → So powerful was the storm' },
        { type: 'error-correction', sentence: 'Not a word he said during the meeting.', error: 'Sau \"Not a word\" đầu câu phải đảo trợ động từ', correction: 'Not a word did he say during the meeting.', hint: 'Phủ định đầu câu → đảo aux + S + V' },
        { type: 'error-correction', sentence: 'So beautiful the sunset was that we stopped to watch.', error: 'Với \"So... that\", phải đảo be lên trước S', correction: 'So beautiful was the sunset that we stopped to watch.', hint: 'So + adj + be + S + that...' },
        { sentence: 'At no time ___ the manager aware of the problem.', options: ['was', 'did', 'is', 'had'], correctIndex: 0, explanation: '\"At no time\" đầu câu → was the manager aware' },
        { sentence: 'In no way ___ I responsible for this failure.', options: ['am', 'do', 'have', 'was'], correctIndex: 0, explanation: '\"In no way\" → am I (hiện tại)' },
        { sentence: 'Only by working together ___ we achieve our goals.', options: ['we can', 'can we', 'we could', 'we will'], correctIndex: 1, explanation: '\"Only by\" đầu câu → can we' },
      ],
    },
`;

// ============================================================
// 3) Find insertion points and inject new lessons
// ============================================================

// Insert A1-A2 new lessons after the last A1-A2 lesson (after id: 108 closing)
// Find "],\n\n  'B1':" which separates A1-A2 from B1
const a1a2EndMarker = "  ],\n\n  'B1':";
if (content.includes(a1a2EndMarker)) {
  content = content.replace(a1a2EndMarker, newA1A2Lessons + "  ],\n\n  'B1':");
  console.log('✓ Added 4 new A1-A2 grammar lessons');
} else {
  console.log('! Could not find A1-A2 end marker');
}

// Insert B1 new lessons after the last B1 lesson (before "  'B2':")
const b1EndMarker = "  ],\n\n  'B2':";
if (content.includes(b1EndMarker)) {
  content = content.replace(b1EndMarker, newB1Lessons + "  ],\n\n  'B2':");
  console.log('✓ Added 3 new B1 grammar lessons');
} else {
  console.log('! Could not find B1 end marker');
}

// Insert B2 new lessons after the last B2 lesson (before "  'C1':")
const b2EndMarker = "  ],\n\n  'C1':";
if (content.includes(b2EndMarker)) {
  content = content.replace(b2EndMarker, newB2Lessons + "  ],\n\n  'C1':");
  console.log('✓ Added 2 new B2 grammar lessons');
} else {
  console.log('! Could not find B2 end marker');
}

// Insert C1 new lessons after the last C1 lesson (before "  'C2':")
const c1EndMarker = "  ],\n\n  'C2':";
if (content.includes(c1EndMarker)) {
  content = content.replace(c1EndMarker, newC1Lessons + "  ],\n\n  'C2':");
  console.log('✓ Added 2 new C1 grammar lessons');
} else {
  console.log('! Could not find C1 end marker');
}

// Insert C2 new lessons after the last C2 lesson (before "}\n\nexport const writingFunctionGroups")
const c2EndMarker = "  ],\n}\n\nexport const writingFunctionGroups";
if (content.includes(c2EndMarker)) {
  content = content.replace(c2EndMarker, newC2Lessons + "  ],\n}\n\nexport const writingFunctionGroups");
  console.log('✓ Added 1 new C2 grammar lesson');
} else {
  console.log('! Could not find C2 end marker');
}

// ============================================================
// 4) Expand exercises in EXISTING grammar lessons by adding more exercises
//    Target: ~10-12 exercises per lesson (MCQ + transformation + error-correction)
// ============================================================

// For existing A1-A2 lessons (IDs 101-108), add more exercises
// To keep things manageable, let me expand a few key lessons that are most needed

fs.writeFileSync(grammarPath, content, 'utf8');
console.log('✓ Grammar file saved successfully');
