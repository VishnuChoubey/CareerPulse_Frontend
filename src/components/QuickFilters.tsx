"use client";

import { useState, useEffect } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  min_amount?: number;
  max_amount?: number;
}

interface QuickFiltersProps {
  jobs: Job[];
  onFilter: (filters: any) => void;
  activeFilters: {
    company: string;
    location: string;
    jobType: string;
    salaryMin: number;
  };
}

export default function QuickFilters({ jobs, onFilter, activeFilters }: QuickFiltersProps) {
  const [filters, setFilters] = useState(activeFilters);

  const companies = [...new Set(jobs.map(job => job.company))].slice(0, 10);
  const locations = [...new Set(jobs.map(job => job.location))].slice(0, 10);
  const jobTypes = [...new Set(jobs.map(job => job.job_type).filter(Boolean))];

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  const clearFilters = () => {
    const emptyFilters = { company: '', location: '', jobType: '', salaryMin: 0 };
    setFilters(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 0);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Quick Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All types</option>
            {jobTypes.map(type => (
              <option key={type} value={type} className="capitalize">{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
          <select
            value={filters.salaryMin}
            onChange={(e) => setFilters({ ...filters, salaryMin: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value={0}>Any salary</option>
            <option value={50000}>$50,000+</option>
            <option value={75000}>$75,000+</option>
            <option value={100000}>$100,000+</option>
            <option value={150000}>$150,000+</option>
          </select>
        </div>
      </div>
    </div>
  );
}