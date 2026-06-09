export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div className={`${hover ? 'card-hover' : 'card'} p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
