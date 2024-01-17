CREATE TABLE IF NOT EXISTS "bot_busters_match" (
	"id" uuid PRIMARY KEY NOT NULL,
	"room" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bot_busters_rank" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "bot_busters_rank_position_unique" UNIQUE("position")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bot_busters_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(32),
	"address" varchar(63),
	"score" integer DEFAULT 0 NOT NULL,
	"matches_played" uuid[],
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "bot_busters_user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_rank" ADD CONSTRAINT "bot_busters_rank_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bot_busters_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
