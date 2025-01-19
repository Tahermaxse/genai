// app/components/SearchForm.tsx
'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';

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
			.replace(/^./, (str) => str.toUpperCase());
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<form
				onSubmit={handleSubmit}
				className="space-y-4"
			>
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
					className="text-sm font-medium border border-transparent dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out group relative w-full overflow-hidden whitespace-nowrap rounded-xl p-3 lg:flex items-center justify-center bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] text-white before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] before:pointer-events-none before:absolute before:inset-0 before:rounded-xl"
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
						<div
							key={category}
							className="bg-white p-6 rounded-lg shadow-md"
						>
							<h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
								{getCategoryIcon(category)} {formatCategoryName(category)}
							</h3>
							<ul className="space-y-2">
								{links.map((link: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
									<li
										key={index}
										className="flex items-start gap-2"
									>
										<span className="text-gray-400 mt-1">•</span>
										<a
											href={typeof link === 'string' ? link : '#'}
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
