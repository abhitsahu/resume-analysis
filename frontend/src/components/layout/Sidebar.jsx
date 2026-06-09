import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineViewGrid,
  HiOutlineCloudUpload,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineX,
} from 'react-icons/hi';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
  { path: '/upload', label: 'Upload Resume', icon: HiOutlineCloudUpload },
  { path: '/history', label: 'Analysis History', icon: HiOutlineClock },
  { path: '/profile', label: 'Profile', icon: HiOutlineUser },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 glass-strong border-r border-surface-200/50 dark:border-surface-700/50 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-lg font-bold text-surface-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="px-4 py-6 lg:pt-20 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-700/10 dark:from-primary-500/5 dark:to-primary-700/5 border border-primary-200/30 dark:border-primary-800/30">
            <p className="text-xs font-medium text-primary-600 dark:text-primary-400">ResumeAI v1.0</p>
            <p className="text-xs text-surface-500 dark:text-surface-500 mt-1">Powered by Gemini AI</p>
          </div>
        </div>
      </aside>
    </>
  );
}
