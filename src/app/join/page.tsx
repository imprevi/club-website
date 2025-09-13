"use client";

import { useState, useEffect } from "react";
import { discordService, DiscordEvent, DiscordServerInfo } from "../lib/discord";

export default function DiscordPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<DiscordEvent[]>([]);
  const [serverInfo, setServerInfo] = useState<DiscordServerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [events, server] = await Promise.all([
          discordService.getUpcomingEvents(),
          discordService.getServerInfo()
        ]);
        setUpcomingEvents(events);
        setServerInfo(server);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch Discord data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4">
            <span className="syntax-keyword">join</span>
            <span className="text-[var(--accent-primary)]">.</span>
            <span className="syntax-function">community</span>
            <span className="text-[var(--accent-primary)]">()</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            <span className="syntax-comment">// Connect with IEEE SWC Club and start building</span>
          </p>
        </div>

        {/* Ways to Join */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-mono font-bold mb-4">
              <span className="syntax-keyword">ways</span>
              <span className="text-[var(--accent-primary)]">.</span>
              <span className="syntax-function">toJoin</span>()
            </h2>
            <p className="text-[var(--text-secondary)] font-mono text-sm">
              <span className="syntax-comment">// Join us at Bonita Sunnyside Library every Saturday</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Discord Community */}
            <div className="card p-6 text-center">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-mono font-semibold mb-2 text-[var(--accent-primary)]">
                Discord Community
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Join our active Discord server for real-time discussions, project collaboration, and event updates.
              </p>
              <div className="text-xs text-[var(--text-muted)] font-mono mb-4">
                <span className="syntax-comment">// 74+ members online daily</span>
              </div>
              <a
                href={discordService.getInviteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm w-full"
              >
                <span className="syntax-function">join</span>.<span className="syntax-function">discord</span>()
              </a>
            </div>

            {/* In-Person Meetings */}
            <div className="card p-6 text-center">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-mono font-semibold mb-2 text-[var(--accent-primary)]">
                Weekly Meetings
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Join us every Saturday at Bonita Sunnyside Library for hands-on projects and collaboration.
              </p>
              <div className="text-xs text-[var(--text-muted)] font-mono mb-4">
                <span className="syntax-comment">// Saturdays 10:00 AM - 12:30 PM</span>
              </div>
              <a
                href="https://maps.google.com/?q=4375+Bonita+Rd,+Bonita,+CA+91902"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm w-full inline-block"
              >
                <span className="syntax-function">get</span>.<span className="syntax-function">directions</span>()
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-default)]">
            <h3 className="font-mono font-semibold mb-4 text-center">
              <span className="syntax-keyword">contact</span>
              <span className="text-[var(--accent-primary)]">.</span>
              <span className="syntax-function">info</span>()
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-1">
                  <span className="syntax-string">"location"</span>:
                </div>
                <div className="font-mono text-sm text-[var(--accent-primary)] mb-1">
                  "Bonita Sunnyside Library"
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)]">
                  "4375 Bonita Rd, Bonita, CA 91902"
                </div>
              </div>
              <div>
                <div className="font-mono text-sm text-[var(--text-secondary)] mb-1">
                  <span className="syntax-string">"meeting_time"</span>:
                </div>
                <div className="font-mono text-sm text-[var(--accent-primary)]">
                  "Saturdays 10:00 AM - 12:30 PM"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discord Integration Details */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-mono font-bold mb-4">
            <span className="syntax-keyword">discord</span>
            <span className="text-[var(--accent-primary)]">.</span>
            <span className="syntax-function">community</span>()
          </h2>
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            <span className="syntax-comment">// Real-time activity and upcoming events</span>
          </p>
        </div>

        {/* Server Stats */}
        {serverInfo && (
          <div className="mb-8 p-6 bg-[var(--card-bg)] rounded-lg border border-[var(--border-default)]">
            <h2 className="text-xl font-mono font-semibold mb-4">
              <span className="syntax-keyword">server</span>
              <span className="text-[var(--accent-primary)]">.</span>
              <span className="syntax-function">stats</span>
              <span className="text-[var(--accent-primary)]">()</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-[var(--accent-primary)]">
                  {serverInfo.member_count}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-[var(--accent-success)]">
                  {serverInfo.online_count}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Online Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-[var(--accent-warning)]">
                  {serverInfo.voice_count}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">In Voice</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-[var(--accent-highlight)]">
                  {serverInfo.channels.length}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Channels</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discord Join Card - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-8 h-full flex flex-col justify-center">
              <div className="text-center">
                                 <div className="mb-6">
                   <div className="w-20 h-20 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                     {serverInfo?.icon ? (
                       <img 
                         src={serverInfo.icon} 
                         alt="Discord Server Icon" 
                         className="w-full h-full object-cover"
                       />
                     ) : (
                       <span className="text-3xl font-bold text-white">DC</span>
                     )}
                   </div>
                  <h3 className="text-2xl font-mono font-semibold mb-2">
                    Join Our Discord Community
                  </h3>
                  <p className="text-[var(--text-secondary)] font-mono text-sm mb-8">
                    <span className="syntax-comment">// Connect with fellow IEEE members</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8 text-sm max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-[var(--accent-success)]">
                      {serverInfo?.online_count || 8}
                    </div>
                    <div className="text-[var(--text-secondary)]">Online Now</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-[var(--accent-primary)]">
                      {serverInfo?.member_count || 74}
                    </div>
                    <div className="text-[var(--text-secondary)]">Total Members</div>
                  </div>
                </div>
                
                <a
                  href={discordService.getInviteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-[var(--accent-primary)] text-white font-mono font-semibold rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors text-lg"
                >
                  <span className="syntax-function">join</span>
                  <span className="text-[var(--accent-secondary)]">()</span>
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6">
              <h3 className="text-lg font-mono font-semibold mb-4">
                <span className="syntax-keyword">events</span>
                <span className="text-[var(--accent-primary)]">.</span>
                <span className="syntax-function">upcoming</span>
                <span className="text-[var(--accent-primary)]">()</span>
              </h3>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-[var(--bg-tertiary)] rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-[var(--bg-tertiary)] rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="text-center text-[var(--text-muted)] py-8">
                  <span className="font-mono text-sm">No upcoming events</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const eventDate = formatEventDate(event.scheduled_start_time);
                    return (
                      <div key={event.id} className="border-l-4 border-[var(--accent-primary)] pl-4 py-2">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-mono font-medium text-[var(--text-primary)]">
                            {event.name}
                          </h4>
                          <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded">
                            {event.user_count} interested
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                          {event.description}
                        </p>
                        <div className="text-xs text-[var(--text-muted)] font-mono">
                          <div>{eventDate.date}</div>
                          <div>{eventDate.time}</div>
                          {event.location && (
                            <div className="flex items-center space-x-1 mt-1">
                              <span>📍</span>
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6">
              <h3 className="text-lg font-mono font-semibold mb-4">
                <span className="syntax-keyword">quick</span>
                <span className="text-[var(--accent-primary)]">.</span>
                <span className="syntax-function">actions</span>
                <span className="text-[var(--accent-primary)]">()</span>
              </h3>
              <div className="space-y-3">
                <a
                  href={discordService.getInviteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full btn-primary text-center"
                >
                  <span className="syntax-function">join</span>
                  <span className="text-[var(--accent-primary)]">.</span>
                  <span className="syntax-function">server</span>()
                </a>
                
                <button className="block w-full btn-secondary text-center">
                  <span className="syntax-function">create</span>
                  <span className="text-[var(--accent-primary)]">.</span>
                  <span className="syntax-function">event</span>()
                </button>
                
                <button className="block w-full btn-secondary text-center">
                  <span className="syntax-function">view</span>
                  <span className="text-[var(--accent-primary)]">.</span>
                  <span className="syntax-function">rules</span>()
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Integration Info */}
        <div className="mt-12 p-6 bg-[var(--card-bg)] rounded-lg border border-[var(--border-default)]">
          <h3 className="text-lg font-mono font-semibold mb-4">
            <span className="syntax-keyword">integration</span>
            <span className="text-[var(--accent-primary)]">.</span>
            <span className="syntax-function">features</span>
            <span className="text-[var(--accent-primary)]">()</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-mono font-medium mb-2 text-[var(--accent-primary)]">
                Real-time Activity
              </h4>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• Live member presence</li>
                <li>• Recent messages and activity</li>
                <li>• Voice channel status</li>
                <li>• Event notifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-medium mb-2 text-[var(--accent-primary)]">
                Event Management
              </h4>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• Scheduled workshops</li>
                <li>• Competition prep sessions</li>
                <li>• Study group meetings</li>
                <li>• Social events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 