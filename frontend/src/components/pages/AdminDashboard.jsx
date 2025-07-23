// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FiPackage, FiUsers, FiDollarSign, FiCheck, FiX, FiClock, FiHome } from 'react-icons/fi';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(await res.text());
        setPurchases(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const updateServiceStatus = async (purchaseId, serviceIndex, newStatus) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases/services/${purchaseId}/${serviceIndex}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();

    // Update purchases state locally
    setPurchases(purchases.map(p => 
      p._id === purchaseId ? data.updatedPurchase : p
    ));

    toast.success(`Service status updated to ${newStatus}`);
  } catch (err) {
    console.error(err);
    toast.error('Failed to update service status');
  }
};


  const updatePurchaseStatus = async (id, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setPurchases(purchases.map(p =>
        p._id === id ? { ...p, status } : p
      ));

      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error('Update error:', error);
      toast.error(`Update failed: ${error.message}`);
    }
  };

  const completedPurchases = purchases.filter(p => p.status === 'completed');

  const totalRevenue = completedPurchases.reduce((sum, p) => sum + p.total, 0);
  const totalClients = [...new Set(completedPurchases.map(p => p.clientEmail))].length;
  const totalOrders = completedPurchases.length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="flex cursor-pointer items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <FiHome className="mr-2" />
            Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-400">Total Revenue</p>
            <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-400">Total Clients</p>
            <p className="text-3xl font-bold">{totalClients}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-400">Total Orders</p>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Successful Purchases</h2>

          {loading ? (
            <p>Loading purchases...</p>
          ) : completedPurchases.length === 0 ? (
            <p>No successful purchases found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left">Client</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Items</th>
                    <th className="py-3 px-4 text-left">Services</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {completedPurchases.map(purchase => (
                    <tr key={purchase._id}>
                      <td className="py-3 px-4">{purchase.clientName}</td>
                      <td className="py-3 px-4">{purchase.clientEmail}</td>
                      <td className="py-3 px-4">
                        <ul className="list-disc list-inside">
                          {purchase.items.map((item, i) => (
                            <li key={i}>{item.name} (₹{item.price})</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-4">
                        <ul className="list-disc list-inside mb-2">
                         {purchase.services.map((s, i) => (
  <li key={i} className="flex items-center justify-between">
    <span>
      {s.name} — 
      <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
        s.status === 'done' ? 'bg-green-500/20 text-green-400'
        : 'bg-yellow-500/20 text-yellow-400'
      }`}>
        {s.status.toUpperCase()}
      </span>
    </span>
    <div className="ml-2">
      {s.status !== 'done' && (
     <button
  onClick={() => {
    const confirmMark = window.confirm("Are you sure you want to mark this service as done?");
    if (confirmMark) {
      updateServiceStatus(purchase._id, i, 'done');
    }
  }}
  className="text-green-400 text-xs bg-green-500/10 px-2 py-0.5 rounded hover:bg-green-600/20 transition"
>
  Mark Done
</button>
      )}
    </div>
  </li>
))}

                        </ul>
                        <div className="mt-2 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-full transition-all duration-500"
                            style={{
                              width: `${Math.round(
                                (purchase.services.filter(s => s.status === 'done').length / purchase.services.length) * 100
                              )}%`
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold">₹{purchase.total}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                          {purchase.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(purchase.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
