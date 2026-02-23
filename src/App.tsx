import React, { useState, useEffect, useRef } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { CheckoutPage } from './components/CheckoutPage';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { FAQ_ITEMS, TESTIMONIALS, INDUSTRIES, MODULES, BUSINESS_MODULES, COURSES } from './constants';
import { ChevronDown, ArrowRight, Star, BookOpen, Sparkles, CheckCircle, CheckCircle2, ShieldCheck, Play, Target, TrendingUp, Zap, Users, Video, Cpu, MessageSquare, Layers, RefreshCw, Rocket, Briefcase, User, ShoppingBag, Mic, ArrowDown, X, Clock, DollarSign, Eye, Home, Sofa, ChefHat, Bed, Bath, Map, GraduationCap, Building, Wrench, Hammer, Palette } from 'lucide-react';
import { Course } from './types';
import {
  RAW_JOINERS, Counter, Logo, CallToActionWidget,
  APP_STYLES, getDriveUrl, PORTRAIT_IMAGES, BOOK_THUMBNAILS, PHASE_DATA,
  CHOOSE_PATH_DATA, PROBLEM_POINTS, TRANSFORMATION_STORIES, ThisIsForYouPoints, CURRICULUM_DATA
} from './AppHelpers';

// Icon resolver for string-based icon names
const IconMap: Record<string, any> = { Target, Zap, Video, Cpu, Users, MessageSquare, Sparkles, Layers, Rocket, TrendingUp, RefreshCw, Briefcase, User, ShoppingBag, Home, Sofa, ChefHat, Bed, Bath, Map, GraduationCap, BookOpen, Building, Wrench, Hammer, Palette };
const getIcon = (name: string, size = 20) => {
  const Icon = IconMap[name];
  return Icon ? <Icon size={size} /> : <Zap size={size} />;
};

const App: React.FC = () => {
  // --- ROUTING ---
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // --- LANDING PAGE STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 36, s: 20 });
  const [joiners] = useState(RAW_JOINERS);
  const [currentJoinerIndex, setCurrentJoinerIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeCurriculumBook, setActiveCurriculumBook] = useState(0);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPath]);

  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (3 * 60 * 60 * 1000) + (36 * 60 * 1000) + (20 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);
      setTimeLeft({ h: Math.floor((remaining / (1000 * 60 * 60)) % 24), m: Math.floor((remaining / (1000 * 60)) % 60), s: Math.floor((remaining / 1000) % 60) });
    };
    const t = setInterval(calculateTime, 1000); calculateTime();
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => { setShowToast(true); setTimeout(() => setShowToast(false), 5000); setTimeout(() => setCurrentJoinerIndex((p: number) => (p + 1) % joiners.length), 6000); }, 15000);
    return () => clearInterval(t);
  }, [joiners.length]);

  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // --- CHECKOUT ROUTING ---
  if (currentPath === '/checkout') {
    return <CheckoutPage />;
  }

  const navigateToCheckout = () => {
    window.history.pushState({}, '', '/checkout');
    setCurrentPath('/checkout');
  };
  const openGeneralModal = navigateToCheckout;

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden antialiased selection:bg-orange-500/30">
      <style>{APP_STYLES}</style>

      {/* Social Proof Toast */}
      <div className={`fixed bottom-20 left-4 z-[70] transition-all duration-500 ${showToast ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3 max-w-xs">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={16} className="text-green-400" /></div>
          <div>
            <p className="text-sm font-bold text-white">{joiners[currentJoinerIndex]?.name} from {joiners[currentJoinerIndex]?.city}</p>
            <p className="text-xs text-zinc-400">just purchased • {joiners[currentJoinerIndex]?.time}</p>
          </div>
        </div>
      </div>



      <main>

        {/* ============================================================
           SECTION 1: HERO
           ============================================================ */}
        <section className="relative pt-0 pb-16 md:pb-24 overflow-hidden bg-[#0d0d0d]">
          {/* Orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
            <div className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-orange-500/10 blur-[150px] rounded-full" />
            <div className="absolute top-10 right-1/3 w-[300px] h-[300px] bg-orange-400/8 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto px-5 relative z-10">
            {/* Sticky Top Header */}
            <header className="sticky top-0 z-[60] bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-5 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-center">
                <Logo />
              </div>
            </header>

            <div className="flex flex-col items-center text-center pt-8 md:pt-0">


              {/* Tag */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-zinc-400">50,000+ readers worldwide</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.08] mb-6 text-white tracking-tight">
                Design Interiors/Exteriors Like <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">a Professional</span>
              </h1>

              <p className="text-base md:text-xl text-zinc-400 font-medium mb-8 leading-relaxed max-w-2xl">
                6 comprehensive books. 800+ pages. Every room in your home — from clearances and layouts to lighting and materials. The only design system you'll ever need.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-12">
                <button onClick={openGeneralModal} className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all flex items-center gap-3 group whitespace-nowrap premium-stroke">
                  Start Your Design Journey — ₹499 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>

              {/* Book Thumbnails */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-3xl">
                {BOOK_THUMBNAILS.map((thumb, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-[3/4] bg-zinc-900 border border-zinc-800 group cursor-pointer hover:border-orange-500/50 transition-all hover:scale-105">
                    <img src={thumb.image} alt={thumb.label} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{thumb.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 2: EVERY ROOM CTA
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-zinc-900">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">One system. Every room.</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              Living rooms. Kitchens. Bedrooms. <span className="text-orange-400">All of it.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Six books covering every room in your home — with professional clearances, materials, dimensions, and design principles that actual architects use.
            </p>
            <button onClick={openGeneralModal} className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all inline-flex items-center gap-3 group whitespace-nowrap premium-stroke">
              Start Designing <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </div>
        </section>

        {/* ============================================================
           SECTION 3: PAGE PREVIEW CAROUSEL
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-5 mb-12 text-center">
            <div className="reveal">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">Inside the system</p>
              <h2 className="text-3xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">Take a <span className="text-orange-400">Peek Inside</span></h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto italic font-serif">"I stopped guessing and started designing using these exact pages."</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {/* Top Row — Scrolled Left */}
            <div className="flex gap-3 md:gap-8 animate-scroll-left hover:pause">
              {[
                '/images/page-previews/1_Zirolashope -The Crucial Guide To Residential Space Planning-77.pdf.jpg',
                '/images/page-previews/2_Zirolashope -The Crucial Guide To Residential Space Planning-88.pdf.jpg',
                '/images/page-previews/3_Zirolashope -The Crucial Guide To Residential Space Planning-39.pdf.jpg',
                '/images/page-previews/4_Zirolashope -The Crucial Guide To Residential Space Planning-43.pdf.jpg',
                '/images/page-previews/5_Zirolashope -The Crucial Guide To Residential Space Planning-76.pdf.jpg',
                '/images/page-previews/6_Zirolashope -The Crucial Guide To Residential Space Planning-80.pdf.jpg',
                '/images/page-previews/1_Zirolashope -The Crucial Guide To Residential Space Planning-77.pdf.jpg',
                '/images/page-previews/2_Zirolashope -The Crucial Guide To Residential Space Planning-88.pdf.jpg',
                '/images/page-previews/3_Zirolashope -The Crucial Guide To Residential Space Planning-39.pdf.jpg',
                '/images/page-previews/4_Zirolashope -The Crucial Guide To Residential Space Planning-43.pdf.jpg',
                '/images/page-previews/5_Zirolashope -The Crucial Guide To Residential Space Planning-76.pdf.jpg',
                '/images/page-previews/6_Zirolashope -The Crucial Guide To Residential Space Planning-80.pdf.jpg'
              ].map((img, i) => (
                <div key={i} className="w-[140px] md:w-[400px] shrink-0 aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative group bg-zinc-900">
                  <img src={img} alt="Book Page Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                    <p className="text-white text-[10px] md:text-sm font-medium">Detailed Architectural Guides</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row — Scrolled Right */}
            <div className="flex gap-3 md:gap-8 animate-scroll-right hover:pause">
              {[
                '/images/page-previews/7_Zirolashope -The Crucial Guide To Residential Space Planning-125.pdf.jpg',
                '/images/page-previews/8_Zirolashope -The Crucial Guide To Residential Space Planning-44.pdf.jpg',
                '/images/page-previews/9_Zirolashope -The Crucial Guide To Residential Space Planning-65.pdf.jpg',
                '/images/page-previews/10_Zirolashope -The Crucial Guide To Residential Space Planning-83.pdf.jpg',
                '/images/page-previews/11_Zirolashope -The Crucial Guide To Residential Space Planning-45.pdf.jpg',
                '/images/page-previews/12_Zirolashope -The Crucial Guide To Residential Space Planning-103.pdf.jpg',
                '/images/page-previews/13_Zirolashope -The Crucial Guide To Residential Space Planning-49.pdf.jpg',
                '/images/page-previews/7_Zirolashope -The Crucial Guide To Residential Space Planning-125.pdf.jpg',
                '/images/page-previews/8_Zirolashope -The Crucial Guide To Residential Space Planning-44.pdf.jpg',
                '/images/page-previews/9_Zirolashope -The Crucial Guide To Residential Space Planning-65.pdf.jpg',
                '/images/page-previews/10_Zirolashope -The Crucial Guide To Residential Space Planning-83.pdf.jpg',
                '/images/page-previews/11_Zirolashope -The Crucial Guide To Residential Space Planning-45.pdf.jpg',
                '/images/page-previews/12_Zirolashope -The Crucial Guide To Residential Space Planning-103.pdf.jpg',
                '/images/page-previews/13_Zirolashope -The Crucial Guide To Residential Space Planning-49.pdf.jpg'
              ].map((img, i) => (
                <div key={i} className="w-[140px] md:w-[400px] shrink-0 aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative group bg-zinc-900">
                  <img src={img} alt="Book Page Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                    <p className="text-white text-[10px] md:text-sm font-medium">Professional Clearance Charts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 3: MANIFESTO
           ============================================================ */}
        <section className="py-16 md:py-28 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">The backstory</p>
              <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-8 leading-snug">
                "I spent years watching people waste thousands on bad design decisions."
              </h2>
            </div>
            <div className="reveal space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed">
              <p>As an architect, the most painful thing I see in India is smart people making avoidable mistakes. Buying furniture that doesn't fit our apartment sizes. Ignoring Vastu and clearances. Choosing materials that look amazing in a showroom but fail in the Indian climate.</p>
              <p>Interior designers in India charge ₹50,000 – ₹5,00,000 and give you a mood board. YouTube teaches you global trends, not Indian fundamentals. Pinterest gives you inspiration but zero practical knowledge for our homes.</p>
              <p>So I wrote <strong className="text-white">everything I know</strong> into 6 books. Every clearance, every dimension, every material recommendation — with diagrams, examples, and the <strong className="text-white">"why" behind every design rule.</strong></p>
              <p className="text-white font-semibold text-lg md:text-xl">800+ pages of actionable design knowledge. The system I wish Indian designers had when they started.</p>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 4: OLD VS NEW
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">The Old Way vs. This System</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old Way */}
              <div className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><X size={20} className="text-red-400" /></div>
                  <h3 className="text-xl font-bold text-zinc-300">Without These Books</h3>
                </div>
                <ul className="space-y-4">
                  {['Hire an interior designer: ₹50,000 – ₹5,00,000', 'Buy furniture that doesn\'t fit your space', 'Ignore clearances — rooms feel cramped', 'Follow social media trends that date in 2 years', 'Renovation regret after spending everything'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400"><X size={16} className="text-red-400 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              {/* New Way */}
              <div className="reveal bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><CheckCircle size={20} className="text-orange-400" /></div>
                  <h3 className="text-xl font-bold text-white">With This System</h3>
                </div>
                <ul className="space-y-4">
                  {['Design every room yourself with professional knowledge', 'Know exact clearances before buying a single piece', 'Understand materials, lighting, and Vastu/Feng Shui', 'Create timeless designs based on principles, not trends', 'Save thousands — one-time investment of ₹499'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300"><CheckCircle size={16} className="text-orange-400 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 5: THE WINDOW
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <div className="reveal">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">The opportunity</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Design Knowledge That <span className="text-orange-400">Pays For Itself</span></h2>
              <p className="text-zinc-400 text-base md:text-lg mb-6 leading-relaxed">
                One bad furniture purchase costs more than these books. One ignored clearance rule ruins an entire room layout. The knowledge in these 800+ pages will save you <strong className="text-white">tens of thousands</strong> over every renovation, every new home, every project you ever touch.
              </p>
              <p className="text-zinc-300 text-lg font-medium">This isn't an expense. It's the smartest investment you'll make before picking up a paint swatch.</p>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 6: WHO THIS IS FOR (INDUSTRIES)
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <div className="reveal">
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Who is this for?</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 tracking-tight">Works for <span className="text-orange-400">everyone</span> who touches design</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INDUSTRIES.map((ind, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-orange-500/20 transition-colors">
                    {getIcon(ind.icon, 20)}
                  </div>
                  <span className="text-sm font-semibold text-zinc-300">{ind.label}</span>
                </div>
              ))}
            </div>

            {/* Added CTA 1 */}
            <div className="mt-16 reveal">
              <button onClick={openGeneralModal} className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-all inline-flex items-center gap-3 group shadow-lg shadow-orange-500/20 whitespace-nowrap premium-stroke">
                Get Instant Access <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>


          </div>
        </section>

        {/* ============================================================
           SECTION 7: MORE THAN DECORATION
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">This Isn't About <span className="text-orange-400">Decoration.</span></h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
                These books don't teach you how to pick throw pillows. They teach you the <strong className="text-white">engineering behind great interiors</strong> — clearances, circulation, services, materials, Vastu, Feng Shui, and dimensions that actually work.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: <Target size={24} />, title: '800+ Pages', desc: 'Zero fluff. Every page is actionable design knowledge.' },
                  { icon: <BookOpen size={24} />, title: '6 Focused Books', desc: 'Each room type gets its own dedicated deep-dive.' },
                  { icon: <Sparkles size={24} />, title: 'Pro-Grade', desc: 'The same principles architects charge thousands to apply.' }
                ].map((item, i) => (
                  <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-left">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-400">{item.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 8: CHOOSE YOUR PATH
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Three paths, one system</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Choose Your Path</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CHOOSE_PATH_DATA.map((path, i) => (
                <div key={i} className={`reveal bg-gradient-to-br ${path.color} border border-zinc-800 rounded-2xl p-8 hover:border-orange-500/30 transition-all group`}>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors text-orange-400">
                    {getIcon(path.icon, 24)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{path.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{path.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 9: NO ONE TELLS YOU (PROBLEM POINTS)
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-4xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">Sound Familiar?</h2>
              <p className="text-zinc-500 text-sm">The problems nobody warns you about</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PROBLEM_POINTS.map((point, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4 hover:border-orange-500/20 transition-all">
                  <span className="text-3xl">{point.emoji}</span>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 10: TRANSFORMATION STORIES
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">Before & After</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRANSFORMATION_STORIES.map((story, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                  <span className="text-4xl mb-4 block">{story.emoji}</span>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-white">{story.name}</span>
                    <span className="text-xs text-zinc-500">• {story.role}</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-mono uppercase text-red-400 mb-1">Before</p>
                    <p className="text-zinc-400 text-sm">{story.before}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-green-400 mb-1">After</p>
                    <p className="text-zinc-300 text-sm font-medium">{story.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 11: THE MATH
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Let's Do <span className="text-orange-400">The Math</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-red-400 mb-6 font-mono uppercase tracking-wider">Hiring a Designer</h3>
                <div className="space-y-4">
                  {[
                    ['Interior Designer Fee', '₹50,000 – ₹5,00,000'],
                    ['Furniture Mistakes', '₹20,000 – ₹50,000'],
                    ['Renovation Rework', '₹50,000+'],
                    ['Your Time Wasted', 'Months of back-and-forth']
                  ].map(([label, cost], i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-800">
                      <span className="text-zinc-400 text-sm">{label}</span>
                      <span className="text-zinc-300 text-sm font-medium">{cost}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-red-400 font-bold text-lg">₹1,50,000+</span>
                  </div>
                </div>
              </div>
              <div className="reveal bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-green-400 mb-6 font-mono uppercase tracking-wider">This Book System</h3>
                <div className="space-y-4">
                  {[
                    ['All 6 Design Books (800+ pages)', '₹499'],
                    ['Lifetime Updates', 'Free'],
                    ['Clearance & Dimension Charts', 'Included'],
                    ['Returns in Savings', '10x minimum']
                  ].map(([label, cost], i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                      <span className="text-zinc-300 text-sm">{label}</span>
                      <span className="text-green-400 text-sm font-medium">{cost}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-green-400 font-bold text-lg">₹499 (one-time)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 12: WHY GENERIC FAILS
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">Why YouTube & Pinterest <span className="text-red-400">Fail</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'No System', desc: 'Scattered tips without structure. You watch 50 videos and still don\'t know where to put your sofa.', icon: <MessageSquare size={24} /> },
                { title: 'No Dimensions', desc: 'Nobody tells you the exact clearances. "Leave some space" is not a measurement.', icon: <Target size={24} /> },
                { title: 'No Context', desc: 'Every home has different constraints. Generic rules don\'t always apply without a system.', icon: <Home size={24} /> }
              ].map((card, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 text-red-400">{card.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 13: LIFETIME UPDATES
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <div className="reveal">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 mx-auto text-orange-400"><RefreshCw size={28} /></div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Updated for Life</h2>
              <p className="text-zinc-400 text-base md:text-lg mb-6 leading-relaxed max-w-xl mx-auto">
                Design trends change. Materials evolve. New building codes emerge. When we update the books, you get the new version — <strong className="text-white">free, forever.</strong>
              </p>
              <p className="text-orange-400 font-semibold">One purchase. Lifetime value.</p>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 14: THE 6 BOOKS SHOWCASE
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">What's inside</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">6 Books. Every Room. <span className="text-orange-400">800+ Pages.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((book, i) => (
                <div key={book.id} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all group">
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-800 relative">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">{book.software}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{book.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{book.description}</p>
                    <ul className="space-y-2">
                      {book.learningPoints.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-zinc-500">
                          <CheckCircle2 size={12} className="text-orange-400 mt-0.5 shrink-0" />{point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ============================================================
           SECTION 16: CURRICULUM DEEP DIVE
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">Deep dive</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">What You'll Learn</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {CURRICULUM_DATA.map((book, i) => (
                <button key={book.id} onClick={() => setActiveCurriculumBook(i)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${activeCurriculumBook === i ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-orange-500/30'}`}>
                  {book.icon} {book.bookNum}
                </button>
              ))}
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 aspect-square md:aspect-auto bg-zinc-800">
                  <img src={CURRICULUM_DATA[activeCurriculumBook].imageUrl} alt={CURRICULUM_DATA[activeCurriculumBook].title} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">{CURRICULUM_DATA[activeCurriculumBook].title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CURRICULUM_DATA[activeCurriculumBook].sections.map((section, j) => (
                      <div key={j}>
                        <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3">{section.name}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, k) => (
                            <li key={k} className="flex items-start gap-2 text-sm text-zinc-400">
                              <CheckCircle2 size={12} className="text-zinc-600 mt-1 shrink-0" />{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 16: 9 PHASES (DESIGN PROCESS)
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">The complete journey</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">9 Design Phases</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PHASE_DATA.map((phase, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/20 transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-display font-black text-orange-500/30">{phase.phase}</span>
                    <h3 className="text-sm font-bold text-white">{phase.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 17: USE CASES (BUSINESS_MODULES)
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">What Will You Do <span className="text-orange-400">With This Knowledge?</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSINESS_MODULES.map((mod, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-start gap-5 hover:border-orange-500/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 text-orange-400">
                    {getIcon(mod.icon, 24)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{mod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-scroll Conversion Point */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openGeneralModal} />

        {/* ============================================================
           SECTION 20: TESTIMONIAL SLIDER
           ============================================================ */}
        <section className="py-20 md:py-32 bg-black overflow-hidden">
          <div className="px-5 mb-16 text-center">
            <h2 className="text-3xl md:text-6xl font-display font-bold text-white tracking-tight mb-4">Loved by <span className="text-orange-400">Thousands</span></h2>
            <p className="text-zinc-500 text-lg">Real stories from homeowners and pro designers worldwide.</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Row — Left Scrolling */}
            <div className="flex gap-6 animate-scroll-left hover:pause">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-orange-500 text-orange-500" />)}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-orange-500">{t.name[0]}</div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-green-500" /></p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.role} • {t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row — Right Scrolling */}
            <div className="flex gap-6 animate-scroll-right hover:pause">
              {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-orange-500 text-orange-500" />)}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-orange-500">{t.name[0]}</div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-green-500" /></p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.role} • {t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center reveal">
            <button onClick={openGeneralModal} className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-zinc-100 transition-all inline-flex items-center gap-3 group whitespace-nowrap premium-stroke">
              Join the Community <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>
        </section>

        {/* ============================================================
           SECTION 19: UNFAIR ADVANTAGE
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Your <span className="text-orange-400">Unfair Advantage</span></h2>
              <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
                While everyone else is Googling "how far should a sofa be from the wall" — you'll have 800+ pages of professional-grade design knowledge at your fingertips. Every clearance. Every dimension. Every material. For every room.
              </p>
              {/* P.S. Card */}
              <div className="dramatic-card-container max-w-xl mx-auto text-left">
                <div className="dramatic-inner-container">
                  <div className="dramatic-border-outer">
                    <div className="dramatic-main-card p-6">
                      <p className="text-zinc-800 text-sm leading-relaxed">
                        <strong className="text-zinc-900">P.S.</strong> — Every month we don't update or expand these books, we could charge more. Right now, you're getting all 6 books at the lowest price they'll ever be. Once we add the next update, the price goes up. This is your window.
                      </p>
                    </div>
                  </div>
                  <div className="dramatic-glow-layer-1"></div>
                  <div className="dramatic-glow-layer-2"></div>
                </div>
                <div className="dramatic-overlay-1"></div>
                <div className="dramatic-background-glow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 20: PRICING CTA
           ============================================================ */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openGeneralModal} />

        {/* ============================================================
           SECTION 21: FAQ
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Common Questions</h2>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="reveal group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden" open={openFaqIndex === i}>
                  <summary
                    className="flex items-center justify-between p-5 cursor-pointer list-none"
                    onClick={(e) => { e.preventDefault(); setOpenFaqIndex(openFaqIndex === i ? null : i); }}
                  >
                    <span className="text-sm md:text-base font-semibold text-white pr-6">{faq.question}</span>
                    <ChevronDown size={18} className={`text-zinc-500 transition-transform shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           SECTION 22: FINAL CTA
           ============================================================ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-zinc-900">
          <div className="max-w-2xl mx-auto px-5 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">Ready to Design Your Dream Home?</h2>
              <p className="text-zinc-400 mb-8">Join 50,000+ readers who stopped guessing and started designing.</p>
              <button onClick={openGeneralModal} className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all inline-flex items-center gap-3 group whitespace-nowrap premium-stroke">
                Get All 6 Books <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-black border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Interior Design System. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Modals */}
      {isModalOpen && selectedCourse && <PaymentModal course={selectedCourse} onClose={() => setIsModalOpen(false)} />}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Sticky Bottom Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-5 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Timer on Left */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 font-mono font-bold text-sm">
                <Clock size={16} className="animate-pulse" />
                <span>{timeLeft.h.toString().padStart(2, '0')}:{timeLeft.m.toString().padStart(2, '0')}:{timeLeft.s.toString().padStart(2, '0')}</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-white leading-none mb-1">Limited Time Launch Price</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Offer ends soon</p>
              </div>
            </div>

            {/* Button on Right */}
            <button onClick={openGeneralModal} className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-black text-sm hover:scale-[1.03] transition-all flex items-center gap-2 group whitespace-nowrap shadow-lg shadow-orange-500/20 premium-stroke">
              Get All 6 Books — ₹499 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;