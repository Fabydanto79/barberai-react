export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const endpoint = process.env.GROQ_ENDPOINT;

    if (!apiKey || !endpoint) {
      return new Response(JSON.stringify({ error: 'GROQ not configured' }), { status: 500 });
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'groq/compound',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    
    console.log(data.reply);
    
    const cleanContent = data.choices?.[0]?.message?.content?.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    return new Response(JSON.stringify({ reply: cleanContent }), { status: 200 });

    //return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Groq request failed', details: err.message }), { status: 500 });
  }
}




