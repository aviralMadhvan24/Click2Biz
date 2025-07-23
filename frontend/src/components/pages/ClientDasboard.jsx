// src/pages/ClientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiCheckCircle, 
  FiCreditCard,
  FiXCircle, 
  FiClock ,
  FiPlusCircle,
  FiPaperclip
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
const SupportRequestModal = ({ isOpen, onClose, purchaseId }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('purchaseId', purchaseId);
      formData.append('message', message);
      
      attachments.forEach(file => {
        formData.append('attachments', file);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/support`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit support request');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setMessage('');
        setAttachments([]);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Request Support</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FiXCircle size={24} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <FiCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Request Submitted!</h4>
            <p className="text-gray-400">Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Describe your issue</label>
              <textarea
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Please describe your support request in detail..."
              />
            </div>

            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const ClientDashboard = () => {

 const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const [sdkReady, setSdkReady] = useState(false);
  const [activeTab, setActiveTab] = useState('bundles');
  const [purchasedBundles, setPurchasedBundles] = useState([]);
  const [cart, setCart] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { token  } = useAuth();
  const [supportModalOpen, setSupportModalOpen] = useState(false); // Add this line
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null); // Add this line
  const navigate = useNavigate();
useEffect(() => {
  // If the script tag is in index.html, it'll be loaded before this runs
  if (window.Razorpay) {
    setSdkReady(true);
  } else {
    // (fallback) insert script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => console.error('Razorpay SDK failed to load');
    document.head.appendChild(script);
  }
}, []);
  // Digital Essentials Bundles
  const digitalEssentials = [
    {
      id: 'de1',
      name: "Digital Kickstart",
      price: 3000,
      category: "Digital Essentials",
      features: [
        "1-page Landing/Mini-site",
        "Google My Business Setup & Optimization",
        "WhatsApp Chat Widget",
        "Basic On-page SEO",
        "2 Social Media Posts"
      ],
      popular: false
    },
    {
      id: 'de2',
      name: "Business Builder",
      price: 4500,
      category: "Digital Essentials",
      features: [
        "3-page Website",
        "GMB + Reviews Management",
        "WhatsApp Catalog",
        "Payment Link Integration",
        "3 Social Media Posts + 1 Reel",
        "Google Analytics Setup"
      ],
      popular: true
    }
  ];
  
  // Growth & Performance Bundles
  const growthPerformance = [
    {
      id: 'gp1',
      name: "Growth Catalyst",
      price: 7000,
      category: "Growth & Performance",
      features: [
        "4-page Premium Site + Blog",
        "Full SEO & Google Search Console Setup",
        "WhatsApp API Integration",
        "6 Social Posts + 1 Reel",
        "Basic Ad-Campaign Setup (up to ₹3,500 ad spend)"
      ],
      popular: false
    },
    {
      id: 'gp2',
      name: "Enterprise Elevate",
      price: 8500,
      category: "Growth & Performance",
      features: [
        "5–6-page Custom Site with Booking/E-Commerce",
        "Advanced SEO & Analytics Report",
        "WhatsApp API + Chatbot Flow",
        "8 Social Posts + 2 Reels",
        "Ad-Campaign Management (₹3,500 ad spend included)"
      ],
      popular: true
    }
  ];
  
  // Maintenance Bundles
  const maintenanceBundles = [
    {
      id: 'm1',
      name: "Essential Maintenance",
      price: 1200,
      category: "Maintenance",
      features: [
        "2 hrs support",
        "2 Posts",
        "1 GMB update",
        "Monthly performance report"
      ],
      popular: false
    },
    {
      id: 'm2',
      name: "Premium Maintenance",
      price: 2200,
      category: "Maintenance",
      features: [
        "4 hrs support",
        "4 Posts + 1 Reel",
        "1 GMB update",
        "Analytics report + recommendations"
      ],
      popular: true
    }
  ];

  useEffect(() => {
    const fetchPurchasedBundles = async () => {
      try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setPurchasedBundles(data);
          localStorage.setItem('purchasedBundles', JSON.stringify(data));
        } else {
          throw new Error('Failed to fetch purchases');
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
        const localPurchases = JSON.parse(localStorage.getItem('purchasedBundles') || '[]');
        setPurchasedBundles(localPurchases);
      }
    };
    
    fetchPurchasedBundles();
  }, []);
  const addOns = [
  {
    id: 'ao1',
    name: "WhatsApp Widget Installation",
    description: "Click-to-chat button on your website for instant leads",
    price: 299,
    category: "Add-Ons"
  },
  {
    id: 'ao2',
    name: "WhatsApp Catalogue Setup",
    description: "Product/service showcase inside your WhatsApp Business app",
    price: 699,
    category: "Add-Ons"
  },
  {
    id: 'ao3',
    name: "WhatsApp API Setup",
    description: "Official API integration for auto messages, order updates etc.",
    price: 1999,
    category: "Add-Ons"
  },
  {
    id: 'ao4',
    name: "Basic WhatsApp Chatbot (5 Q&A)",
    description: "Automated chatbot to handle FAQs or bookings on WhatsApp",
    price: 3499,
    category: "Add-Ons"
  },
  {
    id: 'ao5',
    name: "Google Business Profile Setup",
    description: "Claim + Optimize your Google Map listing",
    price: 999,
    category: "Add-Ons"
  },
  {
    id: 'ao6',
    name: "1 Custom Poster Design",
    description: "Professionally designed social media graphic",
    price: 249,
    category: "Add-Ons"
  },
  {
    id: 'ao7',
    name: "Reel Video Edit (30-60 sec)",
    description: "Instagram reel/video edit with captions & transitions",
    price: 399,
    category: "Add-Ons"
  },
  {
    id: 'ao8',
    name: "Basic Social Media Audit Report",
    description: "Review of your Instagram / Facebook page with improvement tips",
    price: 699,
    category: "Add-Ons"
  },
  {
    id: 'ao9',
    name: "Premium Logo Design (3 Options)",
    description: "3 logo concepts + 1 revision + source files",
    price: 1799,
    category: "Add-Ons"
  },
  {
    id: 'ao10',
    name: "SEO Audit Report (1 Website)",
    description: "SEO health check + keyword suggestions",
    price: 1299,
    category: "Add-Ons"
  },
  {
    id: 'ao11',
    name: "Basic Google Ads Campaign Setup",
    description: "₹3000 ad spend included. Campaign setup and management",
    price: 3499,
    category: "Add-Ons"
  }
];

  // Loading state for Razorpay
  if (!sdkReady) {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading payment gateway…</p>
        </div>
      </div>
    </Layout>
  );
}

  const allBundles = [...digitalEssentials, ...growthPerformance, ...maintenanceBundles];
  
  const addToCart = (bundle) => {
    if (cart.some(item => item.id === bundle.id)) {
      toast.info(`${bundle.name} is already in your cart.`);
      return;
    }
    setCart([...cart, bundle]);
    toast.success(`${bundle.name} added to cart!`);
  };
  
  const removeFromCart = (id) => {
    const item = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    toast.info(`${item.name} removed from cart`);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const purchaseBundles = async () => {
   
    if (!RAZORPAY_KEY_ID) {
      toast.error('Payment configuration error. Please contact support.');
      console.error('RAZORPAY_KEY_ID is not defined');
      return;
    }

  
    if (cart.length === 0) {
      toast.warning('Your cart is empty!');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!storedUser) {
      toast.error('Please login to complete purchase');
      return;
    }

    setIsPurchasing(true);

    try {
      // 1. Create purchase record on backend
     const purchaseRes = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            bundleId: item.id,
            name: item.name,
            price: item.price,
            category: item.category
          })),
          total: calculateTotal()
        })
      });

      if (!purchaseRes.ok) {
        throw new Error('Failed to create purchase record');
       
      }

      const purchaseData = await purchaseRes.json();
      const purchaseId = purchaseData.purchase._id;

      // 2. Create Razorpay order
            const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: calculateTotal(),
          purchaseId
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // 3. Setup Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        order_id: orderData.id,
        name: 'Click2Biz',
        description: `Purchase of ${cart.length} service bundles`,
        prefill: {
          name: storedUser.name,
          email: storedUser.email,
          contact: storedUser.phone || ''
        },
        theme: {
          color: '#6366f1' // Indigo color
        },
        handler: async (response) => {
          try {
            // 4. Verify payment on backend
           const verification = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: orderData.paymentId
              })
            });
            
            if (!verification.ok) {
              throw new Error('Payment verification failed');
            }

            const verificationData = await verification.json();
            
            if (verificationData.success) {
              toast.success('Payment successful! Your services have been activated.');
              setCart([]); // Clear cart
              
              // Refresh purchased bundles
              const updatedPurchases = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
             
              if (updatedPurchases.ok) {
                const data = await updatedPurchases.json();
                setPurchasedBundles(data);
              }
              
              setActiveTab('purchased'); // Switch to purchased tab
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
          }
        }
      };

      console.log("🚀 Razorpay options:", options);
      // 5. Initialize Razorpay
const RZ = window.Razorpay;
if (!RZ) {
  toast.error('Payment gateway is not ready.');
  return;
}
const rzp = new RZ(options);
      
      // Handle payment failure
      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        console.error('Payment failed:', response.error);
      });

      // 6. Open payment modal
      rzp.open();

    } catch (error) {
      console.error('Purchase error:', error);
      
      toast.error(`Purchase failed: ${error.message}`);
    } finally {
      setIsPurchasing(false);
    }
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        {/* Header */}
         {/* Header */}
       <header className="bg-gray-900 border-b border-gray-800">
          {/* Heading Section - Always at top */}
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Client Dashboard
             
            </h1>
          </div>
          
          {/* Navigation Section */}
          <div className="bg-gray-800/50 border-t border-gray-700/50">
            <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
              {/* Home Button */}
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-600 cursor-pointer"
              >
                <FiHome className="text-indigo-300" />
                <span className="text-gray-200">Home</span>
              </button>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === 'bundles' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400' 
                      : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700/80 border border-gray-600'
                  }`}
                  onClick={() => setActiveTab('bundles')}
                >
                  <FiPackage />
                  <span>Service Bundles</span>
                </button>
                <button 
  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
    activeTab === 'addons' 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400' 
      : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700/80 border border-gray-600'
  }`}
  onClick={() => setActiveTab('addons')}
>
  <FiPlusCircle />
  <span>Add-Ons</span>
</button>
                
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === 'cart' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400' 
                      : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700/80 border border-gray-600'
                  }`}
                  onClick={() => setActiveTab('cart')}
                >
                  <div className="relative">
                    <FiShoppingCart />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </button>
                
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === 'purchased' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400' 
                      : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700/80 border border-gray-600'
                  }`}
                  onClick={() => setActiveTab('purchased')}
                >
                  <div className="relative">
                    <FiCheckCircle />
                    {purchasedBundles.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {purchasedBundles.length}
                      </span>
                    )}
                  </div>
                  <span>My Bundles</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-6 py-8">
          {/* Service Bundles Tab */}
          {activeTab === 'bundles' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2 text-indigo-400">Digital Essentials Plans</h2>
                <p className="text-gray-400 mb-6">For Small to Mid-Sized Businesses</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {digitalEssentials.map((bundle) => (
                    <BundleCard 
                      key={bundle.id} 
                      bundle={bundle} 
                      onAdd={() => addToCart(bundle)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2 text-indigo-400">Growth & Performance Plans</h2>
                <p className="text-gray-400 mb-6">For Mid to Large Businesses</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {growthPerformance.map((bundle) => (
                    <BundleCard 
                      key={bundle.id} 
                      bundle={bundle} 
                      onAdd={() => addToCart(bundle)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2 text-indigo-400">Maintenance Bundles</h2>
                <p className="text-gray-400 mb-6">Ongoing support for your digital presence</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {maintenanceBundles.map((bundle) => (
                    <BundleCard 
                      key={bundle.id} 
                      bundle={bundle} 
                      onAdd={() => addToCart(bundle)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Shopping Cart Tab */}
          {activeTab === 'cart' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-indigo-400">Your Shopping Cart</h2>
              
              {cart.length === 0 ? (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700">
                  <FiShoppingCart className="mx-auto text-5xl text-gray-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Browse our service bundles to get started</p>
                  <button 
                    className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold"
                    onClick={() => setActiveTab('bundles')}
                  >
                    Explore Bundles
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
                    <div className="divide-y divide-gray-700">
                      {cart.map((item) => (
                        <div key={item.id} className="p-6 flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            <p className="text-indigo-400 font-medium">₹{item.price}</p>
                            <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                          </div>
                          <button 
                            className="text-red-500 hover:text-red-400 p-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-6 border-t border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-gray-400">Total</p>
                        <p className="text-2xl font-bold">₹{calculateTotal()}</p>
                      </div>
                      <button 
                        className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold flex items-center disabled:opacity-50"
                        onClick={purchaseBundles}
                        disabled={isPurchasing}
                      >
                        {isPurchasing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiCreditCard className="mr-2" />
                            Complete Purchase
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Purchased Bundles Tab */}
          {activeTab === 'purchased' && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-8 text-indigo-400">My Purchased Bundles</h2>

    {purchasedBundles.length === 0 ? (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700">
        <FiPackage className="mx-auto text-5xl text-gray-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-300 mb-2">No bundles purchased yet</h3>
        <p className="text-gray-500 mb-6">Get started with our digital service bundles</p>
        <button 
          className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold"
          onClick={() => setActiveTab('bundles')}
        >
          Explore Bundles
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {purchasedBundles.map((purchase) => (
          <div 
            key={purchase._id} 
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Purchased Items</h3>
                <div className="mt-2">
                  {purchase.items.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="text-indigo-400 font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">₹{item.price} • {item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`p-2 rounded-lg ${
                purchase.status === 'completed' ? 'bg-green-500/10' :
                purchase.status === 'cancelled' ? 'bg-red-500/10' :
                'bg-yellow-500/10'
              }`}>
                {purchase.status === 'completed' && <FiCheckCircle className="text-green-500 text-2xl" />}
                {purchase.status === 'cancelled' && <FiXCircle className="text-red-500 text-2xl" />}
                {purchase.status === 'pending' && <FiClock className="text-yellow-500 text-2xl" />}
              </div>
            </div>

            {/* ✅ Service Progress Section */}
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-300 mb-2">Service Progress</h4>
              <div className="space-y-2">
                {purchase.services.map((service, sIdx) => (
                  <div key={sIdx} className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">{service.name} ({service.bundleType})</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'done' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {service.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-3 bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-500"
                  style={{ width: `${Math.round((purchase.services.filter(s => s.status === 'done').length / purchase.services.length) * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-xl font-bold">₹{purchase.total}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                purchase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                purchase.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {purchase.status?.toUpperCase() || 'PENDING'}
              </span>
             <button 
  className= "cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
  onClick={() => {
    setSelectedPurchaseId(purchase._id);
    setSupportModalOpen(true);
  }}
>
  Request Support
</button>
            </div>

            <div className="mt-4 text-gray-500 text-sm">
              Purchased on: {new Date(purchase.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    )}
  </motion.div>
)}
{activeTab === 'addons' && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-8 text-indigo-400">Add-On Services</h2>
    <p className="text-gray-400 mb-8 max-w-3xl">
      Enhance your existing bundles or get quick fixes with these à la carte services. 
      Perfect when you need just one specific service.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {addOns.map((addon) => (
        <div 
          key={addon.id}
          className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-2">{addon.name}</h3>
          <p className="text-gray-400 mb-4 flex-grow">{addon.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-indigo-400">₹{addon.price}</span>
            <button 
              className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              onClick={() => addToCart(addon)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-3">Need multiple add-ons?</h3>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
        Bundle 3 or more add-ons and get 10% discount on your total order.
      </p>
      <button 
        className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
        onClick={() => {
          setActiveTab('bundles');
          toast.info('Browse our bundles for complete solutions');
        }}
      >
        Explore Full Bundles
      </button>
    </div>
  </motion.div>
)}
          
        </main>
      </div>
      <SupportRequestModal 
  isOpen={supportModalOpen} 
  onClose={() => setSupportModalOpen(false)}
  purchaseId={selectedPurchaseId}
/>
    </Layout>
  );
};

// Bundle Card Component
const BundleCard = ({ bundle, onAdd }) => {
  return (
    <motion.div 
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl flex flex-col h-full"
      whileHover={{ y: -10, borderColor: '#818cf8' }}
      transition={{ duration: 0.3 }}
    >
      {bundle.popular && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
      <div className="text-3xl font-bold text-indigo-400 mb-4">₹{bundle.price}</div>
      
      <div className="mb-6 flex-grow">
        <h4 className="font-bold text-gray-300 mb-3">Inclusions:</h4>
        <ul className="space-y-2">
          {bundle.features.map((feature, i) => (
            <li key={i} className="flex items-start text-gray-400">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <button 
        className="bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-600 text-white w-full py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center"
        onClick={onAdd}
      >
        <FiShoppingCart className="mr-2" />
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ClientDashboard;