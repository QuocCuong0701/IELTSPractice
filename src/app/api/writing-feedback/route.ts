import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt, taskType, targetBand, content } = await request.json()

    if (!content || content.trim().length < 10) {
      return NextResponse.json({ feedback: 'Vui lòng viết ít nhất 10 từ trước khi yêu cầu phản hồi.' }, { status: 400 })
    }

    const systemPrompt = `Bạn là giám khảo IELTS chuyên chấm Writing Task ${taskType === 'task1' ? '1' : '2'}. Hãy phân tích bài viết sau đây và đưa ra phản hồi chi tiết bằng tiếng Việt.

Yêu cầu phản hồi:
1. **Task Achievement (hoàn thành yêu cầu)**: Bài viết đã đáp ứng được yêu cầu đề bài chưa?
2. **Coherence & Cohesion (mạch lạc, liên kết)**: Cấu trúc bài viết, sử dụng từ nối, chuyển ý.
3. **Lexical Resource (từ vựng)**: Vốn từ, collocations, paraphrasing.
4. **Grammatical Range & Accuracy (ngữ pháp)**: Cấu trúc câu, thì, lỗi ngữ pháp.
5. **Overall Band Estimate**: Đánh giá tổng thể và band điểm ước tính (target: ${targetBand}).
6. **Các lỗi cụ thể**: Chỉ ra lỗi sai trong bài và gợi ý sửa.
7. **Gợi ý cải thiện**: 2-3 cách để nâng cao band điểm.

Đề bài: ${prompt}

Bài viết của học viên:
${content}`

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
      const feedback = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không thể tạo phản hồi.'
      return NextResponse.json({ feedback })
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
      const feedback = data?.choices?.[0]?.message?.content || 'Không thể tạo phản hồi.'
      return NextResponse.json({ feedback })
    }

    return NextResponse.json({
      feedback: 'Chưa cấu hình AI. Vui lòng thêm GEMINI_API_KEY hoặc OPENAI_API_KEY vào file .env.local để sử dụng tính năng này.',
    }, { status: 400 })
  } catch (error) {
    console.error('Writing feedback error:', error)
    return NextResponse.json({ feedback: 'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.' }, { status: 500 })
  }
}
