"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function SinglePostPage() {
  const params = useParams();
  const slug = params.slug;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/posts/slug/${slug}`);
        const data = await res.json();
        
        if (data.success) {
          setPost(data.data);
        } else {
          setError(data.error || 'Article not found');
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Network error loading article');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#AE955A] selection:text-white overflow-x-hidden flex flex-col">
      {/* NAVIGATION BAR */}
      <nav className="bg-[#04681F] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
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
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* RETURN BAR */}
      <div className="bg-[#04240c] text-center py-2.5 border-b border-[#0a4017] w-full relative z-30">
        <Link href="/blog" className="inline-flex items-center justify-center gap-2 text-[10px] md:text-xs text-[#AE955A] hover:text-white font-bold uppercase tracking-widest transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Newsroom
        </Link>
      </div>

      {/* ARTICLE CONTENT */}
      <section className="flex-grow py-12 md:py-20 px-6 max-w-4xl mx-auto w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-gray-500 font-bold uppercase tracking-widest">
            Loading Article...
          </div>
        ) : error || !post ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-700 mb-4 uppercase">Article Not Found</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/blog" className="bg-[#04681F] text-white font-bold py-3 px-8 uppercase tracking-widest text-xs rounded hover:bg-[#058227]">
              Return to Newsroom
            </Link>
          </div>
        ) : (
          <article className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header / Meta */}
            <div className="p-8 md:p-12 border-b border-gray-100 bg-gray-50 text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <span className="bg-[#04681F] text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-sm">
                  {post.category?.name || 'Official Update'}
                </span>
                <span className="text-gray-500 text-xs font-mono">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#021807] mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-[#AE955A]">
                By {post.author?.name || 'Media Team'}
              </p>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="w-full h-[300px] md:h-[500px] relative border-y-4 border-[#AE955A]">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Body */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
                {post.content}
              </div>
            </div>
            
            {/* Share / Bottom Bar */}
            <div className="bg-[#021807] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Share:</span>
                
                {/* Primary Native Share Button (Opens phone's app chooser) */}
                <button 
                  onClick={async () => {
                    const shareUrl = `${window.location.href.split('?')[0]}?v=${Date.now()}`;
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: post.title,
                          text: `${post.title} - Read more on Capacity Movement:`,
                          url: shareUrl,
                        });
                      } catch (err) {
                        // User cancelled or share failed silently
                      }
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="bg-[#04681F] hover:bg-[#058227] text-white px-4 py-2 rounded-full font-bold uppercase text-[11px] tracking-wider flex items-center gap-2 transition shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Share via App...
                </button>

                {/* Quick Icons */}
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="bg-[#3b5998] text-white p-2 rounded-full hover:bg-opacity-80 transition shadow-lg" title="Share on Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')} className="bg-[#000000] text-white p-2 rounded-full hover:bg-opacity-80 transition border border-gray-700 shadow-lg" title="Share on X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.985H5.078z"/></svg>
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); }} className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition shadow-lg" title="Copy Link">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </button>
              </div>
              <p className="text-[#AE955A] text-[10px] font-bold uppercase tracking-widest">
                Capacity Movement Project 2027
              </p>
            </div>
          </article>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#021807] text-gray-400 py-10 md:py-12 px-6 text-center text-xs md:text-sm border-t-4 border-[#04681F] mt-auto">
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