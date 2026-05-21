# IELTS Practice App — Improvement Plan (Target Band 6.5)

> Based on assessment in `COMMENT.md`

---

## Sprint 1: Short-term (1-2 tuần)

### 1.1 Listening — thay TTS bằng audio thật ✅
- Tạo thư mục `public/audio/` chứa file audio `.mp3`
- Sửa `src/data/listening.ts`: mỗi bài có field `audioSrc`, `transcript`, section format (Section 1-4)
- Sửa `src/app/listening/page.tsx`: dùng `<audio>` element + transcript display
- **Bonus**: Thêm dạng Note Completion, Map Labelling

### 1.2 Reading — thêm TFNG & Matching Headings ✅
- Sửa `src/data/reading.ts`: thêm field `questionType: 'mcq' | 'tfng' | 'headings'`
- Tạo component `TFNGQuestion`, `HeadingsQuestion` riêng
- Kéo dài passage lên 600-800 từ cho B2+
- Thêm timer 20 phút/passage

### 1.3 Speaking — module mới (Part 1, 2, 3) ✅
- Tạo `src/data/speaking.ts`: cấu trúc `SpeakingTopic`
- Tạo `src/app/speaking/page.tsx`: flow chọn Part → prompt → record → nghe lại → rubric
- Thêm nav item cho Speaking vào `NavBar` & `BottomNav`

---

## Sprint 2: Medium-term (2-4 tuần)

### 2.1 Vocabulary — mở rộng ✅
- Tăng từ ~190 lên 336 từ, thêm field `collocations`, `synonyms`, `wordFamily`
- Thêm `src/data/vocabulary-exercises.ts`: 60 gap-fill + 12 synonym match exercises
- Tạo `GapFillExercise.tsx` (chọn đáp án) + `SynonymMatchExercise.tsx` (nối từ)
- Update flashcard back hiển thị collocations/synonyms/wordFamily dạng badge
- Thêm tabs Danh sách / Gap-fill / Nối từ trên vocabulary page

### 2.2 Grammar — thêm dạng bài tập mới ✅
- Mở rộng `GrammarExercise` interface: thêm type `transformation` và `error-correction`
- Tạo `TransformationExercise.tsx` (viết lại câu theo cấu trúc cho trước)
- Tạo `ErrorCorrectionExercise.tsx` (tìm và sửa lỗi sai)
- Thêm ~12 bài transformation + error-correction vào các lesson B1/B2 chính
- Thêm `WritingFunctionGroup[]`: 5 nhóm ngữ pháp cho Writing (describe trends, express opinion, compare-contrast, time-sequence, cause-effect)
- Cập nhật grammar page: tabs chọn dạng bài tập (MCQ / Transformation / Error Correction)

### 2.3 Writing — sample answers + Task 1/2 ✅
- Mở rộng `WritingPrompt` interface: thêm `taskType` (task1/task2), `sampleAnswer`, `bandLevel`, `commonMistakes`, `visual`
- Thêm Task 1 prompts: bar chart, pie chart, line graph, table, multi-line graph (2-3 bài/level)
- Giữ và mở rộng Task 2 prompts: opinion essay, letter, proposal, critical analysis, synthesis essay (2-3 bài/level)
- Thêm sample answers + band descriptor cho tất cả prompts (tổng cộng ~18 bài)
- Cập nhật writing page: tabs Task 1 / Task 2 / All, nút xem bài mẫu, band indicator, lỗi thường gặp
- Tích hợp AI feedback: tạo route `api/writing-feedback` hỗ trợ Gemini & OpenAI
- Cập nhật Badge và KawaiiCard thêm variant `blue` để phân biệt Task 1

### 2.4 UI/UX — cải thiện ✅
- Dark mode: `ThemeContext`, class-based dark mode (tailwind `darkMode: 'class'`), toggle ở NavBar
- Dark mode variables: thêm `kawaii-bg-dark`, `kawaii-card-bg-dark`, `kawaii-text-dark`, `kawaii-text-light-dark`
- Confetti component: canvas-based particle animation, 80 particles, 2s duration + fade
- Confetti tích hợp vào grammar, reading, listening, quiz, gap-fill completion (khi đạt ≥80%)
- Accessibility: `aria-label` cho nav links, buttons, level selector; `aria-expanded` cho dropdown
- `focus-visible:ring` cho tất cả button và link
- Cập nhật KawaiiCard, KawaiiButton, BottomNav, NavBar, LevelSelector, globals.css cho dark mode
- `.env.example` + instructions

---

## Sprint 3: Advanced Features (4-8 tuần)

### 3.1 Full Mock Test (3 tuần) ✅

**Unified test engine:**
- `src/types/mock-test.ts` — `MockTest`, `MockTestSection`, `MockTestQuestion` interfaces (type: `listening|reading|writing|speaking`, mỗi section có `timeLimit`)
- `src/components/mock-test/MockTestTimer.tsx` — countdown 120 phút, cảnh báo <5 phút, auto-submit khi hết giờ
- `src/components/mock-test/BandEstimator.ts` — function `estimateBand(skill, correct, total)` mapping % sang IELTS band

**Mock test data:**
- `src/data/mock-test.ts` — 1-2 full tests, mỗi test gồm Listening (30', 40 câu), Reading (60', 40 câu), Writing (60', 2 tasks), Speaking (11-14')
- Tận dụng lại các dạng câu hỏi có sẵn: MCQ, TFNG, Headings, Gap-fill, Transformation, Note-completion

**App flow:**
- `src/app/mock-test/page.tsx` — danh sách tests, nút Start + thông tin band mục tiêu
- `src/app/mock-test/[id]/page.tsx` — flow chính: section list → chọn section → làm bài → timer đồng bộ → submit → chuyển section
- `src/app/mock-test/result/[id]/page.tsx` — kết quả chi tiết: estimated band từng skill + overall, breakdown đúng/sai, common mistakes

**Storage:**
- `src/lib/db.ts` — thêm table `mockTestResults` (testId, skillScores, overallBand, date, answers[])
- `src/app/progress/page.tsx` — hiển thị lịch sử mock test

**Files mới:** ~10, **Files sửa:** 3 (lib/db.ts, progress/page.tsx, types/*)

---

### 3.2 Audio đa dạng + speed control ✅

**Accent selector:**
- 4 accents: British 🇬🇧, American 🇺🇸, Australian 🇦🇺, Indian 🇮🇳
- Button group UI, mỗi lần chọn sẽ cập nhật `SpeechSynthesisUtterance.lang` + chọn giọng tương ứng

**Speed control:**
- Range slider 0.5×–1.5× + quick presets (0.5, 0.75, 1, 1.25, 1.5)
- `utterance.rate = speed`, mặc định 0.8×

**UI:**
- Settings panel toggle (icon `Settings2`) hiển thị ngay dưới nút play
- Hiển thị accent + speed hiện tại trên nút settings

---

### 3.3 Advanced Speaking ✅

**AI scoring:**
- `src/app/api/speaking-feedback/route.ts` — Gemini & OpenAI, trả về JSON: `estimatedBand`, `scores` (fluency/vocab/grammar/pronunciation/taskAchievement), `strengths[]`, `improvements[]`, `overallFeedback`
- ProgressRing hiển thị 5 tiêu chí riêng, band tổng thể

**Speech-to-text:**
- `webkitSpeechRecognition` API, `continuous: true, interimResults: true`
- Real-time transcript panel hiển thị trong lúc ghi âm
- Tự động clear khi record lại, word count sau khi stop

**Enhanced UI:**
- Transcript real-time (kèm interim text) + transcript sau khi ghi âm
- AI Feedback panel: band estimate, 5 skill scores (ProgressRing), strengths, improvements, overall feedback
- Lưu vào Dexie table `speakingResults` (transcript, scores, self-eval)

**Files mới:** 1 (API route), **Files sửa:** 2 (page.tsx, lib/db.ts)

---

### 3.4 stretch — Refactor + minor ✅
- Shared types: `src/types/quiz.ts` — `QuizQuestion` interface, cập nhật import trong `quiz/page.tsx`
- PWA: `public/manifest.json` (name, icons, theme color), `public/sw.js` (cache-first cho static routes)
- Layout: thêm `manifest` metadata, `viewport` export (themeColor), Script register SW, `apple-touch-icon`, `appleWebApp`
- App chạy được offline cơ bản, add-to-home-screen trên iOS/Android
