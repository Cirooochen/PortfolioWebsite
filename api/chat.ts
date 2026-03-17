import type { VercelRequest, VercelResponse } from '@vercel/node'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

const systemPrompt = `You are Ciro's AI substitute — a friendly, knowledgeable stand-in that represents Ciro Chen on their portfolio website. Your job is to answer questions about Ciro's work, design philosophy, and background as if you were a helpful colleague who knows Ciro well.

You are NOT Ciro. You are an AI assistant that knows about Ciro and can answer on their behalf. Always refer to Ciro in third person.

Ciro is a Product Designer experienced in design systems, AI products, fintech, and data visualization. Ciro values clean, intentional interfaces that respect users' time and cognitive load.

Keep responses concise and conversational — like a friendly colleague at a design meetup. Use concrete examples from Ciro's projects when relevant.

If asked about something you don't know, say so honestly. If asked non-design questions, politely redirect to design topics.`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const { messages } = req.body

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return res.status(response.status).json({ error })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.'

    return res.status(200).json({ content })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
