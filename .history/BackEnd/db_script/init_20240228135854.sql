SELECT 'CREATE DATABASE kanastra'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'kanastra')\gexec