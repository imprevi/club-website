"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";
import { useState, useEffect } from "react";
import { authService } from "../lib/auth";
import AuthModal from "./AuthModal";

interface NavigationItem {
  name: string;
  path: string;
  disabled?: boolean;
}

const FloatingSidebar = () => {
  const { isExpanded, setIsExpanded, isMobile } = useSidebar();
  const pathname = usePathname();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const navigationItems: NavigationItem[] = [
    { name: "home", path: "/" },
    { name: "projects", path: "/projects" },
    { name: "team", path: "/team" },
    { name: "resources", path: "/resources" },
    { name: "workshops", path: "/workshops" },
    { name: "discord", path: "/discord" },
    { name: "events", path: "/events", disabled: true },
    { name: "shop", path: "/shop", disabled: true },
    ...(userProfile?.role === 'admin' ? [{ name: "admin", path: "/admin" }] : []),
  ];

  useEffect(() => {
    // Check current user on component mount
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          const profile = await authService.getUserProfile(currentUser.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        try {
          const profile = await authService.getUserProfile(session.user.id);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setIsExpanded(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => pathname === path;
  
  if (isMobile) {
    return (
      <>
        {/* Mobile Bottom Drawer */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out will-change-transform ${
          isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-4rem)]'
        }`}>
          <div className="bg-[var(--nav-bg)] backdrop-blur-md border-t border-[var(--border-default)] rounded-t-2xl">
            {/* Handle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-4 text-left font-mono text-sm focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <span className="syntax-keyword">class</span>{" "}
                <span className="syntax-function">MechatronicsClub</span>
                <span className="text-[var(--accent-primary)]">
                  {isExpanded ? "{" : "{}"}
                </span>
                <div className="w-8 h-1 bg-[var(--border-default)] rounded-full"></div>
              </div>
            </button>

            {/* Expanded Content */}
            <div className={`transform transition-all duration-500 ease-out will-change-transform overflow-hidden ${
              isExpanded ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'
            }`}>
              <div className="px-4 pb-6">
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.disabled ? "#" : item.path}
                      className={`block px-4 py-2 font-mono text-sm transition-all duration-300 ease-out rounded transform will-change-transform ${
                        item.disabled 
                          ? "text-[var(--text-muted)] cursor-not-allowed" 
                          : isActive(item.path)
                          ? "text-[var(--text-primary)] bg-[var(--bg-tertiary)] translate-x-1"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:translate-x-1"
                      }`}
                      onClick={() => !item.disabled && setIsExpanded(false)}
                    >
                      <span className="syntax-string">
                        "{item.name}"
                        {index < navigationItems.length - 1 && <span className="text-[var(--text-primary)]">,</span>}
                        {item.disabled && <span className="text-[var(--text-muted)] ml-2">// Coming Soon</span>}
                      </span>
                    </Link>
                  ))}
                  
                  {/* Auth Section */}
                  <div className="border-t border-[var(--border-default)] pt-2 mt-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 font-mono text-sm text-[var(--text-secondary)]">
                          <span className="syntax-comment">// Welcome, </span>
                          <span className="syntax-variable">{userProfile?.username || user.email}</span>
                          {userProfile?.role === 'admin' && (
                            <span className="text-[var(--accent-primary)] ml-2">[admin]</span>
                          )}
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="block w-full px-4 py-2 font-mono text-sm text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded transition-all duration-300 ease-out"
                        >
                          <span className="syntax-function">signOut</span>
                          <span className="text-[var(--accent-primary)]">()</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="block w-full px-4 py-2 font-mono text-sm text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded transition-all duration-300 ease-out"
                      >
                        <span className="syntax-function">login</span>
                        <span className="text-[var(--accent-primary)]">()</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2 px-4 font-mono text-sm">
                  <span className="text-[var(--accent-primary)]">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return (
    <>
      {/* Desktop Floating Sidebar */}
      <div className={`fixed top-6 left-6 z-50 transform transition-all duration-500 ease-out will-change-transform ${
        isExpanded ? 'w-64' : 'w-auto'
      }`}>
        <div className="bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border-default)] rounded-lg shadow-2xl">
          {/* Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 text-left font-mono text-sm hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transform will-change-transform"
          >
            <div className="transition-all duration-300 ease-out">
              <span className="syntax-keyword">class</span>{" "}
              <span className="syntax-function">MechatronicsClub</span>
              <span className="text-[var(--accent-primary)]">
                {isExpanded ? "" : "{}"}
              </span>
            </div>
            <div className={`transition-all duration-300 ease-out text-[var(--accent-primary)] overflow-hidden ${
              isExpanded ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}>
              {"{"}
            </div>
          </button>

          {/* Expanded Content */}
          <div className={`transform transition-all duration-500 ease-out will-change-transform overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'
          }`}>
            <div className="px-4 pb-4">
              <div className="space-y-1">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.disabled ? "#" : item.path}
                    className={`block px-3 py-2 font-mono text-sm transition-all duration-300 ease-out rounded transform will-change-transform ${
                      item.disabled 
                        ? "text-[var(--text-muted)] cursor-not-allowed"
                        : isActive(item.path)
                        ? "text-[var(--text-primary)] bg-[var(--bg-tertiary)] translate-x-1"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:translate-x-1"
                    }`}
                  >
                    <span className="syntax-string">
                      "{item.name}"
                      {index < navigationItems.length - 1 && <span className="text-[var(--text-primary)]">,</span>}
                      {item.disabled && <span className="text-[var(--text-muted)] ml-2">// Coming Soon</span>}
                    </span>
                  </Link>
                ))}
                
                {/* Auth Section */}
                <div className="border-t border-[var(--border-default)] pt-2 mt-2">
                  {user ? (
                    <>
                      <div className="px-3 py-2 font-mono text-sm text-[var(--text-secondary)]">
                        <span className="syntax-comment">// Welcome, </span>
                        <span className="syntax-variable">{userProfile?.username || user.email}</span>
                        {userProfile?.role === 'admin' && (
                          <span className="text-[var(--accent-primary)] ml-2">[admin]</span>
                        )}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-3 py-2 font-mono text-sm text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:translate-x-1 rounded transition-all duration-300 ease-out transform will-change-transform"
                      >
                        <span className="syntax-function">signOut</span>
                        <span className="text-[var(--accent-primary)]">()</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="block w-full px-3 py-2 font-mono text-sm text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:translate-x-1 rounded transition-all duration-300 ease-out transform will-change-transform"
                    >
                      <span className="syntax-function">login</span>
                      <span className="text-[var(--accent-primary)]">()</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 px-3 font-mono text-sm transition-all duration-300 ease-out">
                <span className="text-[var(--accent-primary)]">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default FloatingSidebar; 