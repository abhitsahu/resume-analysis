import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import { HiOutlineDocument, HiOutlineClock, HiOutlineArrowRight } from 'react-icons/hi';

function getScoreBadge(score) {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
}

function getScoreLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Average';
  return 'Needs Work';
}

export default function ResumeCard({ resume, index = 0 }) {
  const score = resume.analysis?.atsScore || 0;
  const name = resume.analysis?.name || resume.fileName;
  const skills = resume.analysis?.skills || [];
  const date = new Date(resume.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/analysis/${resume._id}`} className="block">
        <div className="card-hover p-5 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                <HiOutlineDocument className="w-5 h-5 text-primary-500" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 truncate">{name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-surface-500">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  {date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={getScoreBadge(score)}>
                {score}/100
              </Badge>
            </div>
          </div>

          {/* Skills preview */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-xs text-surface-600 dark:text-surface-400"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-xs text-surface-500">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Score bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className={`h-full rounded-full ${
                  score >= 80
                    ? 'bg-accent-500'
                    : score >= 60
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
              />
            </div>
            <span className="text-xs font-medium text-surface-500">{getScoreLabel(score)}</span>
            <HiOutlineArrowRight className="w-4 h-4 text-surface-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
