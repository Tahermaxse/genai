import React from 'react';
import { Button } from './button';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Hero = () => {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-background pt-32 pb-40">
			<div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
			<div className="container relative px-4 md:px-6">
				<div className="flex flex-col items-center space-y-12 text-center">
					<div className="space-y-6">
						<div className="mx-auto inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
							🚀 Revolutionizing Marketing Research
						</div>
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
							Discover Powerful Marketing Insights with{' '}
							<span className="relative">
								<span className="absolute -inset-1 block blur-2xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-20"></span>
								<span className="relative bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
									ART Finder
								</span>
							</span>
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
							Automate your research, uncover user triggers, and create
							compelling ads with data-driven insights
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
						<Button
							size="lg"
							className="h-12 px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
						>
							Get Started
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="h-12 px-8 text-lg hover:bg-primary/5 transition-colors"
						>
							Learn More
							<ChevronRight className="ml-2 h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
