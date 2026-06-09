import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import ThemeToggle from '../components/common/ThemeToggle';
import { motion } from 'framer-motion';

export default function Register() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
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
            Join thousands of professionals optimizing their resumes with AI-powered insights.
          </p>

          <div className="mt-12 space-y-4">
            {[
              '🎯 Instant ATS score analysis',
              '💡 AI-powered recommendations',
              '📊 Skills gap identification',
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-3 text-left p-3 rounded-xl bg-white/10 backdrop-blur border border-white/10"
              >
                <span className="text-white text-sm">{feature}</span>
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
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Create your account</h2>
            <p className="text-surface-500 dark:text-surface-400 mt-1">Start analyzing your resume in seconds</p>
          </div>

          <RegisterForm />
        </motion.div>
      </div>
    </div>
  );
}
