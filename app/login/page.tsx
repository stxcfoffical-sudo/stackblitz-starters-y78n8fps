'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkSession() {
      if (!supabase) return;
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (active && session) router.replace('/dashboard');
    }
    checkSession();
    return () => {
      active = false;
    };
  }, [router]);

  async function signInWithDiscord() {
    setError('');
    if (!supabase) {
      setError(
        'Supabase is not configured yet. Follow the setup guide and add your .env.local values.'
      );
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: 'identify email',
        },
      });
      if (error) throw error;
    } catch (e) {
      setError(
        e.message ||
          'Could not start Discord sign-in. Check your Supabase Discord provider settings.'
      );
      setBusy(false);
    }
  }

  return (
    <main className="page-wrap">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="brand">
            <span className="brand-mark">P</span>
            <span>
              Pacific Coast{' '}
              <span style={{ color: 'var(--accent)' }}>Networks</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-link"
            style={{ color: 'var(--muted)', fontSize: 14 }}
          >
            ← Back to home
          </Link>
        </nav>
        <div className="auth-shell">
          <section className="form-card">
            <div className="eyebrow">PCN MEMBER ACCESS</div>
            <h1>Continue with Discord.</h1>
            <p>
              Sign in with your Discord account to access your Pacific Coast
              Networks member dashboard and applications.
            </p>
            {error && <div className="message error">{error}</div>}
            <button
              className="button full"
              type="button"
              onClick={signInWithDiscord}
              disabled={busy}
              style={{ marginTop: 24 }}
            >
              {busy ? 'Connecting to Discord...' : '◉  Continue with Discord'}
            </button>
            <p className="form-note" style={{ marginTop: 20 }}>
              Discord will ask you to authorise PCN to access the basic account
              details requested by the website. PCN never asks for your Discord
              password.
            </p>
            <p className="form-note">
              Signing in verifies your Discord account. To confirm that you are
              a member of the PCN Discord server, we must configure an
              additional server-membership check.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
