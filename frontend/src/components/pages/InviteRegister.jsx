import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InviteRegister() {
  const [form, setForm] = useState({
    token: '',
    name: '',
    email: '',
    password: ''
  });

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    try {
      const res = await fetch('/api/auth/invite-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

     const text = await res.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  data = { message: text };
}


      if (res.ok) {
        setStatus('Admin account created successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white text-center">Create Admin (Invite Only)</h2>

        {status && <p className="text-green-500 text-sm">{status}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Invite Token"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded"
        >
          Create Admin Account
        </button>
      </form>
    </div>
  );
}
