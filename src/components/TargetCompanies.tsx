"use client";

import { useState, useEffect } from 'react';

interface TargetCompany {
  _id: string;
  company_name: string;
  created_at: string;
}

interface TargetCompaniesProps {
  userEmail: string;
}

export default function TargetCompanies({ userEmail }: TargetCompaniesProps) {
  const [companies, setCompanies] = useState<TargetCompany[]>([]);
  const [newCompany, setNewCompany] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userEmail) {
      fetchTargetCompanies();
    }
  }, [userEmail]);

  const fetchTargetCompanies = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/target-companies/${userEmail}`);
      const data = await response.json();
      setCompanies(data.companies || []);
    } catch (error) {
      console.error('Error fetching target companies:', error);
    }
  };

  const addTargetCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/target-companies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          company_name: newCompany.trim()
        }),
      });

      if (response.ok) {
        setNewCompany('');
        fetchTargetCompanies();
      }
    } catch (error) {
      console.error('Error adding target company:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeTargetCompany = async (companyId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/target-companies/${companyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: userEmail }),
      });

      if (response.ok) {
        fetchTargetCompanies();
      }
    } catch (error) {
      console.error('Error removing target company:', error);
    }
  };

  if (!userEmail) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
        <div className="text-gray-400 text-4xl mb-4">🏢</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
        <p className="text-gray-500">Please sign in to set up company alerts</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Target Companies</h2>
        <p className="text-gray-500">
          Get notified when your dream companies post new opportunities
        </p>
      </div>

      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <form onSubmit={addTargetCompany}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="Enter company name (e.g., Google, Apple, Microsoft)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newCompany.trim()}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? 'Adding...' : 'Add Company'}
            </button>
          </div>
        </form>
      </div>

      {companies.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-gray-400 text-4xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Target Companies</h3>
          <p className="text-gray-500">Add companies above to get instant job notifications</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {companies.map((company) => (
            <div key={company._id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 capitalize">
                    {company.company_name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="mr-1">📅</span>
                    Added on {new Date(company.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => removeTargetCompany(company._id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">ℹ️</span>
          How it works
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>Add companies you're interested in</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>We monitor job postings across platforms</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>Get instant email notifications</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-gray-400">•</span>
            <span>Never miss your dream opportunity</span>
          </div>
        </div>
      </div>
    </div>
  );
}