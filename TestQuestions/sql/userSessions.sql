-- App usage data are kept in the following table:
-- TABLE sessions
-- id INTEGER PRIMARY KEY, userId INTEGER NOT NULL, duration DECIMAL NOT NULL
-- Write a query that returns, for each user who has more than one session:
-- • The userld.
-- • The average session duration.

SELECT userId, AVG(duration) AS AverageDuration from sessions
GROUP BY userId 
HAVING count(*) > 1
