import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const [forgotStep, setForgotStep] = useState(0); // 0: none, 1: email, 2: OTP+new password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const endpoint = isLogin 
      ? `${API}/api/auth/login` 
      : `${API}/api/auth/register`;

    try {
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password, role };
      const res = await axios.post(endpoint, payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLogin(res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin-dashboard' : '/client-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (forgotStep === 1) {
        await axios.post(`${API}/api/auth/forgot-password`, { email });
        setSuccessMessage('OTP sent to your email!');
        setForgotStep(2);
      } else if (forgotStep === 2) {
        await axios.post(`${API}/api/auth/reset-password`, { email, otp, newPassword });
        setSuccessMessage('Password changed successfully! Please login.');
        setTimeout(() => {
          setForgotStep(0);
          setIsLogin(true);
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 
        (forgotStep === 1 ? 'Failed to send OTP.' : 'Invalid OTP or failed to reset password.'));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForgotFlow = () => {
    setForgotStep(0);
    setError('');
    setSuccessMessage('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: -20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.98 }}
        className="bg-gray-900 rounded-xl w-full max-w-md overflow-hidden border border-gray-700 shadow-2xl"
      >
        <div className="relative p-6">
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>

          {/* Back button for forgot password flow */}
          {forgotStep > 0 && (
            <button
              onClick={resetForgotFlow}
              className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft size={24} />
            </button>
          )}

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {forgotStep ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm">
              {forgotStep 
                ? 'Enter your details to reset password'
                : isLogin 
                  ? 'Sign in to continue to your account' 
                  : 'Join us today to get started'}
            </p>
          </div>

          {/* Success message */}
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-900/50 text-green-300 rounded-lg text-sm"
            >
              {successMessage}
            </motion.div>
          )}

          {/* Error message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={forgotStep ? handleForgotPassword : handleSubmit}>
            <AnimatePresence >
              {/* Name field (register only) */}
              {!isLogin && !forgotStep && (
                <motion.div
                key = "unique-element-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FiUser size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Email field (shown in all cases except register when in forgot password flow) */}
              {(isLogin || !forgotStep) && (
                <motion.div
                key="1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FiMail size={16} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* OTP and New Password fields (forgot password step 2) */}
              {forgotStep === 2 && (
                <>
                  <motion.div
                  key="2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </motion.div>
                  <motion.div
                  key="3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FiLock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </motion.div>
                </>
              )}

              {/* Password field (login and register) */}
              {!forgotStep && (
                <motion.div
                key="4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FiLock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

        
            {isLogin && !forgotStep && (
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setForgotStep(1)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

          
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-indigo-700 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : forgotStep === 0 ? (
                isLogin ? 'Sign In' : 'Create Account'
              ) : forgotStep === 1 ? (
                'Send OTP'
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

        
          {!forgotStep && (
            <div className="mt-6 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;