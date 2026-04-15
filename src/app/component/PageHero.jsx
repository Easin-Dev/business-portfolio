import Link from "next/link";
import { Spotlight } from "./ui/spotlight";

/**
 * PageHero — Shared hero section for all inner pages.
 *
 * Props:
 *  - breadcrumb  : string  — e.g. "Services" | "Pricing" | "About Us"
 *  - title       : string  — plain text first line e.g. "From Code to Commerce,"
 *  - highlight   : string  — gradient + underlined italic line e.g. "Building Your Digital Success"
 *  - subtitle    : string? — optional sub-description below heading
 *  - spotlightColor : string? — hsl color for spotlight (default blue)
 */
export default function PageHero({
  breadcrumb,
  title,
  highlight,
  subtitle,
  spotlightColor = "hsl(220, 80%, 60%)",
}) {
  return (
    <section className="relative w-full min-h-[58vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#050709]">
      {/* Grid BG */}
      <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[180px] bg-indigo-500/8 rounded-full blur-[90px] pointer-events-none" />

      {/* Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={spotlightColor}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

        {/* Breadcrumb pill */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-7">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-medium">{breadcrumb}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
          {title && (
            <>
              {title}
              <br />
            </>
          )}

          {/* Highlighted italic line with blue SVG underline */}
          {highlight && (
            <span className="relative inline-block mt-1">
              <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                {highlight}
              </span>
              {/* Blue curved SVG underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C50 3 100 1 150 4C200 7 250 9 298 5"
                  stroke="url(#heroUnderlineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="heroUnderlineGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="0.5" stopColor="#818cf8" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          )}
        </h1>

        {/* Optional subtitle */}
        {subtitle && (
          <p className="mt-8 text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
