import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resumeService } from '../services/resumeService';
import ResumeCard from '../components/resume/ResumeCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { HiOutlineCloudUpload, HiOutlineSearch } from 'react-icons/hi';

export default function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResumes();
  }, [page]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getResumes(page, 10);
      setResumes(data.resumes);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchResumes();
      return;
    }
    try {
      setLoading(true);
      const data = await resumeService.searchResumes(searchQuery);
      setResumes(data.resumes);
      setTotalPages(1);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Analysis History</h1>
          <p className="text-surface-500 dark:text-surface-400">View all your past resume analyses</p>
        </div>
        <Link to="/upload">
          <Button icon={HiOutlineCloudUpload} size="sm">New Analysis</Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="input-field pl-11"
            id="search-resumes"
          />
        </div>
        <Button variant="secondary" onClick={handleSearch} size="sm">
          Search
        </Button>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader size="lg" text="Loading resumes..." />
        </div>
      ) : resumes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumes.map((resume, i) => (
              <ResumeCard key={resume._id} resume={resume} index={i} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Previous
              </Button>
              <span className="px-4 py-2 text-sm text-surface-500">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No analyses found"
          description={searchQuery ? 'No results match your search. Try a different query.' : 'Upload your first resume to get started.'}
          action={
            !searchQuery && (
              <Link to="/upload">
                <Button icon={HiOutlineCloudUpload}>Upload Resume</Button>
              </Link>
            )
          }
        />
      )}
    </div>
  );
}
