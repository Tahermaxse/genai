'use client';

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900">
      <div className="relative flex justify-between py-4 px-6 items-center md:py-6">
        {/* Logo */}
        <a
          className="flex items-center text-2xl font-bold text-zinc-800 dark:text-zinc-100"
          aria-label="Logo"
          href="/"
        >
          🔥 <span className="ml-2 text-xl">crawl</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="/playground" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Playground
          </a>
          <a
            href="https://docs.firecrawl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white"
          >
            Docs
          </a>
          <a href="/pricing" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Pricing
          </a>
          <a href="/blog" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Blog
          </a>
          <button className="flex items-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Beta Features
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <button className="flex items-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Resources
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-zinc-800 dark:text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 px-6 py-4">
          <a href="/playground" className="block py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Playground
          </a>
          <a
            href="https://docs.firecrawl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white"
          >
            Docs
          </a>
          <a href="/pricing" className="block py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Pricing
          </a>
          <a href="/blog" className="block py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Blog
          </a>
          <button className="block py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Beta Features
          </button>
          <button className="block py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white">
            Resources
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
