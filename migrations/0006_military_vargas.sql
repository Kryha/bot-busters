CREATE TABLE IF NOT EXISTS "bot_busters_old_rank" (
	"season" integer NOT NULL,
	"user_id" uuid,
	"position" integer NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"bots_busted" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp,
	"expired_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "bot_busters_old_rank_user_id_season_pk" PRIMARY KEY("user_id","season")
);
--> statement-breakpoint
ALTER TABLE "bot_busters_match" ADD COLUMN "season" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "bot_busters_rank" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_old_rank" ADD CONSTRAINT "bot_busters_old_rank_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bot_busters_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
