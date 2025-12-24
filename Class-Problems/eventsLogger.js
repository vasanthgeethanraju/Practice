// Problem 5: EventBus + Service Communication 
// Create: EventBus class: subscribe(event, handler) publish(event, data) 
// UserService uses the EventBus to announce "user_created" 
// LoggerService logs events when triggered 

// EventBus class to manage subscriptions and publishing events
class EventBus {
  constructor() {
    this.events = {};  // stores the event handlers
  }

  // Subscribe to an event
  subscribe(event, handler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  // Publish an event to all its subscribers
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(data));
    }
  }
}

// LoggerService class to log events when triggered
class LoggerService {
  constructor(eventBus) {
    this.eventBus = eventBus;
    // Subscribe to "user_created" event
    this.eventBus.subscribe("user_created", this.logEvent.bind(this));
  }

  // Log the event with data
  logEvent(data) {
    console.log(`[LOG] user_created: ${data}`);
  }
}

// UserService class to create a user and trigger "user_created" event
class UserService {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  // Create a user and announce the event
  create(username) {
    this.eventBus.publish("user_created", username);
  }
}

// Example usage:

// Create an instance of EventBus
const bus = new EventBus();

// Create instances of LoggerService and UserService, passing EventBus to both
const logger = new LoggerService(bus);
const users = new UserService(bus);

// Create a new user "Ashwin" and trigger the event
users.create("Ashwin");

// Expected Output: "[LOG] user_created: Ashwin"
