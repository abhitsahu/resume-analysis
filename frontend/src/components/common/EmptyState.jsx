import { HiOutlineDocumentSearch } from 'react-icons/hi';

export default function EmptyState({
  icon: Icon = HiOutlineDocumentSearch,
  title = 'No data found',
  description = 'Get started by uploading your first resume.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-primary-400" />
      </div>
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">{title}</h3>
      <p className="text-surface-500 dark:text-surface-400 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
