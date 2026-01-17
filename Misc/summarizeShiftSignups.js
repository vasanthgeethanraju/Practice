/**
 * @param {{workerId:string, shiftId:string, status:"accepted"|"cancelled"|"pending"}[]} signups
 * @param {{workerId:string, shiftId:string, status:"completed"|"no_show"|"cancelled"}[]} pastWorkLogs
 * @returns {Record<string, {acceptedTotal:number, newCount:number, experiencedCount:number}>}
 */
function summarizeShiftSignups(signups, pastWorkLogs) {
  // TODO 1: build a Set of experienced workerIds (those with at least 1 completed log)
  let experiencedWorkerIds = new Set(pastWorkLogs.filter(worklog => worklog.status === "completed").map(worklog => worklog.workerId));
  // return experiencedWorkerIds;
  // TODO 2: create result object
  let result = {};
  // TODO 3: loop signups:
  //   - skip non-accepted
  //   - init result[shiftId] if missing
  //   - increment acceptedTotal
  //   - if worker is experienced -> experiencedCount else newCount
  for (const signup of signups) {
    const { shiftId, workerId } = signup;

    if (signup.status !== "accepted") {
      continue;
    }

    if (!result[shiftId]) {
      result[shiftId] = {
        acceptedTotal: 0,
        newCount: 0,
        experiencedCount: 0,
      };
    }

    result[shiftId].acceptedTotal++;

    if (experiencedWorkerIds.has(workerId)) {
      result[shiftId].experiencedCount++;
    } else {
      result[shiftId].newCount++;
    }
  }

  // TODO 4: return result
  return result;
}

const signups = [
  { workerId: "w1", shiftId: "s1", status: "accepted" },
  { workerId: "w2", shiftId: "s1", status: "accepted" },
  { workerId: "w3", shiftId: "s2", status: "cancelled" },
  { workerId: "w4", shiftId: "s2", status: "accepted" },
];

const pastWorkLogs = [
  { workerId: "w2", shiftId: "old", status: "completed" },
  { workerId: "w4", shiftId: "old2", status: "completed" },
];

console.log(summarizeShiftSignups(signups, pastWorkLogs));
// {
//   s1: { acceptedTotal: 2, newCount: 1, experiencedCount: 1 },
//   s2: { acceptedTotal: 1, newCount: 0, experiencedCount: 1 },
// }
