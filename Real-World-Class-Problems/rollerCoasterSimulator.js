// Roller Coaster Simulator
// You’re working on a new video game in which players build roller coasters for a simulated theme park. 
// You need to create a system to produce an overall score for each submitted coaster so they may be ranked in an online leaderboard.

// Input
// You can assume the input will be provided as a list of strings describing the roller coaster type followed by the stats for each coaster. 
// All stats are numbers except LiftType, which is a string that can take one of the following values: “Cable”, “Chain”, “Launched”. The input format is as follows:
// RollerCoasterType MaxSpeed BumpsPerSecond LiftType
// Per-type Coaster Scoring Functions
// For this problem we will consider only the three coaster types described below, but your solution should be able to scale to 10-20 different roller coaster types and be able to process many roller coasters efficiently. 
// The score function is broken down into two parts, the “Comfort” score, and the “Overall” score, defined below. Your tool should print out “Overall” score, for use in the leaderboard rankings.
// Comfort
// The comfort of a roller coaster can be an arbitrary function of MaxSpeed, BumpsPerSecond, and LiftType. Unless otherwise stated, the comfort score is computed as follows:
// Comfort: min(1.0, 1.0 / BumpsPerSecond, 1.0 / MaxSpeed)
// Overall
// The overall score of a roller coaster is computed as follows, where ScaleFactor is a constant scaling factor that differs by roller coaster type:
// Overall: ScaleFactor * Comfort * MaxSpeed
// Roller Coaster Types
// The roller coaster types you will need to consider are as follows:
// 1. Wooden
//     - ScaleFactor: 1.0
// 2. Steel
//     - ScaleFactor: 2.0
//     - Comfort: min(1.0, 1.0 / BumpsPerSecond, 5 / MaxSpeed)
// 3. Suspended
//     - ScaleFactor: 0.5
//     - A LiftType of "Cable" adds an additional 0.5 to Comfort
// Example
// Input
// Wooden 4 1.0 Chain
// Steel 20 2.0 Cable
// Suspended 2 1.5 Cable
// Suspended 2 1.5 Chain
// Output
// Overall: 1.0
// Overall: 10.0
// Overall: 1.0
// Overall: 0.5
// Explanation of Output
// Comfort = min(1.0, 1.0/1.0, 1/4); Overall = 4.0*0.25=1.0
// Comfort = min(1.0, 1.0/2.0, 5/20); Overall = 2*20*0.25=10.0
// Comfort = min(1.0, 1.0/1.5, 1/2) + 0.5; Overall = 0.5*2.0*1.0=1.0
// Comfort = min(1.0, 1.0/1.5, 1/2); Overall = 0.5*2.0*0.5=0.5

// Roller Coaster Scoring System - Interview Optimal Solution

class LiftType {
  static CHAIN = "Chain";
  static CABLE = "Cable";
  static LAUNCHED = "Launched";
}

// Base class with default behavior
class RollerCoaster {
  constructor(name, scaleFactor) {
    this.name = name;
    this.scaleFactor = scaleFactor;
  }

  // Default comfort calculation
  calculateComfort(maxSpeed, bumpsPerSecond, liftType) {
    return Math.min(1.0, 1.0 / bumpsPerSecond, 1.0 / maxSpeed);
  }

  // Overall score formula (same for all types)
  calculateOverallScore(maxSpeed, bumpsPerSecond, liftType) {
    const comfort = this.calculateComfort(maxSpeed, bumpsPerSecond, liftType);
    return this.scaleFactor * comfort * maxSpeed;
  }
}

class Wooden extends RollerCoaster {
  constructor() {
    super("Wooden", 1.0);
  }
  // Uses default comfort calculation from base class
}

class Steel extends RollerCoaster {
  constructor() {
    super("Steel", 2.0);
  }

  // Override: Different comfort formula for Steel
  calculateComfort(maxSpeed, bumpsPerSecond, liftType) {
    return Math.min(1.0, 1.0 / bumpsPerSecond, 5.0 / maxSpeed);
  }
}

class Suspended extends RollerCoaster {
  constructor() {
    super("Suspended", 0.5);
  }

  // Override: Cable lift adds bonus comfort
  calculateComfort(maxSpeed, bumpsPerSecond, liftType) {
    const baseComfort = Math.min(1.0, 1.0 / bumpsPerSecond, 1.0 / maxSpeed);
    const cableBonus = (liftType === LiftType.CABLE) ? 0.5 : 0;
    return baseComfort + cableBonus;
  }
}

class RollerCoasterScorer {
  constructor() {
    this.coasterTypes = new Map();
    this._registerCoasterTypes();
  }

  _registerCoasterTypes() {
    const types = [new Wooden(), new Steel(), new Suspended()];
    
    types.forEach(coaster => {
      this.coasterTypes.set(coaster.name.toLowerCase(), coaster);
    });
  }

  // Add new coaster types dynamically (for extensibility)
  registerCoasterType(coaster) {
    this.coasterTypes.set(coaster.name.toLowerCase(), coaster);
  }

  // Process batch inputs
  processCoasters(inputs) {
    return inputs.map(input => {
      const parts = input.split(" ").map(s => s.trim());
      const [type, maxSpeed, bumpsPerSecond, liftType] = parts;
      
      const coaster = this.coasterTypes.get(type.toLowerCase());
      
      if (!coaster) {
        throw new Error(`Unknown coaster type: ${type}`);
      }
      
      const score = coaster.calculateOverallScore(
        parseFloat(maxSpeed),
        parseFloat(bumpsPerSecond),
        liftType
      );
      
      return `Overall: ${score.toFixed(1)}`;
    });
  }
}

// ===== DEMO =====
console.log('=== Roller Coaster Scoring System ===\n');

const inputs = [
  "Wooden 4 1.0 Chain",
  "Steel 20 2.0 Cable",
  "Suspended 2 1.5 Cable",
  "Suspended 2 1.5 Chain"
];

const scorer = new RollerCoasterScorer();
const results = scorer.processCoasters(inputs);

console.log('Results:');
results.forEach((result, i) => {
  console.log(`${i + 1}. ${inputs[i]}`);
  console.log(`   ${result}\n`);
});
