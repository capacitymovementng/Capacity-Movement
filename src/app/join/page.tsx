"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function JoinPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LOADING');
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', phone: '' }); // Clear the form
      } else {
        setStatus('ERROR');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('ERROR');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#AE955A] selection:text-white overflow-x-hidden">
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
          <Link href="/team" className="hover:text-[#AE955A] transition-colors">Our Team</Link>
          <Link href="/blog" className="hover:text-[#AE955A] transition-colors">News</Link>
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
          <Link href="/team" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Our Team</Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">News</Link>
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
      <section className="bg-[#021807] text-white py-12 md:py-20 px-6 text-center border-b-[6px] border-[#AE955A]">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-shadow-lg">
          Join the <span className="text-[#AE955A]">Movement</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Be a part of the change. Add your voice to the call for credible leadership, transparency, and grassroots empowerment in Nigeria.
        </p>
      </section>

      {/* FORM SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-3xl mx-auto flex flex-col items-center justify-center">
        
        {status === 'SUCCESS' ? (
          <div className="bg-white p-10 md:p-16 rounded-lg shadow-xl border-t-[6px] border-[#04681F] text-center w-full">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-200 text-[#04681F]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#021807] uppercase mb-4">Welcome Aboard!</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Your details have been successfully registered. Our mobilization team will be in touch with you shortly. Thank you for standing with the Capacity Movement.
            </p>
            <button 
              onClick={() => setStatus('IDLE')}
              className="inline-block bg-[#04681F] hover:bg-[#058227] text-white font-bold py-3 px-8 uppercase tracking-widest text-xs rounded transition-all shadow-lg"
            >
              Register Another Member
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl border-t-[6px] border-[#AE955A] w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black uppercase text-[#021807] mb-2 tracking-wider">Registration Form</h2>
              <p className="text-sm text-gray-500">Please fill out your contact details below.</p>
            </div>

            {status === 'ERROR' && (
              <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded mb-6 text-sm font-bold text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2 tracking-widest">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aminu Adamu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#04681F] focus:ring-1 focus:ring-[#04681F] outline-none rounded-lg text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2 tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aminu@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#04681F] focus:ring-1 focus:ring-[#04681F] outline-none rounded-lg text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2 tracking-widest">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 08012345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 font-mono focus:border-[#04681F] focus:ring-1 focus:ring-[#04681F] outline-none rounded-lg text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'LOADING'}
                className="w-full bg-[#04681F] hover:bg-[#058227] disabled:bg-gray-400 text-white font-bold py-4 uppercase tracking-widest text-sm rounded-lg transition-all shadow-lg mt-4 flex justify-center items-center"
              >
                {status === 'LOADING' ? 'Submitting...' : 'Join Now'}
              </button>
            </form>
          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="bg-[#021807] text-gray-400 py-10 md:py-12 px-6 text-center text-xs md:text-sm border-t-4 border-[#04681F]">
        <h2 className="text-lg md:text-xl font-black uppercase text-white tracking-widest mb-1 md:mb-2">Capacity Movement</h2>
        <p className="text-[#AE955A] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 md:mb-8">Project 2027</p>
        
        <div className="max-w-md mx-auto space-y-2 mb-8 text-gray-300">
          <p className="mb-2 italic text-gray-400">"...for Credible Leadership."</p>
          <p>5th Floor, Bank of Industry Building (BOI)</p>
          <p>Muhammadu Buhari Way, Kaduna.</p>
          <p className="text-[#AE955A]">capacitymovementprojectkad27@gmail.com</p>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#0a4017] flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <Link href="/admin" className="hover:text-white transition-colors">Admin Portal Login</Link>
          <Link href="/team" className="hover:text-[#AE955A] transition-colors">Our Team</Link>
          <Link href="/blog" className="hover:text-[#AE955A] transition-colors">Newsroom</Link>
        </div>
      </footer>
    </main>
  );
}
