"use client";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f5f7f8] text-[#0d161c]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between">
        <div className="py-6">
          {/* Brand */}
          <div className="px-6 flex items-center gap-3 mb-8">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <span className="text-lg font-bold">AI Counsellor</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            <NavItem icon="dashboard" label="Dashboard" />
            <NavItem icon="school" label="University Search" />
            <ActiveNavItem />
            <NavItem icon="chat_bubble" label="Expert Chat" dot />
            <NavItem icon="person" label="Profile" />
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-6 border-t border-slate-100 space-y-3">
          <NavItem icon="help" label="Help Center" />
          <NavItem icon="settings" label="Settings" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          {/* Stage Tracker */}
          <div className="flex items-center gap-3 text-xs uppercase font-semibold">
            <Stage done label="Profile" />
            <Divider />
            <Stage done label="Discovery" />
            <Divider />
            <Stage active label="Shortlisting" />
            <Divider />
            <Stage label="Execution" />
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            {/* Profile strength */}
            <div className="hidden lg:block text-right">
              <p className="text-xs font-semibold text-slate-500">Profile Strength</p>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "85%" }} />
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-full hover:bg-slate-50">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full" />
              </button>

              <div className="flex items-center gap-2">
                <div
                  className="size-9 rounded-full bg-cover bg-center ring-2 ring-slate-100"
                  style={{
                    backgroundImage:
                      "url(https://lh3.googleusercontent.com/aida-public/AB6AXuALVP31U7R8rPTJ2TvEzXzZt6LNuRJ3VG5T5gQ-bOTfeNHxU_W0fXNAe-lBszRP5h5DZemJSd7dSICwe43w9wWvK5ce_HlAvQ7SvGRdnko62iLzoSV6iHowS5TPfvDYQWPSNayy9Feh-XNNiQuuwIL5vaSaII25Ay9OiueBuWcouTC5PUbvEoPz52llv4ab0HZG3HYwXb4GRwsQfHcJA-VSINM1_5Da2tpTnGFEzXBT2FrDw7U7AeZKu-7LKCGZtMD3pu2sC_0oP6U)",
                  }}
                />
                <span className="text-sm font-semibold">Alex Johnson</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function NavItem({ icon, label, dot }: any) {
  return (
    <a className="flex items-center gap-3 px-6 py-3 text-slate-500 hover:text-primary">
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {dot && <span className="ml-auto size-2 bg-red-500 rounded-full" />}
    </a>
  );
}

function ActiveNavItem() {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-primary/10 border-l-4 border-primary">
      <div className="flex items-center gap-3 text-primary font-semibold">
        <span className="material-symbols-outlined">description</span>
        <span className="text-sm">My Applications</span>
      </div>
      <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-bold">
        STAGE 4
      </span>
    </div>
  );
}

function Stage({ label, done, active }: any) {
  return (
    <div
      className={`flex items-center gap-1 ${
        active ? "text-primary font-bold" : done ? "text-primary" : "text-slate-400"
      }`}
    >
      <span className="material-symbols-outlined text-[16px]">
        {done ? "check_circle" : active ? "adjust" : "circle"}
      </span>
      <span className="hidden md:inline">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="text-slate-300">/</span>;
}
