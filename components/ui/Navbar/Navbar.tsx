'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Github, Moon, Sun, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Navbar = () => {
	const [mounted, setMounted] = useState(false); // Ensure rendering on client-side

	useEffect(() => {
		setMounted(true); // Mark component as mounted
	}, []);


	return (
		<div className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none">
			<div
				className="bg-white/80 dark:bg-black/90 backdrop-blur-xl 
          border border-black/[0.02] dark:border-white/10 
          rounded-md pointer-events-auto
          shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-none translate-y-2 scale-95"
			>
				<div className="h-10 sm:h-12 flex items-center gap-4 sm:gap-6 px-3 sm:px-6">
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D94E1E] to-[#D94E1E]/80" />
						<span className="text-[10px] sm:text-xs font-mono text-black/50 dark:text-white/50">
							Overview
						</span>
						<span
							className="ml-3 bg-black/[0.02] dark:bg-white/[0.02]
                hover:bg-black/[0.05] dark:hover:bg-white/[0.05]
                transition-colors duration-300"
						>
							<Link href="https://github.com/Tahermaxse/genai.git">
								<Github className="w-4 h-4" />
							</Link>
						</span>
						<span
							className="ml-3 bg-black/[0.02] dark:bg-white/[0.02]
                hover:bg-black/[0.05] dark:hover:bg-white/[0.05]
                transition-colors duration-300"
						>
							<Link href="https://youtu.be/VQOifF-82uI?si=tAwd4Vb0wYk_isZh">
								<Youtube className="w-4 h-4" />
							</Link>
						</span>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Navbar;
