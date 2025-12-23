class TaskScheduler {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  markDone(name) {
    const task = this.tasks.find(task => task.name === name);
    if (task) {
      task.done = true;
    }
  }

  getPending() {
    return this.tasks
      .filter(task => !task.done)
      .sort((a, b) => b.priority - a.priority)
      .map(task => task.name);
  }
}

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.done = false;
  }
};

const s = new TaskScheduler();

s.addTask(new Task("eat", 1));
s.addTask(new Task("code", 3));
s.addTask(new Task("sleep", 2));

s.markDone("code");

console.log(s.getPending());

// Create a Task class and a TaskScheduler class.

// Task:

// properties: name, priority (number), done (boolean)

// TaskScheduler:

// addTask(task)

// markDone(name)

// getPending() → returns array of pending task names sorted by priority desc (higher first)