# Kawaii English - Học IELTS

A full-featured IELTS practice app covering all 4 skills from A1 to C2 with a cute **Kawaii** pastel design.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database | Dexie.js (IndexedDB) — client-side, offline |
| Speech | Web Speech API (TTS for listening) |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

## Modules

- **Dashboard** — Streak calendar, stats, module grid
- **Vocabulary** — 430+ flashcards with spaced repetition (SM-2), audio, topic filter
- **Grammar** — 50+ lessons with MCQs, instant feedback, explanations
- **Reading** — 30+ passages with comprehension questions, timer
- **Listening** — 15+ audio exercises via TTS, MCQs, note completion, map labelling
- **Writing** — 20+ prompts with word counter, self-check checklist
- **Speaking** — 50+ topics (Part 1 & 2) with cue cards, tips, keywords
- **Mock Test** — Full IELTS-style timed mock tests
- **Quiz** — Mixed-skill quizzes, scored & saved to history
- **Progress** — Streak tracking, skill scores, achievement badges

## CEFR Levels

| Level | Description |
|-------|-------------|
| A1-A2 | Basic — everyday vocab, present tenses, simple sentences |
| B1 | Intermediate — compound sentences, paragraph reading, letter writing |
| B2 | Upper-Intermediate — complex sentences, news reading, essay writing |
| C1 | Advanced — collocations, academic reading, analysis |
| C2 | Proficient — idioms, research papers, synthesis essays |

## Architecture

```
src/
├── app/               # Next.js App Router pages
├── components/        # Shared & UI components
├── context/           # LevelProvider, ThemeProvider
├── data/              # All lesson content (vocabulary, grammar, reading, etc.)
├── hooks/             # Custom hooks (useConfetti, useTimer, etc.)
├── lib/               # Dexie DB schema & CRUD
└── types/             # TypeScript definitions
```

## Data

All content is client-side, loaded from TypeScript data files:

- 430+ vocabulary words with definitions, examples, synonyms, collocations
- 50+ grammar lessons covering all CEFR levels
- 30+ reading passages with diverse question types
- 15+ listening exercises with transcripts
- 20+ writing prompts with sample structures
- 50+ speaking topics

## Database (IndexedDB via Dexie)

| Table | Key | Fields |
|-------|-----|--------|
| vocabProgress | ++id, level, wordId | easeFactor, interval, nextReview, correctCount, wrongCount, learned |
| quizResults | ++id, level, date, skill | score, total |
| dailyLogs | ++id, level, date | wordsReviewed, exercisesDone, quizTaken, streak |
| achievements | ++id, level, type | unlockedAt |

## License

MIT
