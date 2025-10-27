"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Errore nella richiesta AI: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">BarberAI Prenotazioni + AI</h1>

      <textarea
        className="border rounded p-2 w-full max-w-md mb-2"
        rows={4}
        placeholder="Scrivi qui il prompt per l'assistente AI..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={sendPrompt}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Caricamento..." : "Invia"}
      </button>

      <pre className="w-full max-w-md bg-white border p-4 rounded text-sm whitespace-pre-wrap">
        {response}
      </pre>
    </div>
  );
}
