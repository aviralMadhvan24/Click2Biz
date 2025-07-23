// src/pages/AdminInvites.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'; // for grabbing the token

export default function AdminInvites() {
  const { token } = useAuth();
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState('');

  const generate = async () => {
    setError('');
    try {
      const res = await fetch('/api/auth/generate-invite', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setInvite(data);
      } else {
        setError(data.message || 'Failed to generate invite');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg max-w-md mx-auto mt-8">
  <h3 className="text-white text-xl mb-4">Generate Admin Invite</h3>

  <button
    onClick={generate}
    className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
  >
    New Invite Token
  </button>

  {invite && (
    <div className="bg-gray-700 p-3 rounded mb-3 text-green-300 space-y-2 overflow-x-auto">
      <p className="break-words">
        <strong>Token:</strong> {invite.token}
      </p>
      <p>
        <strong>Expires:</strong> {new Date(invite.expiresAt).toLocaleString()}
      </p>
    </div>
  )}

  {error && <p className="text-red-400">{error}</p>}
</div>

  );
}
