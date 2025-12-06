"use client";

import { useState, useEffect, useCallback } from 'react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  site: string;
  job_type: string;
  job_url: string;
  date_posted: string;
}

interface JobBookmarksProps {
  userEmail: string;
}

export default function JobBookmarks({ userEmail }: JobBookmarksProps) {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = useCallback(async () => {
    if (!userEmail) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/bookmarks/${userEmail}`);
      const data = await response.json();
      
      if (response.ok) {
        setBookmarks(data.bookmarks);
      }
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchBookmarks();
  }, [userEmail, fetchBookmarks]);

  if (!userEmail) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
        <div className="text-gray-400 text-4xl mb-4">📌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
        <p className="text-gray-500">Please sign in to view your saved jobs</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Saved Jobs</h2>
            <p className="text-gray-500 mt-1">{bookmarks.length} jobs saved for later</p>
          </div>
          <button
            onClick={fetchBookmarks}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading saved jobs...</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-gray-400 text-4xl mb-4">📌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Jobs</h3>
          <p className="text-gray-500">Jobs you bookmark will appear here for easy access</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {bookmarks.map((job) => (
            <div key={job?._id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{job?.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-gray-700 font-medium">{job?.company}</p>
                    {job?.job_type && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded">
                          {job.job_type.replace('_', ' ')}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 flex items-center text-sm">
                    <span className="mr-1">📍</span>
                    {job?.location}
                  </p>
                  {job?.date_posted && (
                    <p className="text-gray-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">📅</span>
                      Saved on {new Date(job.date_posted).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {job?.site ? job.site.replace('_', ' ') : 'Unknown'}
                    </span>
                  </div>
                  <a
                    href={job?.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center space-x-2"
                  >
                    <span>View Job</span>
                    <span>↗️</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}