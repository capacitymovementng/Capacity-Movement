"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function PublicHomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#AE955A] selection:text-white overflow-x-hidden">
      {/* NAVIGATION BAR */}
      <nav className="bg-[#04681F] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="Capacity Movement Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain bg-white rounded-full border-2 border-[#AE955A] p-1"
          />
          <div className="leading-tight">
            <h1 className="font-extrabold tracking-widest text-lg md:text-xl uppercase">Capacity Movement</h1>
            <p className="text-[#AE955A] text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Project 2027</p>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
          <Link href="#leadership" className="hover:text-[#AE955A] transition-colors">Leadership</Link>
          <Link href="#values" className="hover:text-[#AE955A] transition-colors">Our Values</Link>
          <Link href="#programs" className="hover:text-[#AE955A] transition-colors">Initiatives</Link>
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
          <Link href="#leadership" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Leadership</Link>
          <Link href="#values" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Our Values</Link>
          <Link href="#programs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">Initiatives</Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#AE955A] w-full text-center py-2">News</Link>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative bg-[#021807] text-white min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center py-16 px-6 text-center border-b-[8px] border-[#AE955A] overflow-hidden">
        {/* Placeholder for the large crowd/rally hero image */}
        <div className="absolute inset-0 bg-[url('/images/hero-banner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#021807]/80 to-[#021807]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-4 md:mb-6 leading-tight text-shadow-lg">
            Building a Capable Nation, <br/>
            <span className="text-[#AE955A]">One Citizen at a Time.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium leading-relaxed px-2">
            We are not just a political group; we are a people's movement. We exist to awaken the promise of Nigeria by building the capacity of every citizen to lead, serve, and succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#04681F] hover:bg-[#058227] text-white font-bold py-3 md:py-4 px-6 md:px-10 uppercase tracking-widest text-xs md:text-sm rounded transition-all shadow-lg shadow-[#04681F]/30">
              Join the Movement
            </button>
            <Link href="/blog" className="bg-transparent border-2 border-[#AE955A] text-[#AE955A] hover:bg-[#AE955A] hover:text-[#021807] font-bold py-3 md:py-4 px-6 md:px-10 uppercase tracking-widest text-xs md:text-sm rounded transition-all">
              Read Our Latest News
            </Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & CONTEXT SECTION */}
      <section id="leadership" className="py-16 md:py-20 px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h3 className="text-[#AE955A] font-bold uppercase tracking-widest text-xs md:text-sm mb-2">Our Stance & Leadership</h3>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase text-[#021807] mb-4 md:mb-6 leading-tight">
            Defending Democratic <br/> Transparency
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
            Led by our President, <strong className="text-[#04681F]">Shehu Sani Sado</strong>, the Capacity Movement stands firmly against political imposition in Kaduna Central. 
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
            In May 2026, our movement made national headlines by demanding direct, transparent primaries. We are proudly guided by our Grand Patron, <strong className="text-[#04681F]">Ambassador Yerima Usman Shettima</strong> (President, Arewa Consultative Youth Movement - ACYM), proving that politics belongs to the people.
          </p>
          <div className="border-l-4 border-[#04681F] pl-4 py-2 italic text-xs md:text-sm text-gray-600">
            "True transformation begins not with policies alone, but with people who believe in their potential and have the capacity to make change happen."
          </div>
        </div>
        
        {/* Side-by-side grid forced on all screen sizes */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 pt-4">
          <div className="relative mt-0">
            <img 
              src="/images/president.jpg" 
              alt="Shehu Sani Sado - President" 
              className="aspect-[4/5] w-full object-cover rounded-lg shadow-2xl border border-gray-300"
            />
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-4 bg-[#04681F] text-white p-2 md:p-4 rounded-lg shadow-xl border-b-2 md:border-b-4 border-[#AE955A] w-[105%] md:w-11/12 z-10">
              <p className="font-bold uppercase text-[10px] md:text-sm leading-tight">Shehu Sani Sado</p>
              <p className="text-[8px] md:text-[10px] tracking-widest uppercase text-gray-200 mt-1">President</p>
            </div>
          </div>

          <div className="relative mt-8 md:mt-12">
            <img 
              src="/images/patron.jpg" 
              alt="Amb. Yerima Usman Shettima - Grand Patron" 
              className="aspect-[4/5] w-full object-cover rounded-lg shadow-2xl border border-gray-300"
            />
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-4 bg-[#AE955A] text-[#021807] p-2 md:p-4 rounded-lg shadow-xl border-b-2 md:border-b-4 border-[#04681F] w-[105%] md:w-11/12 z-10">
              <p className="font-bold uppercase text-[10px] md:text-sm leading-tight">Amb. Yerima Shettima</p>
              <p className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-[#021807]/80 mt-1">Grand Patron</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white p-6 md:p-10 shadow-lg border-t-[6px] border-[#04681F]">
            <h3 className="text-xl md:text-2xl font-black uppercase text-[#04681F] mb-3 tracking-wider">Our Vision</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              To build a credible and capable Nigeria where leadership is accountable, citizens are empowered, and creativity and integrity drive sustainable national progress. A nation where every Nigerian has the ability and opportunity to grow, protected by justice, strengthened by unity, and guided by a shared commitment to excellence.
            </p>
          </div>
          <div className="bg-white p-6 md:p-10 shadow-lg border-t-[6px] border-[#AE955A]">
            <h3 className="text-xl md:text-2xl font-black uppercase text-[#AE955A] mb-3 tracking-wider">Our Mission</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              We exist to empower Nigerians with the knowledge, values, and opportunities needed to lead, innovate, and transform their communities. We are committed to promoting credibility and accountability in governance, protecting citizens through civic education, and fostering a culture of yielding cooperation.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES (THE ACROSTIC) */}
      <section id="values" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase text-[#021807] tracking-wider mb-2 md:mb-4">What We Stand For</h2>
          <p className="text-xs md:text-base text-gray-600 max-w-2xl mx-auto px-2">The name CAPACITY is more than a word; it is a declaration of character and the foundation of our movement.</p>
          <div className="w-16 md:w-24 h-1 bg-[#AE955A] mx-auto mt-4 md:mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {[
            { l: 'C', title: 'Credibility', desc: 'Leadership must be built on truth, trust, and transparency.' },
            { l: 'A', title: 'Accountability', desc: 'Every leader must answer to the people.' },
            { l: 'P', title: 'Protection', desc: 'We stand for the safety and rights of every Nigerian.' },
            { l: 'A', title: 'Ability', desc: 'Building skills to turn citizen potential into performance.' },
            { l: 'C', title: 'Creativity', desc: 'Encouraging problem-solving and new ideas.' },
            { l: 'I', title: 'Integrity', desc: 'Our moral compass. We lead by example.' },
            { l: 'T', title: 'Tenacity', desc: 'We do not give up, turning vision into victory.' },
            { l: 'Y', title: 'Yielding', desc: 'Wisdom to listen, unite, and adapt.' }
          ].map((val, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-3 md:p-8 hover:shadow-xl transition-shadow group">
              <div className="text-2xl md:text-4xl font-black text-[#04681F] mb-1 md:mb-4 group-hover:text-[#AE955A] transition-colors">{val.l}</div>
              <h4 className="text-[11px] md:text-lg font-bold uppercase text-[#021807] mb-1">{val.title}</h4>
              <p className="text-[9px] md:text-sm text-gray-600 leading-tight md:leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS & INITIATIVES */}
      <section id="programs" className="bg-[#021807] text-white py-16 md:py-24 px-6 border-y-[6px] md:border-y-[8px] border-[#04681F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase text-white tracking-wider mb-2 md:mb-4">Programs & Initiatives</h2>
            <div className="w-16 md:w-24 h-1 bg-[#AE955A] mx-auto mt-4 md:mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: 'Capacity Leadership Academy (CLA)', 
                desc: 'Training young Nigerians in ethics, leadership, innovation, and civic responsibility.',
                img: '/images/prog-cla.jpg'
              },
              { 
                title: 'National Empowerment Drive (NED)', 
                desc: 'Providing entrepreneurship training, small grants, and mentorship.',
                img: '/images/prog-ned.jpg'
              },
              { 
                title: 'Capacity in Governance (CGI)', 
                desc: 'Tracking governance performance, promoting public integrity.',
                img: '/images/prog-cgi.jpg'
              },
              { 
                title: 'Youth for Progress Network (YPN)', 
                desc: 'A coalition of youth-led organizations promoting civic engagement.',
                img: '/images/prog-ypn.jpg'
              },
              { 
                title: 'Women of Capacity (WOC)', 
                desc: 'Empowering women with leadership and entrepreneurial skills.',
                img: '/images/prog-woc.jpg'
              }
            ].map((prog, idx) => (
              <div key={idx} className="bg-[#04240c] border border-[#0a4017] hover:border-[#AE955A] transition-colors rounded-lg shadow-2xl overflow-hidden group">
                <div className="h-32 md:h-48 w-full bg-gray-800 relative overflow-hidden">
                  <img 
                    src={prog.img} 
                    alt={prog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#04681F]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div className="p-5 md:p-8">
                  <h3 className="text-sm md:text-xl font-bold text-[#AE955A] mb-2 md:mb-3 uppercase tracking-wide">{prog.title}</h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR EMBLEM / LOGO MEANING */}
      <section className="py-16 md:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-1/3 flex justify-center">
             <img 
               src="/images/logo.png" 
               alt="Official Emblem of Capacity Movement" 
               className="w-48 h-48 md:w-64 md:h-64 object-contain bg-white rounded-full shadow-2xl border-4 border-[#AE955A] p-4 md:p-6"
             />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#021807] mb-6 md:mb-8">The Symbol of Our Movement</h2>
            <div className="space-y-4 md:space-y-6 text-left">
              <div>
                <h4 className="font-bold text-[#04681F] uppercase tracking-wider text-xs md:text-sm">The Map Outline</h4>
                <p className="text-gray-700 text-xs md:text-sm mt-1">Serves as the structural foundation, representing national unity and geographic inclusiveness.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#04681F] uppercase tracking-wider text-xs md:text-sm">The Eagle Symbol</h4>
                <p className="text-gray-700 text-xs md:text-sm mt-1">Positioned centrally, the eagle spreads its wings symbolizing the leadership, courage, and capacity.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#04681F] uppercase tracking-wider text-xs md:text-sm">36 Stars Ring</h4>
                <p className="text-gray-700 text-xs md:text-sm mt-1">Representing the 36 states of Nigeria, arranged in a circle to symbolize balance and collective participation.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#AE955A] uppercase tracking-wider text-xs md:text-sm">Three Gold Stars</h4>
                <p className="text-gray-700 text-xs md:text-sm mt-1">Representing our guiding pillars: Vision, Integrity, and Excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#021807] text-gray-400 py-10 md:py-12 px-6 text-center text-xs md:text-sm border-t-4 border-[#04681F]">
        <h2 className="text-lg md:text-xl font-black uppercase text-white tracking-widest mb-1 md:mb-2">Capacity Movement</h2>
        <p className="text-[#AE955A] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 md:mb-8">Project 2027</p>
        <p className="mb-2 italic">"...for Credible Leadership."</p>
        <p>Headquartered in Kaduna Central, Nigeria.</p>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#0a4017] flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <Link href="/admin" className="hover:text-white transition-colors">Admin Portal Login</Link>
          <Link href="/blog" className="hover:text-[#AE955A] transition-colors">Newsroom</Link>
        </div>
      </footer>
    </main>
  );
}