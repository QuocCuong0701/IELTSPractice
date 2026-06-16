const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "data", "vocabulary-exercises.ts");
let content = fs.readFileSync(filePath, "utf8");

// The issue: the insertion script added exercises AFTER the closing bracket of each array
// creating double commas. We need to REWRITE the file properly.

// Build the complete file content
const newContent = `import type { Level } from '@/context/LevelContext'

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
    { id: 61, sentence: 'Please put on your ___ when it is cold outside.', blank: 'jacket', options: ['jacket', 'towel', 'table', 'ticket'], correctIndex: 0, topic: 'Clothes' },
    { id: 62, sentence: 'I bought a new pair of ___ for the party.', blank: 'shoes', options: ['gloves', 'socks', 'shoes', 'boots'], correctIndex: 2, topic: 'Clothes' },
    { id: 63, sentence: 'She wears a beautiful red ___ to the party.', blank: 'dress', options: ['dress', 'shirt', 'jacket', 'scarf'], correctIndex: 0, topic: 'Clothes' },
    { id: 64, sentence: 'Open your ___ and let the doctor see.', blank: 'mouth', options: ['mouth', 'nose', 'eye', 'ear'], correctIndex: 0, topic: 'Body' },
    { id: 65, sentence: 'Wash your ___ with soap before dinner.', blank: 'hands', options: ['hands', 'feet', 'eyes', 'ears'], correctIndex: 0, topic: 'Body' },
    { id: 66, sentence: 'The ___ sings a beautiful song in the tree.', blank: 'bird', options: ['bird', 'fish', 'horse', 'rabbit'], correctIndex: 0, topic: 'Animals' },
    { id: 67, sentence: 'I am very ___. I want a glass of water.', blank: 'thirsty', options: ['thirsty', 'hungry', 'tired', 'happy'], correctIndex: 0, topic: 'Feelings' },
    { id: 68, sentence: 'The children play ___ in the park after school.', blank: 'football', options: ['football', 'music', 'games', 'dance'], correctIndex: 0, topic: 'Sports' },
    { id: 69, sentence: 'She loves to listen to ___ while studying.', blank: 'music', options: ['music', 'sport', 'food', 'books'], correctIndex: 0, topic: 'Hobbies' },
    { id: 70, sentence: 'My uncle is a ___. He works on the farm.', blank: 'farmer', options: ['farmer', 'teacher', 'doctor', 'pilot'], correctIndex: 0, topic: 'Jobs' },
    { id: 71, sentence: 'The children want to ___ the game.', blank: 'win', options: ['win', 'lose', 'play', 'watch'], correctIndex: 0, topic: 'Sports' },
    { id: 72, sentence: 'Please close the ___, it is cold outside.', blank: 'window', options: ['window', 'door', 'table', 'book'], correctIndex: 0, topic: 'Home' },
    { id: 73, sentence: 'I need to buy a ___ for the bus.', blank: 'ticket', options: ['ticket', 'map', 'key', 'clock'], correctIndex: 0, topic: 'Transport' },
    { id: 74, sentence: 'My birthday is in ___, the first month.', blank: 'January', options: ['January', 'March', 'June', 'October'], correctIndex: 0, topic: 'Daily Life' },
    { id: 75, sentence: 'I ___ at 6am every morning.', blank: 'wake up', options: ['wake up', 'sit down', 'stand up', 'lie down'], correctIndex: 0, topic: 'Daily Life' },
    { id: 76, sentence: 'We buy vegetables at the ___.', blank: 'market', options: ['market', 'station', 'airport', 'school'], correctIndex: 0, topic: 'Shopping' },
    { id: 77, sentence: 'The ___ flows through the village.', blank: 'river', options: ['river', 'mountain', 'road', 'bridge'], correctIndex: 0, topic: 'Nature' },
    { id: 78, sentence: 'The ___ helps sick people at the hospital.', blank: 'nurse', options: ['nurse', 'farmer', 'driver', 'cook'], correctIndex: 0, topic: 'Jobs' },
    { id: 79, sentence: 'I take photos with my ___.', blank: 'camera', options: ['camera', 'phone', 'clock', 'lamp'], correctIndex: 0, topic: 'Travel' },
    { id: 80, sentence: 'The cat is sleeping ___ the door.', blank: 'behind', options: ['behind', 'between', 'opposite', 'next to'], correctIndex: 0, topic: 'Places' },
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
    { id: 81, sentence: 'The journalist interviewed the president for the news.', blank: 'journalist', options: ['journalist', 'artist', 'musician', 'athlete'], correctIndex: 0, topic: 'Media' },
    { id: 82, sentence: 'There is a growing ___ of working from home.', blank: 'trend', options: ['trend', 'debt', 'loss', 'fall'], correctIndex: 0, topic: 'Society' },
    { id: 83, sentence: 'The company made a large ___ this year.', blank: 'profit', options: ['profit', 'debt', 'loss', 'cost'], correctIndex: 0, topic: 'Business' },
    { id: 84, sentence: 'We need an ___ approach to solve this.', blank: 'alternative', options: ['alternative', 'identical', 'similar', 'usual'], correctIndex: 0, topic: 'Abstract' },
    { id: 85, sentence: 'The research has a big ___ on public health.', blank: 'impact', options: ['impact', 'income', 'effort', 'respect'], correctIndex: 0, topic: 'Health' },
    { id: 86, sentence: 'The two departments ___ on the new project.', blank: 'collaborate', options: ['collaborate', 'compete', 'argue', 'separate'], correctIndex: 0, topic: 'Business' },
    { id: 87, sentence: 'I need to ___ money to my account.', blank: 'transfer', options: ['transfer', 'delete', 'remove', 'cancel'], correctIndex: 0, topic: 'Finance' },
    { id: 88, sentence: 'Each student has a different ___ to learning.', blank: 'approach', options: ['approach', 'deadline', 'lecture', 'lesson'], correctIndex: 0, topic: 'Education' },
    { id: 89, sentence: 'The ___ shows that most people are satisfied.', blank: 'survey', options: ['survey', 'report', 'review', 'study'], correctIndex: 0, topic: 'Media' },
    { id: 90, sentence: 'Cost is an important ___ in our decision.', blank: 'factor', options: ['factor', 'aspect', 'issue', 'item'], correctIndex: 0, topic: 'Abstract' },
    { id: 91, sentence: 'The school has limited ___ for new equipment.', blank: 'resources', options: ['resources', 'profits', 'products', 'projects'], correctIndex: 0, topic: 'Education' },
    { id: 92, sentence: 'We need to set clear ___ for next year.', blank: 'targets', options: ['targets', 'tasks', 'roles', 'rules'], correctIndex: 0, topic: 'Business' },
    { id: 93, sentence: 'The government introduced a new education ___.', blank: 'policy', options: ['policy', 'profit', 'product', 'price'], correctIndex: 0, topic: 'Society' },
    { id: 94, sentence: 'She has a natural ___ for playing the piano.', blank: 'talent', options: ['talent', 'task', 'target', 'trend'], correctIndex: 0, topic: 'People' },
    { id: 95, sentence: 'The new technology will ___ the industry.', blank: 'transform', options: ['transform', 'transfer', 'transport', 'translate'], correctIndex: 0, topic: 'Technology' },
    { id: 96, sentence: 'Everyone should have ___ opportunities at work.', blank: 'equal', options: ['equal', 'different', 'special', 'unique'], correctIndex: 0, topic: 'Society' },
    { id: 97, sentence: 'The company plans to ___ into new markets.', blank: 'expand', options: ['expand', 'explain', 'expect', 'explore'], correctIndex: 0, topic: 'Business' },
    { id: 98, sentence: 'We need to ___ a solution to this problem.', blank: 'find', options: ['find', 'lose', 'miss', 'drop'], correctIndex: 0, topic: 'Abstract' },
    { id: 99, sentence: 'The government ___ public schools with tax money.', blank: 'funds', options: ['funds', 'lends', 'borrows', 'saves'], correctIndex: 0, topic: 'Society' },
    { id: 100, sentence: 'There are many ___ of birds in this forest.', blank: 'species', options: ['species', 'sports', 'stories', 'stones'], correctIndex: 0, topic: 'Environment' },
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
    { id: 101, sentence: 'The results of this study ___ the existing theory.', blank: 'challenge', options: ['challenge', 'confirm', 'create', 'complete'], correctIndex: 0, topic: 'Academic' },
    { id: 102, sentence: 'We need to ___ the new data with the old records.', blank: 'compare', options: ['compare', 'create', 'destroy', 'ignore'], correctIndex: 0, topic: 'Academic' },
    { id: 103, sentence: 'The two approaches are ___ different from each other.', blank: 'fundamentally', options: ['fundamentally', 'rarely', 'slightly', 'barely'], correctIndex: 0, topic: 'Academic' },
    { id: 104, sentence: 'We must ___ our strategy to meet the new requirements.', blank: 'revise', options: ['revise', 'remove', 'reject', 'repeat'], correctIndex: 0, topic: 'Business' },
    { id: 105, sentence: 'The company decided to ___ its headquarters abroad.', blank: 'relocate', options: ['relocate', 'remove', 'reduce', 'reject'], correctIndex: 0, topic: 'Business' },
    { id: 106, sentence: 'The report provides a ___ analysis of the situation.', blank: 'thorough', options: ['thorough', 'simple', 'basic', 'quick'], correctIndex: 0, topic: 'Academic' },
    { id: 107, sentence: 'The government must ___ to the changing needs of society.', blank: 'respond', options: ['respond', 'resist', 'reject', 'reduce'], correctIndex: 0, topic: 'Society' },
    { id: 108, sentence: 'We need to ___ the quality of our products.', blank: 'improve', options: ['improve', 'import', 'ignore', 'imagine'], correctIndex: 0, topic: 'Business' },
    { id: 109, sentence: 'The new law will ___ the use of plastic bags.', blank: 'restrict', options: ['restrict', 'expand', 'encourage', 'allow'], correctIndex: 0, topic: 'Environment' },
    { id: 110, sentence: 'The study ___ a link between exercise and mental health.', blank: 'reveals', options: ['reveals', 'hides', 'ignores', 'forgets'], correctIndex: 0, topic: 'Health' },
    { id: 111, sentence: 'We need to ___ the cost before we make a decision.', blank: 'estimate', options: ['estimate', 'escape', 'enjoy', 'enter'], correctIndex: 0, topic: 'Business' },
    { id: 112, sentence: 'The ___ of the new system was delayed by technical issues.', blank: 'implementation', options: ['implementation', 'imagination', 'importance', 'impression'], correctIndex: 0, topic: 'Technology' },
    { id: 113, sentence: 'The organisation needs a ___ change in its culture.', blank: 'fundamental', options: ['fundamental', 'funny', 'friendly', 'foreign'], correctIndex: 0, topic: 'Business' },
    { id: 114, sentence: 'The new evidence ___ our previous understanding.', blank: 'contradicts', options: ['contradicts', 'confirms', 'completes', 'creates'], correctIndex: 0, topic: 'Academic' },
    { id: 115, sentence: 'The data ___ that our approach is working.', blank: 'indicates', options: ['indicates', 'ignores', 'invents', 'involves'], correctIndex: 0, topic: 'Academic' },
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
    { id: 131, sentence: 'The argument presented by the author is highly ___.', blank: 'persuasive', options: ['persuasive', 'convenient', 'confident', 'constant'], correctIndex: 0, topic: 'Academic' },
    { id: 132, sentence: 'The research findings ___ the need for further investigation.', blank: 'highlight', options: ['highlight', 'hinder', 'harm', 'hide'], correctIndex: 0, topic: 'Academic' },
    { id: 133, sentence: 'The policy has had a ___ impact on the economy.', blank: 'significant', options: ['significant', 'small', 'silent', 'simple'], correctIndex: 0, topic: 'Society' },
    { id: 134, sentence: 'The speaker ___ her point with relevant examples.', blank: 'illustrated', options: ['illustrated', 'ignored', 'imagined', 'imitated'], correctIndex: 0, topic: 'Communication' },
    { id: 135, sentence: 'The two countries have a ___ trade relationship.', blank: 'mutually beneficial', options: ['mutually beneficial', 'completely separate', 'highly competitive', 'barely existent'], correctIndex: 0, topic: 'Business' },
    { id: 136, sentence: 'The theory has been ___ by numerous experiments.', blank: 'substantiated', options: ['substantiated', 'substituted', 'subtracted', 'suspended'], correctIndex: 0, topic: 'Science' },
    { id: 137, sentence: 'Her speech was ___ and moved the audience deeply.', blank: 'moving', options: ['moving', 'boring', 'confusing', 'short'], correctIndex: 0, topic: 'Communication' },
    { id: 138, sentence: 'The issues are ___ connected and cannot be separated.', blank: 'closely', options: ['closely', 'rarely', 'barely', 'hardly'], correctIndex: 0, topic: 'Academic' },
    { id: 139, sentence: 'The research is ___ for understanding climate patterns.', blank: 'essential', options: ['essential', 'optional', 'unnecessary', 'irrelevant'], correctIndex: 0, topic: 'Science' },
    { id: 140, sentence: 'The findings of this study ___ previous research in this field.', blank: 'reinforce', options: ['reinforce', 'reject', 'reduce', 'remove'], correctIndex: 0, topic: 'Academic' },
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
    { id: 151, sentence: 'The professor lecture was so ___ that few could follow it.', blank: 'complex', options: ['complex', 'obvious', 'simple', 'clear'], correctIndex: 0, topic: 'Academic' },
    { id: 152, sentence: 'The evidence he presented was entirely ___.', blank: 'convincing', options: ['convincing', 'solid', 'strong', 'clear'], correctIndex: 0, topic: 'Academic' },
    { id: 153, sentence: 'The report takes a ___ approach to the problem.', blank: 'practical', options: ['practical', 'poetic', 'pessimistic', 'passive'], correctIndex: 0, topic: 'Business' },
    { id: 154, sentence: 'Her explanation was ___, covering every detail.', blank: 'thorough', options: ['thorough', 'excessive', 'exotic', 'external'], correctIndex: 0, topic: 'Academic' },
    { id: 155, sentence: 'The politician speech was full of persuasive ___.', blank: 'rhetoric', options: ['rhetoric', 'reality', 'reason', 'respect'], correctIndex: 0, topic: 'Society' },
    { id: 156, sentence: 'The author makes a ___ distinction between two concepts.', blank: 'clear', options: ['clear', 'narrow', 'noisy', 'naive'], correctIndex: 0, topic: 'Academic' },
    { id: 157, sentence: 'The two theories are not mutually ___.', blank: 'exclusive', options: ['exclusive', 'inclusive', 'expensive', 'extensive'], correctIndex: 0, topic: 'Academic' },
    { id: 158, sentence: 'His argument was ___ and impossible to defend.', blank: 'flawed', options: ['flawed', 'independent', 'indispensable', 'incredible'], correctIndex: 0, topic: 'Abstract' },
    { id: 159, sentence: 'The proposal was met with widespread public ___.', blank: 'opposition', options: ['opposition', 'approval', 'applause', 'agreement'], correctIndex: 0, topic: 'Society' },
    { id: 160, sentence: 'The company growth has been nothing short of ___.', blank: 'remarkable', options: ['remarkable', 'normal', 'ordinary', 'average'], correctIndex: 0, topic: 'Business' },
  ],
}

export const synonymMatchExercises: Record<Level, SynonymMatchExercise[]> = {
  'A1-A2': [
    { id: 1, pairs: [
      { word: 'big', synonym: 'large' }, { word: 'small', synonym: 'tiny' }, { word: 'happy', synonym: 'glad' }, { word: 'begin', synonym: 'start' },
      { word: 'sad', synonym: 'unhappy' }, { word: 'nice', synonym: 'kind' }, { word: 'old', synonym: 'ancient' }, { word: 'new', synonym: 'recent' },
      { word: 'love', synonym: 'like' }, { word: 'look', synonym: 'see' },
    ] },
    { id: 2, pairs: [
      { word: 'quick', synonym: 'fast' }, { word: 'pretty', synonym: 'beautiful' }, { word: 'smart', synonym: 'clever' }, { word: 'quiet', synonym: 'silent' },
      { word: 'loud', synonym: 'noisy' }, { word: 'rich', synonym: 'wealthy' }, { word: 'poor', synonym: 'needy' }, { word: 'strong', synonym: 'powerful' },
      { word: 'weak', synonym: 'frail' }, { word: 'easy', synonym: 'simple' },
    ] },
    { id: 13, pairs: [
      { word: 'tall', synonym: 'high' }, { word: 'short', synonym: 'small' }, { word: 'hot', synonym: 'warm' }, { word: 'cold', synonym: 'cool' },
      { word: 'hungry', synonym: 'starving' }, { word: 'thirsty', synonym: 'dry' }, { word: 'fast', synonym: 'quick' }, { word: 'slow', synonym: 'gentle' },
      { word: 'scared', synonym: 'afraid' }, { word: 'brave', synonym: 'bold' },
    ] },
    { id: 14, pairs: [
      { word: 'happy', synonym: 'cheerful' }, { word: 'sad', synonym: 'unhappy' }, { word: 'angry', synonym: 'mad' }, { word: 'tired', synonym: 'sleepy' },
      { word: 'clever', synonym: 'smart' }, { word: 'kind', synonym: 'nice' }, { word: 'pretty', synonym: 'lovely' }, { word: 'old', synonym: 'elderly' },
      { word: 'young', synonym: 'youthful' }, { word: 'good', synonym: 'great' },
    ] },
    { id: 15, pairs: [
      { word: 'begin', synonym: 'start' }, { word: 'close', synonym: 'shut' }, { word: 'speak', synonym: 'talk' }, { word: 'purchase', synonym: 'buy' },
      { word: 'repair', synonym: 'fix' }, { word: 'learn', synonym: 'study' }, { word: 'select', synonym: 'choose' }, { word: 'assist', synonym: 'help' },
      { word: 'answer', synonym: 'reply' }, { word: 'shout', synonym: 'yell' },
    ] },
    { id: 16, pairs: [
      { word: 'large', synonym: 'big' }, { word: 'tiny', synonym: 'small' }, { word: 'quick', synonym: 'rapid' }, { word: 'beautiful', synonym: 'pretty' },
      { word: 'silent', synonym: 'quiet' }, { word: 'noisy', synonym: 'loud' }, { word: 'wealthy', synonym: 'rich' }, { word: 'needy', synonym: 'poor' },
      { word: 'powerful', synonym: 'strong' }, { word: 'frail', synonym: 'weak' },
    ] },
  ],
  'B1': [
    { id: 3, pairs: [
      { word: 'difficult', synonym: 'challenging' }, { word: 'important', synonym: 'significant' }, { word: 'improve', synonym: 'enhance' }, { word: 'choose', synonym: 'select' },
      { word: 'suggest', synonym: 'recommend' }, { word: 'explain', synonym: 'clarify' }, { word: 'allow', synonym: 'permit' }, { word: 'require', synonym: 'need' },
      { word: 'connect', synonym: 'link' }, { word: 'create', synonym: 'produce' },
    ] },
    { id: 4, pairs: [
      { word: 'help', synonym: 'assist' }, { word: 'show', synonym: 'demonstrate' }, { word: 'enough', synonym: 'sufficient' }, { word: 'clear', synonym: 'obvious' },
      { word: 'decide', synonym: 'determine' }, { word: 'inform', synonym: 'notify' }, { word: 'continue', synonym: 'proceed' }, { word: 'succeed', synonym: 'accomplish' },
      { word: 'prevent', synonym: 'stop' }, { word: 'prepare', synonym: 'arrange' },
    ] },
    { id: 5, pairs: [
      { word: 'answer', synonym: 'reply' }, { word: 'protect', synonym: 'defend' }, { word: 'happen', synonym: 'occur' }, { word: 'change', synonym: 'modify' },
      { word: 'discover', synonym: 'find' }, { word: 'consider', synonym: 'think' }, { word: 'increase', synonym: 'rise' }, { word: 'decrease', synonym: 'fall' },
      { word: 'encourage', synonym: 'motivate' }, { word: 'respect', synonym: 'admire' },
    ] },
    { id: 17, pairs: [
      { word: 'opportunity', synonym: 'chance' }, { word: 'benefit', synonym: 'advantage' }, { word: 'profession', synonym: 'career' }, { word: 'income', synonym: 'earnings' },
      { word: 'challenge', synonym: 'difficulty' }, { word: 'solution', synonym: 'answer' }, { word: 'attitude', synonym: 'mindset' }, { word: 'behavior', synonym: 'conduct' },
      { word: 'tradition', synonym: 'custom' }, { word: 'habit', synonym: 'routine' },
    ] },
    { id: 18, pairs: [
      { word: 'adapt', synonym: 'adjust' }, { word: 'convince', synonym: 'persuade' }, { word: 'obtain', synonym: 'acquire' }, { word: 'demonstrate', synonym: 'show' },
      { word: 'establish', synonym: 'found' }, { word: 'evaluate', synonym: 'assess' }, { word: 'assume', synonym: 'presume' }, { word: 'acquire', synonym: 'obtain' },
      { word: 'advocate', synonym: 'support' }, { word: 'allocate', synonym: 'assign' },
    ] },
    { id: 19, pairs: [
      { word: 'crucial', synonym: 'essential' }, { word: 'relevant', synonym: 'pertinent' }, { word: 'sufficient', synonym: 'adequate' }, { word: 'effective', synonym: 'efficient' },
      { word: 'widespread', synonym: 'prevalent' }, { word: 'temporary', synonym: 'provisional' }, { word: 'voluntary', synonym: 'optional' }, { word: 'domestic', synonym: 'internal' },
      { word: 'controversial', synonym: 'contentious' }, { word: 'significant', synonym: 'notable' },
    ] },
    { id: 20, pairs: [
      { word: 'journalist', synonym: 'reporter' }, { word: 'survey', synonym: 'poll' }, { word: 'trend', synonym: 'tendency' }, { word: 'policy', synonym: 'regulation' },
      { word: 'budget', synonym: 'allowance' }, { word: 'profit', synonym: 'gain' }, { word: 'resource', synonym: 'supply' }, { word: 'species', synonym: 'type' },
      { word: 'urban', synonym: 'city' }, { word: 'rural', synonym: 'countryside' },
    ] },
    { id: 21, pairs: [
      { word: 'expand', synonym: 'enlarge' }, { word: 'restrict', synonym: 'limit' }, { word: 'transform', synonym: 'change' }, { word: 'promote', synonym: 'encourage' },
      { word: 'identify', synonym: 'recognise' }, { word: 'reject', synonym: 'refuse' }, { word: 'respond', synonym: 'reply' }, { word: 'support', synonym: 'back' },
      { word: 'trust', synonym: 'believe' }, { word: 'invest', synonym: 'fund' },
    ] },
    { id: 22, pairs: [
      { word: 'global', synonym: 'worldwide' }, { word: 'unique', synonym: 'special' }, { word: 'potential', synonym: 'possible' }, { word: 'previous', synonym: 'prior' },
      { word: 'primary', synonym: 'main' }, { word: 'similar', synonym: 'alike' }, { word: 'legal', synonym: 'lawful' }, { word: 'equal', synonym: 'fair' },
      { word: 'negative', synonym: 'harmful' }, { word: 'positive', synonym: 'optimistic' },
    ] },
  ],
  'B2': [
    { id: 6, pairs: [
      { word: 'assess', synonym: 'evaluate' }, { word: 'obtain', synonym: 'acquire' }, { word: 'reveal', synonym: 'disclose' }, { word: 'maintain', synonym: 'sustain' },
      { word: 'analyze', synonym: 'examine' }, { word: 'formulate', synonym: 'develop' }, { word: 'implement', synonym: 'execute' }, { word: 'verify', synonym: 'confirm' },
      { word: 'allocate', synonym: 'assign' }, { word: 'constitute', synonym: 'comprise' },
    ] },
    { id: 7, pairs: [
      { word: 'crucial', synonym: 'essential' }, { word: 'eliminate', synonym: 'remove' }, { word: 'relevant', synonym: 'pertinent' }, { word: 'reluctant', synonym: 'unwilling' },
      { word: 'compensate', synonym: 'offset' }, { word: 'complement', synonym: 'supplement' }, { word: 'incorporate', synonym: 'integrate' }, { word: 'negotiate', synonym: 'bargain' },
      { word: 'demonstrate', synonym: 'prove' }, { word: 'contradict', synonym: 'challenge' },
    ] },
    { id: 8, pairs: [
      { word: 'diminish', synonym: 'decrease' }, { word: 'predominant', synonym: 'dominant' }, { word: 'rigorous', synonym: 'stringent' }, { word: 'plausible', synonym: 'credible' },
      { word: 'fluctuate', synonym: 'vary' }, { word: 'speculate', synonym: 'conjecture' }, { word: 'undermine', synonym: 'weaken' }, { word: 'reinforce', synonym: 'strengthen' },
      { word: 'stimulate', synonym: 'encourage' }, { word: 'utilize', synonym: 'employ' },
    ] },
    { id: 23, pairs: [
      { word: 'controversy', synonym: 'dispute' }, { word: 'hypothesis', synonym: 'theory' }, { word: 'implication', synonym: 'consequence' }, { word: 'innovation', synonym: 'invention' },
      { word: 'perspective', synonym: 'viewpoint' }, { word: 'strategy', synonym: 'plan' }, { word: 'tendency', synonym: 'trend' }, { word: 'criterion', synonym: 'standard' },
      { word: 'hierarchy', synonym: 'ranking' }, { word: 'initiative', synonym: 'project' },
    ] },
    { id: 24, pairs: [
      { word: 'apparent', synonym: 'obvious' }, { word: 'comprehensive', synonym: 'thorough' }, { word: 'inevitable', synonym: 'unavoidable' }, { word: 'legitimate', synonym: 'valid' },
      { word: 'phenomenal', synonym: 'extraordinary' }, { word: 'prospective', synonym: 'potential' }, { word: 'reluctant', synonym: 'hesitant' }, { word: 'spontaneous', synonym: 'impulsive' },
      { word: 'vulnerable', synonym: 'exposed' }, { word: 'resilient', synonym: 'tough' },
    ] },
    { id: 25, pairs: [
      { word: 'advocate', synonym: 'promote' }, { word: 'compile', synonym: 'gather' }, { word: 'derive', synonym: 'originate' }, { word: 'encounter', synonym: 'face' },
      { word: 'exploit', synonym: 'utilize' }, { word: 'generate', synonym: 'produce' }, { word: 'interpret', synonym: 'explain' }, { word: 'perceive', synonym: 'notice' },
      { word: 'substitute', synonym: 'replace' }, { word: 'undermine', synonym: 'weaken' },
    ] },
    { id: 26, pairs: [
      { word: 'correlate', synonym: 'relate' }, { word: 'validate', synonym: 'confirm' }, { word: 'revise', synonym: 'update' }, { word: 'enhance', synonym: 'boost' },
      { word: 'relocate', synonym: 'move' }, { word: 'restrict', synonym: 'limit' }, { word: 'transform', synonym: 'change' }, { word: 'launch', synonym: 'introduce' },
      { word: 'implement', synonym: 'apply' }, { word: 'indicate', synonym: 'show' },
    ] },
    { id: 27, pairs: [
      { word: 'fundamental', synonym: 'basic' }, { word: 'thorough', synonym: 'complete' }, { word: 'radical', synonym: 'extreme' }, { word: 'comprehensive', synonym: 'full' },
      { word: 'detailed', synonym: 'specific' }, { word: 'pragmatic', synonym: 'practical' }, { word: 'strategic', synonym: 'planned' }, { word: 'dynamic', synonym: 'active' },
      { word: 'substantial', synonym: 'significant' }, { word: 'notable', synonym: 'remarkable' },
    ] },
  ],
  'C1': [
    { id: 9, pairs: [
      { word: 'ambiguous', synonym: 'vague' }, { word: 'meticulous', synonym: 'thorough' }, { word: 'impartial', synonym: 'unbiased' }, { word: 'skeptical', synonym: 'doubtful' },
      { word: 'comprehensive', synonym: 'exhaustive' }, { word: 'detrimental', synonym: 'harmful' }, { word: 'facilitate', synonym: 'ease' }, { word: 'illuminate', synonym: 'clarify' },
      { word: 'profound', synonym: 'deep' }, { word: 'stringent', synonym: 'strict' },
    ] },
    { id: 10, pairs: [
      { word: 'superficial', synonym: 'shallow' }, { word: 'profound', synonym: 'deep' }, { word: 'negligible', synonym: 'minimal' }, { word: 'simultaneous', synonym: 'concurrent' },
      { word: 'pragmatic', synonym: 'practical' }, { word: 'coherent', synonym: 'logical' }, { word: 'concise', synonym: 'brief' }, { word: 'plausible', synonym: 'believable' },
      { word: 'prevalent', synonym: 'widespread' }, { word: 'spontaneous', synonym: 'impulsive' },
    ] },
    { id: 28, pairs: [
      { word: 'eloquent', synonym: 'articulate' }, { word: 'empirical', synonym: 'experiential' }, { word: 'homogeneous', synonym: 'uniform' }, { word: 'idiosyncratic', synonym: 'peculiar' },
      { word: 'paradigm', synonym: 'model' }, { word: 'synthesis', synonym: 'combination' }, { word: 'scrutiny', synonym: 'examination' }, { word: 'notion', synonym: 'concept' },
      { word: 'rigorous', synonym: 'strict' }, { word: 'ambiguous', synonym: 'unclear' },
    ] },
    { id: 29, pairs: [
      { word: 'illustrate', synonym: 'demonstrate' }, { word: 'substantiate', synonym: 'prove' }, { word: 'corroborate', synonym: 'confirm' }, { word: 'reinforce', synonym: 'strengthen' },
      { word: 'undermine', synonym: 'weaken' }, { word: 'contradict', synonym: 'oppose' }, { word: 'validate', synonym: 'verify' }, { word: 'speculate', synonym: 'conjecture' },
      { word: 'simulate', synonym: 'imitate' }, { word: 'stimulate', synonym: 'provoke' },
    ] },
    { id: 30, pairs: [
      { word: 'persuasive', synonym: 'convincing' }, { word: 'instrumental', synonym: 'essential' }, { word: 'indispensable', synonym: 'necessary' }, { word: 'controversial', synonym: 'contentious' },
      { word: 'imperative', synonym: 'crucial' }, { word: 'inherent', synonym: 'intrinsic' }, { word: 'intuitive', synonym: 'instinctive' }, { word: 'tangible', synonym: 'concrete' },
      { word: 'feasible', synonym: 'possible' }, { word: 'viable', synonym: 'workable' },
    ] },
  ],
  'C2': [
    { id: 11, pairs: [
      { word: 'ephemeral', synonym: 'fleeting' }, { word: 'ubiquitous', synonym: 'omnipresent' }, { word: 'laconic', synonym: 'terse' }, { word: 'obfuscate', synonym: 'obscure' },
      { word: 'antithesis', synonym: 'opposite' }, { word: 'delineate', synonym: 'outline' }, { word: 'fastidious', synonym: 'particular' }, { word: 'grandiose', synonym: 'pretentious' },
      { word: 'idiosyncratic', synonym: 'peculiar' }, { word: 'juxtaposition', synonym: 'contrast' },
    ] },
    { id: 12, pairs: [
      { word: 'cacophony', synonym: 'discord' }, { word: 'sycophant', synonym: 'flatterer' }, { word: 'reprehensible', synonym: 'deplorable' }, { word: 'perfunctory', synonym: 'cursory' },
      { word: 'quintessential', synonym: 'typical' }, { word: 'nonchalant', synonym: 'casual' }, { word: 'specious', synonym: 'misleading' }, { word: 'taciturn', synonym: 'reserved' },
      { word: 'unequivocal', synonym: 'unambiguous' }, { word: 'verisimilitude', synonym: 'realism' },
    ] },
    { id: 31, pairs: [
      { word: 'mercurial', synonym: 'volatile' }, { word: 'zealous', synonym: 'passionate' }, { word: 'vicarious', synonym: 'indirect' }, { word: 'pragmatic', synonym: 'practical' },
      { word: 'esoteric', synonym: 'obscure' }, { word: 'exhaustive', synonym: 'complete' }, { word: 'rhetoric', synonym: 'oratory' }, { word: 'nuanced', synonym: 'subtle' },
      { word: 'indefensible', synonym: 'unjustifiable' }, { word: 'phenomenal', synonym: 'remarkable' },
    ] },
    { id: 32, pairs: [
      { word: 'specious', synonym: 'misleading' }, { word: 'delineate', synonym: 'describe' }, { word: 'fastidious', synonym: 'fussy' }, { word: 'grandiose', synonym: 'pompous' },
      { word: 'iconoclastic', synonym: 'rebellious' }, { word: 'recalcitrant', synonym: 'defiant' }, { word: 'taciturn', synonym: 'silent' }, { word: 'nonchalant', synonym: 'unconcerned' },
      { word: 'perfunctory', synonym: 'cursory' }, { word: 'superficial', synonym: 'shallow' },
    ] },
  ],
}
`;

fs.writeFileSync(filePath, newContent);
console.log("File rewritten successfully!");
