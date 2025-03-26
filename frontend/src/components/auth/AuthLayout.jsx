import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-inkstall-cream dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-900">
        <div className="flex flex-col items-center justify-center">
          <img src="/src/assets/inkstall.svg" alt="inKstall Logo" className="w-40 h-auto dark:invert" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Inkstall Bot</p>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
