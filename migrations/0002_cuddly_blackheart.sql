CREATE TABLE IF NOT EXISTS "bot_busters_user_achievement" (
	"user_id" uuid NOT NULL,
	"achievement_id" varchar(32) NOT NULL,
	"achieved_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bot_busters_match" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot_busters_user_achievement" ADD CONSTRAINT "bot_busters_user_achievement_user_id_bot_busters_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "bot_busters_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;