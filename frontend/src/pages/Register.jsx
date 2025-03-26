import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to get started with AI Chat"
      linkText="Already have an account? Sign in"
      linkTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;