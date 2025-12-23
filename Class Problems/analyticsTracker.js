// 9️⃣ Simple Analytics Tracker (Private Fields + Aggregation)
// Goal: Manage internal state safely.

// Create AnalyticsTracker with:

// private field #events (array of event names)

// Methods:

// track(eventName)

// count(eventName) → number of times it was tracked

// allEvents() → returns object like { "click": 3, "view": 2 }

class AnalyticsTracker {
    #events;       // Array of event names (optional, for history)
    #eventCounts;  // Map for O(1) counts
  
    constructor() {
      this.#events = [];
      this.#eventCounts = {};
    }
  
    /**
     * Track an event by name
     * @param {string} eventName 
     */
    track(eventName) {
      if (typeof eventName !== "string" || eventName.trim() === "") {
        // Ignore invalid or empty strings
        return;
      }
  
      // Store history (optional)
      this.#events.push(eventName);
  
      // Update count
      this.#eventCounts[eventName] = (this.#eventCounts[eventName] || 0) + 1;
    }
  
    /**
     * Get count of a specific event
     * @param {string} eventName 
     * @returns {number}
     */
    count(eventName) {
      if (typeof eventName !== "string") return 0;
      return this.#eventCounts[eventName] || 0;
    }
  
    /**
     * Return all events and their counts
     * @returns {object}
     */
    allEvents() {
      // Return a shallow copy to prevent external mutation
      return { ...this.#eventCounts };
    }
  }
  
  // ------------------
  // Example usage:
  const tracker2 = new AnalyticsTracker();
  tracker2.track("click");
  tracker2.track("view");
  tracker2.track("click");
  tracker2.track("test");
  tracker2.track("");      // ignored
  tracker2.track(null);    // ignored
  tracker2.track(123);     // ignored
  
  console.log(tracker2.count("click")); // 2
  console.log(tracker2.count("view"));  // 1
  console.log(tracker2.count("test"));  // 1
  console.log(tracker2.count("missing")); // 0
  
  console.log(tracker2.allEvents());
  // { click: 2, view: 1, test: 1 }
