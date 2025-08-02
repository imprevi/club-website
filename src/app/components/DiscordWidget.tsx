"use client";

import { useState, useEffect } from "react";
import { discordService, DiscordServerInfo, DiscordMember, DiscordActivity } from "../lib/discord";

interface DiscordWidgetProps {
  showActivity?: boolean;
  showMembers?: boolean;
  showServerInfo?: boolean;
  className?: string;
}

export default function DiscordWidget({ 
  showActivity = true, 
  showMembers = true, 
  showServerInfo = true,
  className = ""
}: DiscordWidgetProps) {
  const [serverInfo, setServerInfo] = useState<DiscordServerInfo | null>(null);
  const [onlineMembers, setOnlineMembers] = useState<DiscordMember[]>([]);
  const [recentActivity, setRecentActivity] = useState<DiscordActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'activity' | 'members' | 'channels'>('activity');

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const [serverData, membersData, activityData] = await Promise.all([
          showServerInfo ? discordService.getServerInfo() : Promise.resolve(null),
          showMembers ? discordService.getOnlineMembers() : Promise.resolve([]),
          showActivity ? discordService.getRecentActivity() : Promise.resolve([])
        ]);

        setServerInfo(serverData);
        setOnlineMembers(membersData);
        setRecentActivity(activityData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch Discord data:', error);
        setLoading(false);
      }
    };

    fetchDiscordData();

    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDiscordData, 30000);
    return () => clearInterval(interval);
  }, [showActivity, showMembers, showServerInfo]);

  if (loading) {
    return (
      <div className={`bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-[var(--bg-tertiary)] rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[var(--bg-tertiary)] rounded w-3/4"></div>
            <div className="h-4 bg-[var(--bg-tertiary)] rounded w-1/2"></div>
            <div className="h-4 bg-[var(--bg-tertiary)] rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      {serverInfo && (
        <div className="p-4 border-b border-[var(--border-default)] bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">DC</span>
              </div>
              <div>
                <h3 className="font-mono font-semibold text-[var(--text-primary)]">
                  {serverInfo.name}
                </h3>
                <div className="flex items-center space-x-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[var(--accent-success)] rounded-full"></div>
                    <span>{serverInfo.online_count} online</span>
                  </span>
                  <span>{serverInfo.member_count} members</span>
                  {serverInfo.voice_count > 0 && (
                    <span className="flex items-center space-x-1">
                      <span>🎤</span>
                      <span>{serverInfo.voice_count} in voice</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <a
              href={discordService.getInviteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-3 py-1"
            >
              <span className="syntax-function">join</span>()
            </a>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--border-default)] bg-[var(--bg-secondary)]">
        {showActivity && (
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 text-sm font-mono transition-colors ${
              activeTab === 'activity'
                ? 'border-b-2 border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            activity
          </button>
        )}
        {showMembers && (
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 text-sm font-mono transition-colors ${
              activeTab === 'members'
                ? 'border-b-2 border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            members ({onlineMembers.length})
          </button>
        )}
        {serverInfo && (
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-4 py-2 text-sm font-mono transition-colors ${
              activeTab === 'channels'
                ? 'border-b-2 border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            channels
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 max-h-64 overflow-y-auto">
        {/* Activity Tab */}
        {activeTab === 'activity' && showActivity && (
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <div className="text-center text-[var(--text-muted)] py-8">
                <span className="font-mono text-sm">No recent activity</span>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-[var(--bg-tertiary)] rounded">
                  <div className="w-6 h-6 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">
                      {activity.user.avatar ? '👤' : '🤖'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
                        {activity.user.username}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {discordService.formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs">
                        {discordService.getActivityIcon(activity.type)}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">
                        {activity.type === 'message' && activity.content}
                        {activity.type === 'voice_join' && `joined ${activity.channel}`}
                        {activity.type === 'voice_leave' && `left ${activity.channel}`}
                        {activity.type === 'event_created' && `created event: ${activity.content}`}
                        {activity.type === 'member_join' && 'joined the server'}
                      </span>
                    </div>
                    {activity.channel && activity.type === 'message' && (
                      <div className="text-xs text-[var(--text-muted)] mt-1">
                        #{activity.channel}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && showMembers && (
          <div className="space-y-2">
            {onlineMembers.length === 0 ? (
              <div className="text-center text-[var(--text-muted)] py-8">
                <span className="font-mono text-sm">No members online</span>
              </div>
            ) : (
              onlineMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 hover:bg-[var(--bg-tertiary)] rounded">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
                        <span className="text-xs font-mono">
                          {member.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--bg-primary)] ${
                        member.status === 'online' ? 'bg-[var(--accent-success)]' :
                        member.status === 'idle' ? 'bg-[var(--accent-warning)]' :
                        member.status === 'dnd' ? 'bg-[var(--accent-error)]' :
                        'bg-[var(--text-muted)]'
                      }`}></div>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-medium text-[var(--text-primary)]">
                        {member.username}
                      </div>
                      {member.activity && (
                        <div className="text-xs text-[var(--text-secondary)] truncate max-w-32">
                          {member.activity.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {member.roles.includes('admin') && (
                      <span className="text-xs bg-[var(--accent-error)] text-white px-1 rounded">
                        admin
                      </span>
                    )}
                    {member.roles.includes('hardware-lead') && (
                      <span className="text-xs bg-[var(--accent-primary)] text-white px-1 rounded">
                        hw
                      </span>
                    )}
                    {member.roles.includes('software-lead') && (
                      <span className="text-xs bg-[var(--accent-success)] text-white px-1 rounded">
                        sw
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Channels Tab */}
        {activeTab === 'channels' && serverInfo && (
          <div className="space-y-2">
            {serverInfo.channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-2 hover:bg-[var(--bg-tertiary)] rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-sm">
                    {channel.type === 'text' ? '📝' : '🎤'}
                  </span>
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {channel.name}
                  </span>
                </div>
                {channel.type === 'voice' && channel.member_count && (
                  <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded">
                    {channel.member_count} members
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 