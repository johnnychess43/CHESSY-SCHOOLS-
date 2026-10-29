-- Run this SQL in the SQL Editor of the Supabase project dedicated to CHESSY SCHOOLS.
create table if not exists public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null check (char_length(course_slug) between 1 and 120),
  lesson_slug text not null check (char_length(lesson_slug) between 1 and 120),
  xp integer not null default 10 check (xp between 0 and 1000),
  completed_at timestamptz not null default now(),
  primary key (user_id, course_slug, lesson_slug)
);
alter table public.learning_progress enable row level security;
drop policy if exists "Students can read their own progress" on public.learning_progress;
create policy "Students can read their own progress" on public.learning_progress for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Students can insert their own progress" on public.learning_progress;
create policy "Students can insert their own progress" on public.learning_progress for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Students can update their own progress" on public.learning_progress;
create policy "Students can update their own progress" on public.learning_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant select, insert, update on public.learning_progress to authenticated;
