"use client";

import { useState } from 'react';
import AuthModal from './AuthModal';

interface LandingPageProps {
  onAuth: (email: string, name: string) => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">JobSpy</h1>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-3xl -z-10"></div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Dream Job
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Search across multiple job platforms simultaneously. Get instant notifications 
            from your target companies. Never miss an opportunity again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105"
            >
              Start Job Hunting 🚀
            </button>
            <button className="text-gray-700 border border-gray-300 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Platform Search</h3>
            <p className="text-gray-600 leading-relaxed">
              Search jobs across Indeed, LinkedIn, Glassdoor, and more platforms 
              with a single query.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Target Companies</h3>
            <p className="text-gray-600 leading-relaxed">
              Set target companies and get instant email notifications when 
              they post new job openings.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              Get insights on job market trends, top companies, and popular 
              locations in your field.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-32 bg-gray-50 rounded-3xl border border-gray-200 p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
              <div className="text-gray-600 text-lg font-medium">Job Platforms</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-gray-600 text-lg font-medium">Jobs Daily</div>
            </div>
            <div className="group">
              <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <div className="text-gray-600 text-lg font-medium">Real-time Alerts</div>
            </div>
            <div className="group">
              <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">📱</div>
              <div className="text-gray-600 text-lg font-medium">Mobile Friendly</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of job seekers who found their dream jobs with JobSpy
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-5 rounded-full text-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 JobSpy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={onAuth}
      />
    </div>
  );
}