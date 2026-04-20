"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, FileText, ClipboardList, Briefcase, MessageSquare, LogOut, Loader2, Menu, X, FileCheck, FolderKanban, Users, UserCog } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { title: "Agreements", icon: FileCheck, href: "/admin/agreements" },
    { title: "Client Portals", icon: FolderKanban, href: "/admin/client-portals" },
    { title: "Manage Blogs", icon: FileText, href: "/admin/blogs" },
    { title: "Manage Projects", icon: Briefcase, href: "/admin/projects" },
    { title: "Manage Services", icon: ClipboardList, href: "/admin/services" },
    { title: "Leads", icon: MessageSquare, href: "/admin/leads" },
    { title: "Visitors", icon: Users, href: "/admin/visitors" },
    { title: "Account", icon: UserCog, href: "/admin/account" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 rounded-lg text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 px-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent italic font-serif">ScaleUp</h2>
            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-[0.2em] font-bold">Admin Dashboard</p>
          </div>

          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-200 font-semibold" 
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={() => signOut()}
            className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600 w-10 h-10" />
      </div>
    );
  }

  // Allow access to login page without session
  if (pathname === "/admin/login") {
    return children;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-purple-100 selection:text-purple-700">
      <AdminSidebar />
      <div className="lg:ml-64 p-4 md:p-8 min-h-screen">
        <main className="max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
