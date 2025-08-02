"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "planning" | "in_progress" | "completed" | "on_hold";
  tags: string[];
  lastUpdated: string;
  contributors: string[];
  buildLogs: BuildLog[];
  files: ProjectFile[];
}

interface BuildLog {
  id: string;
  date: string;
  title: string;
  content: string;
  images?: string[];
}

interface ProjectFile {
  id: string;
  name: string;
  type: "schematic" | "cad" | "code" | "documentation";
  url: string;
  size: string;
}

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Mock project data - in real app this would come from database
  const projects: Project[] = [
    {
      id: "1",
      title: "Autonomous Line Following Robot",
      description: "Arduino-based robot that follows lines using IR sensors and PID control algorithm",
      status: "completed",
      tags: ["arduino", "robotics", "sensors", "pid"],
      lastUpdated: "2025-01-10",
      contributors: ["Alex Chen", "Sarah Kim", "Marcus Johnson"],
      buildLogs: [
        {
          id: "1",
          date: "2025-01-10",
          title: "Final testing and calibration",
          content: "Successfully calibrated PID parameters. Robot now follows complex paths with 95% accuracy."
        },
        {
          id: "2", 
          date: "2025-01-05",
          title: "Motor control implementation",
          content: "Implemented PWM motor control and basic line detection algorithm."
        }
      ],
      files: [
        { id: "1", name: "line_follower.ino", type: "code", url: "#", size: "2.3 KB" },
        { id: "2", name: "circuit_diagram.pdf", type: "schematic", url: "#", size: "156 KB" },
        { id: "3", name: "chassis_v2.stl", type: "cad", url: "#", size: "1.2 MB" }
      ]
    },
    {
      id: "2",
      title: "Smart Home IoT Hub",
      description: "Raspberry Pi based central hub for controlling smart home devices with web interface",
      status: "in_progress",
      tags: ["raspberry-pi", "iot", "web-dev", "sensors"],
      lastUpdated: "2025-01-12",
      contributors: ["Emma Rodriguez", "James Liu"],
      buildLogs: [
        {
          id: "1",
          date: "2025-01-12",
          title: "Web interface development",
          content: "Built React dashboard for device control. Working on WebSocket communication."
        }
      ],
      files: [
        { id: "1", name: "hub_controller.py", type: "code", url: "#", size: "4.7 KB" },
        { id: "2", name: "project_overview.md", type: "documentation", url: "#", size: "3.1 KB" }
      ]
    },
    {
      id: "3",
      title: "Computer Vision Object Tracker",
      description: "ML-powered object tracking system using OpenCV and TensorFlow for robotics applications",
      status: "planning",
      tags: ["ml", "computer-vision", "python", "tensorflow"],
      lastUpdated: "2025-01-08",
      contributors: ["David Park", "Lisa Zhang"],
      buildLogs: [],
      files: [
        { id: "1", name: "requirements.txt", type: "code", url: "#", size: "0.5 KB" },
        { id: "2", name: "project_proposal.pdf", type: "documentation", url: "#", size: "245 KB" }
      ]
    }
  ];

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  const statuses = ["planning", "in_progress", "completed", "on_hold"];

  const filteredProjects = projects.filter(project => {
    if (selectedTag && !project.tags.includes(selectedTag)) return false;
    if (selectedStatus && project.status !== selectedStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-[var(--accent-success)]";
      case "in_progress": return "text-[var(--accent-primary)]";
      case "planning": return "text-[var(--accent-warning)]";
      case "on_hold": return "text-[var(--accent-error)]";
      default: return "text-[var(--text-secondary)]";
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "code": return "{ }";
      case "schematic": return "⚡";
      case "cad": return "🔧";
      case "documentation": return "📋";
      default: return "📄";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4">
            <span className="syntax-function">projects</span>.<span className="syntax-function">get</span>()
          </h1>
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            <span className="syntax-comment">// Showcasing our robotics and mechatronics innovations</span>
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-default)]">
            <div className="font-mono text-sm mb-4">
              <span className="syntax-keyword">const</span>{" "}
              <span className="syntax-variable">filters</span>{" "}
              <span className="text-[var(--text-primary)]">=</span>{" "}
              <span className="text-[var(--accent-primary)]">{"{"}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              {/* Tag Filter */}
              <div>
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"tags"</span>:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                      selectedTag === null 
                        ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                        : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    all
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                        selectedTag === tag 
                          ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"status"</span>:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedStatus(null)}
                    className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                      selectedStatus === null 
                        ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                        : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    all
                  </button>
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                        selectedStatus === status 
                          ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {status.replace('_', ' ')}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="card p-6">
              {/* Project Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-mono font-semibold text-[var(--accent-primary)]">
                    {project.title}
                  </h3>
                  <span className={`font-mono text-xs px-2 py-1 rounded ${getStatusColor(project.status)} bg-[var(--bg-tertiary)]`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="font-mono text-xs text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"tags"</span>: [
                </div>
                <div className="flex flex-wrap gap-1 ml-4">
                  {project.tags.map((tag, index) => (
                    <span key={tag} className="font-mono text-xs">
                      <span className="syntax-string">"{tag}"</span>
                      {index < project.tags.length - 1 && <span className="text-[var(--text-secondary)]">, </span>}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)]">]</div>
              </div>

              {/* Contributors */}
              <div className="mb-4">
                <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                  <span className="syntax-comment">// Contributors: {project.contributors.join(", ")}</span>
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)]">
                  <span className="syntax-comment">// Last updated: {project.lastUpdated}</span>
                </div>
              </div>

              {/* Build Logs */}
              {project.buildLogs.length > 0 && (
                <div className="mb-4">
                  <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                    <span className="syntax-function">buildLogs</span>():
                  </div>
                  <div className="space-y-2 ml-4">
                    {project.buildLogs.slice(0, 2).map(log => (
                      <div key={log.id} className="bg-[var(--bg-tertiary)] rounded p-3 border border-[var(--border-subtle)]">
                        <div className="font-mono text-xs text-[var(--text-muted)] mb-1">
                          {log.date}
                        </div>
                        <div className="font-mono text-sm font-medium mb-1">
                          {log.title}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {log.content}
                        </div>
                      </div>
                    ))}
                    {project.buildLogs.length > 2 && (
                      <div className="text-xs text-[var(--text-muted)] font-mono">
                        <span className="syntax-comment">// +{project.buildLogs.length - 2} more entries...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Project Files */}
              {project.files.length > 0 && (
                <div className="mb-4">
                  <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                    <span className="syntax-function">files</span>.[]:
                  </div>
                  <div className="space-y-1 ml-4">
                    {project.files.map(file => (
                      <div key={file.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">{getFileTypeIcon(file.type)}</span>
                          <span className="font-mono text-[var(--accent-highlight)]">{file.name}</span>
                          <span className="text-[var(--text-muted)]">({file.size})</span>
                        </div>
                        <button className="text-[var(--accent-primary)] hover:text-[var(--accent-highlight)] font-mono">
                          ↓
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button className="btn-primary text-xs px-3 py-1">
                  <span className="syntax-function">view</span>()
                </button>
                <button className="btn-secondary text-xs px-3 py-1">
                  <span className="syntax-function">contribute</span>()
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="code-block max-w-md mx-auto">
              <div className="font-mono text-sm">
                <span className="syntax-keyword">if</span> (<span className="syntax-variable">projects</span>.<span className="syntax-function">length</span> <span className="text-[var(--text-primary)]">===</span> <span className="text-[var(--accent-primary)]">0</span>) {"{"}<br/>
                <span className="ml-4 syntax-function">console</span>.<span className="syntax-function">log</span>(<span className="syntax-string">"No projects match your filters"</span>);<br/>
                <span className="ml-4 syntax-function">clearFilters</span>();<br/>
                {"}"}
              </div>
            </div>
          </div>
        )}

        {/* Add Project CTA */}
        <div className="text-center mt-12">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-8 border border-[var(--border-default)]">
            <h3 className="font-mono text-xl mb-4">
              <span className="syntax-function">addProject</span>()
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Have a cool robotics or mechatronics project? Share it with the community!
            </p>
            <button className="btn-primary">
              <span className="syntax-function">submit</span>(<span className="syntax-string">"new-project"</span>)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 