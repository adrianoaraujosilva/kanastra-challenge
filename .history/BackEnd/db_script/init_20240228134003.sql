SELECT 'CREATE DATABASE web_mop'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'web_mop')\gexec