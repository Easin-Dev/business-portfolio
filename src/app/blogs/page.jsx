import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import { Spotlight } from "../component/ui/spotlight";

export default function blogs() {
    return (
        <div className="w-full bg-black text-white">
            <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 pb-10">
                <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="hsl(200, 80%, 50%)"
                />
                <Spotlight
                    className="top-20 right-full"
                    fill="hsl(330, 80%, 50%)"
                />
                <BackgroundGradient containerClassName="hidden lg:block absolute top-20 -left-24 w-96 z-10 transform -rotate-[15deg]">
                    <img
                        src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif"
                        alt="Project Mockup 1"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </BackgroundGradient>
                <BackgroundGradient containerClassName="hidden lg:block absolute bottom-20 -right-24 w-96 z-10 transform rotate-[15deg]">
                    <img
                        src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif"
                        alt="Project Mockup 2"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </BackgroundGradient>

                <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            ScaleUp Web
                        </span>
                    </h2>
                    <div className="text-neutral-300 mb-4 text-sm">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">About Us</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mt-2">
                        The Story Behind The Code,
                        <br />
                        <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            The Team Behind The Success
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}