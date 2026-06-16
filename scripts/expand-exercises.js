const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "data", "vocabulary-exercises.ts");
let content = fs.readFileSync(filePath, "utf8");

// === NEW GAP-FILL EXERCISES ===

const newGapFillA1A2 = `
    // === NEW GAP-FILL A1-A2 (IDs 61-80) ===
    { id: 61, sentence: "Please put on your ___ when it is cold outside.", blank: "jacket", options: ["jacket", "towel", "table", "ticket"], correctIndex: 0, topic: "Clothes" },
    { id: 62, sentence: "I bought a new pair of ___ for the party.", blank: "shoes", options: ["gloves", "socks", "shoes", "boots"], correctIndex: 2, topic: "Clothes" },
    { id: 63, sentence: "She wears a beautiful red ___ to the party.", blank: "dress", options: ["dress", "shirt", "jacket", "scarf"], correctIndex: 0, topic: "Clothes" },
    { id: 64, sentence: "Open your ___ and let the doctor see.", blank: "mouth", options: ["mouth", "nose", "eye", "ear"], correctIndex: 0, topic: "Body" },
    { id: 65, sentence: "Wash your ___ with soap before dinner.", blank: "hands", options: ["hands", "feet", "eyes", "ears"], correctIndex: 0, topic: "Body" },
    { id: 66, sentence: "The ___ sings a beautiful song in the tree.", blank: "bird", options: ["bird", "fish", "horse", "rabbit"], correctIndex: 0, topic: "Animals" },
    { id: 67, sentence: "I am very ___. I want a glass of water.", blank: "thirsty", options: ["thirsty", "hungry", "tired", "happy"], correctIndex: 0, topic: "Feelings" },
    { id: 68, sentence: "The children play ___ in the park after school.", blank: "football", options: ["football", "music", "games", "dance"], correctIndex: 0, topic: "Sports" },
    { id: 69, sentence: "She loves to listen to ___ while studying.", blank: "music", options: ["music", "sport", "food", "books"], correctIndex: 0, topic: "Hobbies" },
    { id: 70, sentence: "My uncle is a ___. He works on the farm.", blank: "farmer", options: ["farmer", "teacher", "doctor", "pilot"], correctIndex: 0, topic: "Jobs" },
    { id: 71, sentence: "The children want to ___ the game.", blank: "win", options: ["win", "lose", "play", "watch"], correctIndex: 0, topic: "Sports" },
    { id: 72, sentence: "Please close the ___, it is cold outside.", blank: "window", options: ["window", "door", "table", "book"], correctIndex: 0, topic: "Home" },
    { id: 73, sentence: "I need to buy a ___ for the bus.", blank: "ticket", options: ["ticket", "map", "key", "clock"], correctIndex: 0, topic: "Transport" },
    { id: 74, sentence: "My birthday is in ___, the first month.", blank: "January", options: ["January", "March", "June", "October"], correctIndex: 0, topic: "Daily Life" },
    { id: 75, sentence: "I ___ at 6am every morning.", blank: "wake up", options: ["wake up", "sit down", "stand up", "lie down"], correctIndex: 0, topic: "Daily Life" },
    { id: 76, sentence: "We buy vegetables at the ___.", blank: "market", options: ["market", "station", "airport", "school"], correctIndex: 0, topic: "Shopping" },
    { id: 77, sentence: "The ___ flows through the village.", blank: "river", options: ["river", "mountain", "road", "bridge"], correctIndex: 0, topic: "Nature" },
    { id: 78, sentence: "The ___ helps sick people at the hospital.", blank: "nurse", options: ["nurse", "farmer", "driver", "cook"], correctIndex: 0, topic: "Jobs" },
    { id: 79, sentence: "I take photos with my ___.", blank: "camera", options: ["camera", "phone", "clock", "lamp"], correctIndex: 0, topic: "Travel" },
    { id: 80, sentence: "The cat is sleeping ___ the door.", blank: "behind", options: ["behind", "between", "opposite", "next to"], correctIndex: 0, topic: "Places" },
`;

const newGapFillB1 = `
    // === NEW GAP-FILL B1 (IDs 81-110) ===
    { id: 81, sentence: "The ___ interviewed the president for the news.", blank: "journalist", options: ["journalist", "artist", "musician", "athlete"], correctIndex: 0, topic: "Media" },
    { id: 82, sentence: "There is a growing ___ of working from home.", blank: "trend", options: ["trend", "debt", "loss", "fall"], correctIndex: 0, topic: "Society" },
    { id: 83, sentence: "The company made a large ___ this year.", blank: "profit", options: ["profit", "debt", "loss", "cost"], correctIndex: 0, topic: "Business" },
    { id: 84, sentence: "We need an ___ approach to solve this.", blank: "alternative", options: ["alternative", "identical", "similar", "usual"], correctIndex: 0, topic: "Abstract" },
    { id: 85, sentence: "The research has a big ___ on public health.", blank: "impact", options: ["impact", "income", "effort", "respect"], correctIndex: 0, topic: "Health" },
    { id: 86, sentence: "The two departments ___ on the new project.", blank: "collaborate", options: ["collaborate", "compete", "argue", "separate"], correctIndex: 0, topic: "Business" },
    { id: 87, sentence: "I need to ___ money to my account.", blank: "transfer", options: ["transfer", "delete", "remove", "cancel"], correctIndex: 0, topic: "Finance" },
    { id: 88, sentence: "Each student has a different ___ to learning.", blank: "approach", options: ["approach", "deadline", "lecture", "lesson"], correctIndex: 0, topic: "Education" },
    { id: 89, sentence: "The ___ shows that most people are satisfied.", blank: "survey", options: ["survey", "report", "review", "study"], correctIndex: 0, topic: "Media" },
    { id: 90, sentence: "Cost is an important ___ in our decision.", blank: "factor", options: ["factor", "aspect", "issue", "item"], correctIndex: 0, topic: "Abstract" },
    { id: 91, sentence: "The school has limited ___ for new equipment.", blank: "resources", options: ["resources", "profits", "products", "projects"], correctIndex: 0, topic: "Education" },
    { id: 92, sentence: "We need to set clear ___ for next year.", blank: "targets", options: ["targets", "tasks", "roles", "rules"], correctIndex: 0, topic: "Business" },
    { id: 93, sentence: "The government introduced a new education ___.", blank: "policy", options: ["policy", "profit", "product", "price"], correctIndex: 0, topic: "Society" },
    { id: 94, sentence: "She has a natural ___ for playing the piano.", blank: "talent", options: ["talent", "task", "target", "trend"], correctIndex: 0, topic: "People" },
    { id: 95, sentence: "The new technology will ___ the industry.", blank: "transform", options: ["transform", "transfer", "transport", "translate"], correctIndex: 0, topic: "Technology" },
    { id: 96, sentence: "Everyone should have ___ opportunities at work.", blank: "equal", options: ["equal", "different", "special", "unique"], correctIndex: 0, topic: "Society" },
    { id: 97, sentence: "The company plans to ___ into new markets.", blank: "expand", options: ["expand", "explain", "expect", "explore"], correctIndex: 0, topic: "Business" },
    { id: 98, sentence: "We need to ___ a solution to this problem.", blank: "find", options: ["find", "lose", "miss", "drop"], correctIndex: 0, topic: "Abstract" },
    { id: 99, sentence: "The government ___ public schools with tax money.", blank: "funds", options: ["funds", "lends", "borrows", "saves"], correctIndex: 0, topic: "Society" },
    { id: 100, sentence: "There are many ___ of birds in this forest.", blank: "species", options: ["species", "sports", "stories", "stones"], correctIndex: 0, topic: "Environment" },
`;

const newGapFillB2 = `
    // === NEW GAP-FILL B2 (IDs 101-130) ===
    { id: 101, sentence: "The results of this study ___ the existing theory.", blank: "challenge", options: ["challenge", "confirm", "create", "complete"], correctIndex: 0, topic: "Academic" },
    { id: 102, sentence: "We need to ___ the new data with the old records.", blank: "compare", options: ["compare", "create", "destroy", "ignore"], correctIndex: 0, topic: "Academic" },
    { id: 103, sentence: "The two approaches are ___ different from each other.", blank: "fundamentally", options: ["fundamentally", "rarely", "slightly", "barely"], correctIndex: 0, topic: "Academic" },
    { id: 104, sentence: "We must ___ our strategy to meet the new requirements.", blank: "revise", options: ["revise", "remove", "reject", "repeat"], correctIndex: 0, topic: "Business" },
    { id: 105, sentence: "The company decided to ___ its headquarters abroad.", blank: "relocate", options: ["relocate", "remove", "reduce", "reject"], correctIndex: 0, topic: "Business" },
    { id: 106, sentence: "The report provides a ___ analysis of the situation.", blank: "thorough", options: ["thorough", "simple", "basic", "quick"], correctIndex: 0, topic: "Academic" },
    { id: 107, sentence: "The government must ___ to the changing needs of society.", blank: "respond", options: ["respond", "resist", "reject", "reduce"], correctIndex: 0, topic: "Society" },
    { id: 108, sentence: "We need to ___ the quality of our products.", blank: "improve", options: ["improve", "import", "ignore", "imagine"], correctIndex: 0, topic: "Business" },
    { id: 109, sentence: "The new law will ___ the use of plastic bags.", blank: "restrict", options: ["restrict", "expand", "encourage", "allow"], correctIndex: 0, topic: "Environment" },
    { id: 110, sentence: "The study ___ a link between exercise and mental health.", blank: "reveals", options: ["reveals", "hides", "ignores", "forgets"], correctIndex: 0, topic: "Health" },
    { id: 111, sentence: "We need to ___ the cost before we make a decision.", blank: "estimate", options: ["estimate", "escape", "enjoy", "enter"], correctIndex: 0, topic: "Business" },
    { id: 112, sentence: "The ___ of the new system was delayed by technical issues.", blank: "implementation", options: ["implementation", "imagination", "importance", "impression"], correctIndex: 0, topic: "Technology" },
    { id: 113, sentence: "The organisation needs a ___ change in its culture.", blank: "fundamental", options: ["fundamental", "funny", "friendly", "foreign"], correctIndex: 0, topic: "Business" },
    { id: 114, sentence: "The new evidence ___ our previous understanding.", blank: "contradicts", options: ["contradicts", "confirms", "completes", "creates"], correctIndex: 0, topic: "Academic" },
    { id: 115, sentence: "The data ___ that our approach is working.", blank: "indicates", options: ["indicates", "ignores", "invents", "involves"], correctIndex: 0, topic: "Academic" },
`;

const newGapFillC1 = `
    // === NEW GAP-FILL C1 (IDs 131-150) ===
    { id: 131, sentence: "The argument presented by the author is highly ___.", blank: "persuasive", options: ["persuasive", "convenient", "confident", "constant"], correctIndex: 0, topic: "Academic" },
    { id: 132, sentence: "The research findings ___ the need for further investigation.", blank: "highlight", options: ["highlight", "hinder", "harm", "hide"], correctIndex: 0, topic: "Academic" },
    { id: 133, sentence: "The policy has had a ___ impact on the economy.", blank: "significant", options: ["significant", "small", "silent", "simple"], correctIndex: 0, topic: "Society" },
    { id: 134, sentence: "The speaker ___ her point with relevant examples.", blank: "illustrated", options: ["illustrated", "ignored", "imagined", "imitated"], correctIndex: 0, topic: "Communication" },
    { id: 135, sentence: "The two countries have a ___ trade relationship.", blank: "mutually beneficial", options: ["mutually beneficial", "completely separate", "highly competitive", "barely existent"], correctIndex: 0, topic: "Business" },
    { id: 136, sentence: "The theory has been ___ by numerous experiments.", blank: "substantiated", options: ["substantiated", "substituted", "subtracted", "suspended"], correctIndex: 0, topic: "Science" },
    { id: 137, sentence: "Her speech was ___ and moved the audience deeply.", blank: "moving", options: ["moving", "boring", "confusing", "short"], correctIndex: 0, topic: "Communication" },
    { id: 138, sentence: "The issues are ___ connected and cannot be separated.", blank: "closely", options: ["closely", "rarely", "barely", "hardly"], correctIndex: 0, topic: "Academic" },
    { id: 139, sentence: "The research is ___ for understanding climate patterns.", blank: "essential", options: ["essential", "optional", "unnecessary", "irrelevant"], correctIndex: 0, topic: "Science" },
    { id: 140, sentence: "The findings of this study ___ previous research in this field.", blank: "reinforce", options: ["reinforce", "reject", "reduce", "remove"], correctIndex: 0, topic: "Academic" },
`;

const newGapFillC2 = `
    // === NEW GAP-FILL C2 (IDs 151-170) ===
    { id: 151, sentence: "The professor lecture was so ___ that few could follow it.", blank: "complex", options: ["complex", "obvious", "simple", "clear"], correctIndex: 0, topic: "Academic" },
    { id: 152, sentence: "The evidence he presented was entirely ___.", blank: "convincing", options: ["convincing", "solid", "strong", "clear"], correctIndex: 0, topic: "Academic" },
    { id: 153, sentence: "The report takes a ___ approach to the problem.", blank: "practical", options: ["practical", "poetic", "pessimistic", "passive"], correctIndex: 0, topic: "Business" },
    { id: 154, sentence: "Her explanation was ___, covering every detail.", blank: "thorough", options: ["thorough", "excessive", "exotic", "external"], correctIndex: 0, topic: "Academic" },
    { id: 155, sentence: "The politician speech was full of persuasive ___.", blank: "rhetoric", options: ["rhetoric", "reality", "reason", "respect"], correctIndex: 0, topic: "Society" },
    { id: 156, sentence: "The author makes a ___ distinction between two concepts.", blank: "clear", options: ["clear", "narrow", "noisy", "naive"], correctIndex: 0, topic: "Academic" },
    { id: 157, sentence: "The two theories are not mutually ___.", blank: "exclusive", options: ["exclusive", "inclusive", "expensive", "extensive"], correctIndex: 0, topic: "Academic" },
    { id: 158, sentence: "His argument was ___ and impossible to defend.", blank: "flawed", options: ["flawed", "independent", "indispensable", "incredible"], correctIndex: 0, topic: "Abstract" },
    { id: 159, sentence: "The proposal was met with widespread public ___.", blank: "opposition", options: ["opposition", "approval", "applause", "agreement"], correctIndex: 0, topic: "Society" },
    { id: 160, sentence: "The company growth has been nothing short of ___.", blank: "remarkable", options: ["remarkable", "normal", "ordinary", "average"], correctIndex: 0, topic: "Business" },
`;

console.log("Content length:", content.length);
console.log("Looking for insertion points...");

// Find insertion points - search for the closing bracket before the next level
const markers = [
  { search: "'A1-A2'", nextLevel: "'B1'" },
  { search: "'B1'", nextLevel: "'B2'" },
  { search: "'B2'", nextLevel: "'C1'" },
  { search: "'C1'", nextLevel: "'C2'" },
  { search: "'C2'", nextLevel: "};" }
];

// For each level, find the end of its gap-fill array and insert new exercises
// Find pattern: closing bracket of the array, then comma or next key

const insertAfter = (fromStr, toInsert) => {
  const idx = content.indexOf(fromStr);
  if (idx === -1) {
    console.log("Could not find:", fromStr.substring(0, 50));
    return false;
  }
  content = content.slice(0, idx) + "," + toInsert + content.slice(idx);
  return true;
};

// Insert before the start of B1 section (at end of A1-A2)
insertAfter("\n  'B1':", newGapFillA1A2);

// Insert before B2
insertAfter("\n  'B2':", newGapFillB1);

// Insert before C1
insertAfter("\n  'C1':", newGapFillC1);

// Insert before closing of gapFillExercises
const gapFillEnd = content.indexOf("export const synonymMatchExercises");
if (gapFillEnd > 0) {
  // Find the last closing bracket before this
  const lastBracket = content.lastIndexOf("]", gapFillEnd);
  content = content.slice(0, lastBracket) + "," + newGapFillC2 + content.slice(lastBracket);
}

fs.writeFileSync(filePath, content);
console.log("Exercises expanded successfully!");
