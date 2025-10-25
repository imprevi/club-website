// Discord API Integration Service
export interface DiscordMember {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  activity?: {
    name: string;
    type: number;
    details?: string;
  };
  roles: string[];
  joined_at: string;
}

export interface DiscordEvent {
  id: string;
  name: string;
  description: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  location?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  user_count: number;
  creator: {
    username: string;
    avatar?: string;
  };
  channel_id: string;
}

export interface DiscordActivity {
  id: string;
  type: 'message' | 'voice_join' | 'voice_leave' | 'event_created' | 'member_join';
  user: {
    username: string;
    avatar?: string;
  };
  content?: string;
  channel?: string;
  timestamp: string;
}

export interface DiscordServerInfo {
  id: string;
  name: string;
  icon?: string;
  member_count: number;
  online_count: number;
  voice_count: number;
  channels: {
    id: string;
    name: string;
    type: 'text' | 'voice';
    member_count?: number;
  }[];
}

class DiscordService {
  private readonly SERVER_ID = process.env.NEXT_PUBLIC_DISCORD_SERVER_ID!;
  private readonly WIDGET_ID = process.env.NEXT_PUBLIC_DISCORD_WIDGET_ID!;
  private readonly INVITE_CODE = '34BCmz8q2y'; // From the invite URL
  private readonly API_BASE = 'https://discord.com/api/v10';
  
  constructor() {
    if (!this.SERVER_ID) {
      console.error('NEXT_PUBLIC_DISCORD_SERVER_ID is required for real Discord data');
    }
  }

  // Real Discord API methods - NO MOCK DATA
  private async fetchRealDiscordData(): Promise<DiscordServerInfo> {
    if (!this.SERVER_ID) {
      throw new Error('Discord Server ID not configured. Please set NEXT_PUBLIC_DISCORD_SERVER_ID in environment variables.');
    }

    console.log('Fetching real Discord data for server:', this.SERVER_ID);

    // Try multiple Discord APIs in order of preference
    const attempts = [
      () => this.tryWidgetAPI(),
      () => this.tryInviteAPI()
    ];

    let lastError: Error | null = null;
    
    for (const attempt of attempts) {
      try {
        const result = await attempt();
        if (result.member_count > 0) {
          console.log('Successfully fetched Discord data:', result);
          return result;
        }
      } catch (error) {
        console.warn('Discord API attempt failed:', error);
        lastError = error instanceof Error ? error : new Error(String(error));
      }
    }
    
    throw new Error(`All Discord API methods failed. Last error: ${lastError?.message}. Please ensure Discord server widget is enabled and server ID is correct.`);
  }

  private async tryWidgetAPI(): Promise<DiscordServerInfo> {
    const widgetUrl = `https://discord.com/api/guilds/${this.SERVER_ID}/widget.json`;
    console.log('Trying Discord Widget API:', widgetUrl);
    
    const response = await fetch(widgetUrl);
    if (!response.ok) {
      throw new Error(`Discord Widget API returned ${response.status}: ${response.statusText}. Check if server widget is enabled in Discord server settings.`);
    }
    
    const data = await response.json();
    
    // Get icon URL if available
    let iconUrl = undefined;
    if (data.icon) {
      iconUrl = `https://cdn.discordapp.com/icons/${this.SERVER_ID}/${data.icon}.png?size=128`;
    }
    
    return {
      id: this.SERVER_ID,
      name: data.name || 'IEEE SWC Club',
      icon: iconUrl,
      member_count: data.presence_count || 0, // Widget API provides presence_count
      online_count: data.members ? data.members.length : 0,
      voice_count: 0, // Widget API doesn't provide voice counts
      channels: (data.channels || []).map((channel: any) => ({
        id: channel.id,
        name: channel.name,
        type: channel.type === 'voice' ? 'voice' : 'text'
      }))
    };
  }

  private async tryInviteAPI(): Promise<DiscordServerInfo> {
    const inviteUrl = `${this.API_BASE}/invites/${this.INVITE_CODE}?with_counts=true`;
    console.log('Trying Discord Invite API:', inviteUrl);
    
    const response = await fetch(inviteUrl);
    if (!response.ok) {
      throw new Error(`Discord Invite API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.guild) {
      throw new Error('Invalid invite or guild data not available');
    }
    
    // Get icon URL if available
    let iconUrl = undefined;
    if (data.guild.icon) {
      iconUrl = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=128`;
    }
    
    return {
      id: data.guild.id,
      name: data.guild.name,
      icon: iconUrl,
      member_count: data.approximate_member_count || 0,
      online_count: data.approximate_presence_count || 0,
      voice_count: 0, // Invite API doesn't provide voice counts
      channels: [] // Invite API doesn't provide channel list
    };
  }

  // Real Discord members from widget API
  private async fetchRealMembers(): Promise<DiscordMember[]> {
    if (!this.SERVER_ID) {
      throw new Error('Discord Server ID not configured');
    }

    const widgetUrl = `https://discord.com/api/guilds/${this.SERVER_ID}/widget.json`;
    const response = await fetch(widgetUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch members: Discord Widget API returned ${response.status}. Ensure server widget is enabled.`);
    }
    
    const data = await response.json();
    
    return (data.members || []).map((member: any) => ({
      id: member.id || 'unknown',
      username: member.username || 'Unknown User',
      discriminator: member.discriminator || '0000',
      avatar: member.avatar_url,
      status: member.status || 'online',
      activity: member.game ? {
        name: member.game.name,
        type: 0
      } : undefined,
      roles: [],
      joined_at: new Date().toISOString()
    }));
  }

  // Real Discord events - note: requires authentication for scheduled events
  private async fetchRealEvents(): Promise<DiscordEvent[]> {
    // Discord scheduled events require bot authentication which is not available in browser
    // This would need to be implemented via a backend API endpoint
    console.warn('Discord scheduled events require backend API - returning empty array');
    return [];
  }


  // PUBLIC METHODS - REAL DISCORD DATA ONLY
  async getServerInfo(): Promise<DiscordServerInfo> {
    try {
      return await this.fetchRealDiscordData();
    } catch (error) {
      console.error('Failed to fetch Discord server info:', error);
      throw error; // Don't fall back to mock data - throw error instead
    }
  }

  async getOnlineMembers(): Promise<DiscordMember[]> {
    try {
      return await this.fetchRealMembers();
    } catch (error) {
      console.error('Failed to fetch Discord members:', error);
      throw error; // Don't fall back to mock data - throw error instead
    }
  }

  async getUpcomingEvents(): Promise<DiscordEvent[]> {
    try {
      const events = await this.fetchRealEvents();
      return events.filter(e => e.status === 'scheduled');
    } catch (error) {
      console.error('Failed to fetch Discord events:', error);
      throw error; // Don't fall back to mock data - throw error instead
    }
  }

  async getRecentActivity(): Promise<DiscordActivity[]> {
    // Discord doesn't provide a direct "recent activity" endpoint
    // This would need to be implemented via a backend service that logs activities
    console.warn('Discord recent activity requires backend implementation');
    return [];
  }

  getWidgetUrl(): string {
    return `https://discord.com/widget?id=${this.SERVER_ID}&theme=dark`;
  }

  getInviteUrl(): string {
    return `https://discord.gg/34BCmz8q2y`;
  }

  // Format timestamps for display
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  }

  // Get status color for UI
  getStatusColor(status: DiscordMember['status']): string {
    switch (status) {
      case 'online': return 'text-[var(--accent-success)]';
      case 'idle': return 'text-[var(--accent-warning)]';
      case 'dnd': return 'text-[var(--accent-error)]';
      case 'offline': return 'text-[var(--text-muted)]';
      default: return 'text-[var(--text-muted)]';
    }
  }

  // Get activity type icon
  getActivityIcon(type: DiscordActivity['type']): string {
    switch (type) {
      case 'message': return '💬';
      case 'voice_join': return '🎤';
      case 'voice_leave': return '🔇';
      case 'event_created': return '📅';
      case 'member_join': return '👋';
      default: return '📢';
    }
  }
}

export const discordService = new DiscordService(); 