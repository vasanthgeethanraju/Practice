-- For an autocomplete feature in an app, English words are stored in a table with the following data definition:
-- TABLE dictionary
-- id INTEGER NOT NULL PRIMARY KEY
-- word VARCHAR (100) NOT NULL
-- To evaluate the user-friendliness of the feature, you need to measure how many word suggestions are returned based on the user's input.
-- For letters 'b', i and 'd' typed in succession, write a query that returns the count of the suggestions as shown in the video below:
-- bid
-- abidance
-- abide
-- abide by
-- abiding
-- bid
-- forbid
-- bide
-- 0:12 / 0:12
-- All words in the table will be in lowercase.
-- See the example case for more details.

SELECT count(*) 
FROM dictionary
WHERE word LIKE '%bid%';