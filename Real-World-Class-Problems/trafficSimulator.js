// Design and implement a Traffic Signal Management System that can manage multiple traffic signals across a city.
// Requirements:

// Traffic Signal Management:

// Add new traffic signals with an ID and location
// Each signal should maintain a queue of waiting vehicles
// Signals can be in states: RED, YELLOW, or GREEN


// Vehicle Management:

// Add vehicles to a specific signal's queue
// Each vehicle has an ID and type (CAR, BIKE, TRUCK)
// Track vehicles waiting at each signal


// Signal Operations:

// Change signal state (RED → YELLOW → GREEN)
// When a signal turns GREEN, all waiting vehicles should be cleared
// Get the current status of any signal (state and queue length)
// Vehicle Class
class Vehicle {
  constructor(id, type) {
    this.id = id;
    this.type = type; // 'CAR', 'BIKE', 'TRUCK'
  }
}

// Traffic Signal Class
class TrafficSignal {
  constructor(id, location) {
    this.id = id;
    this.location = location;
    this.state = 'RED';
    this.queue = [];
  }

  addVehicle(vehicle) {
    this.queue.push(vehicle);
    return `Vehicle ${vehicle.id} added. Queue: ${this.queue.length}`;
  }

  changeState(newState) {
    this.state = newState;
    
    if (newState === 'GREEN') {
      return this.clearVehicles();
    }
    return `Signal ${this.id} is now ${newState}`;
  }

  clearVehicles() {
    const count = this.queue.length;
    this.queue = [];
    return `${count} vehicles cleared from ${this.id}`;
  }
}

// Traffic System
class TrafficSystem {
  constructor() {
    this.signals = new Map();
    this.vehicleId = 1;
  }

  addSignal(id, location) {
    if (this.signals.has(id)) {
      throw new Error('Signal already exists');
    }
    this.signals.set(id, new TrafficSignal(id, location));
    return `Signal ${id} added`;
  }

  addVehicle(signalId, type) {
    const signal = this.signals.get(signalId);
    if (!signal) {
      throw new Error('Signal not found');
    }
    
    const vehicle = new Vehicle(`V${this.vehicleId++}`, type);
    return signal.addVehicle(vehicle);
  }

  changeLight(signalId, state) {
    const signal = this.signals.get(signalId);
    if (!signal) {
      throw new Error('Signal not found');
    }
    return signal.changeState(state);
  }

  getStatus(signalId) {
    const signal = this.signals.get(signalId);
    if (!signal) {
      throw new Error('Signal not found');
    }
    
    return {
      id: signal.id,
      state: signal.state,
      queue: signal.queue.length
    };
  }
}

// ========== DEMO ==========
console.log('=== Traffic System Demo ===\n');

const system = new TrafficSystem();

// Add signal
console.log(system.addSignal('S1', 'Main St'));

// Add vehicles
console.log(system.addVehicle('S1', 'CAR'));
console.log(system.addVehicle('S1', 'BIKE'));
console.log(system.addVehicle('S1', 'TRUCK'));

// Check status
console.log('\nStatus:', system.getStatus('S1'));

// Change to GREEN
console.log('\n' + system.changeLight('S1', 'GREEN'));

// Check status again
console.log('Status:', system.getStatus('S1'));

// Error handling
console.log('\nError Test:');
try {
  system.addVehicle('S99', 'CAR');
} catch (e) {
  console.log('Error:', e.message);
}