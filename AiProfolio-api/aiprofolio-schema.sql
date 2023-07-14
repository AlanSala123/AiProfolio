CREATE TABLE users (
    id VARCHAR(255), 
    password VARCHAR(255),
    first_name VARCHAR(255),
    email VARCHAR(255) UNIQUE CHECK (position('@' IN email) > 1)
);
