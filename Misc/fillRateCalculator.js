// Fill Rate Calculator
// Problem

// Given shifts and signups, compute staffing status per shift.

// Rules: accepted counts toward staffing

// Return for each shift:

// acceptedCount

// fillRate = acceptedCount / slots

// status:

// "FULL" if acceptedCount >= slots

// "UNDERSTAFFED" if acceptedCount < slots

// Return results in the same order as shifts.

// Implement getShiftFillMetrics(shifts, signups).
/**
 * @param {{id:string, slots:number}[]} shifts
 * @param {{workerId:string, shiftId:string, status:"accepted"|"cancelled"|"pending"}[]} signups
 * @returns {{shiftId:string, acceptedCount:number, fillRate:number, status:"FULL"|"UNDERSTAFFED"}[]}
 */
function getShiftFillMetrics(shifts, signups) {
  // TODO 1: build a map shiftId -> acceptedCount (only status === "accepted")
  let acceptedCounts = {},
      results         = [];

  for(const signup of signups) {
    if(signup.status === "accepted") {
      acceptedCounts[signup.shiftId] = (acceptedCounts[signup.shiftId] || 0 ) + 1;
    }
  }
  
  // TODO 2: iterate shifts in order and compute:
  //   - acceptedCount
  //   - fillRate
  //   - status
  for (const shift of shifts) {
    let acceptedCount = acceptedCounts[shift.id] || 0,
        fillRate      = acceptedCount / shift.slots;

    if (acceptedCount >= shift.slots) {
      results.push({ shiftId: shift.id, acceptedCount, fillRate, status: "FULL"})
    } else {
      results.push({ shiftId: shift.id, acceptedCount, fillRate, status: "UNDERSTAFFED"})
    }
  }
  // TODO 3: return the array of results
  return results;
}

const shifts = [
  { id: "s1", slots: 4 },
  { id: "s2", slots: 2 },
];

const signups = [
  { workerId:"w1", shiftId:"s1", status:"accepted" },
  { workerId:"w2", shiftId:"s1", status:"accepted" },
  { workerId:"w3", shiftId:"s1", status:"cancelled" },
  { workerId:"w4", shiftId:"s2", status:"accepted" },
];

console.log(getShiftFillMetrics(shifts, signups))
/*
[
  { shiftId:"s1", acceptedCount:2, fillRate:0.5, status:"UNDERSTAFFED" },
  { shiftId:"s2", acceptedCount:1, fillRate:0.5, status:"UNDERSTAFFED" },
]
*/

console.log(getShiftFillMetrics(
  [{ id:"s3", slots:1 }],
  [{ workerId:"w9", shiftId:"s3", status:"accepted" }]
));
// expected FULL
