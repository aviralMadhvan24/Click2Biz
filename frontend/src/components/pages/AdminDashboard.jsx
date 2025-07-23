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

  const updatePurchaseStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/purchases/${id}`, {
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

      // Update local state
      setPurchases(purchases.map(p =>
        p._id === id ? { ...p, status } : p
      ));

      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error('Update error:', error);
      toast.error(`Update failed: ${error.message}`);
    }
  };

  // Only completed purchases for metrics and table
  const completedPurchases = purchases.filter(p => p.status === 'completed');

  // Metrics
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

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-indigo-600 p-3 rounded-full">
                <FiDollarSign className="text-white text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Total Clients</p>
                <p className="text-3xl font-bold">{totalClients}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-full">
                <FiUsers className="text-white text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-full">
                <FiPackage className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Purchases Table */}
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
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
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
                          {purchase.items.map((item, index) => (
                            <li key={index}>{item.name} (₹{item.price})</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-4 font-bold">₹{purchase.total}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                          {purchase.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updatePurchaseStatus(purchase._id, 'cancelled')}
                            className="p-1.5 bg-red-500/20 rounded hover:bg-red-500/30"
                            title="Cancel Order"
                          >
                            <FiX className="text-red-400" />
                          </button>
                          <button
                            onClick={() => updatePurchaseStatus(purchase._id, 'pending')}
                            className="p-1.5 bg-yellow-500/20 rounded hover:bg-yellow-500/30"
                            title="Mark as Pending"
                          >
                            <FiClock className="text-yellow-400" />
                          </button>
                        </div>
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
