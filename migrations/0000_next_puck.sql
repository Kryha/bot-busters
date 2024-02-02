CREATE TABLE IF NOT EXISTS "bot_busters_match" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"room" json NOT NULL,
	"messages" json DEFAULT '[]'::json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bot_busters_rank" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "bot_busters_rank_position_unique" UNIQUE("position")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bot_busters_user_achievement" (
	"user_id" uuid NOT NULL,
	"achievement_id" varchar(32) NOT NULL,
	"achieved_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bot_busters_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(32),
	"address" varchar(63),
	"score" integer DEFAULT 0 NOT NULL,
	"bots_busted" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "bot_busters_user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bot_busters_user_match" (
	"user_id" uuid NOT NULL,
	"match_id" uuid NOT NULL,
	CONSTRAINT "id" PRIMARY KEY("user_id","match_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_rank" ADD CONSTRAINT "bot_busters_rank_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "bot_busters_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_user_achievement" ADD CONSTRAINT "bot_busters_user_achievement_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "bot_busters_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_user_match" ADD CONSTRAINT "bot_busters_user_match_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "bot_busters_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_user_match" ADD CONSTRAINT "bot_busters_user_match_match_id_bot_busters_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "bot_busters_match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
