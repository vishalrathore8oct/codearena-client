import {
  ArrowRight,
  Code2,
  GraduationCap,
  LayoutDashboard,
  TerminalSquare,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full px-6 py-20 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center overflow-hidden bg-transparent">
        <div className="absolute top-1/4 left-1/4 w-120 h-120 bg-primary/20 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-120 h-120 bg-secondary/20 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <div className="z-10 max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-8">
            <TerminalSquare className="w-4 h-4" />
            <span>Master Coding Interviews</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-base-content mb-8 leading-tight">
            A New Way to{" "}
            <span className="text-primary bg-clip-text bg-linear-to-r from-primary to-secondary">
              Learn
            </span>
          </h1>

          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mb-12 leading-relaxed">
            CodeArena is the best platform to help you enhance your skills,
            expand your knowledge, and prepare for technical interviews. Join a
            community of developers shaping the future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
            >
              Create Account <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="btn btn-outline btn-primary btn-lg rounded-full px-8 shadow-sm hover:shadow-primary/20 transition-shadow"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Hero Illustration / Mockup */}
        <div className="relative mt-20 w-full max-w-4xl z-10 px-4">
          <div className="w-full h-64 md:h-96 bg-base-100/80 backdrop-blur-xl border border-base-300 rounded-3xl shadow-2xl p-4 flex flex-col transform hover:-translate-y-2 transition-transform duration-500">
            <div className="flex gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <div className="flex-1 flex gap-4">
              <div className="w-1/4 bg-base-200/70 rounded-xl hidden md:flex flex-col gap-2 p-3 border border-base-300/50">
                <div className="w-full h-8 bg-base-300/50 rounded-lg mb-4"></div>
                <div className="w-full h-4 bg-base-300/50 rounded"></div>
                <div className="w-3/4 h-4 bg-base-300/50 rounded"></div>
                <div className="w-full h-4 bg-base-300/50 rounded"></div>
                <div className="w-5/6 h-4 bg-base-300/50 rounded"></div>
              </div>
              <div className="flex-1 bg-base-200/70 rounded-xl border border-base-300/50 flex flex-col p-6 gap-5">
                <div className="w-1/2 h-8 bg-primary/20 rounded-lg"></div>
                <div className="w-full h-4 bg-base-300/60 rounded"></div>
                <div className="w-5/6 h-4 bg-base-300/60 rounded"></div>
                <div className="w-full h-4 bg-base-300/60 rounded"></div>
                <div className="w-2/3 h-4 bg-base-300/60 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="w-full bg-transparent px-6 py-24 md:py-32 border-t border-gray-200/10 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success/10 text-success mb-2">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-base-content tracking-tight">
              Start Exploring
            </h2>
            <p className="text-lg text-base-content/70 leading-relaxed max-w-lg mx-auto md:mx-0">
              Explore is a well-organized tool that helps you get the most out
              of CodeArena by providing structure to guide your progress towards
              the next step in your programming career.
            </p>
            <div className="pt-4 flex justify-center md:justify-start relative z-20">
              <Link
                to="/login"
                className="btn btn-outline btn-success rounded-full px-8 group shadow-sm hover:shadow-success/20"
              >
                Get Started{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full h-72 md:h-96 flex items-center justify-center mt-24 md:mt-0">
            {/* Stacked Cards Illustration */}
            <div className="absolute w-52 md:w-64 h-64 md:h-80 bg-info/10 backdrop-blur-md border border-info/20 rounded-3xl -rotate-12 -translate-x-6 md:-translate-x-16 shadow-xl transition-transform hover:-translate-x-20 hover:-rotate-12 duration-500"></div>
            <div className="absolute w-52 md:w-64 h-64 md:h-80 bg-success/10 backdrop-blur-md border border-success/20 rounded-3xl -rotate-6 -translate-x-2 md:-translate-x-8 shadow-xl transition-transform hover:-translate-x-10 hover:-rotate-6 duration-500"></div>
            <div className="absolute w-52 md:w-64 h-64 md:h-80 bg-base-100 backdrop-blur-md border border-gray-200/10 rounded-3xl shadow-2xl flex flex-col p-6 gap-4 z-10 transition-transform hover:-translate-y-2 duration-500">
              <div className="w-full h-24 md:h-32 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                <Code2 className="w-8 h-8 md:w-12 md:h-12 text-primary/50" />
              </div>
              <div className="w-3/4 h-5 md:h-6 bg-base-300/80 rounded-lg mt-2"></div>
              <div className="w-full h-3 md:h-4 bg-base-300/50 rounded-lg"></div>
              <div className="w-5/6 h-3 md:h-4 bg-base-300/50 rounded-lg"></div>
              <div className="mt-auto w-1/2 h-6 md:h-8 bg-success/20 rounded-lg self-end"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-transparent px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300 hover:border-primary/50 hover:shadow-primary/10 transition-all group">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">Vast Problem Library</h3>
            <p className="text-base-content/70 leading-relaxed">
              Access hundreds of coding problems across various topics and
              difficulty levels to sharpen your algorithmic skills.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300 hover:border-secondary/50 hover:shadow-secondary/10 transition-all group">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
              <TerminalSquare className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">In-Browser Editor</h3>
            <p className="text-base-content/70 leading-relaxed">
              Write, test, and debug your code directly in our powerful online
              code editor with syntax highlighting.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300 hover:border-accent/50 hover:shadow-accent/10 transition-all group">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">Track Progress</h3>
            <p className="text-base-content/70 leading-relaxed">
              Monitor your learning journey, view solved problems, and measure
              your improvement over time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-transparent py-8 border-t border-gray-200/10 text-center">
        <p className="text-base-content/60 font-medium">
          © {new Date().getFullYear()} CodeArena. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
