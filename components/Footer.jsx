import { BarChart2, Link2, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className="bg-gradient-to-b from-background to-primary/5">
			<div className="container px-4 md:px-6 py-20">
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
