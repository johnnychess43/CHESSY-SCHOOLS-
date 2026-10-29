"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, LogIn, RotateCcw, Sparkles } from "lucide-react";
import type { Lesson } from "@/lib/courses";
import { createClient } from "@/lib/supabase/client";

export default function LessonPlayer({ courseSlug, courseTitle, lesson, lessonNumber, lessonCount, nextHref }: { courseSlug: string; courseTitle: string; lesson: Lesson; lessonNumber: number; lessonCount: number; nextHref?: string }) {
  const supabase = createClient();
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const isCorrect = selected === lesson.answer;

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase.auth.getUser().then(async ({data}) => {
      if (!alive || !data.user) return;
      setSignedIn(true);
      const {data:row} = await supabase.from("learning_progress").select("lesson_slug").eq("user_id",data.user.id).eq("course_slug",courseSlug).eq("lesson_slug",lesson.slug).maybeSingle();
      if (alive && row) setCompleted(true);
    });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_event,session)=>{if(alive)setSignedIn(!!session?.user);});
    return ()=>{alive=false;subscription.unsubscribe();};
  }, [supabase,courseSlug,lesson.slug]);

  async function checkAnswer() {
    if (selected === null || saving) return;
    setChecked(true);
    if (selected !== lesson.answer) return;
    setCompleted(true);
    setSaveMessage("");
    try {
      const key = "chessy-learning-progress";
      const saved = JSON.parse(localStorage.getItem(key) || "[]") as string[];
      const id = courseSlug + "/" + lesson.slug;
      if (!saved.includes(id)) localStorage.setItem(key,JSON.stringify([...saved,id]));
    } catch {}
    if (!supabase) { setSaveMessage("Progress is saved on this device. Sign-in syncing will be available after setup."); return; }
    setSaving(true);
    try {
      const {data:{user}} = await supabase.auth.getUser();
      if (!user) { setSaveMessage("Saved on this device. Sign in to sync progress across devices."); return; }
      const {error} = await supabase.from("learning_progress").upsert({user_id:user.id,course_slug:courseSlug,lesson_slug:lesson.slug,xp:10,completed_at:new Date().toISOString()},{onConflict:"user_id,course_slug,lesson_slug"});
      if (error) setSaveMessage("Saved on this device, but cloud sync needs setup. " + error.message);
      else setSaveMessage("Progress synced to your student account.");
    } catch { setSaveMessage("Saved on this device. Cloud sync is temporarily unavailable."); }
    finally { setSaving(false); }
  }

  return <section className="lesson-player wrap">
    <div className="lesson-progress-head"><div><span className="eyebrow">LESSON {lessonNumber} OF {lessonCount}</span><h1>{lesson.title}</h1></div><span className="xp-pill"><Sparkles size={15}/> +10 XP</span></div>
    <div className="lesson-progress-track"><span style={{width:(lessonNumber / lessonCount * 100) + "%"}}/></div>
    <div className="lesson-layout"><article className="lesson-material">
      <div className="material-intro"><div className="material-icon"><BookOpen size={21}/></div><div><span className="eyebrow">TODAY'S LEARNING GOAL</span><p>{lesson.objective}</p></div></div>
      {lesson.sections.map((section,index)=><section className="material-section" key={section.heading}><h2><span>{index+1}</span>{section.heading}</h2><p>{section.body}</p>{section.example&&<div className="lesson-example">{section.example}</div>}</section>)}
      <div className="knowledge-check"><div className="quiz-label"><Sparkles size={15}/> QUICK CHECK · EARN XP</div><h2>{lesson.question}</h2>
        <div className="quiz-options">{lesson.options.map((option,index)=><button key={option} className={"quiz-option " + (selected===index?"selected ":"") + (checked&&index===lesson.answer?"correct ":"") + (checked&&selected===index&&!isCorrect?"incorrect":"")} onClick={()=>{if(!checked)setSelected(index);}} disabled={checked}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>
        {checked&&<div className={"quiz-feedback "+(isCorrect?"success":"try-again")}><strong>{isCorrect?"Excellent work! +10 XP":"Not quite — review and try again."}</strong><p>{lesson.explanation}</p></div>}
        {saveMessage&&<p className="progress-save-message" role="status">{saveMessage}</p>}
        <div className="quiz-actions">{checked&&!isCorrect?<button className="button-primary" onClick={()=>{setSelected(null);setChecked(false);}}>Try again <RotateCcw size={15}/></button>:!checked?<button className="button-primary" onClick={checkAnswer} disabled={selected===null||saving}>{saving?"Saving…":"Check answer"} <ArrowRight size={16}/></button>:<span className="answer-done"><CheckCircle2 size={17}/> Lesson completed</span>}</div>
      </div>
    </article><aside className="lesson-sidebar"><div className="sidebar-card"><span className="eyebrow">YOUR PATH</span><h3>{courseTitle}</h3><div className="sidebar-progress"><span style={{width:completed?"100%":"12%"}}/></div><p>{completed?"Great job — this lesson is complete.":"Learn a little, practise, and keep moving forward."}</p><Link href={"/learn/"+courseSlug} className="sidebar-link">Back to lessons <ArrowRight size={14}/></Link>{!signedIn&&<Link href="/account" className="sidebar-link"><LogIn size={14}/> Sign in to sync progress</Link>}</div><div className="sidebar-card encouragement"><span>✦</span><strong>Keep your streak alive</strong><p>A few minutes of practice each day can build a lasting habit.</p></div></aside></div>
    {completed&&<div className="lesson-complete"><div><CheckCircle2 size={22}/><div><strong>Nice work — lesson complete!</strong><p>{signedIn?"Your progress is linked to your student account.":"Your progress is saved on this device. Sign in to sync it."}</p></div></div><Link className="button-primary" href={nextHref||"/learn/"+courseSlug}>{nextHref?"Next lesson":"Finish course unit"} <ArrowRight size={16}/></Link></div>}
  </section>;
}
