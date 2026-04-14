import fs from 'fs';

let content = fs.readFileSync('src/app/component/Navbar.jsx', 'utf8');

// Ensure import exists
if (!content.includes('import { servicesData }')) {
  // Add it after the next/link import or lucide-react import
  content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { servicesData } from "@/data/servicesData";');
  // If the alias @/data does not work we should use relative. Since it's in src/data and Navbar is in src/app/component
  // Relative: ../../../data/servicesData
  content = content.replace('import { servicesData } from "@/data/servicesData";', 'import { servicesData } from "../../../data/servicesData";');
}

// Now replace the ServicesMenu component
const servicesMenuRegex = /function ServicesMenu\(\) \{[\s\S]*?return \([\s\S]*?className="absolute inset-0 w-full h-full"[\s\S]*?<\/AnimatePresence>[\s\S]*?<\/div>\s*<\/div>\s*\);\s*\}/;

const newServicesMenu = \`function ServicesMenu() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="w-[750px] h-auto rounded-2xl bg-white p-8 shadow-2xl text-black grid grid-cols-2 gap-8">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-black">
          Level Up <br /> <span className="text-blue-500">Your Business</span>
        </h2>
        <p className="mt-2 text-neutral-500 text-sm">
          Select a tailored service designed to maximize your modern business success.
        </p>
        <div className="mt-6 space-y-1">
          {servicesData.map((service, index) => (
            <Link
              key={index}
              href={\\\`/services/\\\${service.slug}\\\`}
              onMouseEnter={() => setActiveService(index)}
              className="block p-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-neutral-100"
            >
              <h3 className="font-semibold text-neutral-800">
                {service.title}
              </h3>
              <p className="text-neutral-500 text-xs">{service.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center border border-gray-100 h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {servicesData[activeService]?.image.endsWith('.mp4') ? (
              <video 
                src={servicesData[activeService].image}
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={servicesData[activeService]?.image || ""}
                alt={servicesData[activeService]?.title || ""}
                objectFit="cover"
                layout="fill"
              />
            )}
          </motion.div>
        </AnimatePresence>
        <Link
          href={\\\`/services/\\\${servicesData[activeService]?.slug}\\\`}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black p-3 rounded-full hover:scale-110 transition-transform shadow-lg z-10"
        >
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  );
}\`;

content = content.replace(servicesMenuRegex, newServicesMenu);
fs.writeFileSync('src/app/component/Navbar.jsx', content);
