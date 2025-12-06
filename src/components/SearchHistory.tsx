"use client";

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
  sites: string[];
  results_wanted: number;
  hours_old: number;
  job_type: string | null;
  is_remote: boolean;
}

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onRepeatSearch: (params: SearchParams) => void;
}

export default function SearchHistory({ history, onRepeatSearch }: SearchHistoryProps) {
  const handleRepeatSearch = (item: SearchHistoryItem) => {
    onRepeatSearch({
      search_term: item.searchTerm,
      location: item.location === 'Any' ? '' : item.location,
      sites: ['indeed', 'linkedin'],
      results_wanted: 25,
      hours_old: 24,
      job_type: null,
      is_remote: false
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
        <div className="text-gray-400 text-4xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Search History</h3>
        <p className="text-gray-500">Your recent searches will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Search History</h2>
        <p className="text-gray-500 mt-1">Your recent job searches</p>
      </div>

      <div className="divide-y divide-gray-200">
        {history.map((item) => (
          <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-900">{item.searchTerm}</h3>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{item.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{formatDate(item.timestamp)}</span>
                  <span>{item.resultsCount} results found</span>
                </div>
              </div>
              <button
                onClick={() => handleRepeatSearch(item)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Search Again
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}