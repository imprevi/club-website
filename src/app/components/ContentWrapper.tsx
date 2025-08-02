"use client";

import React from 'react';
import { useSidebar } from '../contexts/SidebarContext';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  const { isExpanded, isMobile } = useSidebar();

  return (
    <div className={`min-h-screen transform transition-all duration-500 ease-out will-change-transform ${
      isMobile 
        ? '' // No shift on mobile as sidebar is bottom drawer
        : isExpanded 
          ? 'ml-72' // Shift right when sidebar is expanded (264px width + 8px padding)
          : 'ml-6' // Small shift for collapsed sidebar
    }`}>
      {children}
    </div>
  );
};

export default ContentWrapper; 