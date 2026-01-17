// 9) Search + Filter Logic (Workers)
// Problem
// You’re building a “Find workers” screen. You need to implement logic that:
// Searches workers by a query string (matches name or email, case-insensitive)
// Applies filters:
// location (exact match, case-insensitive)
// minAttendanceRate (worker.attendanceRate >= min)
// isExperienced (true/false)
// Experienced means the worker has at least 1 completed entry in pastWorkLogs.
// Sorts results by relevance:
// Workers where the query matches name should come before those where it matches only email.
// Within the same relevance group, sort by higher attendanceRate first.
// If query is empty/blank, skip relevance sorting and just sort by attendanceRate desc.
// Return an array of matching workers.
/**
 * @param {{id:string, name:string, email:string, location:string, attendanceRate:number}[]} workers
 * @param {{workerId:string, shiftId:string, status:"completed"|"no_show"|"cancelled"}[]} pastWorkLogs
 * @param {string} query
 * @param {{location?:string, minAttendanceRate?:number, isExperienced?:boolean}} filters
 * @returns {{id:string, name:string, email:string, location:string, attendanceRate:number}[]}
 */
function searchAndFilterWorkers(workers, pastWorkLogs, query, filters) {
  query = query.trim().toLowerCase();
  
  // Step 2: Build a Set of experienced workerIds:
  const experiencedWorkers = new Set(pastWorkLogs.filter(worklog => worklog.status === "completed").map(worklog => worklog.workerId));

  // Step 3: Apply filters + search:
  const filteredWorkers = workers.filter(worker => {
    const matchesLocation   = filters.location ? worker.location.toLowerCase() === filters.location.toLowerCase() : true,
          matchesAttendance = filters.minAttendanceRate ? worker.attendanceRate >= filters.minAttendanceRate : true;

    const matchesExperience = filters.isExperienced !== undefined 
      ? (filters.isExperienced 
          ? experiencedWorkers.has(worker.id) // only those in the set
          : !experiencedWorkers.has(worker.id)) // only those NOT in the set
      : true;  // no experience filter applied

    const matchesName  = query && worker.name.toLowerCase().includes(query),
          matchesEmail = query && worker.email.toLowerCase().includes(query),
          matchesQuery = query ? (matchesName || matchesEmail) : true;

    return matchesLocation && matchesAttendance && matchesExperience && matchesQuery;
  });

  // Step 4: Sort results
  if (query === "") {
    return filteredWorkers.sort((a, b) => b.attendanceRate - a.attendanceRate);
  } else {
    return filteredWorkers.sort((a, b) => {
      const aMatchesName = a.name.toLowerCase().includes(query),
            bMatchesName = b.name.toLowerCase().includes(query);

      // First, prioritize name matches
      if (aMatchesName && !bMatchesName) return -1;
      if (!aMatchesName && bMatchesName) return 1;

      // If both match name or both match email, sort by attendance rate
      return b.attendanceRate - a.attendanceRate;
    });
  }
}

const workers = [
  { id: "w1", name: "Alice", email: "alice@xyz.com", location: "NYC", attendanceRate: 0.95 },
  { id: "w2", name: "Bob", email: "bob@xyz.com", location: "NYC", attendanceRate: 0.80 },
  { id: "w3", name: "Charlie", email: "charlie@xyz.com", location: "LA", attendanceRate: 0.92 },
  { id: "w4", name: "David", email: "david@xyz.com", location: "NYC", attendanceRate: 0.85 },
  { id: "w5", name: "Eva", email: "eva@xyz.com", location: "LA", attendanceRate: 0.65 },
];

const pastWorkLogs = [
  { workerId: "w1", shiftId: "s1", status: "completed" },
  { workerId: "w2", shiftId: "s2", status: "no_show" },
  { workerId: "w3", shiftId: "s3", status: "completed" },
  { workerId: "w4", shiftId: "s4", status: "cancelled" },
  { workerId: "w5", shiftId: "s5", status: "no_show" },
];

// 1) query + location + attendance filter
console.log(searchAndFilterWorkers(workers, pastWorkLogs, "ash", { location: "NYC", minAttendanceRate: 0.85 }).map(w => w.id));
// expected: ["w1", "w4"]

// 2) experienced only
console.log(searchAndFilterWorkers(workers, pastWorkLogs, "", { isExperienced: true }).map(w => w.id));
// expected: ["w3", "w1"] (attendance desc: w3=0.92, w1=0.95)

// 3) query matches email only should rank lower than name match
console.log(searchAndFilterWorkers(
  [
    { id: "a", name: "John", email: "alpha@x.com", location: "NYC", attendanceRate: 0.7 },
    { id: "b", name: "Alpha", email: "john@x.com", location: "NYC", attendanceRate: 0.9 },
  ],
  [],
  "alpha",
  {}
).map(w => w.id));
// expected: ["b", "a"] (b matches name, a matches email)

// 4) location case-insensitive
console.log(searchAndFilterWorkers(workers, pastWorkLogs, "", { location: "nyc" }).length);
// expected: 3

// 5) no results
console.log(searchAndFilterWorkers(workers, pastWorkLogs, "zzz", {}).length);
// expected: 0
