CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS vector;

SELECT cron.schedule('0 10 * * *', $$DELETE FROM bot_busters_user WHERE bot_busters_user.created_at < NOW() - INTERVAL '24 HOURS' AND bot_busters_user.address IS NULL AND bot_busters_user.username IS NULL$$);