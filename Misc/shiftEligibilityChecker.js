// Problem #1: Shift Eligibility Checker.

// Your task
// Implement canWorkerSignup(...) in the skeleton below.
// Treat this like the real interview: ask clarifying questions if needed, then code.
// A worker can sign up for a shift if ALL are true:
// 1. Worker exists AND shift exists

// 2. Worker is not already accepted for that shift

// 3. Shift is not full (accepted signups < slots)

// 4. If maxNew is defined: Worker is “new” if they have 0 completed past logs

// Accepted signups already on the shift that are “new” must be < maxNew

// 5. If worker is new and newCount >= maxNew → reject

// Only signups with status "accepted" count toward capacity.
/**
 * @param {string} workerId
 * @param {string} shiftId
 * @param {{id:string, name:string}[]} workers
 * @param {{id:string, slots:number, maxNew?:number}[]} shifts
 * @param {{workerId:string, shiftId:string, status:"accepted"|"cancelled"|"pending"}[]} signups
 * @param {{workerId:string, shiftId:string, status:"completed"|"no_show"|"cancelled"}[]} pastWorkLogs
 * @returns {boolean}
 */
function canWorkerSignup(workerId, shiftId, workers, shifts, signups, pastWorkLogs) {
  // TODO 1: find the shift by shiftId. If not found, return false.
  let shift = shifts.find(shift => shift.id === shiftId) 
  
  if(!shift) {
    return false;
  }

  // TODO 2: determine if worker exists. If not found, return false.
  let worker = workers.find(worker => worker.id === workerId) 
  
  if(!worker) {
    return false;
  }

  // TODO 3: check if worker already has an "accepted" signup for this shift. If yes, return false.
  let isAcceptedSignup = signups.find(signup => signup.workerId === worker.id && signup.shiftId === shiftId && signup.status === "accepted");

  if(isAcceptedSignup) {
    return false;
  }

  // TODO 4: collect accepted signups for this shift.
  let acceptedSignups = signups.filter(signup => signup.shiftId === shift.id && signup.status === "accepted");

  // TODO 5: if acceptedCount >= shift.slots, return false.
  if (acceptedSignups.length >= shift.slots) {
    return false;
  }

  // TODO 6: helper - isNewWorker(id): true if 0 completed logs in pastWorkLogs.
  function isNewWorker(workerId) {
    return !pastWorkLogs.some(worklog => worklog.workerId === workerId && worklog.status === "completed");
  }
  // TODO 7: if shift.maxNew is defined:
  //   - count how many accepted workers for this shift are "new"
  //   - if worker is new and newCount >= shift.maxNew, return false
  if (shift.maxNew !== undefined) {
    let newCount = acceptedSignups.filter(signup => isNewWorker(signup.workerId)).length;

    // If worker is new and maxNew reached, return false
    if (isNewWorker(worker.id) && newCount >= shift.maxNew) {
      return false;
    }
  }

  // TODO 8: otherwise return true.
  return true;
}


const workers = [
  { id: "w1", name: "Asha" },
  { id: "w2", name: "Ben" },
  { id: "w3", name: "Cara" },
];

const shifts = [
  { id: "s1", slots: 3, maxNew: 1 },
];

const signups = [
  { workerId: "w2", shiftId: "s1", status: "accepted" },
  { workerId: "w3", shiftId: "s1", status: "accepted" },
];

const pastWorkLogs = [
  { workerId: "w2", shiftId: "old1", status: "completed" }, // experienced
  // w1 => new
  // w3 => new (no completed)
];

// expected false (w1 is new, maxNew already reached due to w3)
console.log(canWorkerSignup("w1", "s1", workers, shifts, signups, pastWorkLogs));
