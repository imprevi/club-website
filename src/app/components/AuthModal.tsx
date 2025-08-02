"use client";

import { useState } from 'react';
import { authService } from '../lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authService.signIn(email, password);
      } else {
        await authService.signUp(email, password, {
          username,
          full_name: fullName
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setFullName('');
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-mono font-bold">
            <span className="syntax-keyword">{isLogin ? 'login' : 'register'}</span>
            <span className="text-[var(--accent-primary)]">()</span>
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-[var(--accent-error)]/10 border border-[var(--accent-error)] rounded p-3">
              <p className="text-[var(--accent-error)] text-sm font-mono">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-mono text-[var(--text-secondary)] mb-2">
              <span className="syntax-keyword">email</span>:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-[var(--text-secondary)] mb-2">
              <span className="syntax-keyword">password</span>:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-mono text-[var(--text-secondary)] mb-2">
                  <span className="syntax-keyword">username</span>:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-[var(--text-secondary)] mb-2">
                  <span className="syntax-keyword">full_name</span>:
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? (
              <span className="syntax-comment">// Processing...</span>
            ) : (
              <>
                <span className="syntax-function">{isLogin ? 'signIn' : 'signUp'}</span>
                <span className="text-[var(--accent-primary)]">()</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)]/80 font-mono text-sm"
          >
            {isLogin ? (
              <>
                <span className="syntax-comment">// Need an account? </span>
                <span className="syntax-function">register</span>()
              </>
            ) : (
              <>
                <span className="syntax-comment">// Already have an account? </span>
                <span className="syntax-function">login</span>()
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 