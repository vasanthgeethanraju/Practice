// 7️⃣ Multi-Level Inheritance: User → Staff → Teacher
// Goal: Understand inheritance chains & super.
// Create:
// User: username, method describe() → "User: <username>"
// Staff extends User: department, override describe() → "Staff: <username> (<department>)"
// Teacher extends Staff: subject, override describe() → "Teacher: <username> (<department>) - <subject>"

class User {
  constructor(username) {
    this.username = username;
  }
  describe() {
    return `User: ${this.username}`;
  }
}

class Staff extends User {
  constructor (username, department){
    super(username);
    this.department = department;
  }
  describe() {
    return `Staff: ${this.username} (${this.department})`;
  }
}

class Teacher extends Staff {
  constructor (username, department, subject){
    super(username, department);
    this.subject = subject;
  }
  describe() {
    return `Teacher: ${this.username} (${this.department}) -  ${this.subject}`;
  }
}
// Input: 
const u2 = new User("ashwin");
const s2 = new Staff("ram", "Admin");
const t2 = new Teacher("shyam", "Science", "Physics");

console.log(u2.describe());
console.log(s2.describe());
console.log(t2.describe());



// output:
// "User: ashwin"
// "Staff: ram (Admin)"
// "Teacher: shyam (Science) - Physics"