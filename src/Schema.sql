-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.challenges (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  resource_link text,
  flag text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT challenges_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profile (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  email character varying NOT NULL DEFAULT ''::character varying UNIQUE,
  team_name character varying NOT NULL UNIQUE,
  is_admin boolean NOT NULL,
  created_at timestamp with time zone
);
CREATE TABLE public.submission_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL,
  submitted_flag text NOT NULL,
  is_correct boolean NOT NULL,
  submitted_at timestamp with time zone DEFAULT now(),
  CONSTRAINT submission_logs_pkey PRIMARY KEY (id),
  CONSTRAINT submission_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT submission_logs_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenges(id)
);
CREATE TABLE public.user_challenges (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL,
  solved boolean DEFAULT false,
  points integer DEFAULT 0,
  solved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_challenges_pkey PRIMARY KEY (id),
  CONSTRAINT user_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_challenges_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenges(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  email text NOT NULL,
  team_name text,
  is_admin boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  score integer NOT NULL DEFAULT 0,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- Trigger function to automatically update user score when a challenge is solved
CREATE OR REPLACE FUNCTION update_user_score()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.solved = true AND (OLD IS NULL OR OLD.solved = false) THEN
    UPDATE public.users
    SET score = score + NEW.points
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to fire on INSERT or UPDATE of solved status in user_challenges
DROP TRIGGER IF EXISTS trigger_update_user_score ON public.user_challenges;
CREATE TRIGGER trigger_update_user_score
  AFTER INSERT OR UPDATE OF solved, user_id, points
  ON public.user_challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_user_score();
