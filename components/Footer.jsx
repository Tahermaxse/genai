import { BarChart2, Link2, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className="border-t bg-gradient-to-b from-background to-primary/5">
			<div className="container px-4 md:px-6 py-20">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
					<div className="space-y-4">
						<span className="flex items-center space-x-4">
							<Image
								src="/logo.webp"
								width={40}
								height={40}
								alt="Ferranax"
								className="w-10 h-10 rounded-full"
							/>
							<h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
								Ferranax
							</h4>
						</span>

						<p className="text-sm text-muted-foreground">
							Empowering marketers with data-driven insights for better ad
							campaigns.
						</p>
						<div className="flex space-x-4">
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-primary/10"
							>
								<Link2 className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-primary/10"
							>
								<SearchIcon className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-primary/10"
							>
								<BarChart2 className="h-5 w-5" />
							</Button>
						</div>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
							Product
						</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Documentation
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
							Company
						</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Careers
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
							Legal
						</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Privacy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-primary/10 mt-12 pt-8 text-center">
					<p className="text-sm text-muted-foreground">
						© 2024 ART Finder. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
