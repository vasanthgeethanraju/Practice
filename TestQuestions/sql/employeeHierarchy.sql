-- The following data definition defines an organization's employee hierarchy.
-- An employee is a manager if any other employee has their managerld set to this employee's id. That means John is a manager if at least one other employee has their managerld set to John's id.
-- TABLE employees
-- id INTEGER NOT NULL PRIMARY KEY
-- managerld INTEGER
-- name VARCHAR (30) NOT NULL
-- FOREIGN KEY (managerId) REFERENCES employees (id)
-- Write a query that selects only the names of employees who are not managers.

-- Write only the SQL statement that solves the problem and nothing else

SELECT name FROM employees 
WHERE id NOT IN (
  SELECT managerId FROM employees
  WHERE managerId IS NOT NULL
)