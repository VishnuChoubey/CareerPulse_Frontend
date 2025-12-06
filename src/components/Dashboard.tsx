"use client";

import { useState, useEffect } from 'react';
import JobSearch from './JobSearch';
import JobResults from './JobResults';
import JobStats from './JobStats';
import JobBookmarks from './JobBookmarks';
import TargetCompanies from './TargetCompanies';
import SearchHistory from './SearchHistory';
import JobAlerts from './JobAlerts';
import QuickFilters from './QuickFilters';

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

interface SearchSummary {
  total_jobs: number;
  sites: Record<string, number>;
  companies: Record<string, number>;
  locations: Record<string, number>;
}

interface SearchHistoryItem {
  id: string;
  searchTerm: string;
  location: string;
  timestamp: string;
  resultsCount: number;
}

interface SearchParams {
  search_term: string;
  location: string;
  job_type: string | null;
  hours_old: number;
  results_wanted: number;
  sites: string[];
  is_remote: boolean;
}

interface DashboardProps {
  userEmail: string;
  userName: string;
  onLogout: () => void;
}

type TabId = 'search' | 'bookmarks' | 'targets' | 'history' | 'alerts';

export default function Dashboard({ userEmail, userName, onLogout }: DashboardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [summary, setSummary] = useState<SearchSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'bookmarks' | 'targets' | 'history' | 'alerts'>('search');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [quickFilters, setQuickFilters] = useState({
    company: '',
    location: '',
    jobType: '',
    salaryMin: 0
  });

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (searchParams: SearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      setJobs(data.jobs);
      setSummary(data.summary);
      
      // Add to search history
      const historyItem: SearchHistoryItem = {
        id: Date.now().toString(),
        searchTerm: searchParams.search_term,
        location: searchParams.location || 'Any',
        timestamp: new Date().toISOString(),
        resultsCount: data.jobs.length
      };
      
      const newHistory = [historyItem, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFilter = (filters: { company: string; location: string; jobType: string; salaryMin: number }) => {
    setQuickFilters(filters);
    let filtered = jobs;
    
    if (filters.company) {
      filtered = filtered.filter(job => 
        job.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.jobType) {
      filtered = filtered.filter(job => job.job_type === filters.jobType);
    }
    
    if (filters.salaryMin > 0) {
      filtered = filtered.filter(job => 
        job.min_amount && job.min_amount >= filters.salaryMin
      );
    }
    
    setFilteredJobs(filtered);
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/export');
      const data = await response.json();
      
      if (data.csv_data) {
        const blob = new Blob([data.csv_data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleBookmark = async (job: Job) => {
    if (!userEmail) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/bookmarks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          job_data: job
        }),
      });
      
      if (response.ok) {
        alert('Job bookmarked successfully!');
      }
    } catch (err) {
      console.error('Bookmark failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CareerPulse</h1>
                <p className="text-xs text-gray-500">Professional Job Search</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-gray-700 font-medium">{userName}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation */}
        <nav className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border shadow-sm">
          {[
            { id: 'search', label: 'Search', icon: '🔍' },
            { id: 'bookmarks', label: 'Saved', icon: '📌' },
            { id: 'targets', label: 'Companies', icon: '🏢' },
            { id: 'history', label: 'History', icon: '📊' },
            { id: 'alerts', label: 'Alerts', icon: '🔔' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        
        {/* Tab Content */}
        {activeTab === 'search' && (
          <>
            <JobSearch onSearch={handleSearch} loading={loading} />
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {summary && <JobStats summary={summary} onExport={handleExport} />}
            
            {jobs.length > 0 && (
              <QuickFilters 
                jobs={jobs}
                onFilter={handleQuickFilter}
                activeFilters={quickFilters}
              />
            )}
            
            <JobResults 
              jobs={filteredJobs} 
              loading={loading} 
              userEmail={userEmail}
              onBookmark={handleBookmark}
            />
          </>
        )}
        
        {activeTab === 'bookmarks' && (
          <JobBookmarks userEmail={userEmail} />
        )}
        
        {activeTab === 'targets' && (
          <TargetCompanies userEmail={userEmail} />
        )}
        
        {activeTab === 'history' && (
          <SearchHistory 
            history={searchHistory}
            onRepeatSearch={handleSearch}
          />
        )}
        
        {activeTab === 'alerts' && (
          <JobAlerts userEmail={userEmail} />
        )}
      </div>
    </div>
  );
}