import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password });
      toast.success('Account created successfully!');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
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
    <form onSubmit={handleSubmit} className="space-y-5" id="register-form">
      <Input
        label="Full Name"
        name="name"
        placeholder="John Doe"
        icon={HiOutlineUser}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

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

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        icon={HiOutlineLockClosed}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Create Account
      </Button>

      <p className="text-center text-sm text-surface-500 dark:text-surface-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-500 hover:text-primary-600 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
