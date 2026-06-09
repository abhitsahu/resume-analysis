import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import ThemeToggle from '../components/common/ThemeToggle';
import { motion } from 'framer-motion';

export default function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-8 border border-white/20">
            <span className="text-3xl font-bold text-white">R</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Resume<span className="text-primary-200">AI</span>
          </h1>
          <p className="text-primary-200 text-lg leading-relaxed">
            Get instant AI-powered analysis of your resume. Improve your ATS score and land more interviews.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { value: '10K+', label: 'Resumes Analyzed' },
              { value: '95%', label: 'Accuracy Rate' },
              { value: '4.9★', label: 'User Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-primary-200 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold">Resume<span className="text-gradient">AI</span></span>
            </div>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome back</h2>
            <p className="text-surface-500 dark:text-surface-400 mt-1">Sign in to your account to continue</p>
          </div>

          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}
