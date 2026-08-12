"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/posts`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#AE955A] selection:text-white overflow-x-hidden">
      {/* NAVIGATION BAR */}
      <nav className="bg-[#04681F] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Capacity Movement Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain bg-[#04681F] rounded-full border-2 border-[#AE955A] p-1 shadow-md"
          />
          <div className="leading-tight">
            <h1 className="font-extrabold tracking-widest text-lg md:text-xl uppercase">Capacity Movement</h1>
            <p className="text-[#AE955A] text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Project 2027</p>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
          <Link href="/#leadership" className="hover:text-[#AE955A] transition-colors">Leadership</Link>
          <Link href="/#values" className="hover:text-[#AE955A] transition-colors">Our Values</Link>
          <Link href="/#programs" className="hover:text-[#AE955A] transition-colors">Initiatives</Link>
          <Link href="/blog" className="text-[#AE955A] transition-colors">News</Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#021807] text-white flex flex-col items-center py-4 space-y-4 text-xs font-bold uppercase tracking-widest sticky top-[72px] z-40 border-b-4 border-[#AE955A] shadow-xl">
          <Link href="/#leadership" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Leadership</Link>
          <Link href="/#values" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Our Values</Link>
          <Link href="/#programs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Initiatives</Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-[#AE955A] w-full text-center py-2">News</Link>
        </div>
      )}

      {/* RETURN TO HOMEPAGE BAR */}
      <div className="bg-[#04240c] text-center py-2.5 border-b border-[#0a4017] w-full relative z-30">
        <Link href="/" className="inline-flex items-center justify-center gap-2 text-[10px] md:text-xs text-[#AE955A] hover:text-white font-bold uppercase tracking-widest transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Homepage
        </Link>
      </div>

      {/* HEADER SECTION */}
      <section className="bg-[#021807] text-white py-16 md:py-24 px-6 text-center border-b-[6px] border-[#AE955A]">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-shadow-lg">
          Official <span className="text-[#AE955A]">Newsroom</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Stay updated with the latest press releases, empowerment program announcements, and on-the-ground updates from the Capacity Movement.
        </p>
      </section>

      {/* NEWS GRID */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto min-h-[40vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-gray-500 font-bold uppercase tracking-widest mt-12">
            Loading News...
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-10 md:p-16 rounded-lg shadow-xl border-t-[6px] border-[#04681F] text-center w-full max-w-3xl">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-200 text-[#04681F]">
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#021807] uppercase mb-4">No Articles Yet</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                Our media team is currently preparing the first round of official announcements and grassroots updates. Please check back shortly.
              </p>
              <Link href="/" className="inline-block bg-[#04681F] hover:bg-[#058227] text-white font-bold py-3 px-8 uppercase tracking-widest text-xs rounded transition-all shadow-lg">
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col hover:border-[#AE955A] transition-all">
                {post.featuredImage ? (
                  <div className="h-48 w-full bg-gray-200 relative">
                    <img src={post.featuredImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-[#021807] relative flex items-center justify-center border-b-4 border-[#AE955A]">
                    <img src="/images/logo.png" alt="Capacity Movement Logo" className="h-24 w-24 object-contain opacity-50" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#AE955A] font-bold">
                      {post.category?.name || 'Update'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#021807] text-lg leading-tight mb-3">{post.title}</h3>
                  <div className="text-sm text-gray-600 mb-6 line-clamp-3 overflow-hidden">
                    {post.content}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-gray-500">By {post.author?.name || 'Media Team'}</span>
                    <button className="text-xs font-bold text-[#04681F] uppercase tracking-wider hover:text-[#AE955A] transition-colors">Read Full &rarr;</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#021807] text-gray-400 py-10 md:py-12 px-6 text-center text-xs md:text-sm border-t-4 border-[#04681F]">
        <h2 className="text-lg md:text-xl font-black uppercase text-white tracking-widest mb-1 md:mb-2">Capacity Movement</h2>
        <p className="text-[#AE955A] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 md:mb-8">Project 2027</p>
        <p className="mb-2 italic">"...for Credible Leadership."</p>
        <p>Headquartered in Kaduna Central, Nigeria.</p>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#0a4017] flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <Link href="/admin" className="hover:text-white transition-colors">Admin Portal Login</Link>
          <Link href="/blog" className="text-[#AE955A] transition-colors">Newsroom</Link>
        </div>
      </footer>
    </main>
  );
}