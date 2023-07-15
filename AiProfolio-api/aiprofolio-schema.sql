CREATE TABLE users (
    id VARCHAR(255), 
    password VARCHAR(255),
    first_name VARCHAR(255),
    email VARCHAR(255) UNIQUE CHECK (position('@' IN email) > 1)
);

CREATE TABLE templates (
    template_id Varchar(255),
    code Varchar,
    likes INTEGER
);

CREATE TABLE portfolios (
    id Varchar(255),
    name Varchar(255),
    user_id Varchar(255),
    template_id Varchar(255),
    code Varchar,
    created_at Varchar(255)
);


