# Kawaii English - Học IELTS

App học IELTS luyện đầy đủ 4 kỹ nhăng từ trình độ A1 đến C2, thiết kế phong cách **Kawaii** (pastel, bo tròn, mềm mại).

## Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom classes |
| Animation | Framer Motion |
| Icon | Lucide React |
| Database | Dexie.js (IndexedDB) — client-side, offline |
| Speech | Web Speech API (TTS cho listening) |

## Cài đặt & Chạy

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Kiến trúc

```
src/
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Dashboard — thống kê + module grid
│   ├── layout.tsx         # Root layout — NavBar + BottomNav + LevelProvider
│   ├── grammar/           # Ngữ pháp
│   ├── listening/         # Nghe
│   ├── progress/          # Tiến độ & thành tích
│   ├── quiz/              # Quiz tổng hợp 4 kỹ năng
│   ├── reading/           # Đọc hiểu
│   ├── vocabulary/        # Từ vựng (flashcard)
│   └── writing/           # Viết
├── components/
│   ├── shared/            # NavBar (desktop sidebar), BottomNav (mobile)
│   └── ui/                # KawaiiCard, KawaiiButton, Badge, ProgressRing,
│                          # StreakCalendar, LevelSelector, LevelBadge
├── context/
│   └── LevelContext.tsx   # Level state (A1-A2 → C2), localStorage persist
├── data/                  # Nội dung học theo từng level
│   ├── vocabulary.ts      # 430 từ vựng (5 level)
│   ├── grammar.ts         # 47 bài học ngữ pháp
│   ├── reading.ts         # 24 đoạn văn đọc hiểu
│   ├── listening.ts       # 12 bài nghe
│   └── writing.ts         # 18 đề viết
└── lib/
    └── db.ts              # Dexie schema + CRUD (vocabProgress, quizResults,
                           # dailyLogs, achievements)
```

## CEFR Levels

| Level | Mô tả |
|-------|-------|
| A1-A2 | Căn bản — từ vựng hàng ngày, thì hiện tại, câu đơn giản |
| B1 | Trung cấp — câu ghép, đọc hiểu đoạn văn, viết thư |
| B2 | Trung cao — câu phức, đọc báo, viết luận |
| C1 | Cao — collocations, đọc học thuật, phân tích |
| C2 | Thành thạo — idioms, nghiên cứu, synthesis essay |

Người dùng chọn level qua dropdown ở sidebar (desktop) và lưu vào localStorage. Mọi module đều lọc nội dung theo level đang chọn.

## Modules

### Dashboard (`/`)
- Lời chào theo giờ
- Streak calendar + badges
- 3 thống kê nhanh (số từ, số quiz, điểm TB)
- Grid các module học

### Từ vựng (`/vocabulary`)
- Flashcard với mặt trước (từ) / mặt sau (nghĩa, ví dụ, phát âm)
- Lật thẻ, phát âm (Web Speech API)
- Bộ lọc theo chủ đề (topic)
- Spaced Repetition (SM-2 variant): ease factor, interval, due queue
- Chế độ học (study) và tổng quan (list)

### Ngữ pháp (`/grammar`)
- Danh sách bài học → chọn bài → làm exercise
- Multiple choice + instant feedback + giải thích
- Lưu điểm từng bài (localStorage)

### Đọc hiểu (`/reading`)
- Chọn đoạn văn → đọc → trả lời câu hỏi
- Timer đếm thời gian đọc
- Lưu điểm từng passage (localStorage)

### Nghe (`/listening`)
- Chọn bài → nghe (TTS) → chọn đáp án
- Nút phát lại nhiều lần

### Viết (`/writing`)
- Chọn đề → viết tự do
- Word counter, tự kiểm tra với checklist
- Không chấm điểm tự động (người dùng tự đánh giá)

### Quiz (`/quiz`)
- 12 câu hỏi tổng hợp từ 4 kỹ năng (từ vựng, ngữ pháp, đọc, nghe)
- Tính điểm + thời gian làm bài
- Lưu kết quả vào IndexedDB

### Tiến độ (`/progress`)
- Streak hiện tại
- Biểu đồ điểm theo kỹ năng (dạng ProgressRing)
- Lịch sử quiz gần đây
- Danh sách thành tích (achievements: streak 3/7/30 ngày)

## Database (IndexedDB via Dexie)

| Table | Key | Fields |
|-------|-----|--------|
| vocabProgress | ++id, level, wordId | easeFactor, interval, nextReview, correctCount, wrongCount, learned |
| quizResults | ++id, level, date, skill | score, total |
| dailyLogs | ++id, level, date | wordsReviewed, exercisesDone, quizTaken, streak |
| achievements | ++id, level, type | unlockedAt |

Mỗi bảng đều có index `level` để truy vấn theo trình độ.

## Kawaii UI Theme

| Token | Giá trị |
|-------|---------|
| `kawaii-pink` | #FFB5C2 |
| `kawaii-lavender` | #C3AED6 |
| `kawaii-mint` | #B5EAD7 |
| `kawaii-peach` | #FFDAC1 |
| `kawaii-yellow` | #FFF5BA |
| `kawaii-bg` | #FFF8F5 |
| Shadow | `0 4px 16px rgba(195, 174, 214, 0.25)` |
| Radius | 20px (`.rounded-kawaii`) |
| Font | Nunito (Google Fonts) |
| Background | Dot pattern radial gradient |

## Nội dung chi tiết

### Từ vựng (430 từ)
- A1-A2: 30 từ (chủ đề: Food, School, Animals, Colors, Family...)
- B1: 50 từ (Work, Hobbies, Travel, Health, Technology...)
- B2: 40 từ (Environment, Business, Psychology, Media...)
- C1: 40 từ (Academic, Law, Medicine, Economics...)
- C2: 30 từ (Advanced: ubiquitous, juxtaposition, quintessential...)

### Ngữ pháp (47 bài)
- A1-A2: 8 bài (To be, Present Simple, There is/are, Prepositions...)
- B1: 15 bài (Present Perfect, Conditional 1, Passive, Relative Clauses...)
- B2: 10 bài (Conditional 3, Subjunctive, Inversion, Mixed Conditionals...)
- C1: 8 bài (Hedging, Cleft Sentences, Fronting, Collocations...)
- C2: 6 bài (Ellipsis, Inversion for Emphasis, Literary Tenses...)

### Đọc hiểu (24 đoạn)
- A1-A2: 4 bài (My Family, My School, My Pet, My Day)
- B1: 6 bài (Daily Routine, Healthy Lifestyle, My Favorite City...)
- B2: 6 bài (Social Media, Urbanization, Renewable Energy...)
- C1: 4 bài (AI, Neuroscience, Quantum Computing, Energy Transition)
- C2: 4 bài (Consciousness, Language Origins, Quantum Cryptography...)

### Nghe (12 bài)
- A1-A2: 2 bài (Basic Introductions, Everyday Objects)
- B1: 3 bài (Shopping Dialogues, Travel Conversations, Daily Life)
- B2: 3 bài (Job Interviews, News Reports, Academic Discussions)
- C1: 2 bài (Academic Lectures, Documentary Extracts)
- C2: 2 bài (Advanced Research Presentations, Expert Interviews)

### Viết (18 đề)
- A1-A2: 3 đề (Introduce Yourself, Describe Family, Favorite Animal)
- B1: 5 đề (Describe Hometown, Letter of Complaint, Importance of Education...)
- B2: 4 đề (Advantages of Tourism, Describe a Person You Admire...)
- C1: 3 đề (For and Against Remote Work, Proposal: Public Spaces...)
- C2: 3 đề (Synthesis: Consciousness & AI, Policy Brief, Critical Review)

## Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (<1024px) | Bottom nav 5 tabs, content full-width |
| Desktop (≥1024px) | Sidebar nav trái + LevelSelector, content padded |

## Build

```bash
npm run build     # Kiểm tra lỗi TypeScript + generate static pages
npm run dev       # Dev server với hot reload
```
