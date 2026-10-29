import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, GraduationCap, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";

export default function LearnCoursePage({ params }: { params: { course: string } }) {
  const course = getCourse(params.course);
  if (!course) notFound();
  return <main className="learning-shell">
    <header className="learning-nav wrap"><Link className="brand" href="/#courses"><img className="brand-logo" src="/jchess-icon.svg" alt="" /><span>CHESSY<span className="brand-muted"> SCHOOLS</span><small>LEARN WITHOUT LIMITS</small></span></Link><Link className="learning-back" href="/#courses"><ArrowLeft size={15}/> All courses</Link></header>
    <section className="learning-hero wrap"><div className="learning-kicker"><Sparkles size={14}/> YOUR LEARNING PATH</div><span className="course-category">{course.category}</span><h1>{course.title}</h1><p>{course.description}</p><div className="learning-stats"><span><BookOpen size={16}/>{course.lessons.length} bite-sized lessons</span><span><Clock3 size={16}/>{course.lessons.reduce((sum, item) => sum + item.minutes, 0)} minutes</span><span><GraduationCap size={16}/>{course.level}</span></div></section>
    <section className="learning-content wrap"><div className="learning-path-heading"><div><span className="eyebrow">YOUR FIRST UNIT</span><h2>Learn by doing</h2><p>Read a short lesson, answer a question, and keep moving forward.</p></div><div className="path-badge"><Sparkles size={16}/> Small steps, real progress</div></div>
      <div className="lesson-path">{course.lessons.map((lesson, index) => <article className="lesson-node" key={lesson.slug}><div className="lesson-number">{String(index + 1).padStart(2, "0")}</div><div className="lesson-node-copy"><span>LESSON {index + 1} · {lesson.minutes} MIN</span><h3>{lesson.title}</h3><p>{lesson.objective}</p></div><Link className="lesson-start" href={`/learn/${course.slug}/lesson/${lesson.slug}`}>{index === 0 ? "Start lesson" : "Open lesson"} <ArrowRight size={16}/></Link></article>)}</div>
      <div className="learning-tip"><span>✦</span><div><strong>Small steps add up.</strong><p>Take each lesson at your own pace and try the quick check to reinforce what you learn.</p></div></div>
    </section>
  </main>;
}
