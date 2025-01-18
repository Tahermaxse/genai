// app/components/CompetitorAnalysis.tsx
'use client';

import { useState } from 'react';

interface AnalysisResult {
  hooks: {
    identified: string[];
    effectiveness: string;
    suggestions: string[];
  };
  cta: {
    patterns: string[];
    effectiveness: string;
    improvements: string[];
  };
  contentStrategy: {
    formats: string[];
    themes: string[];
    recommendations: string[];
  };
  competitors: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
  };
}

export default function CompetitorAnalysis() {
  const [urls, setUrls] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const removeUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const validUrls = urls.filter(url => url.trim() !== '');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: validUrls }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Failed to analyze competitors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="space-y-2">
          {urls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder="Enter competitor URL"
                className="flex-1 p-2 border rounded"
                required
              />
              {urls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUrl(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addUrlField}
          className="text-blue-600 hover:text-blue-800"
        >
          + Add another URL
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Competitors'}
        </button>
      </form>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Hook Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Identified Hooks</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.hooks.identified.map((hook, i) => (
                    <li key={i}>{hook}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Effectiveness</h3>
                <p className="mt-2">{analysis.hooks.effectiveness}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Suggestions</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.hooks.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">CTA Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Patterns</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.cta.patterns.map((pattern, i) => (
                    <li key={i}>{pattern}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Effectiveness</h3>
                <p className="mt-2">{analysis.cta.effectiveness}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Suggested Improvements</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.cta.improvements.map((improvement, i) => (
                    <li key={i}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Content Strategy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Content Formats</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.contentStrategy.formats.map((format, i) => (
                    <li key={i}>{format}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Key Themes</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.contentStrategy.themes.map((theme, i) => (
                    <li key={i}>{theme}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Recommendations</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.contentStrategy.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Competitive Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Competitor Strengths</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.competitors.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Areas for Improvement</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.competitors.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Market Opportunities</h3>
                <ul className="list-disc pl-5 mt-2">
                  {analysis.competitors.opportunities.map((opportunity, i) => (
                    <li key={i}>{opportunity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}