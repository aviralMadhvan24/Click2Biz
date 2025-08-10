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
  FiClock,
  FiPlusCircle,
  FiPaperclip
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const SupportRequestModal = React.memo(({ isOpen, onClose, purchaseId }) => {
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

      if (!response.ok) throw new Error('Failed to submit support request');

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
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6"
      role="dialog" 
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <motion.div 
        className="bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-3xl p-10 max-w-md w-full border border-gray-700 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 id="support-modal-title" className="text-2xl font-extrabold text-white tracking-tight">
            Request Support
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Close Support Request Modal"
          >
            <FiXCircle size={28} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-10">
            <FiCheckCircle className="mx-auto text-6xl text-green-400 mb-6" />
            <h4 className="text-2xl font-semibold text-white mb-3">Request Submitted!</h4>
            <p className="text-gray-300 text-lg">Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="issueDescription" className="block text-gray-300 font-semibold mb-2">
                Describe your issue
              </label>
              <textarea
                id="issueDescription"
                className="w-full bg-gray-800/70 border border-gray-700 rounded-2xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Please describe your support request in detail..."
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="attachments" className=" text-gray-300 font-semibold mb-2 flex items-center gap-2 cursor-pointer">
                Attach files (optional) <FiPaperclip />
              </label>
              <input 
                id="attachments"
                type="file" 
                multiple 
                onChange={handleFileChange}
                className="file:mr-4 file:cursor-pointer file:rounded-2xl file:border-0 file:bg-indigo-600 file:px-6 file:py-2 file:text-white file:font-semibold hover:file:bg-indigo-700 transition"
                aria-describedby="fileHelp"
              />
              <p id="fileHelp" className="mt-1 text-gray-400 text-sm select-none">
                Allowed: PDF, JPG, PNG. Max size: 5MB each.
              </p>
            </div>

            {error && (
              <div className="text-red-500 font-medium text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-7 py-3 rounded-2xl text-indigo-300 border border-indigo-400 hover:bg-indigo-700/30 transition font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transition-shadow shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
});



const BundleCard = ({ bundle, onAdd }) => (
  <motion.div
    className={`relative rounded-3xl p-9 border shadow-xl flex flex-col h-full cursor-pointer select-none
      bg-gray-900/70 backdrop-blur-xl border-gray-700
      hover:-translate-y-2 hover:shadow-indigo-500/40 hover:border-indigo-500
      transition-all duration-300
      ${bundle.popular ? 'ring-2 ring-indigo-500' : ''}
      ${bundle.best ? 'border-yellow-400' : ''}
    `}
    whileHover={{ scale: 1.05 }}
    tabIndex={0}
    role="button"
    aria-pressed="false"
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onAdd();
      }
    }}
  >
    {/* Popular/Best ribbons */}
    {bundle.popular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center space-x-2 select-none" aria-label="Most Popular badge">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="font-semibold text-sm tracking-wide">MOST POPULAR</span>
      </div>
    )}
    {bundle.best && (
      <div className="absolute top-0 right-5 transform translate-y-5 rotate-12 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg select-none" aria-label="Best Overall badge">
        BEST OVERALL
      </div>
    )}
    {!bundle.popular && !bundle.best && (
      <div className="absolute top-0 left-5 transform translate-y-3 bg-gray-800 text-indigo-400 px-4 py-1 rounded-full text-sm font-semibold select-none" aria-label="Package tag">
        {bundle.tag}
      </div>
    )}

    {/* Name */}
    <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight text-center">{bundle.name}</h3>
    
    {/* Pricing section */}
    <div className="mb-7 flex flex-col items-center gap-1">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 font-semibold uppercase">Monthly</span>
          <span className="text-4xl font-extrabold text-indigo-400">
            ₹{bundle.monthly}
          </span>
        </div>
        <div className="border-l border-gray-400 h-8 mx-3 opacity-40" />
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-400 font-semibold uppercase">Setup</span>
          <span className="text-2xl font-bold text-white">
            ₹{bundle.price}
            {bundle.originalPrice && (
              <span className="ml-2 line-through text-gray-500 text-base font-normal select-none">
                ₹{bundle.originalPrice}
              </span>
            )}
          </span>
        </div>
      </div>
      {bundle.savings && (
        <div className="mt-1 text-green-400 text-sm font-medium select-none">
          {bundle.savings}
        </div>
      )}
    </div>

    {/* Features */}
    <div className="flex-grow mb-10">
      <h4 className="font-semibold text-gray-300 mb-5 tracking-wider uppercase">Inclusions:</h4>
      <ul className="space-y-3">
        {bundle.features.map((feature, i) => (
          <li key={i} className="flex items-center text-gray-300 text-lg gap-3 leading-snug">
            <svg 
              className="h-6 w-6 text-green-400 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={3} 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>

    {/* CTA button */}
    <button 
      className="cursor-pointer mt-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full py-5 rounded-3xl font-extrabold tracking-wide hover:opacity-95 active:scale-95 transition-shadow shadow-indigo-500/50 flex items-center justify-center gap-3 select-none"
      onClick={onAdd}
      aria-label={`Add ${bundle.name} to cart`}
      type="button"
    >
      <FiShoppingCart size={22} />
      Add to Cart
    </button>
  </motion.div>
);



const ClientDashboard = () => {
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const [sdkReady, setSdkReady] = useState(false);
  const [activeTab, setActiveTab] = useState('bundles');
  const [purchasedBundles, setPurchasedBundles] = useState([]);
  const [cart, setCart] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { token } = useAuth();
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Razorpay) {
      setSdkReady(true);
    } else {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => console.error('Razorpay SDK failed to load');
      document.head.appendChild(script);
    }
  }, []);

  const businessBoosterBundles = [
    {
      id: 'b1',
      name: "Market Conqueror",
      price: "14,999",
      originalPrice: "19,999",
      monthly: "6,999",
      savings: "Save ₹5,000",
      features: [
        "Digital Foundation System",
        "Google Visibility System",
        "Social Authority System",
        "Local Magnet System"
      ],
      popular: false,
      tag: "PREMIUM PICK",
      best: true
    },
    {
      id: 'b2',
      name: "Authority Dominator",
      price: "7,999",
      originalPrice: "11,999",
      monthly: "3,999",
      savings: "Save ₹5,000",
      features: [
        "Digital Foundation System",
        "Google Visibility System",
        "Social Authority System"
      ],
      popular: true,
      tag: "BEST VALUE"
    },
    {
      id: 'b3',
      name: "Foundation Bundle",
      price: "4,999",
      originalPrice: "5,999",
      monthly: "1,999",
      savings: "Save ₹1,000",
      features: [
        "Digital Foundation System",
        "Google Visibility System"
      ],
      popular: false,
      tag: "Starter Pack"
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
        } else throw new Error('Failed to fetch purchases');
      } catch (error) {
        console.error('Error fetching purchases:', error);
        const localPurchases = JSON.parse(localStorage.getItem('purchasedBundles') || '[]');
        setPurchasedBundles(localPurchases);
      }
    };

    fetchPurchasedBundles();
  }, []);

  if (!sdkReady) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 flex items-center justify-center">
          <div role="status" aria-live="polite" className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading payment gateway…</p>
          </div>
        </div>
      </Layout>
    );
  }

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

  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0);

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
      // Backend purchase record creation
      const purchaseRes = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
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
      if (!purchaseRes.ok) throw new Error('Failed to create purchase record');

      const purchaseData = await purchaseRes.json();
      const purchaseId = purchaseData.purchase._id;

      // Razorpay order creation
      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({
          amount: calculateTotal(),
          purchaseId
        })
      });
      if (!orderResponse.ok) throw new Error('Failed to create payment order');
      const orderData = await orderResponse.json();

      // Razorpay options and open checkout
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
        theme: { color: '#6366f1' },
        handler: async (response) => {
          try {
            const verification = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/verify`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: orderData.paymentId
              })
            });
            if (!verification.ok) throw new Error('Payment verification failed');
            const verificationData = await verification.json();

            if (verificationData.success) {
              toast.success('Payment successful! Your services have been activated.');
              setCart([]);

              const updatedPurchases = await fetch(`${import.meta.env.VITE_API_URL}/api/purchases`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (updatedPurchases.ok) {
                const data = await updatedPurchases.json();
                setPurchasedBundles(data);
              }
              setActiveTab('purchased');
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => toast.info('Payment cancelled'),
        }
      };

      const RZ = window.Razorpay;
      if (!RZ) {
        toast.error('Payment gateway is not ready.');
        return;
      }
      const rzp = new RZ(options);

      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        console.error('Payment failed:', response.error);
      });

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
        <header className="bg-gray-900 border-b border-gray-800 shadow-md">
          <div className="container mx-auto px-8 py-8 flex flex-wrap items-center justify-between gap-6">
            <h1 
              className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tight"
              tabIndex={0}
            >
              Client Dashboard
            </h1>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 bg-gray-800/70 hover:bg-gray-800 transition-colors px-6 py-3 rounded-2xl border border-gray-700 text-indigo-300 text-lg tracking-wide font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Navigate to Home"
            >
              <FiHome className="text-indigo-300" size={22} />
              Home
            </button>
          </div>

          <nav className="bg-gray-800/40 border-t border-gray-700/50">
            <div className=" container mx-auto px-8 py-4 flex flex-wrap gap-4 justify-start" role="tablist" aria-label="Main navigation tabs">
              {['bundles', 'cart', 'purchased'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer flex items-center gap-3 px-7 py-3 rounded-2xl font-semibold text-lg transition-all select-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 border border-indigo-400'
                      : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700/80 border border-gray-600'
                  }`}
                  aria-selected={activeTab === tab}
                  role="tab"
                  tabIndex={activeTab === tab ? 0 : -1}
                >
                  {{
                    bundles: <><FiPackage size={20} /> Service Bundles</>,
                    cart: <>
                      <FiShoppingCart size={20} />
                      Cart {cart.length > 0 && <span className="ml-2 bg-red-500 rounded-full text-xs px-2 py-0.5 font-medium">{cart.length}</span>}
                    </>,
                    purchased: <>
                      <FiCheckCircle size={20} />
                      My Bundles {purchasedBundles.length > 0 && <span className="ml-2 bg-green-500 rounded-full text-xs px-2 py-0.5 font-medium">{purchasedBundles.length}</span>}
                    </>
                  }[tab]}
                </button>
              ))}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-8 py-12 min-h-[80vh]" tabIndex={-1}>
          {/* Bundles Tab */}
          {activeTab === 'bundles' && (
            <section aria-label="Business Booster Packages">
              <h2 className="text-4xl font-extrabold mb-12 text-indigo-400 tracking-wide select-none">
                Business Booster Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {businessBoosterBundles.map(bundle => (
                  <BundleCard 
                    key={bundle.id} 
                    bundle={bundle} 
                    onAdd={() => addToCart(bundle)} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-live="polite"
              aria-label="Shopping Cart"
            >
              <h2 className="text-4xl font-extrabold mb-12 text-indigo-400 select-none">Your Shopping Cart</h2>

              {cart.length === 0 ? (
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-20 text-center border border-gray-700 shadow-lg select-none">
                  <FiShoppingCart className="mx-auto text-8xl text-gray-500 mb-8" />
                  <h3 className="text-3xl font-extrabold text-gray-300 mb-4">Your cart is empty</h3>
                  <p className="text-gray-500 text-xl mb-8">Browse our service bundles to get started.</p>
                  <button 
                    className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-3xl font-extrabold tracking-wider shadow-indigo-500/50 hover:opacity-90 transition"
                    onClick={() => setActiveTab('bundles')}
                    aria-label="Explore bundles"
                  >
                    Explore Bundles
                  </button>
                </div>
              ) : (
                <div className="space-y-10 max-w-4xl mx-auto">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700 shadow-lg">
                    <div role="list" className="divide-y divide-gray-700">
                      {cart.map(item => (
                        <div key={item.id} role="listitem" className="p-8 flex justify-between items-center">
                          <div>
                            <h3 className="text-2xl font-bold text-white tracking-wide">{item.name}</h3>
                            <p className="text-indigo-400 font-semibold text-xl">₹{item.price}</p>
                            <p className="text-gray-400 text-base mt-1 select-none">{item.category || 'Service Bundle'}</p>
                          </div>
                          <button 
                            className= "cursor-pointer text-red-500 hover:text-red-400 p-3 rounded-full select-none transition focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-8 border-t border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 tracking-wider text-lg select-none">Total</p>
                        <p className="text-3xl font-extrabold tracking-tight select-none">₹{calculateTotal()}</p>
                      </div>
                      <button 
                        className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-3xl font-extrabold flex items-center gap-4 select-none disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/50 hover:opacity-95 transition"
                        onClick={purchaseBundles}
                        disabled={isPurchasing}
                        aria-label="Complete purchase"
                      >
                        {isPurchasing ? (
                          <>
                            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiCreditCard size={24} />
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
              aria-live="polite"
              aria-label="My Purchased Bundles"
            >
              <h2 className="text-4xl font-extrabold mb-12 text-indigo-400 select-none">My Purchased Bundles</h2>

              {purchasedBundles.length === 0 ? (
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-20 text-center border border-gray-700 shadow-lg select-none">
                  <FiPackage className="mx-auto text-8xl text-gray-500 mb-8" />
                  <h3 className="text-3xl font-extrabold text-gray-300 mb-4">No bundles purchased yet</h3>
                  <p className="text-gray-500 text-xl mb-8">Get started with our digital service bundles.</p>
                  <button 
                    className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-3xl font-extrabold shadow-indigo-500/50 hover:opacity-90 transition"
                    onClick={() => setActiveTab('bundles')}
                    aria-label="Explore bundles"
                  >
                    Explore Bundles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  {purchasedBundles.map((purchase) => (
                    <div 
                      key={purchase._id} 
                      className="relative bg-gray-900/70 backdrop-blur-xl rounded-3xl p-10 border border-gray-700 shadow-xl select-none"
                      aria-label={`Purchased bundle on ${new Date(purchase.date).toLocaleDateString()}`}
                      tabIndex={0}
                      role="region"
                    >
                      <div className="flex justify-between items-start mb-10">
                        <div>
                          <h3 className="text-3xl font-extrabold text-white tracking-wide mb-4">Purchased Items</h3>
                          <div className="space-y-5">
                            {purchase.items.map((item, idx) => (
                              <div key={idx} className="mb-4">
                                <p className="text-indigo-400 font-semibold text-xl tracking-wide">{item.name}</p>
                                <p className="text-gray-400 text-base">₹{item.price} • {item.category || 'Service Bundle'}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className={`p-4 rounded-2xl select-none flex items-center justify-center shrink-0 ${
                          purchase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          purchase.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`} aria-label={`Purchase status: ${purchase.status}`}>
                          {purchase.status === 'completed' && <FiCheckCircle size={36} />}
                          {purchase.status === 'cancelled' && <FiXCircle size={36} />}
                          {purchase.status === 'pending' && <FiClock size={36} />}
                        </div>
                      </div>

                      {/* Service Progress */}
                      <div className="mt-12">
                        <h4 className="text-2xl font-bold text-gray-300 mb-6 tracking-wide">Service Progress</h4>
                        <div className="space-y-5">
                          {purchase.services.map((service, sIdx) => (
                            <div key={sIdx} className="flex justify-between items-center">
                              <p className="text-lg text-gray-400 tracking-wide">{service.name} ({service.bundleType})</p>
                              <span className={`text-sm px-3 py-1 rounded-full select-none font-semibold ${
                                service.status === 'done' ? 'bg-green-500/30 text-green-400' : 'bg-yellow-500/30 text-yellow-400'
                              }`}>
                                {service.status.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-7 bg-gray-700 rounded-full h-4 overflow-hidden" aria-hidden="true">
                          <div 
                            className="bg-indigo-500 h-full transition-all duration-700"
                            style={{ width: `${Math.round((purchase.services.filter(s => s.status === 'done').length / purchase.services.length) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-12">
                        <div>
                          <p className="text-gray-400 text-lg tracking-wide select-none">Total</p>
                          <p className="text-3xl font-extrabold tracking-tight select-none">₹{purchase.total}</p>
                        </div>
                        <span className={`px-5 py-3 rounded-2xl text-lg font-semibold select-none tracking-wide ${
                          purchase.status === 'completed' ? 'bg-green-500/30 text-green-400' :
                          purchase.status === 'cancelled' ? 'bg-red-500/30 text-red-400' :
                          'bg-yellow-500/30 text-yellow-400'
                        }`}>
                          {purchase.status?.toUpperCase() || 'PENDING'}
                        </span>
                        <button 
                          className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-3xl text-lg hover:bg-indigo-700 transition-shadow shadow-lg select-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          onClick={() => {
                            setSelectedPurchaseId(purchase._id);
                            setSupportModalOpen(true);
                          }}
                          aria-label={`Request support for purchase on ${new Date(purchase.date).toLocaleDateString()}`}
                          type="button"
                        >
                          Request Support
                        </button>
                      </div>

                      <div className="mt-7 text-gray-400 text-sm select-none" aria-label="Purchase date">
                        Purchased on: {new Date(purchase.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

export default ClientDashboard;
