"use client";

import { useState, useEffect } from "react";
import { discordService, DiscordServerInfo } from "../lib/discord";

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
  const [serverInfo, setServerInfo] = useState<DiscordServerInfo | null>(null);

  // Team members - to be loaded from database
  const teamMembers: TeamMember[] = [];

  const allSkills = Array.from(new Set(teamMembers.flatMap(member => member.skills)));
  
  const filteredMembers = teamMembers.filter(member => {
    if (showOnlyCore && !member.isCore) return false;
    if (selectedSkill && !member.skills.includes(selectedSkill)) return false;
    return true;
  });

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const server = await discordService.getServerInfo();
        setServerInfo(server);
      } catch (error) {
        console.error('Failed to fetch Discord server info:', error);
      }
    };

    fetchDiscordData();
  }, []);

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
            <span className="syntax-comment">// Meet the minds behind our IEEE innovations</span>
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
                <span className="syntax-string">"discord_members"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-primary)]">
                {serverInfo?.member_count || 74}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"online_now"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-success)]">
                {serverInfo?.online_count || 8}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"total_contributions"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-highlight)]">
                0
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                <span className="syntax-string">"skills_count"</span>:
              </div>
              <div className="text-2xl font-bold text-[var(--accent-warning)]">
                0
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
                {allSkills.length > 0 && allSkills.slice(0, 8).map(skill => (
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
        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="code-block max-w-md mx-auto">
              <div className="font-mono text-sm">
                <span className="syntax-keyword">if</span> (<span className="syntax-variable">teamMembers</span>.<span className="syntax-function">length</span> <span className="text-[var(--text-primary)]">===</span> <span className="text-[var(--accent-primary)]">0</span>) {"{"}<br/>
                <span className="ml-4 syntax-function">console</span>.<span className="syntax-function">log</span>(<span className="syntax-string">"Team roster coming soon..."</span>);<br/>
                <span className="ml-4 syntax-keyword">return</span> <span className="syntax-string">"Stay tuned!"</span>;<br/>
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
              Interested in robotics and engineering? Join our IEEE community of makers and innovators!
            </p>
            <div className="space-x-4">
              <a
                href={discordService.getInviteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span className="syntax-function">join</span>(<span className="syntax-string">"discord"</span>)
              </a>
              <a
                href="/join"
                className="btn-secondary"
              >
                <span className="syntax-function">learnMore</span>()
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 