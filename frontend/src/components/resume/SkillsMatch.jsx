import { motion } from 'framer-motion';
import Card from '../common/Card';
import { HiCheck, HiX } from 'react-icons/hi';

export default function SkillsMatch({ skills = [], missingKeywords = [] }) {
  return (
    <Card>
      <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4">Skills Analysis</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Found Skills */}
        <div>
          <h4 className="text-sm font-medium text-accent-600 dark:text-accent-400 mb-3 flex items-center gap-1.5">
            <HiCheck className="w-4 h-4" />
            Skills Found ({skills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 text-xs font-medium border border-accent-200/50 dark:border-accent-800/50"
              >
                <HiCheck className="w-3 h-3" />
                {skill}
              </motion.span>
            ))}
            {skills.length === 0 && (
              <p className="text-xs text-surface-500">No skills detected</p>
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        <div>
          <h4 className="text-sm font-medium text-red-500 dark:text-red-400 mb-3 flex items-center gap-1.5">
            <HiX className="w-4 h-4" />
            Missing Keywords ({missingKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.3 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200/50 dark:border-red-800/50"
              >
                <HiX className="w-3 h-3" />
                {keyword}
              </motion.span>
            ))}
            {missingKeywords.length === 0 && (
              <p className="text-xs text-surface-500">No missing keywords</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
