import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineCalendar } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const data = await authService.updateProfile({ name });
      updateUser(data.user);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Profile</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <div className="flex items-center gap-4 pb-6 border-b border-surface-200 dark:border-surface-700">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-surface-900 dark:text-white">{user?.name}</h2>
              <p className="text-surface-500 dark:text-surface-400 text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                <HiOutlineMail className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-xs text-surface-500">Email</p>
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center">
                <HiOutlineCalendar className="w-5 h-5 text-accent-500" />
              </div>
              <div>
                <p className="text-xs text-surface-500">Joined</p>
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{joinDate}</p>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleUpdate} className="pt-6 space-y-4">
            <Input
              label="Full Name"
              icon={HiOutlineUser}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Button type="submit" loading={loading} size="md">
              Update Profile
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
