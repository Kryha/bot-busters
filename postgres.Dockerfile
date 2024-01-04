FROM ankane/pgvector

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-15-cron

RUN echo "shared_preload_libraries = 'pg_cron'" >> /usr/share/postgresql/postgresql.conf.sample