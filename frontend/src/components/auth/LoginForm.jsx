import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (email && password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        login({ id: '1', email, name: email.split('@')[0] });
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-inkstall-blue focus:border-inkstall-blue dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-inkstall-blue focus:border-inkstall-blue dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-gray-900 dark:text-gray-900 bg-inkstall-yellow hover:bg-yellow-400 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-gray-900"
      >
        {loading ? (
          <LoadingSpinner color="white" size="sm" />
        ) : (
          <>
            <FiArrowRight className="h-5 w-5 mr-2" />
            Sign In
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
