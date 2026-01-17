// Reliable Worker Filter
// Problem

// You’re given workers with reliability metrics and shift requirements. Return the eligible workers.

// Each worker has: attendanceRate (0 to 1), cancellationRate (0 to 1)

// Shift requirement: minAttendanceRate, maxCancellationRate

// Return workers who satisfy: attendanceRate >= minAttendanceRate, cancellationRate <= maxCancellationRate

// Implement getEligibleWorkers(workers, requirements).
/**
 * @param {{id:string, name:string, attendanceRate:number, cancellationRate:number}[]} workers
 * @param {{minAttendanceRate:number, maxCancellationRate:number}} requirements
 * @returns {{id:string, name:string, attendanceRate:number, cancellationRate:number}[]}
 */
function getEligibleWorkers(workers, requirements) {
  // TODO 1: extract minAttendanceRate and maxCancellationRate
  let minAttendanceRate   = requirements.minAttendanceRate,
      maxCancellationRate = requirements.maxCancellationRate;

  // TODO 2: filter workers based on the criteria
  let eligibleWorkers = workers.filter(worker => worker.attendanceRate >= minAttendanceRate &&
                                                 worker.cancellationRate <= maxCancellationRate)

  // TODO 3: return filtered list
  return eligibleWorkers;
}

const workers = [
  { id:"w1", name:"Asha", attendanceRate:0.95, cancellationRate:0.03 },
  { id:"w2", name:"Ben",  attendanceRate:0.80, cancellationRate:0.10 },
  { id:"w3", name:"Cara", attendanceRate:0.92, cancellationRate:0.15 },
];

const requirements = { minAttendanceRate:0.90, maxCancellationRate:0.10 };

console.log(getEligibleWorkers(workers, requirements));
// => [ {id:"w1", ...} ]
console.log(getEligibleWorkers(workers, { minAttendanceRate:0.9, maxCancellationRate:0.1 })); // w1
console.log(getEligibleWorkers(workers, { minAttendanceRate:0.75, maxCancellationRate:0.2 })); // w1,w2,w3
console.log(getEligibleWorkers(workers, { minAttendanceRate:0.99, maxCancellationRate:0.1 })); // []
