import { motion } from 'framer-motion';
import Card from '../common/Card';
import { HiOutlineLightBulb } from 'react-icons/hi';

export default function RecommendationsList({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <Card>
      <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="w-5 h-5 text-amber-500" />
        Recommendations
      </h3>
      <ul className="space-y-3">
        {recommendations.map((rec, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 text-sm"
          >
            <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">{i + 1}</span>
            </span>
            <span className="text-surface-700 dark:text-surface-300 leading-relaxed">{rec}</span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
