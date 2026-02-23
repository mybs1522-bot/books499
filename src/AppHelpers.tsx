import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle, Play, Book, Star, Users, X } from 'lucide-react';
import { Sofa, ChefHat, Bed, Bath, Layers, Map } from 'lucide-react';

export const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const RAW_JOINERS = [
    { name: "Rajesh S.", city: "Mumbai", time: "2 mins ago" },
    { name: "Priya V.", city: "Bangalore", time: "5 mins ago" },
    { name: "Arjun K.", city: "Delhi", time: "8 mins ago" },
    { name: "Sanjana M.", city: "Hyderabad", time: "12 mins ago" }
];

export const CURRICULUM_DATA = [
    {
        id: 'living', title: 'Living Room Design Book', bookNum: 'Book 1', icon: <Sofa size={20} />, color: 'border-orange-500', imageUrl: getDriveUrl('1US-_Ih6QufWcP1DcQCnlgrZmDJjrCSk4'), sections: [
            { name: 'Clearances', items: ['Porch clearances', 'Furniture arrangements', 'Minimum recommended spaces', 'Utilizing space under staircase'] },
            { name: 'Interior Style', items: ['Manipulate interiors with perception', 'Rugs and curtains placement', 'Creating visual interest', 'Decoding interior styles'] },
            { name: 'Layout Logic', items: ['Conversation circle dimensions', 'TV viewing distances', 'Traffic flow optimization', 'Focal point selection'] },
            { name: 'Storage Hacks', items: ['Built-in cabinetry', 'Multi-functional furniture', 'Display vs hidden storage', 'Vertical space utilization'] }
        ]
    },
    {
        id: 'kitchens', title: 'Kitchen Design Book', bookNum: 'Book 2', icon: <ChefHat size={20} />, color: 'border-orange-500', imageUrl: getDriveUrl('1kC6xTO6r7YqpC3bu-RWp-4MDaHSUfBvH'), sections: [
            { name: 'Layouts and Zones', items: ['Kitchen triangle and zoning', 'Future of kitchen design', 'Kitchen layouts with examples', 'Advantages and limitations'] },
            { name: 'Components', items: ['Stove placement clearances', 'Refrigerator types and mistakes', 'Sink types and placement', 'Pantry types and planning'] },
            { name: 'Storage', items: ['Kitchen top & bottom cabinets', 'Corner and hidden storage', 'Kitchen dimensions', 'Breakfast counter'] },
            { name: 'Services', items: ['Electrical points placement', 'Lighting types and zones'] }
        ]
    },
    {
        id: 'bedrooms', title: 'Bedroom Design Book', bookNum: 'Book 3', icon: <Bed size={20} />, color: 'border-blue-500', imageUrl: getDriveUrl('173EljDFnpecv_WKA50ELkZpQcACA0Oc-'), sections: [
            { name: 'Bed', items: ['Bed sizes by room types', 'Principles of Vastu and Feng Shui', 'Common mistakes placing the bed', 'Examples of Dos and Donts'] },
            { name: 'Furniture', items: ['Closets and compartments', 'Walk-in closet designs', 'Television placement', 'Chester drawers & clearances'] },
            { name: 'Circulation', items: ['Circulation inside layouts', 'Furniture placements for APT', 'Bedroom circulation zones', 'Mistakes to avoid'] },
            { name: 'Services', items: ['Electrical points placements', 'HVAC types and best zones', 'Types of Lighting', 'Bedroom placement'] }
        ]
    },
    {
        id: 'toilets', title: 'Washroom Design Book', bookNum: 'Book 4', icon: <Bath size={20} />, color: 'border-teal-500', imageUrl: getDriveUrl('1t68JTpV_GkEVnWnhKbO4I697cqIKMc7i'), sections: [
            { name: 'Components', items: ['Water closet types', 'Vastu & Fen Shui of wares', 'Basin types and placements', 'Bathtubs and showers'] },
            { name: 'Clearances', items: ['Wheelchair accessibility', 'Handicap toilet designs', 'Dimensions and clearances', 'Zoning in a toilet'] },
            { name: 'Services', items: ['Drainage & water supply', 'Electrical zones in a toilet', 'Lighting recommendations', 'Exhaust and ventilation'] },
            { name: 'Tips & Tricks', items: ['Design for small bathrooms', 'Creating visually interesting toilets', 'Creating focal points', 'Color coding in a toilet'] }
        ]
    },
    {
        id: 'study', title: 'Study Design Book', bookNum: 'Book 5', icon: <Layers size={20} />, color: 'border-purple-500', imageUrl: getDriveUrl('1uaRDczoWH9LP9-uaxqlmfakzJkq0ojH5'), sections: [
            { name: 'Ergonomics', items: ['Desk heights and chair types', 'Monitor positioning', 'Cable management hacks', 'Lighting for focus'] },
            { name: 'Video Calls', items: ['Background styling', 'Lighting angles', 'Acoustics for home office', 'Professional aesthetics'] },
            { name: 'Planning', items: ['Zoning for productivity', 'Privacy solutions', 'Built-in library designs', 'Space-saving desks'] },
            { name: 'Services', items: ['Electrical outlet mapping', 'HVAC for closed rooms', 'High-speed internet wiring'] }
        ]
    },
    {
        id: 'exteriors', title: 'Elevations Design Book', bookNum: 'Book 6', icon: <Map size={20} />, color: 'border-green-500', imageUrl: getDriveUrl('1uVmMUAX2_iPJtaF4Qt6UcdozHWQPFHYV'), sections: [
            { name: 'Sunpath', items: ['What is Sunpath', 'How to read Sunpath', 'How to avoid glare', 'Window treatments'] },
            { name: 'Winds', items: ['Windrose diagram', 'Effects of wind on house', 'Promote good ventilation', 'Mistakes in windy areas'] },
            { name: 'Exterior Design', items: ['Slopes and contours', 'Site selection in hilly regions', 'Common construction mistakes', 'Rules and Guidelines'] },
            { name: 'Elevations', items: ['Psychrometric chart', 'Climate responsive architecture', 'Arid/Cold/Temperate design'] }
        ]
    }
];

/* ============================================================
   DESIGN COPY CONSTANTS — Interior Design Books
   ============================================================ */

export const PORTRAIT_IMAGES = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop'
];

export const BOOK_THUMBNAILS = [
    { label: 'Living Room', image: getDriveUrl('1YYJxA6NPSH23Oe3Nal_3QlW_DG0-mqKJ') },
    { label: 'Kitchen', image: getDriveUrl('1AlxdHun9I2AO639g4Q0YJv_BOzb9sbZe') },
    { label: 'Bedroom', image: getDriveUrl('12APuUeW_CUcJxCYDG-R0PhmtwpKmWqs8') },
    { label: 'Washroom', image: getDriveUrl('17CCyJ7HJhtPg3XPS8y9wf7SOG_kVMgf8') },
    { label: 'Study', image: getDriveUrl('1dzA2UnKUd_S37XMjh53ZiuhviZAivH1B') },
    { label: 'Elevations', image: getDriveUrl('1_TGYyThr32ciEl7C7obqHnwq1_WOR8N2') }
];

export const PHASE_DATA = [
    { phase: '01', title: 'Space Planning & Clearances', desc: 'Master traffic flow, furniture placement, and dimensions that feel right', icon: 'target' },
    { phase: '02', title: 'Living Room Mastery', desc: 'Conversation circles, rug rules, and lighting layers', icon: 'sofa' },
    { phase: '03', title: 'Kitchen Engineering', desc: 'The working triangle, cabinet science, and storage optimization', icon: 'chef-hat' },
    { phase: '04', title: 'Bedroom Sanctuary', desc: 'Color psychology, texture layering, and retreat design', icon: 'bed' },
    { phase: '05', title: 'Bathroom Transformation', desc: 'Tile transitions, vanity lighting, and spa-level finishes', icon: 'bath' },
    { phase: '06', title: 'Study & Home Office', desc: 'Ergonomics, video-call backgrounds, and focus design', icon: 'layers' },
    { phase: '07', title: 'Exterior & Elevations', desc: 'Curb appeal, climate-responsive design, and landscape integration', icon: 'map' },
    { phase: '08', title: 'Services & Infrastructure', desc: 'Electrical, HVAC, plumbing, and lighting systems done right', icon: 'zap' },
    { phase: '09', title: 'Style & Finishing Touches', desc: 'Decor layering, color palettes, and the details that elevate everything', icon: 'sparkles' }
];

export const CHOOSE_PATH_DATA = [
    {
        title: 'Redesign Your Own Home',
        description: 'Transform every room in your home using professional design principles. No designer needed.',
        icon: 'Home',
        color: 'from-purple-500/20 to-purple-600/10'
    },
    {
        title: 'Start a Design Practice',
        description: 'Use these frameworks to launch your own interior design consultancy or freelance business.',
        icon: 'Briefcase',
        color: 'from-blue-500/20 to-blue-600/10'
    },
    {
        title: 'Level Up Your Career',
        description: 'Architecture students and junior designers — accelerate your skills with real-world design systems.',
        icon: 'Zap',
        color: 'from-orange-500/20 to-orange-600/10'
    }
];

export const ThisIsForYouPoints = [
    "You're tired of rooms that feel \"off\" but can't figure out why",
    "You want to renovate or build but don't want to pay $10,000+ for a designer",
    "You're an architecture student who wants practical, real-world design knowledge",
    "You believe great design should be accessible to everyone, not just the wealthy"
];

export const PROBLEM_POINTS = [
    { emoji: "😫", text: "Spending weeks on Pinterest boards but your rooms still look wrong when you're done?" },
    { emoji: "💸", text: "Paying $5,000-$15,000 for an interior designer who gives you a mood board and some fabric swatches?" },
    { emoji: "🤷", text: "Buying furniture that looks amazing online but doesn't fit your space or flow?" },
    { emoji: "😤", text: "Watching design shows and wondering why your home never looks like that?" },
];

export const TRANSFORMATION_STORIES = [
    { name: "Rajesh S.", role: "Homeowner", before: "Spent ₹50,000 on furniture that looked beautiful in the store but terrible together in my Mumbai flat.", after: "Redesigned his living room using Book 1's layout rules. Guests now ask if he hired a pro designer.", emoji: "🏠" },
    { name: "Neha K.", role: "Architecture Student", before: "Struggling with clearances and Vastu in university projects.", after: "Aced her final year thesis project with the practical knowledge from Books 4, 5, and 6.", emoji: "🎓" },
    { name: "Amit V.", role: "Real Estate Developer", before: "Losing deals because model flats looked generic and uninspired.", after: "Uses the 6-book system to stage every home. Sales velocity up 60%.", emoji: "📈" },
];

// Counter component
export const Counter = ({ target, duration = 1500 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [target, duration]);
    return <>{count}</>;
};

// Logo component — dark theme, interior design brand
export const Logo = () => (
    <div className="flex flex-col items-center text-center cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
        <span className="font-display font-bold text-lg tracking-tight leading-none text-white whitespace-nowrap">Interior/Exterior Design</span>
        <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500 whitespace-nowrap mt-1">The Complete System</span>
    </div>
);

// Flip Clock Digit component
const FlipDigit = ({ value }: { value: string }) => (
    <div className="flip-digit-wrapper">
        <div className="flip-digit">
            <span>{value}</span>
        </div>
    </div>
);

// CTA Widget — dark theme with orange accent
export const CallToActionWidget = ({ timeLeft, onClick }: { timeLeft: any, onClick: () => void }) => {
    const formatTime = (val: number) => val.toString().padStart(2, '0');
    const h = formatTime(timeLeft.h);
    const m = formatTime(timeLeft.m);
    const s = formatTime(timeLeft.s);
    return (
        <div className="relative py-12 md:py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-[#0d0d0d]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="max-w-2xl mx-auto relative z-10 text-center">
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">Limited Time Offer</p>
                {/* Flip Clock Timer */}
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-6">
                    <div className="flip-clock-group">
                        <div className="flex gap-1">
                            <FlipDigit value={h[0]} />
                            <FlipDigit value={h[1]} />
                        </div>
                        <span className="flip-clock-label">HRS</span>
                    </div>
                    <span className="text-xl md:text-3xl font-bold text-zinc-600 -mt-4">:</span>
                    <div className="flip-clock-group">
                        <div className="flex gap-1">
                            <FlipDigit value={m[0]} />
                            <FlipDigit value={m[1]} />
                        </div>
                        <span className="flip-clock-label">MIN</span>
                    </div>
                    <span className="text-xl md:text-3xl font-bold text-zinc-600 -mt-4">:</span>
                    <div className="flip-clock-group">
                        <div className="flex gap-1">
                            <FlipDigit value={s[0]} />
                            <FlipDigit value={s[1]} />
                        </div>
                        <span className="flip-clock-label">SEC</span>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center justify-center gap-4 md:gap-6">
                        <span className="text-xl md:text-2xl font-display font-medium text-zinc-600 line-through">₹1,999</span>
                        <span className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">₹499</span>
                    </div>
                    <p className="text-orange-400 font-semibold text-sm mt-2">Save 75% — Launch Price</p>
                </div>
                <div className="w-full max-w-md mx-auto">
                    <button onClick={onClick} className="cta-primary w-full text-white px-8 py-4 md:py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 6px 20px -4px rgba(249,115,22,0.5), 0 12px 40px -8px rgba(234,88,12,0.3)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        <span className="text-lg md:text-xl font-display font-bold uppercase tracking-widest relative z-10">Get All 6 Books Now</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
                    <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> 30-Day Guarantee</div>
                    <div className="w-[1px] h-3 bg-zinc-700"></div>
                    <div className="flex items-center gap-1.5"><Zap size={14} className="text-orange-400" /> Instant Download</div>
                    <div className="w-[1px] h-3 bg-zinc-700 hidden sm:block"></div>
                    <div className="hidden sm:flex items-center gap-1.5"><Users size={14} className="text-blue-400" /> Free Updates for Life</div>
                </div>
            </div>
        </div>
    );
};

// CSS Animations string
export const APP_STYLES = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes wiggle { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
  @keyframes softPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
  @keyframes liquidFlow { 0% { transform: translate(-50%, -50%) rotate(0deg); } 50% { transform: translate(-45%, -48%) rotate(180deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes popScale { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(249,115,22,0.3); } 50% { box-shadow: 0 0 40px rgba(249,115,22,0.6); } }
  .animate-pop-scale { animation: popScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .animate-marquee { animation: marquee 40s linear infinite; }
  .animate-liquid-flow { animation: liquidFlow 15s linear infinite; }
  .bg-grid-pattern { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px); }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 3s; }
`;
