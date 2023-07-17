INSERT INTO users
(id, password, first_name, email)
VALUES 
('test-id', 'test-password', 'test-first_name', 'test-email@test.com');

INSERT INTO templates 
(template_id, code, likes)
VALUES
('1', 'blah', 10),
('2', 'woah', 15),
('3', 'grey', 30);

INSERT INTO portfolios 
(id, name, user_id, template_id, code, created_at)
VALUES
('1', 'test-name', 'test-userid', 'test-templateid', 'test-code', 'test-created-at')