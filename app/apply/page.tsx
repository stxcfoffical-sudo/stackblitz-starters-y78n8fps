export default function ApplyPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0b1220',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <h1>Join Pacific Coast Networks</h1>
      <p>Join our Discord to get started with PCN.</p>
      <a
        href="https://discord.gg/nzrp"
        style={{
          marginTop: '16px',
          padding: '12px 24px',
          background: '#f97316',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        Join our Discord
      </a>
    </main>
  );
}
