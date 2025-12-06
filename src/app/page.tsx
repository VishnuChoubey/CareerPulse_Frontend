"use client";

import { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  const handleAuth = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUserEmail('');
      setUserName('');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Check authentication on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.user.email);
          setUserName(data.user.name);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-violet-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-pulse border-t-yellow-500 mx-auto"></div>
          </div>
          <p className="text-gray-900 text-lg font-medium">Loading JobSpy...</p>
          <p className="text-gray-600 text-sm mt-2">Preparing your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Dashboard 
          userEmail={userEmail}
          userName={userName}
          onLogout={handleLogout}
        />
      ) : (
        <LandingPage onAuth={handleAuth} />
      )}
    </>
  );
}