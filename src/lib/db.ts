import Dexie, { Table } from 'dexie'
import type { Level } from '@/context/LevelContext'

export interface VocabProgress {
  id?: number
  level: Level
  wordId: number
  easeFactor: number
  interval: number
  nextReview: number
  correctCount: number
  wrongCount: number
  learned: boolean
}

export interface QuizResult {
  id?: number
  level: Level
  date: number
  skill: string
  score: number
  total: number
}

export interface DailyLog {
  id?: number
  level: Level
  date: string
  wordsReviewed: number
  exercisesDone: number
  quizTaken: number
  streak: number
}

export interface Achievement {
  id?: number
  level: Level
  type: string
  unlockedAt: number
}

class EnglishDB extends Dexie {
  vocabProgress!: Table<VocabProgress, number>
  quizResults!: Table<QuizResult, number>
  dailyLogs!: Table<DailyLog, number>
  achievements!: Table<Achievement, number>

  constructor() {
    super('KawaiiEnglishDB')
    this.version(2).stores({
      vocabProgress: '++id, level, wordId, nextReview',
      quizResults: '++id, level, date, skill',
      dailyLogs: '++id, level, date',
      achievements: '++id, level, type',
    })
  }
}

const db = new EnglishDB()

export async function getVocabProgress(wordId: number, level: Level) {
  return db.vocabProgress.where({ wordId, level }).first()
}

export async function updateVocabProgress(
  wordId: number,
  correct: boolean,
  level: Level
) {
  const existing = await getVocabProgress(wordId, level)
  const now = Date.now()

  if (!existing) {
    return db.vocabProgress.add({
      level,
      wordId,
      easeFactor: 2.5,
      interval: correct ? 1 : 0,
      nextReview: correct ? now + 86400000 : now,
      correctCount: correct ? 1 : 0,
      wrongCount: correct ? 0 : 1,
      learned: correct,
    })
  }

  const newCorrect = existing.correctCount + (correct ? 1 : 0)
  const newWrong = existing.wrongCount + (correct ? 0 : 1)
  let ease = existing.easeFactor
  let interval = existing.interval

  if (correct) {
    ease = Math.min(ease + 0.15, 3.0)
    interval = interval === 0 ? 1 : Math.round(interval * ease)
  } else {
    ease = Math.max(ease - 0.3, 1.3)
    interval = 0
  }

  return db.vocabProgress.put({
    ...existing,
    wordId,
    easeFactor: ease,
    interval,
    nextReview: now + interval * 86400000,
    correctCount: newCorrect,
    wrongCount: newWrong,
    learned: newCorrect > newWrong && newCorrect >= 3,
  })
}

export async function getDueVocabIds(level: Level) {
  const now = Date.now()
  const items = await db.vocabProgress
    .where({ level })
    .filter((p) => p.nextReview <= now)
    .toArray()
  return items.map((i) => i.wordId)
}

export async function saveQuizResult(level: Level, skill: string, score: number, total: number) {
  return db.quizResults.add({
    level,
    date: Date.now(),
    skill,
    score,
    total,
  })
}

export async function getRecentQuizResults(level: Level) {
  const weekAgo = Date.now() - 7 * 86400000
  return db.quizResults
    .where({ level })
    .filter((r) => r.date >= weekAgo)
    .toArray()
}

export async function getAllQuizResults(level?: Level) {
  if (level) return db.quizResults.where({ level }).toArray()
  return db.quizResults.toArray()
}

export async function getTodayLog(level: Level): Promise<DailyLog | undefined> {
  const today = new Date().toISOString().slice(0, 10)
  return db.dailyLogs.where({ date: today, level }).first()
}

export async function updateDailyLog(field: 'wordsReviewed' | 'exercisesDone' | 'quizTaken', level: Level) {
  const today = new Date().toISOString().slice(0, 10)
  let log = await db.dailyLogs.where({ date: today, level }).first()

  if (!log) {
    const allLogs = await db.dailyLogs
      .where({ level })
      .reverse()
      .sortBy('date')

    const prev = allLogs[0]

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yStr = yesterday.toISOString().slice(0, 10)
    const streak = prev?.date === yStr ? (prev.streak || 0) + 1 : 1

    log = {
      level,
      date: today,
      wordsReviewed: 0,
      exercisesDone: 0,
      quizTaken: 0,
      streak,
    }
  }

  log[field]++
  await db.dailyLogs.put(log)

  if (log.streak >= 3) await unlockAchievement(`streak_${log.streak >= 30 ? 30 : log.streak >= 7 ? 7 : 3}`, level)
  return log
}

export async function getStreak(level: Level) {
  const todayLog = await getTodayLog(level)
  if (todayLog) return todayLog.streak

  const allLogs = await db.dailyLogs
    .where({ level })
    .reverse()
    .sortBy('date')
  const lastLog = allLogs[0]
  if (!lastLog) return 0

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yStr = yesterday.toISOString().slice(0, 10)

  return lastLog.date === yStr ? lastLog.streak : 0
}

export async function getAllDailyLogs(level: Level) {
  return db.dailyLogs.where({ level }).toArray()
}

export async function unlockAchievement(type: string, level: Level) {
  const exists = await db.achievements.where({ type, level }).first()
  if (!exists) {
    await db.achievements.add({ level, type, unlockedAt: Date.now() })
  }
}

export async function getAchievements(level: Level) {
  return db.achievements.where({ level }).toArray()
}

export default db
