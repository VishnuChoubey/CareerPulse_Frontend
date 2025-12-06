"use client";

import { useState } from 'react';

interface JobSearchProps {
  onSearch: (params: any) => void;
  loading: boolean;
}

export default function JobSearch({ onSearch, loading }: JobSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [hoursOld, setHoursOld] = useState(24);
  const [resultsWanted, setResultsWanted] = useState(25);
  const [sites, setSites] = useState(['indeed', 'linkedin', 'naukri']);
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    onSearch({
      search_term: searchTerm,
      location,
      job_type: jobType || null,
      hours_old: hoursOld,
      results_wanted: resultsWanted,
      sites,
      is_remote: isRemote,
    });
  };

  const handleSiteToggle = (site: string) => {
    setSites(prev => 
      prev.includes(site) 
        ? prev.filter(s => s !== site)
        : [...prev, site]
    );
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Jobs</h2>
        <p className="text-gray-500">Find your next opportunity across multiple platforms</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title / Keywords *
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., Software Engineer, Data Scientist"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA or Remote"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="">Any Type</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posted Within
            </label>
            <select
              value={hoursOld}
              onChange={(e) => setHoursOld(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value={24}>Last 24 hours</option>
              <option value={48}>Last 2 days</option>
              <option value={72}>Last 3 days</option>
              <option value={168}>Last week</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Results Limit
            </label>
            <select
              value={resultsWanted}
              onChange={(e) => setResultsWanted(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value={10}>10 jobs</option>
              <option value={25}>25 jobs</option>
              <option value={50}>50 jobs</option>
              <option value={100}>100 jobs</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Job Platforms
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'indeed', name: 'Indeed', icon: '🔍' },
              { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
              { id: 'glassdoor', name: 'Glassdoor', icon: '🏢' },
              { id: 'google', name: 'Google Jobs', icon: '🌐' },
              { id: 'zip_recruiter', name: 'ZipRecruiter', icon: '📋' },
              { id: 'naukri', name: 'Naukri', icon: '🎯' }
            ].map((site) => (
              <label key={site.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={sites.includes(site.id)}
                  onChange={() => handleSiteToggle(site.id)}
                  className="mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="mr-2">{site.icon}</span>
                <span className="text-sm font-medium text-gray-700">{site.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="remote"
            checked={isRemote}
            onChange={(e) => setIsRemote(e.target.checked)}
            className="mr-3 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
          />
          <label htmlFor="remote" className="text-sm font-medium text-gray-700 flex items-center">
            <span className="mr-2">🏠</span>
            Remote positions only
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <span>🔍</span>
              <span>Search Jobs</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}