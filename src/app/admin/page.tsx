"use client";

import { useState, useEffect } from 'react';
import { authService } from '../lib/auth';
import { User } from '../lib/supabase';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          window.location.href = '/';
          return;
        }

        setUser(currentUser);
        const profile = await authService.getUserProfile(currentUser.id);
        setUserProfile(profile);

        if (profile?.role !== 'admin') {
          window.location.href = '/';
          return;
        }

        // Load all users
        const users = await authService.getAllUsers();
        setAllUsers(users);
      } catch (err: any) {
        setError(err.message || 'Error loading admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  const handleRoleUpdate = async (userId: string, newRole: 'admin' | 'member' | 'visitor') => {
    setUpdatingUser(userId);
    try {
      await authService.updateUserRole(userId, newRole);
      // Refresh users list
      const users = await authService.getAllUsers();
      setAllUsers(users);
    } catch (err: any) {
      setError(err.message || 'Error updating user role');
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="font-mono text-[var(--text-secondary)]">
          <span className="syntax-comment">// Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user || userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="font-mono text-[var(--accent-error)]">
          <span className="syntax-comment">// Access denied: Admin privileges required</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-mono font-bold mb-2">
            <span className="syntax-keyword">class</span>{" "}
            <span className="syntax-function">AdminDashboard</span>
            <span className="text-[var(--accent-primary)]">{"{"}</span>
          </h1>
          <p className="font-mono text-[var(--text-secondary)]">
            <span className="syntax-comment">// Welcome, {userProfile?.username}. Manage club members and content.</span>
          </p>
        </div>

        {error && (
          <div className="bg-[var(--accent-error)]/10 border border-[var(--accent-error)] rounded-lg p-4 mb-6">
            <p className="text-[var(--accent-error)] font-mono">{error}</p>
          </div>
        )}

        {/* User Management Section */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-mono font-bold mb-4">
            <span className="syntax-function">manageUsers</span>
            <span className="text-[var(--accent-primary)]">()</span>
          </h2>
          
          <div className="space-y-4">
            {allUsers.length === 0 ? (
              <p className="font-mono text-[var(--text-secondary)]">
                <span className="syntax-comment">// No users found</span>
              </p>
            ) : (
              allUsers.map((userItem) => (
                <div
                  key={userItem.id}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-mono">
                      <div className="text-[var(--text-primary)] font-semibold">
                        <span className="syntax-variable">{userItem.username}</span>
                        <span className="text-[var(--text-secondary)] ml-2">({userItem.full_name})</span>
                      </div>
                      <div className="text-[var(--text-secondary)] text-sm">
                        {userItem.email}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-1">
                        <span className="syntax-comment">// Joined: </span>
                        {new Date(userItem.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                        userItem.role === 'admin' 
                          ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                          : userItem.role === 'member'
                          ? 'bg-[var(--accent-success)]/20 text-[var(--accent-success)]'
                          : 'bg-[var(--text-muted)]/20 text-[var(--text-muted)]'
                      }`}>
                        {userItem.role}
                      </span>
                      
                      {userItem.id !== user.id && (
                        <select
                          value={userItem.role}
                          onChange={(e) => handleRoleUpdate(userItem.id, e.target.value as 'admin' | 'member' | 'visitor')}
                          disabled={updatingUser === userItem.id}
                          className="bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded px-2 py-1 text-sm font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                        >
                          <option value="visitor">visitor</option>
                          <option value="member">member</option>
                          <option value="admin">admin</option>
                        </select>
                      )}
                      
                      {updatingUser === userItem.id && (
                        <div className="text-[var(--text-secondary)] text-sm font-mono">
                          <span className="syntax-comment">// Updating...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6">
            <h3 className="font-mono text-[var(--text-secondary)] text-sm mb-2">
              <span className="syntax-comment">// Total Users</span>
            </h3>
            <p className="text-3xl font-mono font-bold text-[var(--accent-primary)]">
              {allUsers.length}
            </p>
          </div>
          
          <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6">
            <h3 className="font-mono text-[var(--text-secondary)] text-sm mb-2">
              <span className="syntax-comment">// Active Members</span>
            </h3>
            <p className="text-3xl font-mono font-bold text-[var(--accent-success)]">
              {allUsers.filter(u => u.role === 'member').length}
            </p>
          </div>
          
          <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-6">
            <h3 className="font-mono text-[var(--text-secondary)] text-sm mb-2">
              <span className="syntax-comment">// Admins</span>
            </h3>
            <p className="text-3xl font-mono font-bold text-[var(--accent-primary)]">
              {allUsers.filter(u => u.role === 'admin').length}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          <span className="text-[var(--accent-primary)]">{"}"}</span>
          <span className="syntax-comment"> // End AdminDashboard</span>
        </div>
      </div>
    </div>
  );
} 