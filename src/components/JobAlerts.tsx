"use client";

import { useState, useEffect } from 'react';

interface JobAlert {
  _id: string;
  searchTerm: string;
  location: string;
  frequency: 'daily' | 'weekly';
  isActive: boolean;
  createdAt: string;
  lastRun: string;
  sites: string[];
  jobLimit: number;
  jobRole: string;
}

interface JobAlertsProps {
  userEmail: string;
}

export default function JobAlerts({ userEmail }: JobAlertsProps) {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAlert, setNewAlert] = useState({
    searchTerm: '',
    location: '',
    frequency: 'daily' as 'daily' | 'weekly',
    sites: ['linkedin', 'indeed', 'naukri'],
    jobLimit: 10,
    jobRole: ''
  });

  useEffect(() => {
    if (userEmail) {
      fetchAlerts();
    }
  }, [userEmail]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/alerts/${userEmail}`);
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };



  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: userEmail,
          searchTerm: newAlert.searchTerm,
          location: newAlert.location,
          frequency: newAlert.frequency,
          sites: newAlert.sites,
          jobLimit: newAlert.jobLimit,
          jobRole: newAlert.jobRole
        })
      });

      if (response.ok) {
        setNewAlert({ 
          searchTerm: '', 
          location: '', 
          frequency: 'daily',
          sites: ['linkedin', 'indeed', 'naukri'],
          jobLimit: 10,
          jobRole: ''
        });
        setShowForm(false);
        fetchAlerts();
      }
    } catch (error) {
      console.error('Failed to create alert:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAlert = async (id: string) => {
    const alert = alerts.find(a => a._id === id);
    if (!alert) return;

    try {
      const response = await fetch(`http://localhost:5000/api/alerts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !alert.isActive })
      });

      if (response.ok) {
        fetchAlerts();
      }
    } catch (error) {
      console.error('Failed to toggle alert:', error);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/alerts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchAlerts();
      }
    } catch (error) {
      console.error('Failed to delete alert:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Job Alerts</h2>
              <p className="text-gray-500 mt-1">Get notified about new job opportunities</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {showForm ? 'Cancel' : 'Create Alert'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title / Keywords *
                  </label>
                  <input
                    type="text"
                    value={newAlert.searchTerm}
                    onChange={(e) => setNewAlert({ ...newAlert, searchTerm: e.target.value })}
                    placeholder="e.g., React Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role Type
                </label>
                <select
                  value={newAlert.jobRole}
                  onChange={(e) => setNewAlert({ ...newAlert, jobRole: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="">Any Role Type</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newAlert.frequency}
                    onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value as 'daily' | 'weekly' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Limit
                  </label>
                  <select
                    value={newAlert.jobLimit}
                    onChange={(e) => setNewAlert({ ...newAlert, jobLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value={5}>5 jobs</option>
                    <option value={10}>10 jobs</option>
                    <option value={20}>20 jobs</option>
                    <option value={50}>50 jobs</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Sites
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { id: 'linkedin', name: 'LinkedIn' },
                    { id: 'indeed', name: 'Indeed' },
                    { id: 'naukri', name: 'Naukri' },
                    { id: 'glassdoor', name: 'Glassdoor' },
                    { id: 'google', name: 'Google Jobs' }
                  ].map((site) => (
                    <label key={site.id} className="flex items-center p-2 border rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={newAlert.sites.includes(site.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAlert({ ...newAlert, sites: [...newAlert.sites, site.id] });
                          } else {
                            setNewAlert({ ...newAlert, sites: newAlert.sites.filter(s => s !== site.id) });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{site.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Create Alert
              </button>
            </form>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {alerts.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">🔔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Job Alerts</h3>
              <p className="text-gray-500">Create your first alert to get notified about new opportunities</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{alert.searchTerm}</h3>
                      {alert.location && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{alert.location}</span>
                        </>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{alert.frequency === 'daily' ? 'Every 6 hours' : 'Weekly'}</span>
                      <span>{alert.jobLimit || 10} jobs max</span>
                      {alert.jobRole && <span className="capitalize">{alert.jobRole}</span>}
                      <span>{alert.sites ? alert.sites.join(', ') : 'LinkedIn'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAlert(alert._id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        alert.isActive
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {alert.isActive ? 'Pause' : 'Resume'}
                    </button>
                    <button
                      onClick={() => deleteAlert(alert._id)}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}