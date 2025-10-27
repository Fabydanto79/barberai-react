
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  const apiKey = process.env.GROQ_API_KEY;
  const endpoint = process.env.GROQ_ENDPOINT;

  if (!apiKey || !endpoint) return res.status(500).json({ error: 'GROQ not configured' });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        prompt,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Groq request failed', details: err.message });
  }
}
