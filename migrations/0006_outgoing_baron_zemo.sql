CREATE TABLE IF NOT EXISTS "bot_busters_old_rank" (
	"user_id" uuid,
	"year" integer DEFAULT 2024 NOT NULL,
	"month" integer DEFAULT 1 NOT NULL,
	"day" integer DEFAULT 1 NOT NULL,
	"position" integer NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"bots_busted" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "bot_busters_old_rank_user_id_year_month_day_pk" PRIMARY KEY("user_id","year","month","day")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_old_rank" ADD CONSTRAINT "bot_busters_old_rank_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bot_busters_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
