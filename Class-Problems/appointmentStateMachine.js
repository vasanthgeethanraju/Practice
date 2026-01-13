//An appointment has states and allowed transitions. Reject invalid transitions.

// Allowed transitions:
// SCHEDULED -> CONFIRMED | CANCELED
// CONFIRMED -> COMPLETED | CANCELED
// COMPLETED -> (none)
// CANCELED -> (none)

class validTransitions {
  static SCHEDULED = ["CONFIRMED", "CANCELLED"];
  static CONFIRMED = ["COMPLETED", "CANCELLED"];
  static COMPLETED = [];
  static CANCELLED = [];
}

class Appointment {
  constructor(id) {
    this.id = id;
    this.state = "SCHEDULED";
    // TODO: optionally store history
    this.history = [];
  }

  getState() {
    return this.state;
  }

  // TODO: transition state if valid, else throw Error
  transition(nextState) {
    let stateVal = this.state;
    this.history.push(stateVal);
    if(validTransitions[stateVal]?.includes(nextState)) { 
      this.state = nextState;
    } else {
      throw new Error ("Invalid transition SCHEDULED -> COMPLETED");
    }
  }
}  


const a = new Appointment("apt-1");
console.log(a.getState());
a.transition("CONFIRMED");
console.log(a.getState());
a.transition("COMPLETED");
console.log(a.getState());

const b = new Appointment("apt-2");
try {
  b.transition("COMPLETED");
} catch (e) {
  console.log(e.message);
}

//output:

// SCHEDULED
// CONFIRMED
// COMPLETED
// Invalid transition SCHEDULED -> COMPLETED