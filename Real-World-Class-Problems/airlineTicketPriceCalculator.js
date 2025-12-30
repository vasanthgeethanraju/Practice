// Airline Ticket Price Calculator
// You’re building a tool to calculate the cost of various airplane tickets based on the airline, distance, and seating class.
// Your tool must take in this information as a series of inputs (one ticket calculation per line of input) and produce a list of output costs.
// Each airline contains its own cost requirements. 
// Ultimately, the airline is only interested in two major components: the space (seating class) you take on the plane, and the distance you fly.
// You must generate ticket costs using this gathered data.

// Airlines: United, Delta, Southwest, American
// Operating Costs
// Economy: $0, Premium: $0.10/mile up to a maximum of $25, Business: $50 + $0.25/mile

// Per-Airline Prices
// United charges $0.50/mile + OperatingCost
// Delta charges $0.90/mile
// Southwest charges $0.75/mile + OperatingCost + $0.10/mile for Premium seats
// American charges the maximum of 2 * OperatingCost and $1/mile

// Important note: While only 4 airlines are listed above, your solution should be able to expand to dozens of individual airlines, 
// whose ticket cost can be based on arbitrary functions of OperatingCosts, miles, and/or seating class.

// You can assume the input will be provided as a list of strings and that there could be millions of lines of input.
// Each string will provide the Airline, Distance, and Seating Class.

class SeatingClass {
  static ECONOMY = 'Economy';
  static PREMIUM = 'Premium';
  static BUSINESS = 'Business';
}

class OperatingCost {
  static calculate(seatingClass, miles) {
    switch (seatingClass) {
      case SeatingClass.ECONOMY:
        return 0;
      case SeatingClass.PREMIUM:
        return Math.min(0.10 * miles, 25);
      case SeatingClass.BUSINESS:
        return 50 + 0.25 * miles;
      default:
        throw new Error(`Unknown seating class: ${seatingClass}`);
    }
  }
}

// Base Airline class
class Airline {
  constructor(name) {
    this.name = name;
  }

  calculatePrice(miles, seatingClass) {
    throw new Error('calculatePrice must be implemented by subclass');
  }
}

// Specific airline implementations
class United extends Airline {
  constructor() {
    super('United');
  }

  calculatePrice(miles, seatingClass) {
    const opCost = OperatingCost.calculate(seatingClass, miles);
    return 0.50 * miles + opCost;
  }
}

class Delta extends Airline {
  constructor() {
    super('Delta');
  }

  calculatePrice(miles, seatingClass) {
    return 0.90 * miles;
  }
}

class Southwest extends Airline {
  constructor() {
    super('Southwest');
  }

  calculatePrice(miles, seatingClass) {
    const opCost = OperatingCost.calculate(seatingClass, miles);
    const premiumSurcharge = seatingClass === SeatingClass.PREMIUM ? 0.10 * miles : 0;
    return 0.75 * miles + opCost + premiumSurcharge;
  }
}

class American extends Airline {
  constructor() {
    super('American');
  }

  calculatePrice(miles, seatingClass) {
    const opCost = OperatingCost.calculate(seatingClass, miles);
    return Math.max(2 * opCost, 1.00 * miles);
  }
}

// Main calculator system
class TicketPriceCalculator {
  constructor() {
    this.airlines = new Map();
    this._registerAirlines();
  }

  _registerAirlines() {
    // Register all airlines
    const airlines = [
      new United(),
      new Delta(),
      new Southwest(),
      new American()
    ];

    airlines.forEach(airline => {
      this.airlines.set(airline.name.toLowerCase(), airline);
    });
  }

  // Method to add new airlines dynamically
  registerAirline(airline) {
    this.airlines.set(airline.name.toLowerCase(), airline);
  }

  calculateTicket(airlineName, miles, seatingClass) {
    const airline = this.airlines.get(airlineName.toLowerCase());
    
    if (!airline) {
      throw new Error(`Airline not found: ${airlineName}`);
    }

    return airline.calculatePrice(miles, seatingClass);
  }

  // Process multiple ticket requests
  processTickets(inputs) {
    const results = [];
    
    for (const input of inputs) {
      try {
        const [airline, miles, seatingClass] = input.split(',').map(s => s.trim());
        const cost = this.calculateTicket(airline, parseFloat(miles), seatingClass);
        results.push({
          input,
          cost: cost.toFixed(2),
          success: true
        });
      } catch (error) {
        results.push({
          input,
          error: error.message,
          success: false
        });
      }
    }
    
    return results;
  }
}

// Demo Usage
console.log('=== Airline Ticket Price Calculator Demo ===\n');

const calculator = new TicketPriceCalculator();

// Test cases
const testInputs = [
  'United, 100, Economy',
  'Delta, 100, Economy',
  'Southwest, 100, Premium',
  'American, 100, Business',
  'United, 500, Business',
  'Delta, 200, Premium',
  'Southwest, 150, Economy',
  'American, 50, Economy'
];

console.log('Processing tickets:\n');
const results = calculator.processTickets(testInputs);

results.forEach(result => {
  if (result.success) {
    console.log(`${result.input} → $${result.cost}`);
  } else {
    console.log(`${result.input} → ERROR: ${result.error}`);
  }
});

console.log('\n=== Detailed Calculation Examples ===\n');

// Example 1: United Economy
console.log('United, 100 miles, Economy:');
console.log('  Operating Cost: $0');
console.log('  United: $0.50/mile');
console.log('  Total: $50.00\n');

// Example 2: Southwest Premium
console.log('Southwest, 100 miles, Premium:');
console.log('  Operating Cost: min($0.10 * 100, $25) = $10');
console.log('  Southwest: $0.75/mile + Operating + $0.10/mile (premium)');
console.log('  Total: $75 + $10 + $10 = $95.00\n');

// Example 3: American Business
console.log('American, 100 miles, Business:');
console.log('  Operating Cost: $50 + $0.25 * 100 = $75');
console.log('  American: max(2 * $75, $1 * 100) = max($150, $100)');
console.log('  Total: $150.00');