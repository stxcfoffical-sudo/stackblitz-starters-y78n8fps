import Link from 'next/link';

function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark">P</span>
      <span>
        Pacific Coast <span style={{ color: 'var(--accent)' }}>Networks</span>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Brand />
          <div className="nav-links">
            <a className="hide-mobile" href="#about">
              About
            </a>
            <a className="hide-mobile" href="#features">
              Features
            </a>
            <Link href="/login">Sign in</Link>
            <a className="button" href="https://discord.gg/nzrp">
              Join PCN
            </a>
          </div>
        </nav>
        <section className="hero">
          <div>
            <div className="eyebrow">Community. Connection. Play.</div>
            <h1>
              Your community.
              <br />
              <span>Your coast.</span>
            </h1>
            <p className="lead">
              Welcome to Pacific Coast Networks — a place for players to
              connect, take part, and help build a better community experience.
            </p>
            <div className="actions">
              <a
                className="button"
                href="https://discord.gg/nzrp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get started <span aria-hidden="true">↗</span>
              </a>
              <a className="button secondary" href="#about">
                Explore PCN
              </a>
            </div>
            <p className="form-note" style={{ marginTop: 22 }}>
              A community platform built around members and fair play.
            </p>
          </div>
          <div className="hero-card">
            <div className="hero-card-top">
              <div>
                <div className="eyebrow">PCN MEMBER HUB</div>
                <h2 style={{ margin: '8px 0 0', fontSize: 23 }}>
                  Everything in one place.
                </h2>
              </div>
              <span className="brand-mark">P</span>
            </div>
            <div className="stat-grid">
              <div className="stat">
                <strong>01</strong>
                <span>Member dashboard</span>
              </div>
              <div className="stat">
                <strong>02</strong>
                <span>Online applications</span>
              </div>
              <div className="stat">
                <strong>03</strong>
                <span>Account access</span>
              </div>
              <div className="stat">
                <strong>04</strong>
                <span>Community updates</span>
              </div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 20 }}>
              <span className="status-dot"></span> Your next step starts here.
            </p>
          </div>
        </section>
      </div>
      <section className="feature-section" id="about">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">Welcome to PCN</div>
            <h2>Built for the community.</h2>
            <p>
              A central place to manage your PCN account, submit applications,
              and keep track of your community activity.
            </p>
          </div>
          <div className="features" id="features">
            <article className="feature">
              <div className="feature-icon">◎</div>
              <h3>Member accounts</h3>
              <p>Register and sign in to access your own member area.</p>
            </article>
            <article className="feature">
              <div className="feature-icon">▤</div>
              <h3>Applications</h3>
              <p>
                Send applications through a clear form and track their status
                from your dashboard.
              </p>
            </article>
            <article className="feature">
              <div className="feature-icon">◈</div>
              <h3>Member dashboard</h3>
              <p>
                Find your account details, application history, and useful
                shortcuts in one place.
              </p>
            </article>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span>© {new Date().getFullYear()} Pacific Coast Networks</span>
          <span>Built for the community.</span>
        </div>
      </footer>
    </main>
  );
}
