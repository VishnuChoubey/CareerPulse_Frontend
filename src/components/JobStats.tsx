"use client";

interface SearchSummary {
  total_jobs: number;
  sites: Record<string, number>;
  companies: Record<string, number>;
  locations: Record<string, number>;
}

interface JobStatsProps {
  summary: SearchSummary;
  onExport: () => void;
}

export default function JobStats({ summary, onExport }: JobStatsProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Search Results</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of your job search</p>
        </div>
        <button
          onClick={onExport}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center space-x-2"
        >
          <span>📥</span>
          <span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{summary.total_jobs}</div>
          <div className="text-gray-600 text-sm font-medium">Total Jobs</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Object.keys(summary.companies).length}
          </div>
          <div className="text-gray-600 text-sm font-medium">Companies</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Object.keys(summary.sites).length}
          </div>
          <div className="text-gray-600 text-sm font-medium">Platforms</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Object.keys(summary.locations).length}
          </div>
          <div className="text-gray-600 text-sm font-medium">Locations</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            By Platform
          </h3>
          <div className="space-y-3">
            {Object.entries(summary.sites).map(([site, count]) => (
              <div key={site} className="flex justify-between items-center">
                <span className="capitalize text-gray-700 font-medium">{site.replace('_', ' ')}</span>
                <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏢</span>
            Top Companies
          </h3>
          <div className="space-y-3">
            {Object.entries(summary.companies).slice(0, 5).map(([company, count]) => (
              <div key={company} className="flex justify-between items-center">
                <span className="truncate text-gray-700 font-medium pr-2">{company}</span>
                <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📍</span>
            Top Locations
          </h3>
          <div className="space-y-3">
            {Object.entries(summary.locations).slice(0, 5).map(([location, count]) => (
              <div key={location} className="flex justify-between items-center">
                <span className="truncate text-gray-700 font-medium pr-2">{location}</span>
                <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}