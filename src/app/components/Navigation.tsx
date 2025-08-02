"use client";

import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "home", path: "/", syntax: "./index" },
    { name: "projects", path: "/projects", syntax: "./projects.get()" },
    { name: "team", path: "/team", syntax: "./team.members[]" },
    { name: "resources", path: "/resources", syntax: "./resources.library()" },
    { name: "workshops", path: "/workshops", syntax: "./workshops.recordings[]" },
    { name: "events", path: "/events", syntax: "./events.upcoming()" },
    { name: "shop", path: "/shop", syntax: "./shop.init() // Coming Soon", disabled: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="font-mono text-lg font-bold">
              <span className="syntax-keyword">class</span>{" "}
              <span className="syntax-function">MechatronicsClub</span>
              <span className="text-[var(--accent-primary)]">{"{"}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <div className="font-mono text-sm bg-[var(--bg-secondary)] rounded-lg px-4 py-2 border border-[var(--border-default)]">
                <span className="syntax-keyword">const</span>{" "}
                <span className="syntax-variable">navigation</span>{" "}
                <span className="text-[var(--text-primary)]">=</span>{" "}
                <span className="text-[var(--accent-primary)]">{"{"}</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            >
              <span className="sr-only">Open main menu</span>
              <div className="font-mono text-lg">
                {isMenuOpen ? "</>" : "</>"}
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden md:block pb-4">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="font-mono text-sm">
                <Link
                  href={item.disabled ? "#" : item.path}
                  className={`block px-6 py-1 hover:bg-[var(--bg-secondary)] rounded transition-colors ${
                    item.disabled 
                      ? "text-[var(--text-muted)] cursor-not-allowed" 
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="syntax-string">"{item.name}"</span>
                  <span className="text-[var(--text-primary)]">:</span>{" "}
                  <span className="syntax-string">"{item.syntax}"</span>
                  {index < navigationItems.length - 1 && (
                    <span className="text-[var(--text-primary)]">,</span>
                  )}
                </Link>
              </div>
            ))}
            <div className="px-6 py-1 font-mono text-sm">
              <span className="text-[var(--accent-primary)]">{"}"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
            <div className="font-mono text-sm px-3 py-2 text-[var(--text-secondary)]">
              <span className="syntax-keyword">const</span>{" "}
              <span className="syntax-variable">navigation</span>{" "}
              <span className="text-[var(--text-primary)]">=</span>{" "}
              <span className="text-[var(--accent-primary)]">{"{"}</span>
            </div>
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.disabled ? "#" : item.path}
                className={`block px-6 py-2 font-mono text-sm transition-colors ${
                  item.disabled 
                    ? "text-[var(--text-muted)] cursor-not-allowed" 
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                }`}
                onClick={() => !item.disabled && setIsMenuOpen(false)}
              >
                <span className="syntax-string">"{item.name}"</span>
                <span className="text-[var(--text-primary)]">:</span>{" "}
                <span className="syntax-string">"{item.syntax}"</span>
                {index < navigationItems.length - 1 && (
                  <span className="text-[var(--text-primary)]">,</span>
                )}
              </Link>
            ))}
            <div className="px-6 py-2 font-mono text-sm">
              <span className="text-[var(--accent-primary)]">{"}"}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 