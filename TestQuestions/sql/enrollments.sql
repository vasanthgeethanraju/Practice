-- The following table contains students enrolled in a yearly course:
-- TABLE enrollments
-- id INTEGER NOT NULL PRIMARY KEY
-- year INTEGER NOT NULL
-- studentId INTEGER NOT NULL
-- Records with IDs between 20 and 100 (inclusive) contain incorrect data.
-- Write a query that updates the year field of every faulty record to 2015.

UPDATE enrollments
SET year = 2015 
WHERE id >= 20 AND id <= 100;