import type { Level } from '@/context/LevelContext'

export interface WritingPrompt {
  id: number
  title: string
  instruction: string
  wordLimit: number
  tips: string[]
  checklist: string[]
}

export const writingData: Record<Level, WritingPrompt[]> = {
  'A1-A2': [
    {
      id: 101, title: 'Introduce Yourself', instruction: 'Viết 3-5 câu giới thiệu về bản thân bạn.\n\nHãy nói:\n- Tên bạn là gì?\n- Bạn bao nhiêu tuổi?\n- Bạn đến từ đâu?\n- Sở thích của bạn là gì?', wordLimit: 50,
      tips: ['Dùng "My name is..."', 'Dùng "I am... years old"', 'Dùng "I like..." cho sở thích', 'Dùng "am/is/are" đúng chủ ngữ'],
      checklist: ['Đã giới thiệu tên?', 'Đã nói tuổi?', 'Đã nói đến từ đâu?', 'Đã nói sở thích?', 'Đã dùng đúng "am/is/are"?', 'Đã kiểm tra chính tả?'],
    },
    {
      id: 102, title: 'Describe Your Family', instruction: 'Viết 4-5 câu miêu tả gia đình bạn.\n\nHãy nói:\n- Gia đình bạn có mấy người?\n- Họ là ai?\n- Họ làm nghề gì?', wordLimit: 50,
      tips: ['Dùng "There are... people in my family"', 'Dùng "My father is a..."', 'Sử dụng tính từ như "kind", "funny"'],
      checklist: ['Đã nói số người trong gia đình?', 'Đã giới thiệu từng người?', 'Đã nói nghề nghiệp?', 'Đã dùng đúng thì?', 'Đã kiểm tra chính tả?'],
    },
    {
      id: 103, title: 'Your Favorite Animal', instruction: 'Viết 3-4 câu về con vật yêu thích của bạn.\n\nHãy nói:\n- Con vật đó là gì?\n- Nó màu gì?\n- Tại sao bạn thích nó?', wordLimit: 40,
      tips: ['Dùng "My favorite animal is..."', 'Dùng "It is..." để miêu tả', 'Nói lý do với "because"'],
      checklist: ['Đã nói tên con vật?', 'Đã miêu tả màu sắc?', 'Đã nói lý do thích?', 'Đã dùng đúng "is/are"?'],
    },
  ],

  'B1': [
    { id: 1, title: 'Describe Your Best Friend', instruction: 'Viết một đoạn văn ngắn (80-100 từ) miêu tả người bạn thân nhất của bạn. Hãy nói về:\n- Họ là ai?\n- Ngoại hình của họ như thế nào?\n- Tính cách của họ ra sao?\n- Tại sao bạn thích họ?', wordLimit: 100, tips: ['Sử dụng tính từ miêu tả (tall, friendly, funny, kind)', 'Dùng thì hiện tại đơn (Present Simple)', 'Sắp xếp ý logic: giới thiệu → miêu tả → cảm nghĩ', 'Kết thúc bằng một câu tổng kết'], checklist: ['Đã giới thiệu người bạn?', 'Đã miêu tả ngoại hình?', 'Đã miêu tả tính cách?', 'Đã nói lý do thích họ?', 'Đã kiểm tra lỗi chính tả?', 'Đã kiểm tra thì của động từ?', 'Bài viết đủ độ dài yêu cầu?'] },
    { id: 2, title: 'Write About Your Hobby', instruction: 'Viết một đoạn văn (80-100 từ) về sở thích của bạn. Hãy bao gồm:\n- Sở thích của bạn là gì?\n- Bạn bắt đầu làm nó từ khi nào?\n- Bạn làm nó ở đâu và với ai?\n- Tại sao bạn thích nó?', wordLimit: 100, tips: ['Dùng "My hobby is..." hoặc "I enjoy..." để bắt đầu', 'Sử dụng trạng từ tần suất (always, often, usually)', 'Thêm cảm xúc của bạn (I feel happy when...)', 'Nếu là quá khứ, dùng Past Simple'], checklist: ['Đã giới thiệu sở thích?', 'Đã nói thời gian bắt đầu?', 'Đã miêu tả hoạt động?', 'Đã giải thích lý do thích?', 'Đã sử dụng đúng thì?', 'Đã kiểm tra chính tả?'] },
    { id: 3, title: 'A Memorable Holiday', instruction: 'Viết một đoạn văn (100-120 từ) về một kỳ nghỉ đáng nhớ của bạn. Hãy bao gồm:\n- Bạn đã đi đâu?\n- Bạn đi với ai?\n- Bạn đã làm gì ở đó?\n- Điều gì làm kỳ nghỉ đó đáng nhớ?', wordLimit: 120, tips: ['Dùng thì quá khứ đơn (Past Simple) để kể chuyện', 'Sử dụng tính từ cảm xúc (amazing, wonderful, exciting)', 'Sắp xếp theo trình tự thời gian', 'Kết thúc bằng cảm nghĩ của bạn'], checklist: ['Đã dùng thì quá khứ?', 'Đã nói địa điểm và người đi cùng?', 'Đã kể các hoạt động?', 'Đã giải thích tại sao đáng nhớ?', 'Bài viết có mở đầu và kết thúc?', 'Đã kiểm tra động từ bất quy tắc?'] },
    { id: 4, title: 'Benefits of Learning English', instruction: 'Viết một đoạn văn (100-120 từ) về lợi ích của việc học tiếng Anh. Hãy bao gồm:\n- Học tiếng Anh giúp ích gì cho công việc?\n- Học tiếng Anh giúp ích gì trong cuộc sống hàng ngày?\n- Nó mở ra những cơ hội gì?\n- Cho ví dụ cụ thể.', wordLimit: 120, tips: ['Dùng "First/First of all", "Second/Moreover", "Finally" để sắp xếp ý', 'Sử dụng "because" để giải thích', 'Đưa ra ví dụ cụ thể (for example, such as)', 'Kết thúc bằng lời khuyên hoặc kết luận'], checklist: ['Đã có câu mở đầu giới thiệu chủ đề?', 'Đã sắp xếp ý logic (liên từ)?', 'Đã đưa ra ít nhất 2 lợi ích?', 'Đã có ví dụ cụ thể?', 'Đã có câu kết luận?', 'Đã kiểm tra ngữ pháp và chính tả?'] },
    { id: 5, title: 'Describe Your Dream Job', instruction: 'Viết một đoạn văn (100-120 từ) về công việc mơ ước của bạn. Hãy bao gồm:\n- Công việc đó là gì?\n- Tại sao bạn muốn làm công việc đó?\n- Bạn cần những kỹ năng gì?\n- Bạn dự định làm thế nào để đạt được nó?', wordLimit: 120, tips: ['Dùng "I want to become/I dream of being"', 'Nói về đam mê và lý do (I love/I am passionate about)', 'Liệt kê kỹ năng với "need to", "must", "should"', 'Nói về kế hoạch tương lai với "will" hoặc "be going to"'], checklist: ['Đã giới thiệu công việc mơ ước?', 'Đã giải thích lý do?', 'Đã nói về kỹ năng cần thiết?', 'Đã có kế hoạch thực hiện?', 'Đã dùng đúng thì?', 'Đã kiểm tra lỗi chính tả?'] },
  ],

  'B2': [
    {
      id: 201, title: 'Advantages and Disadvantages of Social Media', instruction: 'Write a paragraph (150-180 words) discussing the pros and cons of social media.\n\nInclude:\n- How social media connects people\n- Negative effects on mental health\n- Impact on productivity\n- Your overall opinion', wordLimit: 180,
      tips: ['Use "On the one hand / On the other hand"', 'Use "Furthermore / Moreover" to add points', 'Use "However / Nevertheless" to contrast', 'Give specific examples to support your points'],
      checklist: ['Did you introduce the topic?', 'Did you mention both advantages and disadvantages?', 'Did you use linking words?', 'Did you give examples?', 'Did you state your opinion?', 'Did you check grammar and spelling?'],
    },
    {
      id: 202, title: 'Letter of Complaint', instruction: 'Write a formal letter of complaint (150-180 words) about a product you bought that was defective.\n\nInclude:\n- What you bought and when\n- What the problem is\n- What you have done to resolve it\n- What you expect the company to do', wordLimit: 180,
      tips: ['Start with "Dear Sir or Madam"', 'Use formal language', 'Explain the problem clearly', 'State what action you expect'],
      checklist: ['Did you use formal salutation?', 'Did you explain the problem?', 'Did you mention when you bought it?', 'Did you state expected resolution?', 'Did you use formal closing?', 'Did you check grammar?'],
    },
    {
      id: 203, title: 'The Importance of Education', instruction: 'Write an opinion essay (180-200 words) on why education is important for personal and societal development.\n\nInclude:\n- How education benefits individuals\n- How it benefits society\n- Challenges in accessing education\n- Your conclusion', wordLimit: 200,
      tips: ['Start with a strong thesis statement', 'Use "Firstly / Secondly / Finally" to organize', 'Use "In my opinion / I believe" to express views', 'End with a concluding paragraph'],
      checklist: ['Did you have a clear thesis?', 'Did you discuss personal benefits?', 'Did you discuss societal benefits?', 'Did you mention challenges?', 'Did you use paragraph structure?', 'Did you check grammar and vocabulary?'],
    },
    {
      id: 204, title: 'Describe a Place You Would Like to Visit', instruction: 'Write a descriptive paragraph (150-180 words) about a place you want to visit in the future.\n\nInclude:\n- What the place is and where it is\n- Why you want to go there\n- What you would do there\n- What you expect to see or experience', wordLimit: 180,
      tips: ['Use vivid adjectives to describe', 'Use "I would like to / I hope to"', 'Use sensory language (see, hear, smell)', 'Explain your personal connection'],
      checklist: ['Did you name the place?', 'Did you describe why you want to go?', 'Did you use descriptive language?', 'Did you mention activities?', 'Did you check spelling?'],
    },
  ],

  'C1': [
    {
      id: 301, title: 'For and Against: Remote Work', instruction: 'Write a balanced argumentative essay (200-250 words) discussing the merits and drawbacks of remote work.\n\nStructure:\n- Introduction presenting both perspectives\n- Body paragraph 1: advantages\n- Body paragraph 2: disadvantages\n- Conclusion with your position', wordLimit: 250,
      tips: ['Use hedging language: "It could be argued that...", "One might consider..."', 'Use "From an economic perspective...", "From a social standpoint..."', 'Use concession clauses: "While it is true that...", "Although..."', 'Maintain formal academic tone throughout'],
      checklist: ['Is the introduction balanced?', 'Are advantages properly discussed?', 'Are disadvantages properly discussed?', 'Is hedging language used appropriately?', 'Is the conclusion clear?', 'Are transitions between paragraphs smooth?', 'Is the vocabulary at C1 level?'],
    },
    {
      id: 302, title: 'Proposal: Improving Public Spaces', instruction: 'Write a formal proposal (250-300 words) to your local city council suggesting improvements to public spaces in your community.\n\nInclude:\n- Current situation and problems identified\n- Specific recommendations with justification\n- Expected benefits\n- Implementation considerations', wordLimit: 300,
      tips: ['Use "I propose that...", "It is recommended that..."', 'Use subjunctive: "It is essential that the council allocate..."', 'Use "This would result in...", "Consequently..."', 'Use a professional, persuasive tone'],
      checklist: ['Is the proposal formally structured?', 'Are problems clearly identified?', 'Are recommendations specific?', 'Is justification provided?', 'Are benefits explained?', 'Is subjunctive used correctly?', 'Is the tone appropriate?'],
    },
    {
      id: 303, title: 'Critical Analysis: Technology and Privacy', instruction: 'Write a critical analysis essay (250-300 words) examining the relationship between technological advancement and personal privacy.\n\nConsider:\n- How technology collects personal data\n- The balance between convenience and privacy\n- Government surveillance vs. security\n- Possible solutions or regulations', wordLimit: 300,
      tips: ['Use "This raises the question of whether..."', 'Use "It could be contended that..."', 'Use nominalization: "The collection of data..."', 'Acknowledge counterarguments', 'Use "Nevertheless", "Furthermore", "In light of this"'],
      checklist: ['Is the thesis clear?', 'Are different perspectives considered?', 'Are counterarguments acknowledged?', 'Is nominalization used?', 'Is the vocabulary sophisticated?', 'Is the conclusion thought-provoking?'],
    },
  ],

  'C2': [
    {
      id: 401, title: 'Synthesis Essay: Consciousness and AI', instruction: 'Write a synthesis essay (300-350 words) integrating perspectives from philosophy, neuroscience, and computer science on whether artificial intelligence could achieve consciousness.\n\nStructure:\n- Introduction framing the debate\n- Philosophical perspective (qualia, hard problem of consciousness)\n- Neuroscientific perspective (integrated information theory, neural correlates)\n- Computer science perspective (emergence, complex systems)\n- Your well-reasoned conclusion', wordLimit: 350,
      tips: ['Demonstrate nuanced understanding of different disciplinary perspectives', 'Use sophisticated discourse markers: "Notwithstanding...", "In contradistinction to..."', 'Integrate quotations and references appropriately', 'Maintain rigorous academic register throughout'],
      checklist: ['Are multiple disciplinary perspectives integrated?', 'Is the argument logically structured?', 'Is vocabulary at C2 level?', 'Are transitions sophisticated?', 'Is the conclusion well-reasoned?', 'Is the register consistently academic?', 'Are all claims appropriately hedged?'],
    },
    {
      id: 402, title: 'Policy Brief: Climate Adaptation Strategy', instruction: 'Write a policy brief (350-400 words) outlining a comprehensive climate adaptation strategy for a coastal city.\n\nInclude:\n- Executive summary of key challenges\n- Critical infrastructure vulnerabilities\n- Proposed adaptive measures (structural and non-structural)\n- Economic implications and funding mechanisms\n- Implementation timeline and monitoring framework\n- Risk assessment', wordLimit: 400,
      tips: ['Use precise technical vocabulary appropriate to policy writing', 'Employ "It is imperative that...", "The evidence suggests..."', 'Use data and evidence to support recommendations', 'Structure with clear headings', 'Maintain authoritative yet measured tone'],
      checklist: ['Is the executive summary concise?', 'Are vulnerabilities clearly identified?', 'Are measures specific and actionable?', 'Are economic implications addressed?', 'Is there an implementation timeline?', 'Is the language appropriately formal?', 'Are recommendations evidence-based?'],
    },
    {
      id: 403, title: 'Review: A Groundbreaking Work', instruction: 'Write a critical review (300-350 words) of a book, film, or research paper that you consider groundbreaking in its field.\n\nInclude:\n- Brief context situating the work\n- Summary of key arguments or artistic features\n- Critical evaluation of strengths and limitations\n- Its contribution to the field or culture\n- Your substantiated judgment', wordLimit: 350,
      tips: ['Use "The work constitutes a seminal contribution to..."', 'Employ critical metalanguage: "problematizes", "interrogates", "elucidates"', 'Balance appreciation with critique', 'Reference specific elements to support evaluation', 'Conclude with significance assessment'],
      checklist: ['Is the work properly contextualized?', 'Are key features summarized without excessive description?', 'Is the evaluation balanced with both strengths and limitations?', 'Are specific examples referenced?', 'Is the vocabulary at C2 level?', 'Is the final judgment well-substantiated?', 'Is the register appropriate for an academic review?'],
    },
  ],
}


