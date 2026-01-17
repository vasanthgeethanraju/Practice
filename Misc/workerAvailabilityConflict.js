// 2) Worker Availability Conflict
// Problem

// A worker wants to accept a new shift. You must check if it overlaps with any of their already accepted shifts.

// Rules

// Each shift has start and end ISO strings.

// A shift is valid where start < end.

// Overlap condition (standard interval overlap):

// Two shifts overlap if:
// newStart < existingEnd AND existingStart < newEnd

// If one ends exactly when another starts, that is NOT overlap.
// (Example: 1pm–2pm and 2pm–3pm do not overlap.)

// Return true if the worker can accept the new shift, otherwise false.
/**
 * @param {string} workerId
 * @param {{id:string, start:string, end:string}} newShift
 * @param {Record<string, {id:string, start:string, end:string}[]>} acceptedShiftsByWorker
 * @returns {boolean}
 */
function canAcceptShift(workerId, newShift, acceptedShiftsByWorker) {
  // TODO 1: get this worker's existing accepted shifts (or empty array)
  const workerAcceptedShifts = acceptedShiftsByWorker[workerId];

  // TODO 2: parse newShift start/end into numbers (Date.parse)
  //         if newStart >= newEnd return false
  const newStart = Date.parse(newShift.start),
        newEnd   = Date.parse(newShift.end);

  if (newStart >= newEnd) {
    return false;
  }
  // TODO 3: loop over existing shifts:
  //   - parse existing start/end
  //   - overlap if (newStart < existingEnd && existingStart < newEnd)
  //   - if overlap return false
  for (const shift of workerAcceptedShifts) {
    const existingStart = Date.parse(shift.start),
          existingEnd   = Date.parse(shift.end);

    if (newStart < existingEnd && existingStart < newEnd) {
      return false;
    }
  }
  // TODO 4: if no overlaps, return true
  return true;
}

const acceptedShiftsByWorker = {
  w1: [
    { id: "s1", start: "2026-01-14T09:00:00Z", end: "2026-01-14T13:00:00Z" },
    { id: "s2", start: "2026-01-14T14:00:00Z", end: "2026-01-14T18:00:00Z" },
  ]
};

const newShift = { id: "s3", start: "2026-01-14T13:00:00Z", end: "2026-01-14T14:00:00Z" };

console.log(canAcceptShift("w1", newShift, acceptedShiftsByWorker)); // true
