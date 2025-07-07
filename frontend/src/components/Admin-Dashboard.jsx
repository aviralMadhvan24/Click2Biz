// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/requests/admin/all')
      .then(res => setRequests(res.data))
      .catch(err => console.error('Failed to load requests:', err));
  }, []);

  const handleApprove = (id) => {
    axios.patch(`/requests/${id}/approve`)
      .then(() => {
        setRequests(prev => prev.map(r => r._id === id ? { ...r, status: 'Approved' } : r));
      })
      .catch(err => console.error('Approve error:', err));
  };

  const handleReject = (id) => {
    axios.patch(`/requests/${id}/reject`)
      .then(() => {
        setRequests(prev => prev.map(r => r._id === id ? { ...r, status: 'Rejected' } : r));
      })
      .catch(err => console.error('Reject error:', err));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-indigo-900 text-white">
              <th className="p-4">Client</th>
              <th className="p-4">Bundle</th>
              <th className="p-4">Notes</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id} className="border-b">
                <td className="p-4">{req.clientName}</td>
                <td className="p-4">{req.bundleName}</td>
                <td className="p-4">{req.notes}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    req.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  {req.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
