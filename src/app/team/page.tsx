"use client";

import Link from 'next/link';
import { useState } from 'react';

const teamMembers = [
  { name: "Dr. Bashir Umar Mohammed", title: "State Chairman", img: "/images/sc.jpg" },
  { name: "Hon. Danjuma Paul (DON J.)", title: "National Director Finance", img: "/images/ndf.jpg" },
  { name: "Hon. Bashir Zango", title: "Zone 1 Vice Chairman", img: "/images/z1vc.jpg" },
  { name: "Comrade Abdulhakeem Adejumo", title: "Vice Chairman Zone 2", img: "/images/vcz2.jpg" },
  { name: "Hon. Francis Joshua Abu", title: "State Vice Chairman Zone 3", img: "/images/svcz3.jpg" },
  { name: "Yabo Chris Ephraim", title: "State Secretary", img: "/images/sce.jpg" },
  { name: "Mallam Abubakar Usman Tangaza", title: "State Assistant Secretary", img: "/images/sas.jpg" },
  { name: "Hajia Hauwa Abubakar Pendo", title: "State Treasurer", img: "/images/st.jpg" },
  { name: "Habib Isah Habib", title: "Financial Secretary", img: "/images/fs.jpg" },
  { name: "Ummulkhayr Usman", title: "State Organizing Secretary", img: "/images/sos.jpg" },
  { name: "Barrister Eugene Onus", title: "Legal Counsel", img: "/images/lc.jpg" },
  { name: "Barrister Mushaffau Babatunde Esq", title: "State Assistant Legal Counsel", img: "/images/salc.jpg" },
  { name: "Aisha Kabir", title: "State Women Leader", img: "/images/swl.jpg" },
  { name: "Muhammad Ayuba-Karl Max", title: "Director Media & Publicity", img: "/images/dmp.jpg" },
  { name: "Aminu Adamu Sahu", title: "Director Contact & Mobilization", img: "/images/dcm.jpg" },
  { name: "Jamila Inuwa Gambo", title: "Assistant Contact & Mobilization", img: "/images/acm.jpg" },
  { name: "King DJ Abdul", title: "Director Social Services", img: "/images/dss.jpg" },
  { name: "Khadija Mukhtar", title: "Director Welfare", img: "/images/dw.jpg" },
  { name: "Vincent Saleh Irimiya", title: "Coordinators Team Lead", img: "/images/ctl.jpg" },
  { name: "Hajia Maryam Masha Sambo", title: "PPS", img: "/images/pps.jpg" }
];

export default function TeamPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/team" className="text-[#AE955A] transition-colors">Our Team</Link>
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
          <Link href="/team" onClick={() => setIsMobileMenuOpen(false)} className="text-[#AE955A] w-full text-center py-2">Our Team</Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">News</Link>
        </div>
      )}

      {/* HEADER SECTION */}
      <section className="bg-[#021807] text-white py-16 md:py-24 px-6 text-center border-b-[6px] border-[#AE955A]">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-shadow-lg">
          Our <span className="text-[#AE955A]">Executive Team</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          The dedicated leaders driving the vision, strategy, and grassroots mobilization of the Capacity Movement.
        </p>
      </section>

      {/* TEAM GRID */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden group hover:border-[#AE955A] transition-all">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                {/* Fallback color while image loads or if it's missing */}
                <div className="absolute inset-0 bg-[#04681F]/10 flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-2">
                  [Portrait:<br/>{member.img.replace('/images/', '')}]
                </div>
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
                  onError={(e) => e.currentTarget.style.display = 'none'} 
                />
              </div>
              <div className="p-4 md:p-6 text-center border-t-4 border-[#04681F]">
                <h3 className="font-bold text-[#021807] text-xs md:text-sm uppercase leading-tight mb-1">{member.name}</h3>
                <p className="text-[9px] md:text-xs font-bold text-[#AE955A] tracking-wider uppercase">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
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
          <Link href="/team" className="text-[#AE955A] transition-colors">Our Team</Link>
          <Link href="/blog" className="hover:text-[#AE955A] transition-colors">Newsroom</Link>
        </div>
      </footer>
    </main>
  );
}