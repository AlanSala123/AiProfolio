\echo 'Delete and recreate aiprofolio db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE aiprofolio;
CREATE DATABASE aiprofolio;
\connect aiprofolio

\i aiprofolio-schema.sql
\i aiprofolio-test.sql