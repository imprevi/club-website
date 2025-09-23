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
  const [serverInfo, setServerInfo] = useState<DiscordServerInfo | null>(null);

  // Team members data - arranged by seniority
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Angelo Sotalbo",
      role: "president",
      title: "Electrical Engineering",
      bio: "Electrical Engineering student and club president, leading our IEEE chapter with expertise in embedded systems and robotics. Specializes in circuit design and analysis, driving innovation in electronic systems and fostering collaborative engineering solutions across diverse project teams.",
      skills: ["embedded-systems", "robotics", "circuit-design", "circuit-analysis", "leadership"],
      avatar: "AS",
      joinDate: "2023-08-15",
      contributions: 45,
      isCore: true
    },
    {
      id: "2",
      name: "Marc Lepe",
      role: "vice_president",
      title: "Computer Engineering",
      bio: "Computer Engineering student with a passion for onboard control systems and the intricate software architectures that power them. Dedicated to bridging the gap between hardware innovation and intelligent software solutions in modern engineering applications.",
      skills: ["embedded-systems", "control-systems", "c++", "microcontrollers", "pcb-design", "real-time-systems"],
      avatar: "ML",
      joinDate: "2024-01-15",
      contributions: 24,
      isCore: true
    },
    {
      id: "3",
      name: "Gabriel Leyva",
      role: "treasurer",
      title: "Electrical Engineering",
      bio: "Electrical Engineering student serving as club treasurer, managing financial operations and budget planning for IEEE projects and initiatives. Committed to ensuring sustainable funding for innovative engineering projects while maintaining fiscal responsibility and transparency.",
      skills: ["electrical-engineering", "financial-management", "budget-planning", "project-coordination"],
      avatar: "GL",
      joinDate: "2024-01-20",
      contributions: 15,
      isCore: true
    },
    {
      id: "4",
      name: "Samuel Gutierrez",
      role: "secretary",
      title: "Mechanical Engineering",
      bio: "Second-year Mechanical Engineering student serving as Secretary and Head of Mechanical Operations. Distinguished by undergraduate research achievements in AM&AM and Defluorination at SDSU MESA, bringing cutting-edge research experience to mechanical design and manufacturing processes.",
      skills: ["mechanical-engineering", "research", "additive-manufacturing", "materials-science", "documentation"],
      avatar: "SG",
      joinDate: "2024-02-01",
      contributions: 20,
      isCore: true
    },
    {
      id: "5",
      name: "Gabriel Martinez",
      role: "research_lead",
      title: "Computer Science",
      bio: "Undergraduate researcher specializing in machine learning applications for autonomous systems and robotics. Passionate about developing intelligent algorithms that enable robots to learn, adapt, and make decisions in complex environments. Currently exploring deep reinforcement learning and computer vision techniques for real-world engineering solutions.",
      skills: ["machine-learning", "python", "tensorflow", "computer-vision", "deep-learning", "research"],
      avatar: "GM",
      joinDate: "2024-02-10",
      contributions: 18,
      isCore: true
    },
    {
      id: "6",
      name: "Timothy de Jesus",
      role: "social_media_manager",
      title: "Computer Engineering",
      bio: "Computer Engineering student managing our social media presence and digital outreach initiatives. Combines technical expertise in robotics and software development with creative communication skills to showcase our IEEE projects and engage with the broader engineering community.",
      skills: ["computer-engineering", "robotics", "software-development", "coding", "social-media", "digital-marketing"],
      avatar: "TJ",
      joinDate: "2024-03-01",
      contributions: 12,
      isCore: true
    }
  ];


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
      case "treasurer": return "text-[var(--accent-warning)]";
      case "secretary": return "text-[var(--accent-secondary)]";
      case "research_lead": return "text-[var(--accent-primary)]";
      case "social_media_manager": return "text-[var(--accent-highlight)]";
      case "technical_lead": return "text-[var(--accent-highlight)]";
      case "project_manager": return "text-[var(--accent-warning)]";
      case "hardware_engineer": return "text-[var(--accent-secondary)]";
      default: return "text-[var(--text-secondary)]";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "president": return "👑";
      case "vice_president": return "";
      case "treasurer": return "💰";
      case "secretary": return "📝";
      case "research_lead": return "🔬";
      case "social_media_manager": return "📱";
      case "technical_lead": return "🚀";
      case "project_manager": return "📋";
      case "hardware_engineer": return "🔧";
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



        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map(member => (
              <div key={member.id} className="bg-[var(--bg-secondary)] rounded-xl p-8 border border-[var(--border-default)] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[var(--accent-primary)]/30">
                {/* Member Header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full flex items-center justify-center font-mono font-bold text-2xl text-white mx-auto mb-4 shadow-lg">
                    {member.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-lg">{getRoleIcon(member.role)}</span>
                    <div className={`text-sm font-semibold ${getRoleColor(member.role)} uppercase tracking-wide`}>
                      {member.role === 'president' ? 'President' :
                       member.role === 'vice_president' ? 'Vice President of Hardware' : 
                       member.role === 'treasurer' ? 'Treasurer' :
                       member.role === 'secretary' ? 'Secretary & Head of Mechanical Operations' :
                       member.role === 'research_lead' ? 'Research Lead' :
                       member.role === 'social_media_manager' ? 'Social Media Manager' :
                       member.role.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="text-[var(--text-secondary)] font-medium">
                    {member.title}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-[var(--text-secondary)] leading-relaxed text-center">
                    {member.bio}
                  </p>
                </div>

                {/* Contact Links */}
                <div className="flex justify-center space-x-3">
                  {member.github && (
                    <button className="btn-primary px-4 py-2 text-sm font-medium">
                      <span className="syntax-function">github</span>()
                    </button>
                  )}
                  {member.linkedin && (
                    <button className="btn-primary px-4 py-2 text-sm font-medium">
                      <span className="syntax-function">linkedin</span>()
                    </button>
                  )}
                  {member.email && (
                    <button className="btn-primary px-4 py-2 text-sm font-medium">
                      <span className="syntax-function">email</span>()
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>


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