"use client";

import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  email?: string;
  avatar: string;
  joinDate: string;
  contributions: number;
  isCore: boolean;
}

export default function TeamPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showOnlyCore, setShowOnlyCore] = useState(false);

  // Mock team data - in real app this would come from database
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alex Chen",
      role: "president",
      title: "Club President & Lead Engineer",
      bio: "Passionate about autonomous systems and machine learning. Leading the club's strategic direction and major robotics initiatives.",
      skills: ["python", "ros", "machine-learning", "leadership", "arduino"],
      github: "alexchen",
      linkedin: "alex-chen-eng",
      email: "alex@mechatronics.club",
      avatar: "AC",
      joinDate: "2023-09-01",
      contributions: 47,
      isCore: true
    },
    {
      id: "2", 
      name: "Sarah Kim",
      role: "vice_president",
      title: "VP of Engineering & PCB Design Lead",
      bio: "Expert in circuit design and embedded systems. Manages technical workshops and mentors new members.",
      skills: ["pcb-design", "embedded-systems", "altium", "c++", "mentoring"],
      github: "sarahkim",
      linkedin: "sarah-kim-ee",
      email: "sarah@mechatronics.club",
      avatar: "SK",
      joinDate: "2023-09-15",
      contributions: 35,
      isCore: true
    },
    {
      id: "3",
      name: "Marcus Johnson",
      role: "technical_lead",
      title: "Software Engineering Lead",
      bio: "Full-stack developer with expertise in robotics software architecture. Leads our software development initiatives.",
      skills: ["react", "node-js", "python", "docker", "git"],
      github: "marcusj",
      email: "marcus@mechatronics.club",
      avatar: "MJ",
      joinDate: "2023-10-01",
      contributions: 52,
      isCore: true
    },
    {
      id: "4",
      name: "Emma Rodriguez",
      role: "project_manager",
      title: "Project Coordinator & IoT Specialist",
      bio: "Organizes project timelines and specializes in IoT and sensor integration for smart systems.",
      skills: ["iot", "project-management", "sensors", "raspberry-pi", "communication"],
      github: "emmarodriguez",
      email: "emma@mechatronics.club",
      avatar: "ER",
      joinDate: "2023-11-12",
      contributions: 28,
      isCore: true
    },
    {
      id: "5",
      name: "James Liu",
      role: "hardware_engineer",
      title: "Mechanical Design Engineer",
      bio: "CAD expert and mechanical systems designer. Focuses on robot chassis and mechanical assemblies.",
      skills: ["solidworks", "3d-printing", "mechanical-design", "manufacturing", "cad"],
      github: "jamesliu",
      avatar: "JL",
      joinDate: "2024-01-20",
      contributions: 19,
      isCore: true
    },
    {
      id: "6",
      name: "David Park",
      role: "research_lead",
      title: "Computer Vision Researcher",
      bio: "PhD student researching computer vision applications in robotics. Leads our AI/ML research initiatives.",
      skills: ["computer-vision", "tensorflow", "opencv", "research", "python"],
      github: "davidpark",
      avatar: "DP",
      joinDate: "2024-02-01",
      contributions: 15,
      isCore: true
    },
    {
      id: "7",
      name: "Lisa Zhang",
      role: "member",
      title: "Software Developer",
      bio: "Computer science student passionate about AI and autonomous systems. Active contributor to software projects.",
      skills: ["python", "javascript", "machine-learning", "databases"],
      github: "lisazhang",
      avatar: "LZ",
      joinDate: "2024-03-15",
      contributions: 12,
      isCore: false
    },
    {
      id: "8",
      name: "Ryan O'Connor",
      role: "member", 
      title: "Electronics Enthusiast",
      bio: "Electrical engineering student focused on power systems and motor control for robotics applications.",
      skills: ["electronics", "motor-control", "power-systems", "testing"],
      avatar: "RO",
      joinDate: "2024-04-10",
      contributions: 8,
      isCore: false
    }
  ];

  const allSkills = Array.from(new Set(teamMembers.flatMap(member => member.skills)));
  
  const filteredMembers = teamMembers.filter(member => {
    if (showOnlyCore && !member.isCore) return false;
    if (selectedSkill && !member.skills.includes(selectedSkill)) return false;
    return true;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "president": return "text-[var(--accent-success)]";
      case "vice_president": return "text-[var(--accent-primary)]";
      case "technical_lead": return "text-[var(--accent-highlight)]";
      case "project_manager": return "text-[var(--accent-warning)]";
      case "hardware_engineer": return "text-[var(--accent-secondary)]";
      case "research_lead": return "text-[var(--accent-primary)]";
      default: return "text-[var(--text-secondary)]";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "president": return "👑";
      case "vice_president": return "⚡";
      case "technical_lead": return "🚀";
      case "project_manager": return "📋";
      case "hardware_engineer": return "🔧";
      case "research_lead": return "🔬";
      default: return "👤";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4">
            <span className="syntax-variable">team</span>.<span className="syntax-function">members</span>[]
          </h1>
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            <span className="syntax-comment">// Meet the minds behind our mechatronics innovations</span>
          </p>
        </div>

        {/* Team Stats */}
        <div className="mb-8 bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-default)]">
          <div className="font-mono text-sm mb-4">
            <span className="syntax-keyword">const</span>{" "}
            <span className="syntax-variable">teamStats</span>{" "}
            <span className="text-[var(--text-primary)]">=</span>{" "}
            <span className="text-[var(--accent-primary)]">{"{"}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-4">
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"total_members"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-primary)]">
                {teamMembers.length}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"core_team"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-success)]">
                {teamMembers.filter(m => m.isCore).length}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"total_contributions"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-highlight)]">
                {teamMembers.reduce((sum, m) => sum + m.contributions, 0)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"skills_count"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-warning)]">
                {allSkills.length}
              </div>
            </div>
          </div>
          <div className="font-mono text-sm mt-4">
            <span className="text-[var(--accent-primary)]">{"}"}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-default)]">
          <div className="font-mono text-sm mb-4">
            <span className="syntax-keyword">const</span>{" "}
            <span className="syntax-variable">filters</span>{" "}
            <span className="text-[var(--text-primary)]">=</span>{" "}
            <span className="text-[var(--accent-primary)]">{"{"}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
            {/* Core Team Filter */}
            <div>
              <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                <span className="syntax-string">"show_core_only"</span>:
              </div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyCore}
                  onChange={(e) => setShowOnlyCore(e.target.checked)}
                  className="rounded bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                />
                <span className="font-mono text-sm text-[var(--text-secondary)]">
                  <span className="syntax-keyword">{showOnlyCore ? "true" : "false"}</span>
                </span>
              </label>
            </div>

            {/* Skills Filter */}
            <div>
              <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                <span className="syntax-string">"filter_by_skill"</span>:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                    selectedSkill === null 
                      ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                      : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  all
                </button>
                {allSkills.slice(0, 8).map(skill => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                      selectedSkill === skill 
                        ? "bg-[var(--accent-primary)] text-[var(--text-primary)]" 
                        : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="font-mono text-sm mt-4">
            <span className="text-[var(--accent-primary)]">{"}"}</span>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <div key={member.id} className="card p-6">
              {/* Member Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center font-mono font-bold text-[var(--text-primary)]">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-mono font-semibold text-[var(--text-primary)] truncate">
                      {member.name}
                    </h3>
                    <span className="text-sm">{getRoleIcon(member.role)}</span>
                  </div>
                  <div className={`font-mono text-xs ${getRoleColor(member.role)} mb-1`}>
                    {member.role.replace('_', ' ')}
                  </div>
                  <div className="font-mono text-xs text-[var(--text-muted)]">
                    {member.title}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <div className="font-mono text-xs text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"skills"</span>: [
                </div>
                <div className="flex flex-wrap gap-1 ml-4">
                  {member.skills.map((skill, index) => (
                    <span key={skill} className="font-mono text-xs">
                      <span className="syntax-string">"{skill}"</span>
                      {index < member.skills.length - 1 && <span className="text-[var(--text-secondary)]">, </span>}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)]">]</div>
              </div>

              {/* Stats */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-mono text-xs text-[var(--text-muted)] mb-1">contributions</div>
                    <div className="text-lg font-bold text-[var(--accent-primary)]">
                      {member.contributions}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[var(--text-muted)] mb-1">member since</div>
                    <div className="text-sm font-mono text-[var(--text-secondary)]">
                      {new Date(member.joinDate).getFullYear()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Links */}
              <div className="flex space-x-2">
                {member.github && (
                  <button className="btn-secondary text-xs px-3 py-1">
                    <span className="syntax-function">github</span>()
                  </button>
                )}
                {member.linkedin && (
                  <button className="btn-secondary text-xs px-3 py-1">
                    <span className="syntax-function">linkedin</span>()
                  </button>
                )}
                {member.email && (
                  <button className="btn-secondary text-xs px-3 py-1">
                    <span className="syntax-function">email</span>()
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Members Message */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="code-block max-w-md mx-auto">
              <div className="font-mono text-sm">
                <span className="syntax-keyword">if</span> (<span className="syntax-variable">filteredMembers</span>.<span className="syntax-function">length</span> <span className="text-[var(--text-primary)]">===</span> <span className="text-[var(--accent-primary)]">0</span>) {"{"}<br/>
                <span className="ml-4 syntax-function">console</span>.<span className="syntax-function">log</span>(<span className="syntax-string">"No members match your filters"</span>);<br/>
                <span className="ml-4 syntax-function">clearFilters</span>();<br/>
                {"}"}
              </div>
            </div>
          </div>
        )}

        {/* Join Team CTA */}
        <div className="text-center mt-12">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-8 border border-[var(--border-default)]">
            <h3 className="font-mono text-xl mb-4">
              <span className="syntax-function">joinTeam</span>()
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Interested in robotics and mechatronics? Join our community of makers and innovators!
            </p>
            <div className="space-x-4">
              <button className="btn-primary">
                <span className="syntax-function">apply</span>(<span className="syntax-string">"member"</span>)
              </button>
              <button className="btn-secondary">
                <span className="syntax-function">learnMore</span>()
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 