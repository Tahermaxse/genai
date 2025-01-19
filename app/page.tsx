'use client';

import CompetitorAnalysis from '@/components/CompetitorAnalysis';
import SearchForm from '@/components/SearchForm';
import Navbar from '@/components/ui/Navbar/Navbar';
import Hero from '@/components/ui/Hero';
import Footer from '@/components/Footer';
import Features from '@/components/Features';

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Features />
			<SearchForm />

			<CompetitorAnalysis />
			<Footer />
		</>
	);
}
