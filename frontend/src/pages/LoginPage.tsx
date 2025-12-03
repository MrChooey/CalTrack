import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">CalTrack</h1>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login</h2>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};




