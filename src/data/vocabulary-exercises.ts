import type { Level } from '@/context/LevelContext'

export interface GapFillExercise {
  id: number
  sentence: string
  blank: string
  options: string[]
  correctIndex: number
  topic: string
}

export interface SynonymPair {
  word: string
  synonym: string
}

export interface SynonymMatchExercise {
  id: number
  pairs: SynonymPair[]
}

export const gapFillExercises: Record<Level, GapFillExercise[]> = {
  'A1-A2': [
    { id: 1, sentence: 'I eat an ___ every day for breakfast.', blank: 'apple', options: ['apple', 'book', 'cat', 'table'], correctIndex: 0, topic: 'Food & Drink' },
    { id: 2, sentence: 'Please open your ___ to page 10.', blank: 'book', options: ['book', 'car', 'house', 'water'], correctIndex: 0, topic: 'School' },
    { id: 3, sentence: 'The ___ is sleeping on the sofa.', blank: 'cat', options: ['dog', 'cat', 'bird', 'fish'], correctIndex: 1, topic: 'Animals' },
    { id: 4, sentence: 'We live in a big ___.', blank: 'house', options: ['house', 'school', 'kitchen', 'station'], correctIndex: 0, topic: 'Home' },
    { id: 5, sentence: 'I ___ milk for breakfast.', blank: 'drink', options: ['eat', 'drink', 'sleep', 'read'], correctIndex: 1, topic: 'Food & Drink' },
    { id: 6, sentence: 'The sun is ___.', blank: 'yellow', options: ['red', 'green', 'yellow', 'blue'], correctIndex: 2, topic: 'Colors' },
    { id: 7, sentence: 'My ___ is John.', blank: 'name', options: ['father', 'name', 'friend', 'book'], correctIndex: 1, topic: 'Daily Life' },
    { id: 8, sentence: 'The ___ is very cold in Hanoi.', blank: 'winter', options: ['summer', 'winter', 'weather', 'spring'], correctIndex: 1, topic: 'Weather' },
    { id: 9, sentence: 'This phone is too ___.', blank: 'expensive', options: ['cheap', 'beautiful', 'expensive', 'small'], correctIndex: 2, topic: 'Shopping' },
    { id: 10, sentence: 'I ___ early every day.', blank: 'wake up', options: ['wake up', 'sleep', 'sit', 'run'], correctIndex: 0, topic: 'Daily Life' },
  ],
  'B1': [
    { id: 11, sentence: 'My ___ helped me with the project at work.', blank: 'colleague', options: ['relative', 'colleague', 'neighbor', 'stranger'], correctIndex: 1, topic: 'Work' },
    { id: 12, sentence: 'We must finish before the ___.', blank: 'deadline', options: ['schedule', 'deadline', 'meeting', 'holiday'], correctIndex: 1, topic: 'Education' },
    { id: 13, sentence: 'A balanced ___ is important for health.', blank: 'diet', options: ['diet', 'meal', 'recipe', 'ingredient'], correctIndex: 0, topic: 'Health' },
    { id: 14, sentence: 'We must protect the ___.', blank: 'environment', options: ['climate', 'environment', 'pollution', 'recycle'], correctIndex: 1, topic: 'Environment' },
    { id: 15, sentence: 'The ___ offered me a job.', blank: 'employer', options: ['colleague', 'employer', 'customer', 'manager'], correctIndex: 1, topic: 'Work' },
    { id: 16, sentence: 'You should ___ your software regularly.', blank: 'update', options: ['download', 'connect', 'update', 'delete'], correctIndex: 2, topic: 'Technology' },
    { id: 17, sentence: 'She ___ from the illness quickly.', blank: 'recovered', options: ['recovered', 'relaxed', 'concentrated', 'promoted'], correctIndex: 0, topic: 'Health' },
    { id: 18, sentence: 'The ___ clapped loudly after the show.', blank: 'audience', options: ['audience', 'performance', 'customer', 'passenger'], correctIndex: 0, topic: 'Leisure' },
    { id: 19, sentence: 'We need to find a ___ to this problem.', blank: 'solution', options: ['solution', 'challenge', 'benefit', 'difficulty'], correctIndex: 0, topic: 'Education' },
    { id: 20, sentence: 'She has a positive ___ towards life.', blank: 'attitude', options: ['habit', 'attitude', 'behavior', 'decision'], correctIndex: 1, topic: 'Feelings' },
    { id: 21, sentence: 'We should ___ plastic waste to help the environment.', blank: 'reduce', options: ['increase', 'reduce', 'ignore', 'collect'], correctIndex: 1, topic: 'Environment' },
    { id: 22, sentence: 'You need to ___ to new situations when you travel.', blank: 'adapt', options: ['ignore', 'adapt', 'compete', 'confuse'], correctIndex: 1, topic: 'Travel' },
    { id: 23, sentence: 'Reading is a good ___ that everyone should develop.', blank: 'habit', options: ['habit', 'hobby', 'skill', 'subject'], correctIndex: 0, topic: 'Daily Life' },
    { id: 24, sentence: 'She ___ me to join the English club.', blank: 'convinced', options: ['confused', 'convinced', 'collected', 'communicated'], correctIndex: 1, topic: 'Communication' },
    { id: 25, sentence: 'Her monthly ___ is higher than mine.', blank: 'income', options: ['salary', 'income', 'profit', 'fund'], correctIndex: 1, topic: 'Work' },
  ],
  'B2': [
    { id: 26, sentence: 'The teacher will ___ our presentations next week.', blank: 'assess', options: ['assess', 'ignore', 'create', 'purchase'], correctIndex: 0, topic: 'Academic' },
    { id: 27, sentence: 'There has been a ___ improvement in your English.', blank: 'significant', options: ['small', 'significant', 'temporary', 'similar'], correctIndex: 1, topic: 'Academic' },
    { id: 28, sentence: 'The government ___ funds for education.', blank: 'allocated', options: ['wasted', 'allocated', 'removed', 'borrowed'], correctIndex: 1, topic: 'Society' },
    { id: 29, sentence: 'The two departments ___ on research projects.', blank: 'collaborate', options: ['compete', 'collaborate', 'argue', 'separate'], correctIndex: 1, topic: 'Business' },
    { id: 30, sentence: 'Lack of funding ___ our research progress.', blank: 'constrains', options: ['helps', 'constrains', 'speeds', 'ignores'], correctIndex: 1, topic: 'Academic' },
    { id: 31, sentence: 'The policy is highly ___.', blank: 'controversial', options: ['popular', 'controversial', 'simple', 'boring'], correctIndex: 1, topic: 'Society' },
    { id: 32, sentence: 'This is a ___ step in the learning process.', blank: 'crucial', options: ['crucial', 'optional', 'minor', 'easy'], correctIndex: 0, topic: 'Education' },
    { id: 33, sentence: 'We need to ___ the results of the experiment.', blank: 'evaluate', options: ['ignore', 'create', 'evaluate', 'forget'], correctIndex: 2, topic: 'Academic' },
    { id: 34, sentence: 'The company ___ from a small startup.', blank: 'evolved', options: ['failed', 'evolved', 'stopped', 'decreased'], correctIndex: 1, topic: 'Business' },
    { id: 35, sentence: 'Solar panels ___ electricity from sunlight.', blank: 'generate', options: ['store', 'generate', 'waste', 'reduce'], correctIndex: 1, topic: 'Environment' },
    { id: 36, sentence: 'Innovation is the key to business ___.', blank: 'success', options: ['failure', 'success', 'competition', 'conflict'], correctIndex: 1, topic: 'Business' },
    { id: 37, sentence: 'We need ___ evidence to support our theory.', blank: 'empirical', options: ['empirical', 'personal', 'visual', 'simple'], correctIndex: 0, topic: 'Academic' },
    { id: 38, sentence: 'The new system will ___ communication between teams.', blank: 'facilitate', options: ['block', 'facilitate', 'delay', 'avoid'], correctIndex: 1, topic: 'Business' },
    { id: 39, sentence: 'You should ___ a healthy lifestyle.', blank: 'maintain', options: ['stop', 'maintain', 'change', 'forget'], correctIndex: 1, topic: 'Health' },
    { id: 40, sentence: 'Health should be a top ___ for everyone.', blank: 'priority', options: ['problem', 'priority', 'worry', 'interest'], correctIndex: 1, topic: 'Daily Life' },
  ],
  'C1': [
    { id: 41, sentence: 'The new policy had a ___ impact on the economy.', blank: 'profound', options: ['small', 'profound', 'quick', 'simple'], correctIndex: 1, topic: 'Abstract' },
    { id: 42, sentence: 'We need to ___ the current situation before deciding.', blank: 'take into account', options: ['take into account', 'look for', 'give up', 'put off'], correctIndex: 0, topic: 'Academic' },
    { id: 43, sentence: 'The research followed ___ scientific standards.', blank: 'rigorous', options: ['basic', 'rigorous', 'simple', 'loose'], correctIndex: 1, topic: 'Academic' },
    { id: 44, sentence: 'I am ___ about his chances of winning.', blank: 'skeptical', options: ['skeptical', 'certain', 'happy', 'sure'], correctIndex: 0, topic: 'Feelings' },
    { id: 45, sentence: 'The difference between the two versions is ___.', blank: 'negligible', options: ['huge', 'negligible', 'clear', 'important'], correctIndex: 1, topic: 'Academic' },
    { id: 46, sentence: 'We need a ___ review of our entire system.', blank: 'comprehensive', options: ['quick', 'comprehensive', 'partial', 'simple'], correctIndex: 1, topic: 'Academic' },
    { id: 47, sentence: 'The plan came under close ___ from the media.', blank: 'scrutiny', options: ['scrutiny', 'praise', 'support', 'silence'], correctIndex: 0, topic: 'Society' },
    { id: 48, sentence: 'Smoking is ___ to your health.', blank: 'detrimental', options: ['helpful', 'detrimental', 'neutral', 'beneficial'], correctIndex: 1, topic: 'Health' },
    { id: 49, sentence: 'The decision was reached with ___ agreement.', blank: 'unanimous', options: ['partial', 'unanimous', 'divided', 'silent'], correctIndex: 1, topic: 'Society' },
    { id: 50, sentence: 'His knowledge of the topic is purely ___.', blank: 'superficial', options: ['superficial', 'deep', 'expert', 'thorough'], correctIndex: 0, topic: 'Academic' },
  ],
  'C2': [
    { id: 51, sentence: 'The traffic created a terrible ___ of noise.', blank: 'cacophony', options: ['silence', 'cacophony', 'melody', 'rhythm'], correctIndex: 1, topic: 'Descriptive' },
    { id: 52, sentence: 'Fame is often ___ and disappears quickly.', blank: 'ephemeral', options: ['ephemeral', 'permanent', 'strong', 'lasting'], correctIndex: 0, topic: 'Abstract' },
    { id: 53, sentence: 'The report ___ the key issues in detail.', blank: 'delineates', options: ['hides', 'delineates', 'ignores', 'forgets'], correctIndex: 1, topic: 'Academic' },
    { id: 54, sentence: 'Social media has become ___ in modern society.', blank: 'ubiquitous', options: ['rare', 'ubiquitous', 'useless', 'optional'], correctIndex: 1, topic: 'Technology' },
    { id: 55, sentence: 'She gave a ___ glance at the report and signed it.', blank: 'perfunctory', options: ['careful', 'perfunctory', 'thorough', 'detailed'], correctIndex: 1, topic: 'Describing Actions' },
    { id: 56, sentence: 'The evidence is ___: he is guilty.', blank: 'unequivocal', options: ['unequivocal', 'unclear', 'vague', 'doubtful'], correctIndex: 0, topic: 'Academic' },
    { id: 57, sentence: 'The student remained ___ despite repeated warnings.', blank: 'recalcitrant', options: ['obedient', 'recalcitrant', 'polite', 'helpful'], correctIndex: 1, topic: 'Describing People' },
    { id: 58, sentence: 'She has great business ___ and leadership skills.', blank: 'acumen', options: ['acumen', 'weakness', 'confusion', 'ignorance'], correctIndex: 0, topic: 'Business' },
    { id: 59, sentence: 'His ___ temperament made him hard to predict.', blank: 'mercurial', options: ['stable', 'mercurial', 'calm', 'steady'], correctIndex: 1, topic: 'Describing People' },
    { id: 60, sentence: 'The politician tried to ___ the truth with vague answers.', blank: 'obfuscate', options: ['reveal', 'obfuscate', 'clarify', 'explain'], correctIndex: 1, topic: 'Abstract' },
  ],
}

export const synonymMatchExercises: Record<Level, SynonymMatchExercise[]> = {
  'A1-A2': [
    { id: 1, pairs: [{ word: 'big', synonym: 'large' }, { word: 'small', synonym: 'tiny' }, { word: 'happy', synonym: 'glad' }, { word: 'begin', synonym: 'start' }] },
    { id: 2, pairs: [{ word: 'quick', synonym: 'fast' }, { word: 'pretty', synonym: 'beautiful' }, { word: 'smart', synonym: 'clever' }, { word: 'quiet', synonym: 'silent' }] },
  ],
  'B1': [
    { id: 3, pairs: [{ word: 'difficult', synonym: 'challenging' }, { word: 'important', synonym: 'significant' }, { word: 'improve', synonym: 'enhance' }, { word: 'choose', synonym: 'select' }] },
    { id: 4, pairs: [{ word: 'help', synonym: 'assist' }, { word: 'show', synonym: 'demonstrate' }, { word: 'enough', synonym: 'sufficient' }, { word: 'clear', synonym: 'obvious' }] },
    { id: 5, pairs: [{ word: 'answer', synonym: 'reply' }, { word: 'protect', synonym: 'defend' }, { word: 'happen', synonym: 'occur' }, { word: 'change', synonym: 'modify' }] },
  ],
  'B2': [
    { id: 6, pairs: [{ word: 'assess', synonym: 'evaluate' }, { word: 'obtain', synonym: 'acquire' }, { word: 'reveal', synonym: 'disclose' }, { word: 'maintain', synonym: 'sustain' }] },
    { id: 7, pairs: [{ word: 'crucial', synonym: 'essential' }, { word: 'eliminate', synonym: 'remove' }, { word: 'relevant', synonym: 'pertinent' }, { word: 'reluctant', synonym: 'unwilling' }] },
    { id: 8, pairs: [{ word: 'diminish', synonym: 'decrease' }, { word: 'predominant', synonym: 'dominant' }, { word: 'rigorous', synonym: 'stringent' }, { word: 'plausible', synonym: 'credible' }] },
  ],
  'C1': [
    { id: 9, pairs: [{ word: 'ambiguous', synonym: 'vague' }, { word: 'meticulous', synonym: 'thorough' }, { word: 'impartial', synonym: 'unbiased' }, { word: 'skeptical', synonym: 'doubtful' }] },
    { id: 10, pairs: [{ word: 'superficial', synonym: 'shallow' }, { word: 'profound', synonym: 'deep' }, { word: 'negligible', synonym: 'minimal' }, { word: 'simultaneous', synonym: 'concurrent' }] },
  ],
  'C2': [
    { id: 11, pairs: [{ word: 'ephemeral', synonym: 'fleeting' }, { word: 'ubiquitous', synonym: 'omnipresent' }, { word: 'laconic', synonym: 'terse' }, { word: 'obfuscate', synonym: 'obscure' }] },
    { id: 12, pairs: [{ word: 'cacophony', synonym: 'discord' }, { word: 'sycophant', synonym: 'flatterer' }, { word: 'reprehensible', synonym: 'deplorable' }, { word: 'perfunctory', synonym: 'cursory' }] },
  ],
}
