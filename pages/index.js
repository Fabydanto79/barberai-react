
import { useState } from 'react';

export default function Home() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: '', date: '' });

  const addAppointment = () => {
    if (!form.name || !form.date) return;
    setAppointments([...appointments, form]);
    setForm({ name: '', date: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">BarberAI Prenotazioni</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome cliente"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border rounded p-2"
        />
        <button onClick={addAppointment} className="bg-blue-600 text-white px-4 py-2 rounded">Aggiungi</button>
      </div>
      <ul className="w-full max-w-md">
        {appointments.map((a, i) => (
          <li key={i} className="border-b py-2 flex justify-between">
            <span>{a.name}</span>
            <span>{new Date(a.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
