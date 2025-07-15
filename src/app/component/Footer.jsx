"use client";
import React from "react";
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-neutral-200 pt-20 pb-10 rounded-t-[40px] z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* উপরের অংশ: CTA */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Let's build your next big thing.
          </h2>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-x-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105"
          >
            Start a Project <ArrowRight size={20} />
          </a>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-neutral-200"></div>

        {/* মাঝখানের অংশ: লিংক */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg text-black">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-lg text-black">Services</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  Web Design
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  App Design
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  Branding
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-lg text-black">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-neutral-500 hover:text-black">
                <Github />
              </a>
              <a href="#" className="text-neutral-500 hover:text-black">
                <Twitter />
              </a>
              <a href="#" className="text-neutral-500 hover:text-black">
                <Linkedin />
              </a>
            </div>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-lg text-black">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-black">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* নিচের অংশ: Copyright */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} ScaleUp Web. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
