// Design an Elevator System – Model a system controlling multiple elevators in a building. 
// You’ll need to handle elevator state, movement, request scheduling (allocating elevators to requests), etc. 
// This is a well-known OOD interview question (asked at companies such as VMware, among others) and is considered “one of the famous LLD problems being asked in interviews”. 
// The design often involves classes like Elevator, ElevatorController, Request, and may use a state machine or strategy pattern for scheduling algorithms.

class Elevator {
  constructor(id, startFloor = 0) {
    this.id = id;
    this.floor = startFloor;
    this.targets = []; // simple FIFO queue of floors
  }

  addTarget(floor) {
    // avoid duplicates for cleanliness (optional)
    if (!this.targets.includes(floor)) this.targets.push(floor);
  }

  step() {
    if (this.targets.length === 0) return;

    const target = this.targets[0];

    if (this.floor < target) this.floor += 1;
    else if (this.floor > target) this.floor -= 1;

    // reached target
    if (this.floor === target) {
      this.targets.shift();
    }
  }

  status() {
    return { id: this.id, floor: this.floor, targets: [...this.targets] };
  }
}

class ElevatorSystem {
  constructor(numElevators, startFloor = 0) {
    this.elevators = Array.from({ length: numElevators }, (_, i) => {
      return new Elevator(i + 1, startFloor);
    });
  }

  // external request (hall call)
  requestPickup(floor) {
    const elevator = this._nearestElevator(floor);
    elevator.addTarget(floor);
    return elevator.id;
  }

  // internal request (car call)
  requestDropoff(elevatorId, floor) {
    const elevator = this.elevators.find((e) => e.id === elevatorId);
    elevator.addTarget(floor);
  }

  step() {
    for (const e of this.elevators) e.step();
  }

  _nearestElevator(floor) {
    let best = this.elevators[0];
    let bestDist = Math.abs(best.floor - floor);

    for (const e of this.elevators) {
      const d = Math.abs(e.floor - floor);
      if (d < bestDist) {
        best = e;
        bestDist = d;
      }
    }
    return best;
  }

  snapshot() {
    return this.elevators.map((e) => e.status());
  }
}

// ----- Demo -----
const system = new ElevatorSystem(2, 0);

console.log("Initial:", system.snapshot());

// Someone at floor 5 requests pickup
const eid = system.requestPickup(5);
console.log("Assigned elevator:", eid);

// Inside that elevator, user presses 9
system.requestDropoff(eid, 9);

// simulate ticks
for (let t = 1; t <= 12; t++) {
  system.step();
  console.log(`Tick ${t}:`, system.snapshot());
}


// const Direction = Object.freeze({
//   UP: "UP",
//   DOWN: "DOWN",
//   IDLE: "IDLE",
// });

// const ElevatorState = Object.freeze({
//   MOVING: "MOVING",
//   STOPPED: "STOPPED",
//   MAINTENANCE: "MAINTENANCE",
// });

// class Elevator {
//   constructor(id, minFloor, maxFloor) {
//     this.id = id;
//     this.minFloor = minFloor;
//     this.maxFloor = maxFloor;

//     this.currentFloor = minFloor; // start at minFloor
//     this.direction = Direction.IDLE;
//     this.state = ElevatorState.STOPPED;

//     this.requests = new Set(); // floors to visit
//   }

//   addRequest(floor) {
//     if (floor < this.minFloor || floor > this.maxFloor) return false;
//     this.requests.add(floor);
//     return true;
//   }

//   move() {
//     if (this.state === ElevatorState.MAINTENANCE) {
//       console.log(`Elevator ${this.id} is under maintenance`);
//       return;
//     }

//     if (this.requests.size === 0) {
//       this.direction = Direction.IDLE;
//       this.state = ElevatorState.STOPPED;
//       console.log(`Elevator ${this.id} is idle at floor ${this.currentFloor}`);
//       return;
//     }

//     // Stop immediately if we are already on a requested floor
//     if (this.requests.has(this.currentFloor)) {
//       this.stop();
//       return;
//     }

//     this.state = ElevatorState.MOVING;
//     this.updateDirection();

//     if (this.direction === Direction.UP && this.currentFloor < this.maxFloor) {
//       this.currentFloor++;
//     } else if (
//       this.direction === Direction.DOWN &&
//       this.currentFloor > this.minFloor
//     ) {
//       this.currentFloor--;
//     } else {
//       // Can't move further; go idle/flip next tick
//       this.direction = Direction.IDLE;
//     }

//     console.log(
//       `Elevator ${this.id} moving ${this.direction} to floor ${this.currentFloor}`
//     );

//     if (this.requests.has(this.currentFloor)) {
//       this.stop();
//     }
//   }

//   stop() {
//     this.state = ElevatorState.STOPPED;
//     this.requests.delete(this.currentFloor);
//     console.log(`Elevator ${this.id} stopped at floor ${this.currentFloor}. Doors open...`);
//   }

//   updateDirection() {
//     const hasAbove = [...this.requests].some((f) => f > this.currentFloor);
//     const hasBelow = [...this.requests].some((f) => f < this.currentFloor);

//     // SCAN-ish: keep going same direction if possible
//     if (this.direction === Direction.UP) {
//       this.direction = hasAbove ? Direction.UP : hasBelow ? Direction.DOWN : Direction.IDLE;
//     } else if (this.direction === Direction.DOWN) {
//       this.direction = hasBelow ? Direction.DOWN : hasAbove ? Direction.UP : Direction.IDLE;
//     } else {
//       // idle: choose nearest side (simple heuristic)
//       if (!hasAbove && !hasBelow) this.direction = Direction.IDLE;
//       else if (hasAbove && !hasBelow) this.direction = Direction.UP;
//       else if (!hasAbove && hasBelow) this.direction = Direction.DOWN;
//       else {
//         // both exist: go toward nearest request
//         const closest = this._closestRequest();
//         this.direction = closest > this.currentFloor ? Direction.UP : Direction.DOWN;
//       }
//     }
//   }

//   _closestRequest() {
//     let best = null;
//     let bestDist = Infinity;
//     for (const f of this.requests) {
//       const d = Math.abs(f - this.currentFloor);
//       if (d < bestDist) {
//         bestDist = d;
//         best = f;
//       }
//     }
//     return best;
//   }

//   getStatus() {
//     return {
//       id: this.id,
//       floor: this.currentFloor,
//       direction: this.direction,
//       state: this.state,
//       pendingRequests: [...this.requests].sort((a, b) => a - b),
//     };
//   }
// }

// class ElevatorController {
//   constructor(numElevators, minFloor, maxFloor) {
//     this.elevators = Array.from({ length: numElevators }, (_, i) => {
//       return new Elevator(i + 1, minFloor, maxFloor);
//     });
//   }

//   requestElevator(floor, direction) {
//     console.log(`\n🔔 External request: Floor ${floor}, Direction ${direction}`);
//     const elevator = this.findBestElevator(floor, direction);

//     if (!elevator) {
//       console.log("No available elevator");
//       return;
//     }

//     elevator.addRequest(floor);
//     console.log(`Assigned Elevator ${elevator.id}`);
//   }

//   requestFloor(elevatorId, floor) {
//     const elevator = this.elevators.find((e) => e.id === elevatorId);
//     if (!elevator) return;

//     console.log(`\n🔘 Internal request: Elevator ${elevatorId} to floor ${floor}`);
//     elevator.addRequest(floor);
//   }

//   findBestElevator(floor, direction) {
//     let best = null;
//     let bestScore = Infinity;

//     for (const e of this.elevators) {
//       if (e.state === ElevatorState.MAINTENANCE) continue;

//       const distance = Math.abs(e.currentFloor - floor);

//       // Idle elevators are preferred
//       if (e.direction === Direction.IDLE) {
//         const score = distance; // best
//         if (score < bestScore) (bestScore = score), (best = e);
//         continue;
//       }

//       // On-the-way elevators (same direction and will pass the floor)
//       if (
//         e.direction === direction &&
//         ((direction === Direction.UP && e.currentFloor <= floor) ||
//           (direction === Direction.DOWN && e.currentFloor >= floor))
//       ) {
//         const score = distance + 1; // small penalty vs idle
//         if (score < bestScore) (bestScore = score), (best = e);
//         continue;
//       }

//       // Fallback candidate: still consider but penalize
//       const score = distance + 10;
//       if (score < bestScore) (bestScore = score), (best = e);
//     }

//     return best;
//   }

//   step() {
//     console.log("\n--- Step ---");
//     for (const e of this.elevators) e.move();
//   }

//   simulate(steps) {
//     for (let i = 0; i < steps; i++) this.step();
//   }

//   displayStatus() {
//     console.log("\n=== Elevator System Status ===");
//     for (const e of this.elevators) {
//       const s = e.getStatus();
//       console.log(
//         `Elevator ${s.id}: Floor ${s.floor}, ${s.direction}, ${s.state}, Pending: [${s.pendingRequests.join(
//           ", "
//         )}]`
//       );
//     }
//     console.log("=============================\n");
//   }
// }

// // Demo
// console.log("🏢 Elevator System Simulation\n");
// const controller = new ElevatorController(3, 0, 10);

// controller.displayStatus();

// controller.requestElevator(5, Direction.UP);
// controller.requestElevator(8, Direction.DOWN);
// controller.requestFloor(1, 7);

// controller.displayStatus();

// console.log("\n🎬 Starting simulation...");
// controller.simulate(15);

// controller.displayStatus();

// controller.requestElevator(3, Direction.UP);
// controller.requestFloor(2, 10);

// controller.simulate(10);
// controller.displayStatus();


// // -------------------- Enums --------------------
// const Direction = Object.freeze({
//   UP: "UP",
//   DOWN: "DOWN",
//   IDLE: "IDLE",
// });

// const ElevatorState = Object.freeze({
//   IDLE: "IDLE",
//   MOVING: "MOVING",
//   DOORS_OPEN: "DOORS_OPEN",
// });

// // -------------------- Requests --------------------
// class HallRequest {
//   constructor(floor, direction) {
//     this.floor = floor;
//     this.direction = direction; // UP/DOWN
//   }
// }

// // -------------------- Scheduler Strategy --------------------
// class NearestCarStrategy {
//   /**
//    * Simple scoring:
//    * - Prefer elevators already moving toward the request floor in same direction.
//    * - Otherwise pick the nearest idle elevator.
//    * - Otherwise pick the nearest elevator by distance (fallback).
//    */
//   selectElevator(elevators, request) {
//     let best = null;
//     let bestScore = Infinity;

//     for (const e of elevators) {
//       const score = this._score(e, request);
//       if (score < bestScore) {
//         bestScore = score;
//         best = e;
//       }
//     }
//     return best;
//   }

//   _score(elevator, request) {
//     const distance = Math.abs(elevator.currentFloor - request.floor);

//     // If idle: good candidate
//     if (elevator.state === ElevatorState.IDLE) {
//       return distance; // simplest
//     }

//     // If moving, prefer "on the way"
//     if (elevator.direction === Direction.UP) {
//       const onTheWay = request.floor >= elevator.currentFloor;
//       const sameHallDir = request.direction === Direction.UP;
//       if (onTheWay && sameHallDir) return distance - 0.5; // small bonus
//       return distance + 5; // penalty
//     }

//     if (elevator.direction === Direction.DOWN) {
//       const onTheWay = request.floor <= elevator.currentFloor;
//       const sameHallDir = request.direction === Direction.DOWN;
//       if (onTheWay && sameHallDir) return distance - 0.5;
//       return distance + 5;
//     }

//     // Shouldn't happen, but fallback:
//     return distance + 10;
//   }
// }

// // -------------------- Elevator --------------------
// class Elevator {
//   constructor(id, startFloor = 1) {
//     this.id = id;
//     this.currentFloor = startFloor;

//     this.direction = Direction.IDLE;
//     this.state = ElevatorState.IDLE;

//     // Use a Set to avoid duplicates; controller can decide ordering.
//     this.targets = new Set();

//     // Optional: door timer simulation
//     this.doorTicksRemaining = 0;
//   }

//   addTarget(floor) {
//     this.targets.add(floor);
//     if (this.state === ElevatorState.IDLE) {
//       // Decide initial direction immediately when we get first target
//       this._updateDirection();
//       this.state = ElevatorState.MOVING;
//     }
//   }

//   step() {
//     // 1) If doors open, count down and close doors
//     if (this.state === ElevatorState.DOORS_OPEN) {
//       this.doorTicksRemaining -= 1;
//       if (this.doorTicksRemaining <= 0) {
//         this._closeDoors();
//       }
//       return;
//     }

//     // 2) If no targets, stay idle
//     if (this.targets.size === 0) {
//       this.state = ElevatorState.IDLE;
//       this.direction = Direction.IDLE;
//       return;
//     }

//     // 3) If we should stop here, open doors
//     if (this._shouldStopHere()) {
//       this.targets.delete(this.currentFloor);
//       this._openDoors();
//       return;
//     }

//     // 4) Move one floor toward the "next" target
//     this._updateDirection();

//     if (this.direction === Direction.UP) this.currentFloor += 1;
//     else if (this.direction === Direction.DOWN) this.currentFloor -= 1;

//     this.state = ElevatorState.MOVING;

//     // After moving, if we arrived at a target, open doors next tick or now
//     if (this._shouldStopHere()) {
//       this.targets.delete(this.currentFloor);
//       this._openDoors();
//     }
//   }

//   _shouldStopHere() {
//     return this.targets.has(this.currentFloor);
//   }

//   _openDoors() {
//     this.state = ElevatorState.DOORS_OPEN;
//     this.direction = Direction.IDLE; // while doors open, direction is paused
//     this.doorTicksRemaining = 1; // simple: doors stay open for 1 tick
//   }

//   _closeDoors() {
//     if (this.targets.size === 0) {
//       this.state = ElevatorState.IDLE;
//       this.direction = Direction.IDLE;
//     } else {
//       this._updateDirection();
//       this.state = ElevatorState.MOVING;
//     }
//   }

//   _updateDirection() {
//     // Pick the "closest target" for simplicity (Round 1 acceptable).
//     // More advanced: SCAN (elevator algorithm) with up/down queues.
//     let closest = null;
//     let bestDist = Infinity;

//     for (const t of this.targets) {
//       const d = Math.abs(t - this.currentFloor);
//       if (d < bestDist) {
//         bestDist = d;
//         closest = t;
//       }
//     }

//     if (closest == null || closest === this.currentFloor) {
//       this.direction = Direction.IDLE;
//       return;
//     }

//     this.direction = closest > this.currentFloor ? Direction.UP : Direction.DOWN;
//   }

//   status() {
//     return {
//       id: this.id,
//       floor: this.currentFloor,
//       state: this.state,
//       direction: this.direction,
//       targets: [...this.targets].sort((a, b) => a - b),
//     };
//   }
// }

// // -------------------- Controller --------------------
// class ElevatorController {
//   constructor(elevators, schedulerStrategy = new NearestCarStrategy()) {
//     this.elevators = elevators;
//     this.scheduler = schedulerStrategy;
//   }

//   // Hall call: user waiting at floor wants to go up/down
//   pickup(floor, direction) {
//     const req = new HallRequest(floor, direction);
//     const elevator = this.scheduler.selectElevator(this.elevators, req);

//     if (!elevator) throw new Error("No elevators available");

//     elevator.addTarget(floor);
//     return elevator.id;
//   }

//   // Car call: user inside elevator presses target floor
//   selectFloor(elevatorId, floor) {
//     const elevator = this.elevators.find((e) => e.id === elevatorId);
//     if (!elevator) throw new Error(`Elevator ${elevatorId} not found`);
//     elevator.addTarget(floor);
//   }

//   // Simulate one time step
//   step() {
//     for (const e of this.elevators) e.step();
//   }

//   snapshot() {
//     return this.elevators.map((e) => e.status());
//   }
// }

// // -------------------- Example Simulation --------------------
// const controller = new ElevatorController([
//   new Elevator(1, 1),
//   new Elevator(2, 7),
// ]);

// console.log("Initial:", controller.snapshot());

// // Someone at floor 5 wants to go UP
// const assigned = controller.pickup(5, Direction.UP);
// console.log("Assigned elevator:", assigned);

// // Person inside assigned elevator wants floor 9
// controller.selectFloor(assigned, 9);

// // Run simulation ticks
// for (let t = 1; t <= 10; t++) {
//   controller.step();
//   console.log(`Tick ${t}:`, controller.snapshot());
// }