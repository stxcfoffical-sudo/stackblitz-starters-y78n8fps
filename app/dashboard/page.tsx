'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    async function load() {
      if (!supabase) {
        setError('Supabase is not configured. Follow the setup guide first.');
        setLoading(false);
        return;
      }
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !currentUser) {
        router.replace('/login');
        return;
      }
      if (!alive) return;
      setUser(currentUser);
      const { data, error: queryError } = await supabase
        .from('applications')
        .select('id, application_type, status, created_at')
        .order('created_at', { ascending: false });
      if (queryError) setError(queryError.message);
      else setApplications(data || []);
      setLoading(false);
    }
    load();
    return () => {
      alive = false;
    };
  }, [router]);

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const displayName =
    user?.user_metadata?.username || user?.email?.split('@')[0] || 'Member';
  const pending = applications.filter((a) => a.status === 'pending').length;

  return (
    <main>
      <nav className="nav container">
        <Link href="/" className="brand">
          <span className="brand-mark">P</span>
          <span>
            Pacific Coast{' '}
            <span style={{ color: 'var(--accent)' }}>Networks</span>
          </span>
        </Link>
        <button className="button secondary" onClick={signOut}>
          Sign out
        </button>
      </nav>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-label">MEMBER AREA</div>
          <Link href="/dashboard" className="side-link active">
            ◫ &nbsp; Dashboard
          </Link>
          <Link href="/apply" className="side-link">
            ＋ &nbsp; Applications
          </Link>
          <Link href="/" className="side-link">
            ↗ &nbsp; Community home
          </Link>
        </aside>
        <section className="main-content">
          <div className="eyebrow">MEMBER OVERVIEW</div>
          <h1>Welcome, {displayName}.</h1>
          <p className="muted">
            Here's your Pacific Coast Networks account overview.
          </p>
          {error && (
            <div className="message error" style={{ marginTop: 20 }}>
              {error}
            </div>
          )}
          {loading ? (
            <p className="muted" style={{ marginTop: 30 }}>
              Loading your dashboard...
            </p>
          ) : (
            <>
              <div className="content-grid">
                <div className="panel">
                  <div className="muted" style={{ fontSize: 13 }}>
                    Your applications
                  </div>
                  <div className="big-number">{applications.length}</div>
                  <p>Applications submitted by your account.</p>
                </div>
                <div className="panel">
                  <div className="muted" style={{ fontSize: 13 }}>
                    Awaiting review
                  </div>
                  <div className="big-number">{pending}</div>
                  <p>Applications still marked as pending.</p>
                </div>
                <div className="panel">
                  <div className="muted" style={{ fontSize: 13 }}>
                    Account status
                  </div>
                  <div
                    className="big-number"
                    style={{ fontSize: 22, color: 'var(--green)' }}
                  >
                    Active
                  </div>
                  <p>You're signed in to your member account.</p>
                </div>
              </div>
              <div className="topbar">
                <div>
                  <h2 style={{ margin: '0 0 5px', fontSize: 22 }}>
                    Recent applications
                  </h2>
                  <span className="muted" style={{ fontSize: 13 }}>
                    Track the status of your submissions.
                  </span>
                </div>
                <Link className="button" href="/apply">
                  New application +
                </Link>
              </div>
              {applications.length === 0 ? (
                <div className="empty-state">
                  <h3>No applications yet</h3>
                  <p>When you submit an application, it will appear here.</p>
                  <Link className="button" href="/apply">
                    Submit an application
                  </Link>
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Application type</th>
                        <th>Submitted</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td>{app.application_type}</td>
                          <td>
                            {new Date(app.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <span className={`pill ${app.status}`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
