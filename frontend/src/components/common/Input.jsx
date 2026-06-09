import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Input({
  label,
  type = 'text',
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-surface-400" />
          </div>
        )}
        <input
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          className={`input-field ${Icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''} ${
            error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
          >
            {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
