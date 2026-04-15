"use client";
import React, { useMemo, memo } from "react";
import DottedMap from "dotted-map";

const WorldMapSection = memo(() => {
    const locations = [
        {
            lat: 23.8103,
            lng: 90.4125,
            title: "Bangladesh",
            address: "Jhalokathi, Barisal, Bangladesh",
            phone: "+8801645650504",
        },
    ];

    const { svgMap } = useMemo(() => {
        const map = new DottedMap({ height: 100, grid: "diagonal" });
        const svgMapData = map.getSVG({
            radius: 0.22,
            color: "#4C4C4C",
            shape: "circle",
            backgroundColor: "transparent",
        });
        return { svgMap: svgMapData };
    }, []);

    const projectPoint = (lat, lng) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    return (
        <div className="w-full bg-[#050709] py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <span className="inline-block border border-blue-400 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                    Connect Now
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl text-white">
                    <span className="font-bold">  Get In Touch Now For Business Or</span>
                    <br />
                    <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Career Opportunities!
                    </span>
                </h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div>
                        <p className="font-semibold text-neutral-300">Project Inquiries? Let's Team Up</p>
                        <a href="mailto:contact.scaleupweb@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors break-all">
                            contact.scaleupweb@gmail.com
                        </a>
                    </div>
                    <div>
                        <p className="font-semibold text-neutral-300">Be a Monk! Be a Part of the Leading Team!</p>
                        <a href="mailto:mdeasinarafat016456@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors break-all">
                            career@scaleupweb.co
                        </a>
                    </div>
                </div>
                <div className="mt-12 w-full aspect-[2/1] rounded-lg relative font-sans">
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
                        alt="world map"
                        draggable={false}
                    />
                    <svg
                        viewBox="0 0 800 400"
                        className="w-full h-full absolute inset-0 pointer-events-none select-none"
                    >
                        {locations.map((loc, i) => {
                            const point = projectPoint(loc.lat, loc.lng);
                            return (
                                <g key={`marker-group-${i}`} className="group">
                                    <circle cx={point.x} cy={point.y} r="8" fill="rgba(168, 85, 247, 0.2)" />
                                    <circle cx={point.x} cy={point.y} r="4" fill="rgba(168, 85, 247, 0.5)" />
                                    <circle cx={point.x} cy={point.y} r="2" fill="rgb(168, 85, 247)" />
                                    <foreignObject x={point.x - 128} y={point.y + 20} width="256" height="150" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/50 p-4 rounded-lg shadow-lg text-left">
                                            <h3 className="text-base font-bold text-white">{loc.title}</h3>
                                            <p className="text-neutral-300 text-xs mt-1">{loc.address}</p>
                                            <p className="text-purple-400 text-xs mt-2">{loc.phone}</p>
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
});

WorldMapSection.displayName = 'WorldMapSection';

export default WorldMapSection;
