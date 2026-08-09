import Link from 'next/link';

export default function PublicHomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#AE955A] selection:text-white">
      {/* NAVIGATION BAR */}
      <nav className="bg-[#04681F] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#04681F] font-black text-xs border-2 border-[#AE955A]">
            LOGO
          </div>
          <div className="leading-tight">
            <h1 className="font-extrabold tracking-widest text-xl uppercase">Capacity Movement</h1>
            <p className="text-[#AE955A] text-[10px] font-bold uppercase tracking-widest">Project 2027</p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
          <Link href="#leadership" className="hover:text-[#AE955A] transition-colors">Leadership</Link>
          <Link href="#values" className="hover:text-[#AE955A] transition-colors">Our Values</Link>
          <Link href="#programs" className="hover:text-[#AE955A] transition-colors">Initiatives</Link>
          <Link href="/blog" className="hover:text-[#AE955A] transition-colors">News</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-[#021807] text-white py-32 md:py-48 px-6 text-center border-b-[8px] border-[#AE955A] overflow-hidden">
        {/* Placeholder for the large crowd/rally hero image */}
        <div className="absolute inset-0 bg-[url('/images/hero-banner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#021807]/80 to-[#021807]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-6 leading-tight text-shadow-lg">
            Building a Capable Nation, <br/>
            <span className="text-[#AE955A]">One Citizen at a Time.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            We are not just a political group; we are a people's movement. We exist to awaken the promise of Nigeria by building the capacity of every citizen to lead, serve, and succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#04681F] hover:bg-[#058227] text-white font-bold py-4 px-10 uppercase tracking-widest text-sm rounded transition-all shadow-lg shadow-[#04681F]/30">
              Join the Movement
            </button>
            <Link href="/blog" className="bg-transparent border-2 border-[#AE955A] text-[#AE955A] hover:bg-[#AE955A] hover:text-[#021807] font-bold py-4 px-10 uppercase tracking-widest text-sm rounded transition-all">
              Read Our Latest News
            </Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & CONTEXT SECTION */}
      <section id="leadership" className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-[#AE955A] font-bold uppercase tracking-widest text-sm mb-2">Our Stance</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-[#021807] mb-6 leading-tight">
            Defending Democratic <br/> Transparency
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Led by our President, <strong className="text-[#04681F]">Shehu Sani Sado</strong>—a dedicated grassroots mobilizer distinct from former Senator Shehu Sani—the Capacity Movement stands firmly against political imposition in Kaduna Central. 
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            In May 2026, our movement made national headlines by demanding direct, transparent primaries. We proudly threw our massive grassroots weight behind human rights activist Ambassador Yerima Usman Shettima, proving that politics belongs to the people.
          </p>
          <div className="border-l-4 border-[#04681F] pl-6 py-2 italic text-gray-600">
            "True transformation begins not with policies alone, but with people who believe in their potential and have the capacity to make change happen."
          </div>
        </div>
        <div className="relative">
          {/* Placeholder for President's Portrait */}
          <div className="aspect-[4/5] bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest border border-gray-300">
            [President Portrait: Shehu Sani Sado]
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#04681F] text-white p-6 rounded-lg shadow-xl border-b-4 border-[#AE955A]">
            <p className="font-bold uppercase text-lg">Shehu Sani Sado</p>
            <p className="text-xs tracking-widest uppercase text-gray-200">President, Capacity Movement</p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 shadow-lg border-t-[6px] border-[#04681F]">
            <h3 className="text-2xl font-black uppercase text-[#04681F] mb-4 tracking-wider">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To build a credible and capable Nigeria where leadership is accountable, citizens are empowered, and creativity and integrity drive sustainable national progress. A nation where every Nigerian has the ability and opportunity to grow, protected by justice, strengthened by unity, and guided by a shared commitment to excellence.
            </p>
          </div>
          <div className="bg-white p-10 shadow-lg border-t-[6px] border-[#AE955A]">
            <h3 className="text-2xl font-black uppercase text-[#AE955A] mb-4 tracking-wider">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              We exist to empower Nigerians with the knowledge, values, and opportunities needed to lead, innovate, and transform their communities. We are committed to promoting credibility and accountability in governance, protecting citizens through civic education, and fostering a culture of yielding cooperation.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES (THE ACROSTIC) */}
      <section id="values" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-[#021807] tracking-wider mb-4">What We Stand For</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">The name CAPACITY is more than a word; it is a declaration of character and the foundation of our movement.</p>
          <div className="w-24 h-1 bg-[#AE955A] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { l: 'C', title: 'Credibility', desc: 'Leadership must be built on truth, trust, and transparency. It is the strength of our voice.' },
            { l: 'A', title: 'Accountability', desc: 'We hold ourselves responsible for our choices and their impact. Every leader must answer to the people.' },
            { l: 'P', title: 'Protection', desc: 'We stand for the safety, dignity, and rights of every Nigerian. True leadership safeguards welfare.' },
            { l: 'A', title: 'Ability', desc: 'We aim to build the skills, knowledge, and confidence to turn citizen potential into performance.' },
            { l: 'C', title: 'Creativity', desc: 'Innovation drives progress. We encourage problem-solving and new ideas that move our nation forward.' },
            { l: 'I', title: 'Integrity', desc: 'Our moral compass. It guides our decisions and defines our character. We lead by example.' },
            { l: 'T', title: 'Tenacity', desc: 'We do not give up. Through challenges, we remain steadfast, turning vision into victory.' },
            { l: 'Y', title: 'Yielding', desc: 'The humility and wisdom to listen, unite, adapt, and put the greater good above self-interest.' }
          ].map((val, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-8 hover:shadow-xl transition-shadow group">
              <div className="text-4xl font-black text-[#04681F] mb-4 group-hover:text-[#AE955A] transition-colors">{val.l}</div>
              <h4 className="text-lg font-bold uppercase text-[#021807] mb-2">{val.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS & INITIATIVES */}
      <section id="programs" className="bg-[#021807] text-white py-24 px-6 border-y-[8px] border-[#04681F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-wider mb-4">Programs & Initiatives</h2>
            <div className="w-24 h-1 bg-[#AE955A] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Capacity Leadership Academy (CLA)', 
                desc: 'Training young Nigerians in ethics, leadership, innovation, and civic responsibility across all 36 states.',
                img: '/images/prog-cla.jpg'
              },
              { 
                title: 'National Empowerment Drive (NED)', 
                desc: 'Providing entrepreneurship training, small grants, and mentorship to help citizens build viable enterprises.',
                img: '/images/prog-ned.jpg'
              },
              { 
                title: 'Capacity in Governance Initiative (CGI)', 
                desc: 'Tracking governance performance, promoting public integrity, and engaging citizens in monitoring projects.',
                img: '/images/prog-cgi.jpg'
              },
              { 
                title: 'Youth for Progress Network (YPN)', 
                desc: 'A coalition of youth-led organizations promoting education, innovation, and civic engagement at the grassroots.',
                img: '/images/prog-ypn.jpg'
              },
              { 
                title: 'Women of Capacity (WOC)', 
                desc: 'Empowering women with leadership and entrepreneurial skills for active participation in politics and business.',
                img: '/images/prog-woc.jpg'
              }
            ].map((prog, idx) => (
              <div key={idx} className="bg-[#04240c] border border-[#0a4017] hover:border-[#AE955A] transition-colors rounded-lg shadow-2xl overflow-hidden group">
                {/* Image Container */}
                <div className="h-48 w-full bg-gray-800 relative overflow-hidden">
                  {/* The actual image */}
                  <img 
                    src={prog.img} 
                    alt={prog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* A green tint overlay to keep it on-brand */}
                  <div className="absolute inset-0 bg-[#04681F]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                {/* Text Container */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#AE955A] mb-3 uppercase tracking-wide">{prog.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR EMBLEM / LOGO MEANING */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/3 flex justify-center">
             {/* Placeholder for Official Logo */}
             <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-[#AE955A] text-center p-6 font-bold text-gray-400">
               [Insert Official Logo: Map, Eagle, 36 Stars]
             </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-extrabold uppercase text-[#021807] mb-8">The Symbol of Our Movement</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#04681F] uppercase tracking-wider text-sm">The Map Outline</h4>
                <p className="text-gray-700 text-sm mt-1">Serves as the structural foundation, representing national unity and geographic inclusiveness—every state and citizen contained within one outline.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#04681F] uppercase tracking-wider text-sm">The Eagle Symbol</h4>
                <p className="text-gray-700 text-sm mt-1">Positioned centrally, the eagle spreads its wings symbolizing the leadership, courage, and capacity of the Nigerian people.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#04681F] uppercase tracking-wider text-sm">36 Stars Ring</h4>
                <p className="text-gray-700 text-sm mt-1">Representing the 36 states of Nigeria, arranged in a circle to symbolize balance, equality, and collective participation.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#AE955A] uppercase tracking-wider text-sm">Three Gold Stars</h4>
                <p className="text-gray-700 text-sm mt-1">Representing our guiding pillars: Vision, Integrity, and Excellence. Their upward alignment conveys aspiration and progress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#021807] text-gray-400 py-12 px-6 text-center text-sm border-t-4 border-[#04681F]">
        <h2 className="text-xl font-black uppercase text-white tracking-widest mb-2">Capacity Movement</h2>
        <p className="text-[#AE955A] font-bold tracking-widest uppercase text-xs mb-8">Project 2027</p>
        <p className="mb-2 italic">"...for Credible Leadership."</p>
        <p>Headquartered in Kaduna Central, Nigeria.</p>
        
        <div className="mt-12 pt-8 border-t border-[#0a4017] flex justify-center gap-8 text-xs font-bold uppercase tracking-widest">
          <Link href="/admin" className="hover:text-white transition-colors">Admin Portal Login</Link>
          <Link href="/blog" className="hover:text-[#AE955A] transition-colors">Newsroom</Link>
        </div>
      </footer>
    </main>
  );
}