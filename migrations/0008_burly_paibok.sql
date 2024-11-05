ALTER TABLE "bot_busters_user" ADD COLUMN "coinbase_uuid" uuid;--> statement-breakpoint
ALTER TABLE "bot_busters_user" ADD CONSTRAINT "bot_busters_user_coinbase_uuid_unique" UNIQUE("coinbase_uuid");