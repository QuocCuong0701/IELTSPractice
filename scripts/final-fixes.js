const fs = require('fs');
const path = require('path');

// ============================================================
// 1) Remove B1 duplicate 'concentrate' (ID 10) from vocabulary.ts
// ============================================================
const vocabPath = path.join(__dirname, '..', 'src', 'data', 'vocabulary.ts');
let vocab = fs.readFileSync(vocabPath, 'utf8');

const duplicateLine = "    { id: 10, word: 'concentrate', meaning: 'tập trung', example: 'I need to concentrate on my studies.', topic: 'Education', partOfSpeech: 'v', pronunciation: '/ˈkɒnsəntreɪt/' },\n";
if (vocab.includes(duplicateLine)) {
  vocab = vocab.replace(duplicateLine, '');
  fs.writeFileSync(vocabPath, vocab, 'utf8');
  console.log('✓ Removed B1 duplicate concentrate (ID 10) from vocabulary.ts');
} else {
  // Try with different formatting
  console.log('! Could not find exact duplicate line. Checking alternative formats...');
  // Search for any line containing 'id: 10' and 'concentrate' in the B1 section
  const lines = vocab.split('\n');
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("id: 10") && lines[i].includes("concentrate")) {
      console.log(`  Found at line ${i+1}: ${lines[i].trim().substring(0, 80)}...`);
      lines.splice(i, 1);
      found = true;
      break;
    }
  }
  if (found) {
    vocab = lines.join('\n');
    fs.writeFileSync(vocabPath, vocab, 'utf8');
    console.log('✓ Removed B1 duplicate concentrate using line-based approach');
  } else {
    console.log('! Could not find id: 10 with concentrate at all');
  }
}

// ============================================================
// 2) Add missing gap-fill exercises to vocabulary-exercises.ts
// ============================================================
const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'vocabulary-exercises.ts');
let exContent = fs.readFileSync(exercisesPath, 'utf8');

// Add missing B1 gap-fill exercises (IDs 101-110, 10 more) after the last B1 exercise
// Current last B1 entry is ID 100
const b1NewExercises = `
    { id: 101, sentence: 'She decided to ___ for a new job to advance her career.', blank: 'apply', options: ['apply', 'resign', 'retire', 'dismiss'], correctIndex: 0, topic: 'Work' },
    { id: 102, sentence: 'The company plans to ___ a new product next month.', blank: 'launch', options: ['launch', 'cancel', 'delay', 'ignore'], correctIndex: 0, topic: 'Business' },
    { id: 103, sentence: 'You need to ___ your computer files to avoid losing them.', blank: 'back up', options: ['back up', 'turn off', 'throw away', 'give up'], correctIndex: 0, topic: 'Technology' },
    { id: 104, sentence: 'The two countries signed a ___ agreement last week.', blank: 'trade', options: ['trade', 'fight', 'break', 'deny'], correctIndex: 0, topic: 'Business' },
    { id: 105, sentence: 'She has a close ___ with her grandmother.', blank: 'bond', options: ['bond', 'fight', 'gap', 'bill'], correctIndex: 0, topic: 'Family' },
    { id: 106, sentence: 'The teacher asked the students to ___ in the group discussion.', blank: 'participate', options: ['participate', 'ignore', 'avoid', 'refuse'], correctIndex: 0, topic: 'Education' },
    { id: 107, sentence: 'You should ___ your goals clearly before starting the project.', blank: 'define', options: ['define', 'hide', 'forget', 'deny'], correctIndex: 0, topic: 'Work' },
    { id: 108, sentence: 'The new regulation will ___ the way companies report their finances.', blank: 'affect', options: ['affect', 'ignore', 'celebrate', 'destroy'], correctIndex: 0, topic: 'Society' },
    { id: 109, sentence: 'My sister is very ___ and always helps people in need.', blank: 'generous', options: ['generous', 'selfish', 'lazy', 'rude'], correctIndex: 0, topic: 'People' },
    { id: 110, sentence: 'The success of the event ___ on everyone working together.', blank: 'depends', options: ['depends', 'gives', 'takes', 'calls'], correctIndex: 0, topic: 'Work' },
`;

// Insert after last B1 entry (ID 100)
const b1Marker = "{ id: 100, sentence: 'There are many ___ of birds in this forest.', blank: 'species', options: ['species', 'sports', 'stories', 'stones'], correctIndex: 0, topic: 'Environment' },\n  ],\n  'B2':";
if (exContent.includes(b1Marker)) {
  exContent = exContent.replace(b1Marker, "{ id: 100, sentence: 'There are many ___ of birds in this forest.', blank: 'species', options: ['species', 'sports', 'stories', 'stones'], correctIndex: 0, topic: 'Environment' },\n" + b1NewExercises.trimStart() + "  ],\n  'B2':");
  console.log('✓ Added 10 new B1 gap-fill exercises (IDs 101-110)');
} else {
  console.log('! Could not find B1 insertion point');

  // Try alternative marker
  const altB1Marker = "100, topic: 'Environment' },\n  ],\n  'B2':";
  if (exContent.includes(altB1Marker)) {
    exContent = exContent.replace(altB1Marker, "100, topic: 'Environment' },\n" + b1NewExercises.trimStart() + "  ],\n  'B2':");
    console.log('✓ Added 10 new B1 gap-fill exercises using alt marker');
  } else {
    console.log('! Alt marker also not found');
  }
}

// Add missing B2 gap-fill exercises (IDs 116-130, 15 more) after the last B2 exercise (ID 115)
const b2NewExercises = `
    { id: 116, sentence: 'The company needs to ___ its operations to meet growing demand.', blank: 'expand', options: ['expand', 'reduce', 'stop', 'limit'], correctIndex: 0, topic: 'Business' },
    { id: 117, sentence: 'Researchers will ___ the effectiveness of the new drug.', blank: 'evaluate', options: ['evaluate', 'ignore', 'assume', 'deny'], correctIndex: 0, topic: 'Academic' },
    { id: 118, sentence: 'The government must ___ resources to support the poor.', blank: 'allocate', options: ['allocate', 'waste', 'remove', 'deny'], correctIndex: 0, topic: 'Society' },
    { id: 119, sentence: 'The two approaches are ___ different and cannot be compared.', blank: 'fundamentally', options: ['fundamentally', 'slightly', 'barely', 'rarely'], correctIndex: 0, topic: 'Academic' },
    { id: 120, sentence: 'We need to ___ the system to prevent future failures.', blank: 'overhaul', options: ['overhaul', 'ignore', 'delay', 'destroy'], correctIndex: 0, topic: 'Technology' },
    { id: 121, sentence: 'The ___ of the new policy will take place next month.', blank: 'implementation', options: ['implementation', 'imagination', 'importance', 'impression'], correctIndex: 0, topic: 'Business' },
    { id: 122, sentence: 'The findings ___ the need for further investigation.', blank: 'highlight', options: ['highlight', 'hide', 'ignore', 'deny'], correctIndex: 0, topic: 'Academic' },
    { id: 123, sentence: 'The organisation needs a ___ restructuring to survive.', blank: 'radical', options: ['radical', 'minor', 'simple', 'slow'], correctIndex: 0, topic: 'Business' },
    { id: 124, sentence: 'The evidence ___ the theory that the earth is warming.', blank: 'substantiates', options: ['substantiates', 'contradicts', 'ignores', 'forgets'], correctIndex: 0, topic: 'Science' },
    { id: 125, sentence: 'The two departments must ___ closely on this project.', blank: 'collaborate', options: ['collaborate', 'compete', 'argue', 'separate'], correctIndex: 0, topic: 'Business' },
    { id: 126, sentence: 'The proposal aims to ___ economic growth in rural areas.', blank: 'stimulate', options: ['stimulate', 'reduce', 'prevent', 'delay'], correctIndex: 0, topic: 'Society' },
    { id: 127, sentence: 'She managed to ___ a solution to the complex problem.', blank: 'devise', options: ['devise', 'destroy', 'ignore', 'delay'], correctIndex: 0, topic: 'Academic' },
    { id: 128, sentence: 'The company will ___ a new marketing strategy next year.', blank: 'implement', options: ['implement', 'ignore', 'cancel', 'delay'], correctIndex: 0, topic: 'Business' },
    { id: 129, sentence: 'The scientist will ___ the results of the experiment in detail.', blank: 'analyze', options: ['analyze', 'ignore', 'forget', 'destroy'], correctIndex: 0, topic: 'Academic' },
    { id: 130, sentence: 'The country has a ___ system of roads and highways.', blank: 'comprehensive', options: ['comprehensive', 'simple', 'basic', 'limited'], correctIndex: 0, topic: 'Society' },
`;

const b2Marker = "115, topic: 'Academic' },\n  ],\n  'C1':";
if (exContent.includes(b2Marker)) {
  exContent = exContent.replace(b2Marker, "115, topic: 'Academic' },\n" + b2NewExercises.trimStart() + "  ],\n  'C1':");
  console.log('✓ Added 15 new B2 gap-fill exercises (IDs 116-130)');
} else {
  console.log('! Could not find B2 insertion point, trying alt...');
  const altB2Marker = "'Business' },\n  ],\n  'C1':";
  // Too imprecise, skip
}

// Add missing C1 gap-fill exercises (IDs 141-150, 10 more) after the last C1 exercise (ID 140)
const c1NewExercises = `
    { id: 141, sentence: 'The professor offered a ___ analysis of the complex issue.', blank: 'nuanced', options: ['nuanced', 'basic', 'simple', 'quick'], correctIndex: 0, topic: 'Academic' },
    { id: 142, sentence: 'The two theories are ___ and cannot both be true.', blank: 'incompatible', options: ['incompatible', 'similar', 'identical', 'complementary'], correctIndex: 0, topic: 'Academic' },
    { id: 143, sentence: 'The report ___ the need for urgent action on climate change.', blank: 'underscores', options: ['underscores', 'ignores', 'denies', 'forgets'], correctIndex: 0, topic: 'Environment' },
    { id: 144, sentence: 'Her argument was so ___ that everyone agreed immediately.', blank: 'compelling', options: ['compelling', 'confusing', 'boring', 'vague'], correctIndex: 0, topic: 'Communication' },
    { id: 145, sentence: 'The policy change will have far-reaching ___ for the industry.', blank: 'implications', options: ['implications', 'problems', 'benefits', 'causes'], correctIndex: 0, topic: 'Society' },
    { id: 146, sentence: 'The researcher took a ___ approach to gathering data.', blank: 'methodical', options: ['methodical', 'random', 'hasty', 'careless'], correctIndex: 0, topic: 'Academic' },
    { id: 147, sentence: 'The speaker ___ the key points with compelling evidence.', blank: 'corroborated', options: ['corroborated', 'contradicted', 'ignored', 'forgot'], correctIndex: 0, topic: 'Academic' },
    { id: 148, sentence: 'She has a ___ ability to understand complex systems.', blank: 'remarkable', options: ['remarkable', 'limited', 'average', 'poor'], correctIndex: 0, topic: 'Describing People' },
    { id: 149, sentence: 'The investigation ___ widespread corruption in the organisation.', blank: 'uncovered', options: ['uncovered', 'covered', 'ignored', 'accepted'], correctIndex: 0, topic: 'Society' },
    { id: 150, sentence: 'The treaty is ___ for maintaining peace in the region.', blank: 'instrumental', options: ['instrumental', 'harmful', 'irrelevant', 'optional'], correctIndex: 0, topic: 'Society' },
`;

const c1Marker = "140, topic: 'Academic' },\n  ],\n  'C2':";
if (exContent.includes(c1Marker)) {
  exContent = exContent.replace(c1Marker, "140, topic: 'Academic' },\n" + c1NewExercises.trimStart() + "  ],\n  'C2':");
  console.log('✓ Added 10 new C1 gap-fill exercises (IDs 141-150)');
} else {
  console.log('! Could not find C1 insertion point');
}

// Add missing C2 gap-fill exercises (IDs 161-170, 10 more) after the last C2 exercise (ID 160)
const c2NewExercises = `
    { id: 161, sentence: 'The diplomat spoke with such ___ that everyone trusted him.', blank: 'sincerity', options: ['sincerity', 'hostility', 'indifference', 'arrogance'], correctIndex: 0, topic: 'Communication' },
    { id: 162, sentence: 'The artist work reflects a ___ understanding of human nature.', blank: 'profound', options: ['profound', 'shallow', 'limited', 'superficial'], correctIndex: 0, topic: 'Abstract' },
    { id: 163, sentence: 'The critic review was ___, praising only the weakest aspects.', blank: 'dismissive', options: ['dismissive', 'supportive', 'enthusiastic', 'thorough'], correctIndex: 0, topic: 'Media' },
    { id: 164, sentence: 'The old law has become ___ in the modern digital age.', blank: 'obsolete', options: ['obsolete', 'essential', 'useful', 'effective'], correctIndex: 0, topic: 'Society' },
    { id: 165, sentence: 'Her speech was a ___ of different cultural influences.', blank: 'synthesis', options: ['synthesis', 'rejection', 'criticism', 'ignorance'], correctIndex: 0, topic: 'Academic' },
    { id: 166, sentence: 'The company faced ___ for its unethical business practices.', blank: 'condemnation', options: ['condemnation', 'praise', 'support', 'approval'], correctIndex: 0, topic: 'Business' },
    { id: 167, sentence: 'His ___ remarks during the meeting offended several colleagues.', blank: 'inappropriate', options: ['inappropriate', 'appropriate', 'helpful', 'useful'], correctIndex: 0, topic: 'Communication' },
    { id: 168, sentence: 'The scientific community reached a ___ on climate change.', blank: 'consensus', options: ['consensus', 'disagreement', 'confusion', 'silence'], correctIndex: 0, topic: 'Science' },
    { id: 169, sentence: 'The judge decision was ___, leaving no doubt about the outcome.', blank: 'definitive', options: ['definitive', 'uncertain', 'temporary', 'flexible'], correctIndex: 0, topic: 'Society' },
    { id: 170, sentence: 'The changes to the system were so ___ that nobody noticed them.', blank: 'subtle', options: ['subtle', 'obvious', 'dramatic', 'abrupt'], correctIndex: 0, topic: 'Describing Things' },
`;

const c2Marker = "160, topic: 'Business' },\n  ],\n}\n\nexport const synonymMatchExercises";
if (exContent.includes(c2Marker)) {
  exContent = exContent.replace(c2Marker, "160, topic: 'Business' },\n" + c2NewExercises.trimStart() + "  ],\n}\n\nexport const synonymMatchExercises");
  console.log('✓ Added 10 new C2 gap-fill exercises (IDs 161-170)');
} else {
  console.log('! Could not find C2 insertion point');
}

// Save
fs.writeFileSync(exercisesPath, exContent, 'utf8');
console.log('✓ All exercise additions saved successfully');

// Count exercises
const gapFillMatch = exContent.match(/\{ id: \d+/g);
console.log('Total gap-fill entries:', gapFillMatch ? gapFillMatch.length : 'could not count');
