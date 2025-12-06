"use client";

import { useState } from 'react';
import JobComparison from './JobComparison';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  site: string;
  job_type: string;
  job_url: string;
  date_posted: string;
  description?: string;
  min_amount?: number;
  max_amount?: number;
  interval?: string;
}

interface JobResultsProps {
  jobs: Job[];
  loading: boolean;
  userEmail?: string;
  onBookmark?: (job: Job) => void;
}

export default function JobResults({ jobs, loading, userEmail, onBookmark }: JobResultsProps) {
  const [showComparison, setShowComparison] = useState(false);
  if (loading) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Searching for jobs...</p>
        <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
        <div className="text-gray-400 text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or expanding your location range</p>
      </div>
    );
  }

  const getSiteIcon = (site: string) => {
    const icons: Record<string, string> = {
      indeed: '🔍',
      linkedin: '💼',
      glassdoor: '🏢',
      google: '🌐',
      zip_recruiter: '📋',
      naukri: '🎯'
    };
    return icons[site] || '💼';
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Found {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
          </h2>
          {jobs.length > 1 && (
            <button
              onClick={() => setShowComparison(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center space-x-2"
            >
              <span>⚖️</span>
              <span>Compare Jobs</span>
            </button>
          )}
        </div>
      
      {jobs.map((job, index) => (
        <div key={job.id || index} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-700 font-medium">{job.company}</p>
                  {job.job_type && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded">
                        {job.job_type.replace('_', ' ')}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-gray-600 flex items-center">
                  <span className="mr-1">📍</span>
                  {job.location}
                </p>
              </div>
              
              <div className="text-right flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                  <span>{getSiteIcon(job.site)}</span>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {job.site?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {job.date_posted && (
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {new Date(job.date_posted).toLocaleDateString()}
                  </span>
                )}
                {job.min_amount && job.max_amount && (
                  <span className="flex items-center font-medium text-gray-700">
                    <span className="mr-1">💰</span>
                    ${job.min_amount.toLocaleString()} - ${job.max_amount.toLocaleString()}
                    {job.interval && ` / ${job.interval}`}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                {userEmail && onBookmark && (
                  <button
                    onClick={() => onBookmark(job)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Save this job"
                  >
                    📌
                  </button>
                )}
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center space-x-2"
                >
                  <span>View Job</span>
                  <span>↗️</span>
                </a>
              </div>
            </div>

            {job.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {job.description.substring(0, 150)}...
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      </div>
      
      {showComparison && (
        <JobComparison 
          jobs={jobs}
          onClose={() => setShowComparison(false)}
        />
      )}
    </>
  );
}