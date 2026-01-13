// Users subscribe to event types. Sending an event delivers a notification to all subscribers’ inbox.
class NotificationService {
  constructor() {
    this.subscriptions = new Map(); // eventType -> Set of userIds
    this.inboxes = new Map();       // userId -> array of notifications
  }

  subscribe(userId, eventType) {
    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, new Set());
    }
    this.subscriptions.get(eventType).add(userId);
  }

  unsubscribe(userId, eventType) {
    if (this.subscriptions.has(eventType)) {
      this.subscriptions.get(eventType).delete(userId);
      // optionally remove empty sets to save memory
      if (this.subscriptions.get(eventType).size === 0) {
        this.subscriptions.delete(eventType);
      }
    }
  }

  notify(eventType, payload) {
    if (!this.subscriptions.has(eventType)) return;
    const users = this.subscriptions.get(eventType);
    for (const userId of users) {
      if (!this.inboxes.has(userId)) {
        this.inboxes.set(userId, []);
      }
      this.inboxes.get(userId).push( { type : eventType, payload });
    }
  }

  getInbox(userId) {
    return this.inboxes.get(userId) || [];
  }
}


const n = new NotificationService();

n.subscribe("u1", "ORDER_SHIPPED");
n.subscribe("u2", "ORDER_SHIPPED");
n.subscribe("u2", "PRICE_DROP");

n.notify("ORDER_SHIPPED", { orderId: 7 });

console.log(n.getInbox("u1"));
console.log(n.getInbox("u2"));
console.log(n.getInbox("u3"));

//output:
// [ { type: 'ORDER_SHIPPED', payload: { orderId: 7 } } ]
// [ { type: 'ORDER_SHIPPED', payload: { orderId: 7 } } ]
// []
