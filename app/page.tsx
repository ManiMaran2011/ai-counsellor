"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <div className="size-8">
              <svg fill="currentColor" viewBox="0 0 48 48">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-charcoal">
              AI Counsellor
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <span className="nav-link">Find Universities</span>
            <span className="nav-link">Destinations</span>
            <span className="nav-link">Services</span>
          </nav>

          <div className="flex items-center gap-6">
            <button
              className="nav-link"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              onClick={() => router.push("/onboarding/step1")}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOKTPFYCRWc2g1n1g-1q31Dc5HdNYUtDR3GBzpFS6Ii0QkleyLVc39VFW0zhJIAwLeOC-0NfZI8YAVoE-knXXW95R5OJmUjzOVdbp3KP09FK6MasDdqQe9B6Jye32j0Q_xJrA3YEzQKRk0bvleoe5D8Z5vvzLyaYyFrt3gVyI0JRcpt84UtUn5EeHk3LWBkzpJhNOMLSIQx7MQ4mMiN29K6SpVRPMptFxaJUw7LJF-Q6P9tm96Es4bdg_vW4YhbrUEndQz5GUjNOY"
            className="w-full h-full object-cover"
            alt="University Campus"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-soft-blue text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wide">
              STUDY ABROAD SIMPLIFIED
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-charcoal leading-[1.1] mb-8">
              Your Global Education{" "}
              <span className="text-primary">Journey</span> Starts Here
            </h1>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              AI-powered guidance to help you find and apply to your dream
              universities abroad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/onboarding/step1")}
                className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-white text-charcoal border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                View Universities
              </button>
            </div>

            <p className="mt-12 text-sm text-slate-500">
              <span className="font-bold text-charcoal">10,000+</span> students
              already started
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-charcoal rounded-[3rem] p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to take the first step?
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Join thousands of students securing global admissions.
            </p>
            <button
              onClick={() => router.push("/onboarding/step1")}
              className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


          




