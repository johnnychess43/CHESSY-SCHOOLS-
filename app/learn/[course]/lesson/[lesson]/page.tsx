import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/courses";
import LessonPlayer from "./LessonPlayer";

export default function LessonPage({ params }: { params: { course: string; lesson: string } }) {
  const result = getLesson(params.course, params.lesson);
  if (!result) notFound();
  const { course, lesson } = result;
  const index = course.lessons.findIndex((item) => item.slug === lesson.slug);
  const next = course.lessons[index + 1];
  return <main className="learning-shell">
    <header className="learning-nav wrap"><Link className="brand" href="/#courses"><img className="brand-logo" src="/jchess-icon.svg" alt="" /><span>CHESSY<span className="brand-muted"> SCHOOLS</span><small>LEARN WITHOUT LIMITS</small></span></Link><Link className="learning-back" href={`/learn/${course.slug}`}><ArrowLeft size={15}/> Learning path</Link></header>
    <div className="lesson-topline wrap"><span>{course.title}</span><ChevronRight size={14}/><strong>{lesson.title}</strong></div>
    <LessonPlayer courseSlug={course.slug} courseTitle={course.title} lesson={lesson} lessonNumber={index + 1} lessonCount={course.lessons.length} nextHref={next ? `/learn/${course.slug}/lesson/${next.slug}` : undefined}/>
  </main>;
}
