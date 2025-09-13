"use client";

import { useState, useEffect } from "react";
import { discordService, DiscordEvent, DiscordServerInfo } from "./lib/discord";

export default function Home() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [discordEvents, setDiscordEvents] = useState<DiscordEvent[]>([]);
  const [serverInfo, setServerInfo] = useState<DiscordServerInfo | null>(null);

  const commands = [
    "$ cd /ieee-swc-club",
    "$ ls -la",
    "> Initializing awesome robotics projects...",
    "> Loading team.members[]...",
    "> Connecting to Discord events...",
    "> Discord integration active! 🚀",
    "> Welcome to IEEE SWC Club!",
  ];

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    commands.forEach((command, index) => {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, command]);
      }, index * 1000);
      timeouts.push(timeout);
    });

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Fetch Discord data
    const fetchDiscordData = async () => {
      try {
        const [events, server] = await Promise.all([
          discordService.getUpcomingEvents(),
          discordService.getServerInfo()
        ]);
        setDiscordEvents(events);
        setServerInfo(server);
      } catch (error) {
        console.error('Failed to fetch Discord data:', error);
      }
    };

    fetchDiscordData();

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, []);

  const quickStats = [
    { label: "members", value: "74", type: "number" },
    { label: "projects", value: "12", type: "number" },
    { label: "repositories", value: "12", type: "number" },
    { label: "events_this_month", value: "4", type: "number" },
  ];

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      {/* Hero Section with Terminal */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Terminal */}
            <div className="order-2 lg:order-1">
              <div className="terminal">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-default)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[var(--accent-error)] rounded-full"></div>
                    <div className="w-3 h-3 bg-[var(--accent-warning)] rounded-full"></div>
                    <div className="w-3 h-3 bg-[var(--accent-success)] rounded-full"></div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">ieee-swc@club:~</div>
                </div>
                <div className="space-y-2">
                  {terminalLines.map((line, index) => (
                    <div key={index} className="font-mono text-sm">
                      {line.startsWith('$') ? (
                        <span className="text-[var(--accent-primary)]">{line}</span>
                      ) : line.startsWith('>') ? (
                        <span className="text-[var(--accent-success)]">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </div>
                  ))}
                  <div className="font-mono text-sm">
                    <span className="text-[var(--accent-primary)]">$ </span>
                    <span>{currentCommand}</span>
                    {showCursor && <span className="text-[var(--accent-primary)]">|</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Welcome Message */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  IEEE SWC Club
                </h1>
                <div className="font-mono text-lg text-[var(--text-secondary)] mb-6">
                  <span className="syntax-comment">// Building the future through</span><br/>
                  <span className="syntax-comment">// robotics & machine learning</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Join our community of makers, coders, and engineers as we explore the cutting edge 
                  of robotics, AI, and engineering innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/join"
                  className="btn-primary"
                >
                  <span className="syntax-function">join</span>()<span className="syntax-comment"> // Join the club</span>
                </a>
                <a
                  href="/team"
                  className="btn-secondary"
                >
                  <span className="syntax-function">meetTeam</span>()<span className="syntax-comment"> // Meet the team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-mono font-bold mb-4">
              <span className="syntax-variable">stats</span>{" "}
              <span className="text-[var(--text-primary)]">=</span>{" "}
              <span className="text-[var(--accent-primary)]">{"{"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={stat.label} className="card p-6 text-center">
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                  <span className="syntax-string">"{stat.label}"</span>:
                </div>
                <div className="text-2xl font-bold font-mono">
                  {stat.type === "string" ? (
                    <span className="syntax-string">
                      "{stat.value}"
                    </span>
                  ) : (
                    <span className="text-[var(--accent-primary)]">{stat.value}</span>
                  )}
                </div>
                {index < quickStats.length - 1 && (
                  <div className="text-[var(--text-secondary)] mt-2">,</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="font-mono text-lg">
              <span className="text-[var(--accent-primary)]">{"}"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discord Integration & Events Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-mono font-bold mb-4">
              <span className="syntax-keyword">discord</span>
              <span className="text-[var(--accent-primary)]">.</span>
              <span className="syntax-function">community</span>()
            </h2>
            <p className="text-[var(--text-secondary)] font-mono text-sm">
              <span className="syntax-comment">// Real-time activity and upcoming events</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Discord Invite Card */}
            <div>
              <div className="card p-8 h-96 flex flex-col justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                      {serverInfo?.icon ? (
                        <img 
                          src={serverInfo.icon} 
                          alt="Discord Server Icon" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Failed to load Discord icon:', serverInfo.icon);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">DC</span>
                      )}

                    </div>
                    <h3 className="text-xl font-mono font-semibold mb-2">
                      Join Our Discord Community
                    </h3>
                    <p className="text-[var(--text-secondary)] font-mono text-sm mb-6">
                      <span className="syntax-comment">// Connect with fellow IEEE members</span>
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-[var(--accent-success)]">
                        {serverInfo?.online_count || 8}
                      </div>
                      <div className="text-[var(--text-secondary)]">Online Now</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-[var(--accent-primary)]">
                        {serverInfo?.member_count || 74}
                      </div>
                      <div className="text-[var(--text-secondary)]">Total Members</div>
                    </div>
                  </div>
                  
                  <a
                    href={discordService.getInviteUrl()}
            target="_blank"
            rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[var(--accent-primary)] text-white font-mono font-semibold rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors"
                  >
                    <span className="syntax-function">join</span>
                    <span className="text-[var(--accent-secondary)]">()</span>
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Events Section */}
            <div>
              <div className="card p-6 h-96">
                <h3 className="text-xl font-mono font-semibold mb-4">
                  <span className="syntax-function">events</span>.<span className="syntax-function">upcoming</span>()
                </h3>
                
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {discordEvents.length === 0 ? (
                    <div className="text-center text-[var(--text-muted)] py-8">
                      <span className="font-mono text-sm">Loading events...</span>
                    </div>
                  ) : (
                    discordEvents.map((event, index) => {
                      const eventDate = formatEventDate(event.scheduled_start_time);
                      return (
                        <div key={event.id} className="border-l-4 border-[var(--accent-primary)] pl-4 py-3">
                          <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                            <span className="syntax-comment">// Event {index + 1}</span>
                          </div>
                          <h4 className="font-mono text-lg font-semibold mb-2 text-[var(--accent-primary)]">
                            {event.name}
                          </h4>
                          <p className="text-sm text-[var(--text-secondary)] mb-2">
                            {event.description}
                          </p>
                          <div className="space-y-1 font-mono text-sm">
                            <div>
                              <span className="syntax-keyword">date</span>: <span className="syntax-string">"{eventDate.date}"</span>
                            </div>
                            <div>
                              <span className="syntax-keyword">time</span>: <span className="syntax-string">"{eventDate.time}"</span>
                            </div>
                            <div>
                              <span className="syntax-keyword">interested</span>: <span className="text-[var(--accent-primary)]">{event.user_count}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a 
              href="/join" 
              className="bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] px-6 py-3 rounded-lg font-mono hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
            >
              <span className="syntax-function">joinCommunity</span>()<span className="syntax-comment"> // Full community access</span>
            </a>
          </div>
        </div>
      </section>

      {/* What We Do - Projects & Learning */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-mono font-bold mb-4">
              <span className="syntax-keyword">what</span>
              <span className="text-[var(--accent-primary)]">.</span>
              <span className="syntax-function">weDo</span>()
            </h2>
            <p className="text-[var(--text-secondary)] font-mono text-sm">
              <span className="syntax-comment">// Hands-on projects, workshops, and learning resources</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Projects */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h3 className="text-xl font-mono font-semibold">
                  <span className="syntax-function">projects</span>()
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Build autonomous robots, IoT systems, and computer vision applications with hands-on engineering projects.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-primary)]">→</span> Autonomous Line Following Robot
                </div>
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-primary)]">→</span> Smart Home IoT Hub
                </div>
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-primary)]">→</span> Computer Vision Object Tracker
                </div>
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                <span className="syntax-comment">// 12+ active projects</span>
              </div>
            </div>

            {/* Workshops */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🎓</span>
                <h3 className="text-xl font-mono font-semibold">
                  <span className="syntax-function">workshops</span>()
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Interactive learning sessions covering Arduino programming, PCB design, and computer vision fundamentals.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-success)]">✓</span> Arduino Programming Basics
                </div>
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-success)]">✓</span> PCB Design with KiCad
                </div>
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-success)]">✓</span> Computer Vision with OpenCV
                </div>
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                <span className="syntax-comment">// 65+ total attendees</span>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📚</span>
                <h3 className="text-xl font-mono font-semibold">
                  <span className="syntax-function">resources</span>()
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Curated tutorials, datasheets, and tools for robotics and engineering excellence.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-highlight)]">📋</span> Arduino & STM32 Datasheets
                </div>
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-highlight)]">🎥</span> Video Tutorials & Courses
                </div>
                <div className="text-sm">
                  <span className="font-mono text-[var(--accent-highlight)]">💻</span> Software & Development Tools
                </div>
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                <span className="syntax-comment">// 9 categories, 4.7★ avg rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="code-block mb-8">
            <div className="font-mono text-sm">
              <span className="syntax-keyword">if</span> (<span className="syntax-variable">interested</span> <span className="text-[var(--text-primary)]">===</span> <span className="syntax-keyword">true</span>) {"{"}<br/>
              <span className="ml-4 syntax-function">join</span>(<span className="syntax-string">"ieee-swc-club"</span>);<br/>
              <span className="ml-4 syntax-function">build</span>(<span className="syntax-string">"amazing-robots"</span>);<br/>
              <span className="ml-4 syntax-function">learn</span>(<span className="syntax-string">"cutting-edge-tech"</span>);<br/>
              {"}"}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-mono font-bold">
              Ready to start your IEEE journey?
            </h2>
            <p className="text-[var(--text-secondary)]">
              Join our Discord community and get involved in exciting projects!
            </p>
            <a 
              href="/join"
              className="btn-primary text-lg px-8 py-4 inline-block"
          >
              <span className="syntax-function">join</span>.<span className="syntax-function">community</span>()
          </a>
          </div>
        </div>
      </section>
    </div>
  );
}
