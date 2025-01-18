'use client'

import CompetitorAnalysis from "@/components/CompetitorAnalysis";
import Playground from "@/components/Playground/Playground";
import SearchForm from "@/components/SearchForm";
import Navbar from "@/components/ui/Navbar/Navbar";

export default function Home() {

  return (
    <>
    {/* <Navbar />
    <Playground /> */}
    <SearchForm/>
    <CompetitorAnalysis/>
    </>
  );
}
