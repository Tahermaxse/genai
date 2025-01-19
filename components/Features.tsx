import { BarChart2, SearchIcon, Zap } from 'lucide-react';
import React from 'react';
import { Card } from './ui/card';

const Features = () => {
	return (
		<section className="py-8 border-t border-b border-gray-200">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter text-center mb-16">
					Key Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<Card className="relative p-6 space-y-4 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:via-violet-500/5 before:to-fuchsia-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/20 to-fuchsia-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<SearchIcon className="h-12 w-12 text-primary relative group-hover:scale-110 transition-transform duration-300" />
						</div>
						<h3 className="text-xl font-bold relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 transition-colors duration-300">
							Comprehensive Research
						</h3>
						<p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 relative">
							Automatically gather insights from multiple platforms including
							Google, YouTube, Reddit, and more.
						</p>
					</Card>
					<Card className="relative p-6 space-y-4 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-violet-500/5 before:via-fuchsia-500/5 before:to-pink-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<BarChart2 className="h-12 w-12 text-primary relative group-hover:scale-110 transition-transform duration-300" />
						</div>
						<h3 className="text-xl font-bold relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600 transition-colors duration-300">
							Actionable Analytics
						</h3>
						<p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 relative">
							Transform raw data into meaningful insights with advanced
							analytics and visualization tools.
						</p>
					</Card>
					<Card className="relative p-6 space-y-4 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-fuchsia-500/5 before:via-pink-500/5 before:to-rose-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-pink-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-pink-600/20 to-rose-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<Zap className="h-12 w-12 text-primary relative group-hover:scale-110 transition-transform duration-300" />
						</div>
						<h3 className="text-xl font-bold relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-600 group-hover:to-pink-600 transition-colors duration-300">
							Smart Recommendations
						</h3>
						<p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 relative">
							Get AI-powered suggestions for hooks, CTAs, and content formats
							that resonate with your audience.
						</p>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default Features;
