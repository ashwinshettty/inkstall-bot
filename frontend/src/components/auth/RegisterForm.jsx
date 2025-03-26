import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would make an API call
      if (name && email && password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        register({ id: Date.now().toString(), email, name });
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (err) {
      setError(err.message || 'Failed to register');
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
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm password
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={loading}
        className="py-2"
      >
        {loading ? <LoadingSpinner color="white" size="sm" /> : 'Sign up'}
      </Button>
    </form>
  );
};

export default RegisterForm;