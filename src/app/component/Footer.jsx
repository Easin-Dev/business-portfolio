"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Linkedin, Mail, ArrowRight, Phone } from "lucide-react";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <footer className="bg-white text-black border-t border-neutral-200 pt-20 pb-10 rounded-t-[40px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* উপরের অংশ: CTA */}
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Let's build your next big thing.
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-x-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-slate-200 transition-all duration-300 hover:scale-105 hover:bg-purple-600"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
          </div>

          {/* Divider */}
          <div className="my-16 border-t border-neutral-100"></div>

          {/* মাঝখানের অংশ: লিংক */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            {/* Column 1 */}
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[2px] text-slate-400 mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about-us" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    Our Work
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[2px] text-slate-400 mb-6">Services</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/services/website-development" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/digital-marketing" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/services/whatsapp-chatbots" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    WhatsApp Solutions
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[2px] text-slate-400 mb-6">Connect</h3>
              <div className="flex justify-center md:justify-start space-x-5 mt-4">
                <a 
                  href="https://www.facebook.com/scaleupweb1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/scale-up-web/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://wa.me/your-number-here" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-green-600 transition-colors"
                >
                  <Phone size={20} />
                </a>
                <a 
                  href="mailto:contact.scaleupweb@gmail.com" 
                  className="text-slate-400 hover:text-purple-600 transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
              <p className="mt-6 text-xs font-bold text-slate-500">
                contact.scaleupweb@gmail.com
              </p>
            </div>
            {/* Column 4 */}
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[2px] text-slate-400 mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* নিচের অংশ: Copyright */}
          <div className="mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              &copy; {new Date().getFullYear()} ScaleUp Web. All rights reserved.
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Made with ❤️ by Easin Arafat
            </p>
          </div>
        </div>
      </footer>

      {/* UPDATED: Footer-এর নিচে বড় করে এজেন্সির নাম */}
      <div className="w-full bg-white pb-20 lg:pb-40 flex justify-center items-center overflow-hidden px-4">
        <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[150px] xl:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-200 whitespace-nowrap select-none tracking-tighter">
          ScaleUp Web
        </h1>
      </div>
    </>
  );
}