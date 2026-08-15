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
              <div className="flex items-center gap-3">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Share:</span>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="bg-[#3b5998] text-white p-2 rounded-full hover:bg-opacity-80 transition shadow-lg" title="Share on Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')} className="bg-[#000000] text-white p-2 rounded-full hover:bg-opacity-80 transition border border-gray-700 shadow-lg" title="Share on X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.985H5.078z"/></svg>
                </button>
                <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - Read more here: " + window.location.href)}`, '_blank')} className="bg-[#25D366] text-white p-2 rounded-full hover:bg-opacity-80 transition shadow-lg" title="Share on WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }} className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition shadow-lg" title="Copy Link">
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