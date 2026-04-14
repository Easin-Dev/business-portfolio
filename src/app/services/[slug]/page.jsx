import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/servicesData";
import { ArrowRight, CheckCircle2, ChevronRight, Check, Zap, Star, Shield, Clock } from "lucide-react";

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
    return { title: "Service Not Found | ScaleUp Web" };
  }

  return {
    title: `${service.title} | ScaleUp Web`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} Services | ScaleUp Web`,
      description: service.shortDescription,
      url: `https://www.scaleupweb.xyz/services/${slug}`,
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

  const otherServices = servicesData.filter((s) => s.slug !== slug);

  return (
    <div className="w-full bg-[#050709] min-h-screen text-white overflow-x-hidden">
      {/* ——— Background Decorators ——— */}
      <div className="fixed inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/3" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-24">

        {/* ——— Breadcrumb ——— */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-12">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <ChevronRight size={14} className="text-neutral-600" />
          <Link href="/services" className="hover:text-blue-400 transition-colors duration-200">Services</Link>
          <ChevronRight size={14} className="text-neutral-600" />
          <span className="text-white font-medium">{service.title}</span>
        </nav>

        {/* ——— Hero Section ——— */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-28">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Zap size={12} />
              Premium Service
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              {service.title.split(" ")[0]}{" "}
              <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                {service.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed border-l-4 border-blue-500 pl-5 py-1">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
              >
                Start Project <ArrowRight size={18} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/15 text-white rounded-full font-bold text-base hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Service Media */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] border border-white/10 aspect-video lg:aspect-square flex items-center justify-center bg-black/40">
            {service.image && service.image.endsWith(".mp4") ? (
              <video
                src={service.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : service.image ? (
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-blue-900/20">
                <Star size={64} className="text-blue-500/40" />
              </div>
            )}
            {/* Overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ——— Features / What You Get Section ——— */}
        {service.features && service.features.length > 0 && (
          <section className="mb-28">
            <div className="text-center mb-16">
              <span className="inline-block text-blue-500 font-bold uppercase tracking-widest text-sm mb-3">
                What You Get
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Everything You{" "}
                <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Need
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300 group flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-blue-500/15 rounded-xl flex-shrink-0 group-hover:bg-blue-500/25 transition-colors">
                      <CheckCircle2 className="text-blue-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-neutral-400 text-base leading-relaxed mb-5">
                    {feature.description}
                  </p>
                  {feature.bullets && feature.bullets.length > 0 && (
                    <ul className="mt-auto space-y-2.5 pt-4 border-t border-white/10">
                      {feature.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="text-blue-400 mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-neutral-300 text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ——— Process Section ——— */}
        {service.process && service.process.length > 0 && (
          <section className="mb-28">
            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border border-blue-500/20 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10">
                <div className="text-center mb-14">
                  <span className="inline-block text-blue-500 font-bold uppercase tracking-widest text-sm mb-3">
                    How We Work
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    Our Proven{" "}
                    <span className="italic font-serif text-blue-400">Process</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Connecting Line (desktop) */}
                  <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0" />

                  {service.process.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center px-4">
                      <div className="w-16 h-16 rounded-full bg-[#050709] border-2 border-blue-500 flex items-center justify-center text-xl font-bold text-blue-400 mb-6 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ——— Benefits / Why Choose Us Section ——— */}
        {service.benefits && service.benefits.length > 0 && (
          <section className="mb-28">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              {/* Left */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                <span className="inline-block text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">
                  Why Us
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Why{" "}
                  <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Choose Us?
                  </span>
                </h2>
                <p className="text-neutral-400 mb-8 text-base leading-relaxed">
                  We go beyond just delivering files. We deliver robust solutions built strictly to optimize your business operations and grow your revenue.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors duration-200 group"
                >
                  Let&apos;s discuss your project{" "}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="p-2.5 bg-blue-500/15 rounded-xl flex-shrink-0 mt-0.5">
                      <Check className="text-blue-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5">{benefit.title}</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">{benefit.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ——— Other Services Section ——— */}
        {otherServices.length > 0 && (
          <section className="mb-28">
            <div className="text-center mb-12">
              <span className="inline-block text-blue-500 font-bold uppercase tracking-widest text-sm mb-3">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Other{" "}
                <span className="italic font-serif text-blue-400">Services</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/[0.07] hover:border-blue-500/40 transition-all duration-300"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-neutral-500 line-clamp-2">{s.shortDescription}</p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-neutral-600 flex-shrink-0 ml-4 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ——— Giant CTA ——— */}
        <section className="w-full bg-gradient-to-br from-blue-950/60 via-[#050709] to-indigo-950/40 border border-blue-500/25 rounded-[32px] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              <Shield size={12} />
              Trusted by Growing Businesses
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to scale your{" "}
              <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                business?
              </span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Stop wasting time on solutions that don&apos;t scale. Partner with ScaleUp Web and dominate your market today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black text-base font-bold rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300"
              >
                Start Building Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-10 py-5 bg-transparent border border-white/20 text-white text-base font-bold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                All Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
