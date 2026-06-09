import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
import { HiOutlineMenu, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 glass border-b border-surface-200/50 dark:border-surface-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo & Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              <HiOutlineMenu className="w-6 h-6" />
            </button>

            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-surface-900 dark:text-white hidden sm:block">
                Resume<span className="text-gradient">AI</span>
              </span>
            </Link>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user && (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                    {user.name}
                  </span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-surface-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Logout"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
