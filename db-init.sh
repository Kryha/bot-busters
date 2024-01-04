#!bin/bash

echo "shared_preload_libraries = 'pg_cron'" >> /var/lib/postgresql/data/postgresql.conf

## Restart 
pg_ctl restart

echo added cron extension