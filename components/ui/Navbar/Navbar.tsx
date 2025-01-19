'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 0);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const navLinks = [
		{ href: '/enterprise', label: 'Enterprise' },
		{ href: '/pricing', label: 'Pricing' },
		{ href: '/resources/features', label: 'Features' },
		{ href: '/blog', label: 'Blog' },
	];

	return (
		<div className="fixed w-full top-0 z-50">
			<div
				className={`w-full max-w-[1440px] px-4 md:px-[34px] mx-auto flex justify-between items-center py-4 transition-all ${
					isScrolled
						? 'bg-gray-100 text-black rounded-3xl m-3 shadow-lg' // Added shadow for better visibility
						: 'bg-primary-50/95 text-black'
				}`}
			>
				<div className="flex items-center gap-2">
					<Link href="/">
						<Image
							src={'/logo.webp'}
							width={32}
							height={32}
							alt="Ferranax"
							className="rounded-full"
						/>
					</Link>
					<span className="font-medium italic text-xl ml-1.5">Ferranax</span>
				</div>
				<nav className="hidden lg:flex gap-8">
					{navLinks.map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className="hover:text-gray-600 transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>
				<div className="flex items-center lg:hidden">
					<button
						onClick={toggleMobileMenu}
						aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
						className="p-2"
					>
						{isMobileMenuOpen ? <X /> : <Menu />}
					</button>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-primary-50 z-40 lg:hidden">
					<ul className="flex flex-col items-center gap-4 py-6">
						{navLinks.map((link, index) => (
							<li key={index}>
								<Link
									href={link.href}
									className="text-lg hover:text-gray-600 transition-colors"
								>
									{link.label}
								</Link>
							</li>
						))}
						<li>
							<a
								href="https://app.cal.com/signup"
								className="text-lg hover:text-gray-600 transition-colors"
							>
								Get Started
							</a>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Navbar;
