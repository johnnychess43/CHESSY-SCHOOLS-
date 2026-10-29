"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, LogOut, UserRound } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { courses } from "@/lib/courses";

type ProgressRow = { course_slug: string; lesson_slug: string; xp: number; completed_at: string };

export default function AccountPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    if (!supabase) { setConfigured(false); return; }
    let alive = true;
    supabase.auth.getUser().then(({data}) => { if (alive) setUser(data.user); });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      if (alive) setUser(session?.user ?? null);
    });
    return () => { alive = false; subscription.unsubscribe(); };
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !user) { setProgress([]); return; }
    supabase.from("learning_progress").select("course_slug,lesson_slug,xp,completed_at").eq("user_id", user.id).order("completed_at", {ascending:false})
      .then(({data,error}) => { if (error) setMessage("Signed in, but progress could not load. Database setup may still be pending."); else setProgress((data ?? []) as ProgressRow[]); });
  }, [supabase,user]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    try {
      const result = mode === "signup"
        ? await supabase.auth.signUp({email:email.trim(), password, options:{emailRedirectTo:window.location.origin + "/account"}})
        : await supabase.auth.signInWithPassword({email:email.trim(), password});
      if (result.error) throw result.error;
      if (mode === "signup" && !result.data.session) setMessage("Account created. Check your email for the confirmation link, then sign in.");
      else { setUser(result.data.user); setMessage(mode === "signup" ? "Welcome! Your student account is ready." : "You're signed in."); }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not complete sign-in."); }
    finally { setBusy(false); }
  }

  async function signOut() {
    if (!supabase) return;
    const {error} = await supabase.auth.signOut();
    setMessage(error ? error.message : "You have signed out.");
    if (!error) { setUser(null); setProgress([]); }
  }

  const completedIds = new Set(progress.map(item => item.course_slug + "/" + item.lesson_slug));

  return <main className="learning-shell account-shell">
    <header className="learning-nav wrap"><Link className="brand" href="/"><img className="brand-logo" src="/jchess-icon.svg" alt="" /><span>CHESSY<span className="brand-muted"> SCHOOLS</span><small>LEARN WITHOUT LIMITS</small></span></Link><Link className="learning-back" href="/#courses"><ArrowLeft size={15}/> All courses</Link></header>
    <section className="account-content wrap">
      {!user ? <div className="auth-card"><div className="auth-symbol"><UserRound size={24}/></div><span className="eyebrow">YOUR LEARNING JOURNEY</span><h1>{mode === "signup" ? "Create your student account" : "Welcome back"}</h1><p>Save completed lessons and continue learning wherever you sign in.</p>
        {!configured && <div className="auth-notice">Supabase is not configured yet. Add the public environment variables in Vercel to enable accounts.</div>}
        <form onSubmit={submit} className="auth-form"><label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Password<input type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters"/></label><button className="button-primary" type="submit" disabled={!configured || busy}>{busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"} <ArrowRight size={16}/></button></form>
        {message && <p className="auth-message" role="status">{message}</p>}<p className="auth-switch">{mode === "signup" ? "Already have an account?" : "New to CHESSY SCHOOLS?"} <button onClick={()=>{setMode(mode === "signup" ? "signin" : "signup");setMessage("");}}>{mode === "signup" ? "Sign in" : "Create account"}</button></p>
      </div> : <div className="student-dashboard"><div className="student-welcome"><div><span className="eyebrow">STUDENT DASHBOARD</span><h1>Keep moving forward.</h1><p>Signed in as {user.email}</p></div><button className="signout-button" onClick={signOut}><LogOut size={15}/> Sign out</button></div>
        <div className="student-stats"><div><CheckCircle2 size={20}/><strong>{completedIds.size}</strong><span>Lessons completed</span></div><div><BookOpen size={20}/><strong>{progress.reduce((sum,item)=>sum+(item.xp||0),0)}</strong><span>XP earned</span></div><div><UserRound size={20}/><strong>{courses.length}</strong><span>Learning paths</span></div></div>
        <div className="dashboard-section-heading"><div><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Your learning paths</h2></div></div>
        <div className="dashboard-courses">{courses.map(course=>{const done=course.lessons.filter(lesson=>completedIds.has(course.slug + "/" + lesson.slug)).length;const next=course.lessons.find(lesson=>!completedIds.has(course.slug + "/" + lesson.slug)) ?? course.lessons[0];return <article className="dashboard-course" key={course.slug}><span className="course-category">{course.category}</span><h3>{course.title}</h3><p>{done} of {course.lessons.length} lessons complete</p><div className="sidebar-progress"><span style={{width:(done/course.lessons.length*100) + "%"}}/></div><Link className="lesson-start" href={next ? "/learn/" + course.slug + "/lesson/" + next.slug : "/learn/" + course.slug}>{done ? "Continue learning" : "Start learning"} <ArrowRight size={15}/></Link></article>})}</div>
        {message && <p className="auth-message" role="status">{message}</p>}
      </div>}
    </section>
  </main>;
}
