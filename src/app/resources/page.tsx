"use client";

import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: "datasheets" | "tutorials" | "tools" | "documentation" | "software" | "hardware";
  type: "pdf" | "link" | "video" | "repository" | "tool" | "course";
  url: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  lastUpdated: string;
  downloads?: number;
  rating?: number;
  author?: string;
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock resources data - in real app this would come from database
  const resources: Resource[] = [
    {
      id: "1",
      title: "Arduino Programming Fundamentals",
      description: "Complete guide to Arduino programming from basics to advanced concepts including interrupts and PWM",
      category: "tutorials",
      type: "pdf",
      url: "#",
      tags: ["arduino", "programming", "microcontroller", "embedded"],
      difficulty: "beginner",
      lastUpdated: "2025-01-10",
      downloads: 247,
      rating: 4.8,
      author: "Club Team"
    },
    {
      id: "2",
      title: "STM32F4 Discovery Board Datasheet",
      description: "Official datasheet and reference manual for STM32F4 microcontroller development board",
      category: "datasheets",
      type: "pdf",
      url: "#",
      tags: ["stm32", "microcontroller", "arm", "cortex-m4"],
      difficulty: "intermediate",
      lastUpdated: "2024-12-15",
      downloads: 89,
      rating: 4.9
    },
    {
      id: "3",
      title: "KiCad PCB Design Tutorial Series",
      description: "Step-by-step video series covering PCB design from schematic capture to manufacturing files",
      category: "tutorials",
      type: "video",
      url: "#",
      tags: ["pcb", "kicad", "electronics", "design"],
      difficulty: "intermediate",
      lastUpdated: "2025-01-05",
      downloads: 156,
      rating: 4.7,
      author: "Sarah Kim"
    },
    {
      id: "4",
      title: "ROS (Robot Operating System) Documentation",
      description: "Comprehensive documentation for ROS including tutorials, API reference, and best practices",
      category: "documentation",
      type: "link",
      url: "#",
      tags: ["ros", "robotics", "linux", "python", "c++"],
      difficulty: "advanced",
      lastUpdated: "2025-01-12",
      rating: 4.9
    },
    {
      id: "5",
      title: "MATLAB Simulink for Control Systems",
      description: "University-level course on control systems design using MATLAB and Simulink",
      category: "software",
      type: "course",
      url: "#",
      tags: ["matlab", "simulink", "control-systems", "modeling"],
      difficulty: "advanced",
      lastUpdated: "2024-11-20",
      rating: 4.6
    },
    {
      id: "6",
      title: "3D Printing Design Guidelines",
      description: "Best practices for designing 3D printable parts for robotics applications",
      category: "tutorials",
      type: "pdf",
      url: "#",
      tags: ["3d-printing", "design", "manufacturing", "prototyping"],
      difficulty: "beginner",
      lastUpdated: "2025-01-08",
      downloads: 203,
      rating: 4.5,
      author: "James Liu"
    },
    {
      id: "7",
      title: "Sensor Fusion Algorithms Repository",
      description: "Open-source implementations of Kalman filters and sensor fusion algorithms in Python",
      category: "software",
      type: "repository",
      url: "#",
      tags: ["sensor-fusion", "kalman-filter", "python", "algorithms"],
      difficulty: "advanced",
      lastUpdated: "2024-12-28",
      rating: 4.8,
      author: "David Park"
    },
    {
      id: "8",
      title: "Oscilloscope Usage Guide",
      description: "Practical guide to using oscilloscopes for debugging electronics and embedded systems",
      category: "hardware",
      type: "pdf",
      url: "#",
      tags: ["oscilloscope", "debugging", "electronics", "testing"],
      difficulty: "beginner",
      lastUpdated: "2024-12-10",
      downloads: 134,
      rating: 4.4
    },
    {
      id: "9",
      title: "Python for Robotics",
      description: "Interactive online course covering Python programming specifically for robotics applications",
      category: "tutorials",
      type: "course",
      url: "#",
      tags: ["python", "robotics", "programming", "opencv"],
      difficulty: "intermediate",
      lastUpdated: "2025-01-01",
      rating: 4.7
    }
  ];

  const categories = ["datasheets", "tutorials", "tools", "documentation", "software", "hardware"];
  const difficulties = ["beginner", "intermediate", "advanced"];
  
  const filteredResources = resources.filter(resource => {
    if (selectedCategory && resource.category !== selectedCategory) return false;
    if (selectedDifficulty && resource.difficulty !== selectedDifficulty) return false;
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "datasheets": return "📋";
      case "tutorials": return "🎓";
      case "tools": return "🔧";
      case "documentation": return "📚";
      case "software": return "💻";
      case "hardware": return "⚡";
      default: return "📄";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return "📄";
      case "link": return "🔗";
      case "video": return "🎥";
      case "repository": return "📁";
      case "tool": return "🛠️";
      case "course": return "🎓";
      default: return "📄";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "text-[var(--accent-success)]";
      case "intermediate": return "text-[var(--accent-warning)]";
      case "advanced": return "text-[var(--accent-error)]";
      default: return "text-[var(--text-secondary)]";
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-[var(--accent-warning)]" : "text-[var(--text-muted)]"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4">
            <span className="syntax-variable">resources</span>.<span className="syntax-function">library</span>()
          </h1>
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            <span className="syntax-comment">// Curated learning materials for mechatronics excellence</span>
          </p>
        </div>

        {/* Resource Stats */}
        <div className="mb-8 bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-default)]">
          <div className="font-mono text-sm mb-4">
            <span className="syntax-keyword">const</span>{" "}
            <span className="syntax-variable">stats</span>{" "}
            <span className="text-[var(--text-primary)]">=</span>{" "}
            <span className="text-[var(--accent-primary)]">{"{"}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-4">
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"total_resources"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-primary)]">
                {resources.length}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"categories"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-success)]">
                {categories.length}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"total_downloads"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-highlight)]">
                {resources.reduce((sum, r) => sum + (r.downloads || 0), 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"avg_rating"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-warning)]">
                {(resources.reduce((sum, r) => sum + (r.rating || 0), 0) / resources.filter(r => r.rating).length).toFixed(1)}
              </div>
            </div>
          </div>
          <div className="font-mono text-sm mt-4">
            <span className="text-[var(--accent-primary)]">{"}"}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-default)]">
            <div className="font-mono text-sm mb-2">
              <span className="syntax-function">search</span>(<span className="syntax-string">""</span>):
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-lg px-4 py-2 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-default)]">
            <div className="font-mono text-sm mb-4">
              <span className="syntax-keyword">const</span>{" "}
              <span className="syntax-variable">filters</span>{" "}
              <span className="text-[var(--text-primary)]">=</span>{" "}
              <span className="text-[var(--accent-primary)]">{"{"}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              {/* Category Filter */}
              <div>
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"category"</span>:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                      selectedCategory === null 
                        ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                        : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    all
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-md font-mono text-xs transition-colors flex items-center space-x-1 ${
                        selectedCategory === category 
                          ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{getCategoryIcon(category)}</span>
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"difficulty"</span>:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDifficulty(null)}
                    className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                      selectedDifficulty === null 
                        ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                        : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    all
                  </button>
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                        selectedDifficulty === difficulty 
                          ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="font-mono text-sm mt-4">
              <span className="text-[var(--accent-primary)]">{"}"}</span>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="card p-6">
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(resource.category)}</span>
                  <span className="text-sm">{getTypeIcon(resource.type)}</span>
                </div>
                <span className={`font-mono text-xs px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)} bg-[var(--bg-tertiary)]`}>
                  {resource.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-mono font-semibold text-[var(--accent-primary)] mb-2">
                {resource.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {resource.description}
              </p>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs font-mono text-[var(--text-muted)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Information */}
              <div className="space-y-2 mb-4">
                {resource.rating && (
                  <div className="flex items-center space-x-2">
                    <div className="flex text-sm">
                      {renderStars(resource.rating)}
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {resource.rating}
                    </span>
                  </div>
                )}
                
                {resource.downloads && (
                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    <span className="syntax-comment">// Downloads: {resource.downloads}</span>
                  </div>
                )}

                {resource.author && (
                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    <span className="syntax-comment">// Author: {resource.author}</span>
                  </div>
                )}

                <div className="font-mono text-xs text-[var(--text-muted)]">
                  <span className="syntax-comment">// Updated: {resource.lastUpdated}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="btn-primary text-xs px-3 py-1 flex-1">
                  <span className="syntax-function">access</span>()
                </button>
                <button className="btn-secondary text-xs px-3 py-1">
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Resources Message */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="code-block max-w-md mx-auto">
              <div className="font-mono text-sm">
                <span className="syntax-keyword">if</span> (<span className="syntax-variable">resources</span>.<span className="syntax-function">length</span> <span className="text-[var(--text-primary)]">===</span> <span className="text-[var(--accent-primary)]">0</span>) {"{"}<br/>
                <span className="ml-4 syntax-function">console</span>.<span className="syntax-function">log</span>(<span className="syntax-string">"No resources match your criteria"</span>);<br/>
                <span className="ml-4 syntax-function">clearFilters</span>();<br/>
                {"}"}
              </div>
            </div>
          </div>
        )}

        {/* Contribute CTA */}
        <div className="text-center mt-12">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-8 border border-[var(--border-default)]">
            <h3 className="font-mono text-xl mb-4">
              <span className="syntax-function">contributeResource</span>()
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Found a great tutorial or created helpful documentation? Share it with the community!
            </p>
            <div className="space-x-4">
              <button className="btn-primary">
                <span className="syntax-function">submit</span>(<span className="syntax-string">"resource"</span>)
              </button>
              <button className="btn-secondary">
                <span className="syntax-function">suggest</span>(<span className="syntax-string">"idea"</span>)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 