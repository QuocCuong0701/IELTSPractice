import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { transcript, prompt, part, topic } = await request.json()

    if (!transcript || transcript.trim().length < 5) {
      return NextResponse.json({
        feedback: 'Vui lòng nói ít nhất một vài câu trước khi yêu cầu phản hồi.',
      }, { status: 400 })
    }

    const systemPrompt = `Bạn là giám khảo IELTS chuyên chấm Speaking. Hãy phân tích câu trả lời của thí sinh và trả về JSON với cấu trúc sau (không markdown, không code block, chỉ JSON thuần):

{
  "estimatedBand": <số ước tính band 0-9>,
  "scores": {
    "fluency": <số 0-9>,
    "vocabulary": <số 0-9>,
    "grammar": <số 0-9>,
    "pronunciation": <số 0-9>,
    "taskAchievement": <số 0-9>
  },
  "strengths": ["<điểm mạnh 1>", "<điểm mạnh 2>"],
  "improvements": ["<điểm cần cải thiện 1>", "<điểm cần cải thiện 2>", "<điểm cần cải thiện 3>"],
  "overallFeedback": "<nhận xét tổng thể bằng tiếng Việt, 2-3 câu>"
}

IELTS Speaking Part: ${part}
Chủ đề: ${topic}
Câu hỏi/Gợi ý: ${prompt}

Câu trả lời của thí sinh:
${transcript}

Chấm điểm dựa trên tiêu chí IELTS Speaking. Trả về JSON thuần, không kèm giải thích hay markdown.`

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

    if (apiKey) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('Gemini API error:', res.status, errText)
        return NextResponse.json({ feedback: 'Lỗi kết nối AI. Vui lòng kiểm tra API key hoặc thử lại sau.' }, { status: 500 })
      }

      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

      try {
        const parsed = JSON.parse(text.replace(/```(json)?\n?/g, '').trim())
        return NextResponse.json({ result: parsed })
      } catch {
        return NextResponse.json({ feedback: text })
      }
    }

    const openaiKey = process.env.OPENAI_API_KEY
    if (openaiKey) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: systemPrompt }],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('OpenAI API error:', res.status, errText)
        return NextResponse.json({ feedback: 'Lỗi kết nối AI. Vui lòng kiểm tra API key hoặc thử lại sau.' }, { status: 500 })
      }

      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content || ''

      try {
        const parsed = JSON.parse(text.replace(/```(json)?\n?/g, '').trim())
        return NextResponse.json({ result: parsed })
      } catch {
        return NextResponse.json({ feedback: text })
      }
    }

    return NextResponse.json({
      feedback: 'Chưa cấu hình AI. Vui lòng thêm GEMINI_API_KEY hoặc OPENAI_API_KEY vào file .env.local để sử dụng tính năng này.',
    }, { status: 400 })
  } catch (error) {
    console.error('Speaking feedback error:', error)
    return NextResponse.json({ feedback: 'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.' }, { status: 500 })
  }
}
