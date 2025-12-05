import useTalentStore from "../hooks/useTalentStore";
import { useState } from "react";

export default function TalentMap() {
    const { talents } = useTalentStore();
    const [hoveredTalent, setHoveredTalent] = useState(null);

    return (
        <div className="min-h-[calc(100vh-80px)] bg-zinc-50 relative overflow-hidden flex flex-col">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="relative z-10 px-6 py-8 flex-none text-center">
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
                    Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ecosystem</span>
                </h1>
                <p className="text-zinc-500 max-w-xl mx-auto">
                    Explore the diverse talents shaping the future. Hover over a creator to discover their unique skills and passions.
                </p>
            </div>

            <div className="flex-1 relative overflow-hidden bg-indigo-50/50 flex items-center justify-center p-4">
                {/* World Map SVG Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                    <svg viewBox="0 0 1000 500" className="w-full h-full text-indigo-200 fill-current">
                        <path d="M841,139c2.8,0.6,5.8-1,6.5-3.8c0.6-2.5-0.8-5.1-3.2-6.1c-2.3-1-5-0.2-6.3,2C837.2,133.2,838.3,137.3,841,139z M214.6,128.1c1.9,1.1,4.3,0.3,5.3-1.6c1-1.9,0.3-4.3-1.6-5.3c-1.9-1-4.3-0.3-5.3,1.6C212,124.7,212.7,127.1,214.6,128.1z M764.1,123.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C760.7,120.9,762,123.1,764.1,123.6z M186.4,116.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C183,113.9,184.3,116.1,186.4,116.6z M686.6,115.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C683.2,112.9,684.5,115.1,686.6,115.6z M263.6,113.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C260.2,110.9,261.5,113.1,263.6,113.6z M726.6,108.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C723.2,105.9,724.5,108.1,726.6,108.6z M303.6,106.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C300.2,103.9,301.5,106.1,303.6,106.6z M646.6,101.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C643.2,98.9,644.5,101.1,646.6,101.6z M343.6,99.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C340.2,96.9,341.5,99.1,343.6,99.6z M606.6,94.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C603.2,91.9,604.5,94.1,606.6,94.6z M383.6,92.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C380.2,89.9,381.5,92.1,383.6,92.6z M566.6,87.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C563.2,84.9,564.5,87.1,566.6,87.6z M423.6,85.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C420.2,82.9,421.5,85.1,423.6,85.6z M526.6,80.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C523.2,77.9,524.5,80.1,526.6,80.6z M463.6,78.6c2.1,0.5,4.3-0.8,4.8-2.9c0.5-2.1-0.8-4.3-2.9-4.8c-2.1-0.5-4.3,0.8-4.8,2.9C460.2,75.9,461.5,78.1,463.6,78.6z" />
                        <path d="M950,250c0,138.1-111.9,250-250,250S450,388.1,450,250S561.9,0,700,0S950,111.9,950,250z" style={{ fill: 'none', stroke: 'none' }} />
                        {/* Simplified World Map Path (Abstract) */}
                        <path d="M158.2,142.9c-3.1-1.3-6.4-1.6-9.7-1.1c-1.8,0.3-3.6,0.9-5.2,1.9c-2.1,1.3-3.7,3.3-4.5,5.6c-0.8,2.3-0.7,4.8,0.3,7.1c1.1,2.3,3,4.2,5.3,5.3c2.3,1.1,4.9,1.3,7.3,0.6c2.4-0.7,4.5-2.3,5.8-4.4c1.3-2.1,1.7-4.7,1.1-7.1C158.1,148.6,158.5,145.7,158.2,142.9z M850,350c-20,0-40-10-50-30s-10-40,0-60s30-30,50-30s40,10,50,30s10,40,0,60S870,350,850,350z" />
                        <rect x="0" y="0" width="1000" height="500" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" opacity="0.2" />
                        {/* Placeholder for actual map shape - using a large abstract shape for demo */}
                        <path d="M50,150 Q150,50 250,150 T450,150 T650,150 T850,150 V350 Q750,450 650,350 T450,350 T250,350 T50,350 Z" fill="currentColor" opacity="0.1" />
                    </svg>
                </div>

                <div className="relative w-full max-w-5xl aspect-[2/1] bg-white/30 backdrop-blur-sm rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
                    {/* Map Image (Using a reliable external placeholder or pattern) */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png"
                        alt="World Map"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
                    />

                    {talents.map((talent) => {
                        const displayName = talent.fullName || talent.name || "Unknown";
                        const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=e0e7ff,fae8ff,ffe4e6`;

                        // Default coordinates if not set (randomized slightly for demo)
                        const x = talent.geo?.x || 50 + (Math.random() * 40 - 20);
                        const y = talent.geo?.y || 50 + (Math.random() * 40 - 20);

                        return (
                            <div
                                key={talent.id}
                                onMouseEnter={() => setHoveredTalent(talent)}
                                onMouseLeave={() => setHoveredTalent(null)}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                style={{ left: `${x}%`, top: `${y}%` }}
                            >
                                {/* Pulsing Location Dot */}
                                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>

                                {/* Avatar Marker */}
                                <div className={`relative w-12 h-12 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${hoveredTalent?.id === talent.id ? 'scale-150 z-50 ring-4 ring-indigo-400' : 'scale-100 bg-white hover:scale-110'}`}>
                                    <img
                                        src={avatarUrl}
                                        alt={displayName}
                                        className="w-full h-full rounded-full object-cover bg-indigo-50"
                                    />
                                    {talent.verified && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>

                                {/* Location Label (Always visible or on hover) */}
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-zinc-900/80 backdrop-blur text-white text-[10px] font-bold rounded-full whitespace-nowrap transition-opacity duration-300 ${hoveredTalent?.id === talent.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    {talent.location || "Unknown Location"}
                                </div>

                                {/* Expanded Tooltip on Hover */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white/95 backdrop-blur-xl border border-white/20 text-zinc-800 rounded-2xl p-5 shadow-2xl pointer-events-none transition-all duration-300 origin-bottom z-50 ${hoveredTalent?.id === talent.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                            {displayName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg leading-tight text-zinc-900">{displayName}</div>
                                            <div className="text-xs text-indigo-600 font-medium">{talent.location || "Remote"}</div>
                                        </div>
                                    </div>

                                    <div className="text-zinc-500 text-sm mb-3 line-clamp-2 italic">
                                        "{talent.passions || "Passionate about creating amazing things."}"
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {(talent.skills || []).slice(0, 4).map((s, i) => (
                                            <span key={i} className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide border border-zinc-200">
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/95"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
