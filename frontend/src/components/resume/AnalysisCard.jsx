import { motion } from 'framer-motion';
import Card from '../common/Card';
import ScoreChart from './ScoreChart';
import SkillsMatch from './SkillsMatch';
import RecommendationsList from './RecommendationsList';
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUser } from 'react-icons/hi';

export default function AnalysisCard({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ScoreChart
            score={analysis.atsScore}
            categoryScores={analysis.categoryScores}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          {analysis.summary && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineUser className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-surface-900 dark:text-surface-100">Profile Summary</h3>
              </div>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed">{analysis.summary}</p>
            </Card>
          )}

          {/* Skills */}
          <SkillsMatch
            skills={analysis.skills}
            missingKeywords={analysis.missingKeywords}
          />
        </div>
      </div>

      {/* Strengths & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {analysis.strengths?.length > 0 && (
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <span className="text-accent-500">✦</span> Strengths
            </h3>
            <ul className="space-y-2.5">
              {analysis.strengths.map((strength, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent-600 dark:text-accent-400 text-xs">✓</span>
                  </span>
                  <span className="text-surface-700 dark:text-surface-300">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </Card>
        )}

        {/* Recommendations */}
        <RecommendationsList recommendations={analysis.recommendations} />
      </div>

      {/* Education & Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education */}
        {analysis.education?.length > 0 && (
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <HiOutlineAcademicCap className="w-5 h-5 text-primary-500" />
              Education
            </h3>
            <div className="space-y-4">
              {analysis.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-6 border-l-2 border-primary-200 dark:border-primary-800"
                >
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary-500" />
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 text-sm">{edu.degree}</h4>
                  {edu.branch && <p className="text-xs text-primary-500">{edu.branch}</p>}
                  <p className="text-xs text-surface-500">{edu.institution}</p>
                  {edu.year && <p className="text-xs text-surface-400">{edu.year}</p>}
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Experience */}
        {analysis.experience?.length > 0 && (
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <HiOutlineBriefcase className="w-5 h-5 text-primary-500" />
              Experience
            </h3>
            <div className="space-y-4">
              {analysis.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-6 border-l-2 border-accent-200 dark:border-accent-800"
                >
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent-500" />
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 text-sm">{exp.job_title}</h4>
                  <p className="text-xs text-accent-500">{exp.company}</p>
                  <p className="text-xs text-surface-400">
                    {exp.start_date} — {exp.end_date || 'Present'}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-surface-500 mt-1">{exp.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
