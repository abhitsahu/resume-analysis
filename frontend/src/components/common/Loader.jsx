const sizes = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-16 h-16 border-4',
  xl: 'w-24 h-24 border-4',
};

export default function Loader({ size = 'md', className = '', text = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-primary-200 dark:border-primary-900 border-t-primary-500 animate-spin`}
      />
      {text && <p className="text-sm text-surface-500 dark:text-surface-400 animate-pulse">{text}</p>}
    </div>
  );
}
