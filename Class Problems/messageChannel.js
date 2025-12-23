// Goal: Base class + polymorphic behavior.

// Create:

// Base class Channel with method send(message)

// Subclasses:

// EmailChannel(address)

// SMSChannel(number)

// Messenger:

// constructor takes a Channel

// deliver(msg) → uses channel’s send and returns its result

class Channel {
  send(msg) {
    return msg;
  }
}

class EmailChannel extends Channel {
  constructor(email) {
    super();
    this.email = email;
  }
  send(msg) {
    return `Email to ${this.email}: ${msg}`;
  }
}

class SMSChannel extends Channel {
  constructor(number) {
    super();
    this.number = number;
  }
  send(msg) {
    return `SMS to ${this.number}: ${msg}`;
  }
}

class Messenger {
  constructor(channel) {
    this.channel = channel;
  }
  deliver(msg) {
    return this.channel.send(msg);
  }
}

// Input:
const emailMessenger = new Messenger(new EmailChannel("test@example.com"));
const smsMessenger = new Messenger(new SMSChannel("1234567890"));

console.log(emailMessenger.deliver("Hello"));
console.log(smsMessenger.deliver("Hi"));

// Expected output:

// "Email to test@example.com: Hello"
// "SMS to 1234567890: Hi"