CREATE TABLE votes (
  id integer PRIMARY KEY,
  option_name varchar(20),
  number_of_votes integer
);

INSERT INTO votes (id, option_name, number_of_votes) VALUES (1, 'tacos', 10);
INSERT INTO votes (id, option_name, number_of_votes) VALUES (2, 'sandwiches', 7);