const variants = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
};

export default function Badge({ children, variant = 'info', className = '' }) {
  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}
