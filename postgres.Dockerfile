FROM ankane/pgvector

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-15-cron

COPY ./db-init.sh /docker-entrypoint-initdb.d/db-init.sh

RUN chmod +x /docker-entrypoint-initdb.d/db-init.sh