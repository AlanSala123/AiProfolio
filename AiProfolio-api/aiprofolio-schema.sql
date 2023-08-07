CREATE TABLE users (
    id VARCHAR(255), 
    password VARCHAR(255),
    first_name VARCHAR(255),
    email VARCHAR(255) UNIQUE CHECK (position('@' IN email) > 1),
    hosted_id TEXT
);

CREATE TABLE portfolios (
    id Varchar(255),
    user_id Varchar(255),
    template_code TEXT,
    resume_data TEXT
);

CREATE TABLE images (
    id VARCHAR(255),
    portfolio_id VARCHAR(255),
    label VARCHAR(255),
    serialized BYTEA,
    mimetype TEXT
);


