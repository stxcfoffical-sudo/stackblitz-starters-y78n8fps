"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function ApplyPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [type, setType] = useState("Community Staff");
  const [why, setWhy] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (!supabase) { setError("Supabase is not configured. Follow the setup guide first."); return; }
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) router.replace("/login");
      else setUser(currentUser);
    }
    checkUser();
  }, [router]);

  async function submit(event) {
    event.preventDefault(); setMessage(""); setError("");
    if (!supabase || !user) { setError("Please sign in before submitting an application."); return; }
    setBusy(true);
    const { error: insertError } = await supabase.from("applications").insert({
      user_id: user.id,
      application_type: type,
      why_join: why.trim(),
      experience: experience.trim(),
      status: "pending"
    });
    if (insertError) setError(insertError.message);
    else { setMessage("Your application has been submitted successfully."); setWhy(""); setExperience(""); }
    setBusy(false);
  }

  return (
    <main>
      <nav className="nav container">
        <Link href="/" className="brand"><span className="brand-mark">P</span><span>Pacific Coast <span style={{color:"var(--accent)"}}>Networks</span></span></Link>
        <Link href="/dashboard" className="text-link" style={{color:"var(--muted)",fontSize:14}}>← Dashboard</Link>
      </nav>
      <div className="auth-shell container">
        <section className="form-card" style={{width:"min(620px,100%)"}}>
          <div className="eyebrow">PCN OPPORTUNITIES</div>
          <h1>Community application.</h1>
          <p>Fill out the form below. Your application will be saved to your account and marked as pending review.</p>
          {message && <div className="message">{message} <Link href="/dashboard" style={{textDecoration:"underline"}}>View dashboard</Link></div>}
          {error && <div className="message error">{error}</div>}
          <form className="form" onSubmit={submit}>
            <label className="field">Application type<select value={type} onChange={e=>setType(e.target.value)}><option>Community Staff</option><option>Moderation Team</option><option>Media Team</option><option>Affiliations Team</option><option>Other</option></select></label>
            <label className="field">Why do you want to join PCN?<textarea value={why} onChange={e=>setWhy(e.target.value)} placeholder="Tell us why you're interested..." required minLength={20} maxLength={3000}/></label>
            <label className="field">Relevant experience<textarea value={experience} onChange={e=>setExperience(e.target.value)} placeholder="Share any relevant experience (optional)." maxLength={3000}/></label>
            <button className="button full" type="submit" disabled={busy || !user}>{busy ? "Submitting..." : "Submit application"}</button>
            <p className="form-note">Please be honest and respectful. Only submit information you're comfortable sharing with authorised PCN reviewers.</p>
          </form>
        </section>
      </div>
    </main>
  );
}
