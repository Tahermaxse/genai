// app/components/SearchForm.tsx
'use client';

import { useState } from 'react';

interface SearchResult {
  marketingBlogs: string[];
  competitorWebsites: string[];
  industryReports: string[];
  socialMediaDiscussions: string[];
  reviewPlatforms: string[];
  relevantForums: string[];
}

export default function SearchForm() {
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marketingBlogs':
        return '📝';
      case 'competitorWebsites':
        return '🏢';
      case 'industryReports':
        return '📊';
      case 'socialMediaDiscussions':
        return '💬';
      case 'reviewPlatforms':
        return '⭐';
      case 'relevantForums':
        return '👥';
      default:
        return '🔗';
    }
  };

  const formatCategoryName = (category: string) => {
    return category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter product/service for research"
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition duration-150"
        >
          {loading ? 'Gathering Research Data...' : 'Start Research'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-8 space-y-8">
          {Object.entries(results).map(([category, links]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {getCategoryIcon(category)} {formatCategoryName(category)}
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}