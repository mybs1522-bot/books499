import React, { useState, useEffect } from 'react';
import { Lock, Check, Loader2, Mail, ShieldCheck, AlertCircle, ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Download, Star, Clock, Users, BadgeCheck, User, Phone, Award } from 'lucide-react';
import { openRazorpayCheckout } from '../services/razorpay';

export const CheckoutPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [viewState, setViewState] = useState<'FORM' | 'SUCCESS' | 'ERROR'>('FORM');
    const [errorMessage, setErrorMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState({ h: 1, m: 12, s: 21 });

    // Sliding Testimonials
    const testimonials = [
        { text: "The definitive guide for anyone designing their home. Worth every penny.", author: "Rahul M." },
        { text: "Saved me lakhs in contractor mistakes. Highly recommended!", author: "Priya S." },
        { text: "Beautifully formatted and incredibly practical material.", author: "Amit V." }
    ];
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    useEffect(() => {
        const calculateTime = () => {
            const DURATION = (3 * 60 * 60 * 1000) + (36 * 60 * 1000) + (20 * 1000);
            const now = Date.now();
            const remaining = DURATION - (now % DURATION);
            setTimeLeft({
                h: Math.floor((remaining / (1000 * 60 * 60)) % 24),
                m: Math.floor((remaining / (1000 * 60)) % 60),
                s: Math.floor((remaining / 1000) % 60)
            });
        };
        const t = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(t);
    }, []);

    const handleBack = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.phone || !formData.name) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            await openRazorpayCheckout({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                amount: 499
            });
            setViewState('SUCCESS');
            // Removed auto-redirect to allow users to click the ebook link
        } catch (error: any) {
            console.error('Checkout Error:', error);
            setErrorMessage(error.message || 'Payment cancelled or failed.');
        } finally {
            setIsLoading(false);
        }
    };

    if (viewState === 'SUCCESS') {
        return (
            <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-8 animate-[popScale_0.5s] relative z-10">
                    <Check size={48} className="text-white" strokeWidth={3} />
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4 relative z-10">Payment Successful</h3>
                <p className="text-zinc-400 font-medium text-lg max-w-sm mx-auto relative z-10 mb-8">Securing your access and preparing your dashboard...</p>
                <a href="https://docs.google.com/document/d/1pRBJtlofVRHgOU3vDXGpflp0cXPX58OttsoY4pq-RRg/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-xl shadow-xl hover:scale-105 transition-transform inline-flex relative z-10 mb-4">
                    Access Your Books Now
                </a>
                <p className="text-zinc-500 text-sm max-w-sm mx-auto relative z-10">You will also receive this link in an email from AVADA BOOKS shortly.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-sans text-white antialiased selection:bg-orange-500/30 overflow-x-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full" />
                <div className="absolute top-[30%] left-[-20%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full" />
            </div>

            {/* Header */}
            <header className="relative flex items-center justify-center py-4 px-5 border-b border-zinc-900 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <button
                    onClick={handleBack}
                    title="Go Back"
                    aria-label="Go Back"
                    className="absolute left-4 md:left-8 text-zinc-500 hover:text-white p-2 transition-all hover:scale-105"
                >
                    <ArrowLeft size={20} className="md:w-6 md:h-6" />
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl font-display font-black tracking-tighter uppercase tracking-[0.2em] text-white">AVADA</span>
                </div>
            </header>

            <main className="max-w-5xl mx-auto pt-4 md:pt-16 pb-32 px-4 relative z-10">

                <div className="text-center mb-6 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full mb-6 text-xs font-bold text-orange-400 uppercase tracking-widest shadow-lg shadow-black/50 backdrop-blur-md">
                        <Lock size={12} /> Secure Checkout
                    </div>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.08] text-white tracking-tight mb-4 whitespace-nowrap md:whitespace-normal">
                        Unlock Your <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Design Bundle</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

                    {/* Left Column: Order Summary & Value */}
                    <div className="lg:col-span-5 flex flex-col space-y-4 md:space-y-8 animate-[fadeIn_0.5s_ease-out]">

                        {/* Premium Value Card */}
                        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-[28px] md:rounded-[32px] overflow-hidden p-6 md:p-8 shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-5xl md:text-6xl font-black tracking-tighter text-white">₹499</span>
                                <span className="text-lg md:text-xl text-zinc-600 line-through font-medium">₹1,999</span>
                                <div className="ml-auto bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider border border-green-500/20 shadow-lg shadow-green-500/5">
                                    Save 75%
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-800/50">
                                <h3 className="text-xl md:text-2xl font-display font-black mb-4">You Will Receive</h3>

                                <div className="space-y-3">
                                    {[
                                        { text: "6 Interior + Exterior Design Books", icon: <BookOpen size={14} /> },
                                        { text: "SketchUp-Vray Course", icon: <Award size={14} /> },
                                        { text: "Lead Generation Course", icon: <Users size={14} /> },
                                        { text: "Professional Certificate", icon: <BadgeCheck size={14} /> }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-xs md:text-sm font-medium text-zinc-300">
                                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                                                {item.icon}
                                            </div>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timer Moved Below Order Summary */}
                            <div className="mt-6 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl animate-pulse">
                                <Clock size={16} className="text-red-400" />
                                <span className="text-xs font-bold text-red-400 tracking-wide">
                                    Offer ends in: <span className="text-white ml-1 tracking-normal font-mono">{timeLeft.h.toString().padStart(2, '0')}:{timeLeft.m.toString().padStart(2, '0')}:{timeLeft.s.toString().padStart(2, '0')}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Form */}
                    <div className="lg:col-span-7 lg:sticky lg:top-32">
                        <div className="bg-zinc-900/80 backdrop-blur-2xl rounded-[28px] md:rounded-[40px] shadow-2xl shadow-black/50 border border-zinc-800 p-6 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>

                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                <div className="space-y-5 md:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 pl-1">Full Name</label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Rajesh Kumar"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-[#1A1A1A] border-2 border-zinc-700/80 rounded-xl md:rounded-2xl pl-11 pr-4 py-3.5 md:py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-sm md:text-base shadow-inner shadow-black/20"
                                                />
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 pl-1">Phone (+91)</label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="98765 43210"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-[#1A1A1A] border-2 border-zinc-700/80 rounded-xl md:rounded-2xl pl-11 pr-4 py-3.5 md:py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-sm md:text-base shadow-inner shadow-black/20"
                                                />
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 pl-1">Where to deliver books?</label>
                                        <div className="relative group">
                                            <input
                                                required
                                                type="email"
                                                placeholder="rajesh@example.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-[#1A1A1A] border-2 border-zinc-700/80 rounded-xl md:rounded-2xl pl-11 pr-4 py-3.5 md:py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-sm md:text-base shadow-inner shadow-black/20"
                                            />
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl md:rounded-2xl py-5 md:py-6 font-black text-lg md:text-xl tracking-wide shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:shadow-[0_0_60px_rgba(249,115,22,0.4)] border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale premium-stroke group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>INITIALIZING...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>GET ALL BOOKS NOW</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {errorMessage && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-bold animate-[popScale_0.3s]">
                                        <AlertCircle size={16} />
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Moved Social Proof & Testimonials Below Button */}
                                <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="flex -space-x-2 shrink-0">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#151515] bg-zinc-800 flex items-center justify-center text-[9px] font-bold">JD</div>
                                            <div className="w-8 h-8 rounded-full border-2 border-[#151515] bg-zinc-700 flex items-center justify-center text-[9px] font-bold">AS</div>
                                            <div className="w-8 h-8 rounded-full border-2 border-[#151515] bg-orange-500 flex items-center justify-center text-[9px] font-bold">+23k</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5 text-orange-400">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-orange-400" />)}
                                            </div>
                                            <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">Trusted by 23,000+ designers</span>
                                        </div>
                                    </div>

                                    {/* Sliding Testimonials */}
                                    <div className="h-[72px] md:h-16 relative overflow-hidden bg-white/5 border border-white/5 rounded-xl flex items-center justify-center px-4 md:px-6 shadow-inner">
                                        {testimonials.map((t, idx) => (
                                            <div
                                                key={idx}
                                                className={`absolute w-full px-4 text-center transition-all duration-700 ease-in-out ${idx === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                            >
                                                <p className="text-[11px] md:text-xs text-zinc-300 italic mb-1">"{t.text}"</p>
                                                <p className="text-[9px] md:text-[10px] text-orange-400 font-bold tracking-widest uppercase">— {t.author}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4 pt-2">
                                    {/* Only Razorpay Logo */}
                                    <div className="flex items-center gap-6 opacity-40 grayscale saturate-0 hover:grayscale-0 hover:opacity-100 transition-all">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4 md:h-5 invert" />
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-500/70 text-[9px] font-black uppercase tracking-widest">
                                        <ShieldCheck size={12} />
                                        256-Bit SSL Encrypted Access
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Refund Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-green-500/20 py-3 flex justify-center items-center gap-2 text-center px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <ShieldCheck size={16} className="text-green-400 shrink-0" />
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    No Worries — <span className="text-white ml-1">7-Day Money Back Guarantee</span>
                </span>
            </div>
        </div>
    );
};
