// Implement a small permissions system. Roles have permissions. Users can have roles. Check if user has permission.

class AccessControl {
  constructor() {
    // TODO: roles -> set(perms), users -> set(roles)
    this.roles = new Map();
    this.users = new Map();
  }

  // TODO: create/update role permissions
  defineRole(roleName, permissionsArray) {
    this.roles.set(roleName, new Set(permissionsArray));
  }

  // TODO: assign role to user
  assignRole(userId, roleName) {
    if (!this.users.has(userId)) {
      this.users.set(userId, new Set());
    }
    this.users.get(userId).add(roleName);
  }

  // TODO: remove role from user
  revokeRole(userId, roleName) {
    if (!this.users.has(userId)) return;
    const userRoles = this.users.get(userId);
    userRoles.delete(roleName);

    // Optional: remove user entry if they have no roles left
    if (userRoles.size === 0) {
      this.users.delete(userId);
    }
  }

  // TODO: check if user has permission
  can(userId, permission) {
    const userRoles = this.users.get(userId);
    if (!userRoles) return false;

    for (let roleName of userRoles) {
      const perms = this.roles.get(roleName);
      if (perms && perms.has(permission)) {
        return true;
      }
    }
    return false;
  }
}


const ac = new AccessControl();
ac.defineRole("admin", ["READ", "WRITE", "DELETE"]);
ac.defineRole("viewer", ["READ"]);

ac.assignRole("u1", "viewer");
ac.assignRole("u2", "admin");

console.log(ac.can("u1", "READ"));
console.log(ac.can("u1", "DELETE"));
console.log(ac.can("u2", "DELETE"));

ac.revokeRole("u2", "admin");
console.log(ac.can("u2", "READ"));



//output:
// true
// false
// true
// false