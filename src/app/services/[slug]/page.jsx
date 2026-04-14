import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/servicesData";
import { ArrowRight, CheckCircle2, ChevronRight, Check } from "lucide-react";

// Generate Static Params for statically building dynamic routes
export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: "Service Not Found | ScaleUp Web",
    };
  }

  return {
    title: `${service.title} | ScaleUp Web`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} Services | ScaleUp Web`,
      description: service.shortDescription,
      url: `https://scaleupweb.com/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full bg-[#050709] min-h-screen text-white pt-24 pb-20 overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8 pt-8">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
          <ChevronRight size={14} />
          <span className="text-white font-medium">{service.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              {service.title.split(' ')[0]} <br/> <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{service.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed border-l-4 border-blue-500 pl-4 py-2">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                Start Project <ArrowRight size={20} />
              </Link>
              <Link href="/pricing" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-white/10 aspect-video lg:aspect-square flex items-center justify-center bg-black/50">
            {service.image.endsWith('.mp4') ? (
              <video 
                src={service.image} 
                autoPlay loop muted playsInline
                className="w-full h-full object-cover scale-[1.02]"
              />
            ) : (
              <Image 
                src={service.image} 
                alt={service.title}
                width={800} height={800}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* What You Get Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-bold uppercase tracking-wider text-sm mb-2 block">Solutions</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">What You <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Get</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {service.features.map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col h-full">
                <CheckCircle2 className="text-blue-500 mb-6 w-10 h-10 group-hover:scale-110 transition-transform flex-shrink-0" />
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 text-base leading-relaxed mb-6">{feature.description}</p>
                {feature.bullets && (
                  <ul className="mt-auto space-y-3 pt-4 border-t border-white/10">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                        <span className="text-neutral-300 text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The Process Section */}
        <div className="mb-32 bg-blue-900/10 border border-blue-500/20 rounded-3xl p-8 lg:p-16 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Our Proven <span className="italic font-serif text-blue-400">Process</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            
            {service.process.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#050709] border-2 border-blue-500 flex items-center justify-center text-xl font-bold text-blue-400 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Why <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Choose us?</span>
              </h2>
              <p className="text-neutral-400 mb-8 text-lg">
                We go beyond just delivering files. We deliver robust solutions built strictly to optimize your business operations and grow your revenue.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                Let's discuss your project <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                    <Check className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                    <p className="text-neutral-400 text-sm">{benefit.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Giant CTA */}
        <div className="mt-32 w-full bg-gradient-to-br from-blue-900 to-[#050709] border border-blue-500/30 rounded-[40px] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to scale your business?</h2>
              <p className="text-xl text-neutral-300 mb-10">Stop wasting time and money on solutions that don't scale. Partner with ScaleUp Web and dominate your market today.</p>
              <Link href="/contact" className="px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all inline-block">
                Start Building Now
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
