import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      toast.success('Welcome back!');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        icon={HiOutlineMail}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        icon={HiOutlineLockClosed}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Sign In
      </Button>

      <p className="text-center text-sm text-surface-500 dark:text-surface-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-primary-500 hover:text-primary-600 transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}
