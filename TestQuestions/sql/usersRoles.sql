-- The following two tables are used to define users and their respective roles:
-- TABLE users
-- id INTEGER NOT NULL PRIMARY KEY, userName VARCHAR (50) NOT NULL
-- TABLE roles
-- id INTEGER NOT NULL PRIMARY KEY, role VARCHAR (20) NOT NULL
-- The usersRoles table should contain the mapping between each user and their roles. Each user can have many roles, and each role can have many users.
-- Modify the provided SQL create table statement so that:
-- • Only users from the users table can exist within usersRoles.
-- • Only roles from the roles table can exist within usersRoles.
-- • A user can only have a specific role once.

-- Modify only this SQL create table statement and nothing else
CREATE TABLE usersRoles (
  userId INTEGER,
  roleId INTEGER,
  PRIMARY KEY (userId, roleId),
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (roleId) REFERENCES roles (id)
);