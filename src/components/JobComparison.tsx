"use client";

import { useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  site: string;
  job_type: string;
  job_url: string;
  date_posted: string;
  min_amount?: number;
  max_amount?: number;
  interval?: string;
}

interface JobComparisonProps {
  jobs: Job[];
  onClose: () => void;
}

export default function JobComparison({ jobs, onClose }: JobComparisonProps) {
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);

  const addToComparison = (job: Job) => {
    if (selectedJobs.length < 3 && !selectedJobs.find(j => j.id === job.id)) {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const removeFromComparison = (jobId: string) => {
    setSelectedJobs(selectedJobs.filter(job => job.id !== jobId));
  };

  const formatSalary = (job: Job) => {
    if (job.min_amount && job.max_amount) {
      return `$${job.min_amount.toLocaleString()} - $${job.max_amount.toLocaleString()}${job.interval ? ` / ${job.interval}` : ''}`;
    }
    return 'Not specified';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Job Comparison</h2>
              <p className="text-gray-500 mt-1">Compare up to 3 jobs side by side</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {selectedJobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">⚖️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select Jobs to Compare</h3>
              <p className="text-gray-500 mb-6">Choose up to 3 jobs from the list below</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {jobs.slice(0, 10).map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                    <button
                      onClick={() => addToComparison(job)}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Add to Compare
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">
                  Comparing {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''}
                </h3>
                <button
                  onClick={() => setSelectedJobs([])}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-gray-900 text-sm">{job.title}</h4>
                        <button
                          onClick={() => removeFromComparison(job.id)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company</label>
                        <p className="text-gray-900 font-medium">{job.company}</p>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</label>
                        <p className="text-gray-900">{job.location}</p>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Job Type</label>
                        <p className="text-gray-900 capitalize">{job.job_type || 'Not specified'}</p>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Salary</label>
                        <p className="text-gray-900">{formatSalary(job)}</p>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Platform</label>
                        <p className="text-gray-900 capitalize">{job.site?.replace('_', ' ')}</p>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Posted</label>
                        <p className="text-gray-900">
                          {job.date_posted ? new Date(job.date_posted).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                      
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-center text-sm font-medium"
                      >
                        View Job ↗️
                      </a>
                    </div>
                  </div>
                ))}
                
                {selectedJobs.length < 3 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-gray-400 text-2xl mb-2">+</div>
                    <p className="text-gray-500 text-sm mb-4">Add another job to compare</p>
                    <div className="space-y-2 w-full max-h-48 overflow-y-auto">
                      {jobs.filter(job => !selectedJobs.find(selected => selected.id === job.id)).slice(0, 5).map((job) => (
                        <button
                          key={job.id}
                          onClick={() => addToComparison(job)}
                          className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border"
                        >
                          <div className="font-medium truncate">{job.title}</div>
                          <div className="text-gray-500 truncate">{job.company}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}