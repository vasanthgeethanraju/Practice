// 10) Optimistic Update Simulation (Signup)
// Problem

// You’re building a UI where a worker signs up for a shift.
// When the user clicks “Sign up”:
// The UI should update immediately (optimistic update)
// You call an async function fakeApiSignup(workerId, shiftId) that resolves or rejects
// If the API succeeds, keep the optimistic state
// If the API fails, rollback to the previous state
/**
 * @param {{signupsByShift: Record<string, string[]>}} state
 * @param {string} workerId
 * @param {string} shiftId
 * @param {(workerId:string, shiftId:string) => Promise<any>} fakeApiSignup
 * @returns {Promise<{signupsByShift: Record<string, string[]>}>}
 */
function optimisticSignup(state, workerId, shiftId, fakeApiSignup) {
  // TODO 1: read current list for shiftId (default empty array)
  const currentSignups = state.signupsByShift[shiftId] || [];
  
  // TODO 2: if worker already in list -> return Promise.resolve(state)
  //         (and do NOT call fakeApiSignup)
  if (currentSignups.includes(workerId)) {
    return Promise.resolve(state);
  }
  
  // TODO 3: create optimisticState (immutable):
  //   - copy signupsByShift
  //   - copy the specific shift array
  //   - add workerId
  const optimisticState = { signupsByShift : { ...state.signupsByShift, [shiftId] : [ ...currentSignups, workerId ]} };

  // TODO 4: call fakeApiSignup(workerId, shiftId)
  //   - if success -> resolve optimisticState
  //   - if failure -> resolve original state (rollback)
  return fakeApiSignup(workerId, shiftId)
    .then(() => optimisticState)
    .catch(() => state);
}

const initial = { signupsByShift: { s1: ["w2"], s2: ["w3"] } };

// 1) success -> state includes new worker
optimisticSignup(initial, "w1", "s1", () => Promise.resolve({ ok:true }))
  .then(s => console.log("T1:", s.signupsByShift.s1)); // ["w2","w1"]

// 2) failure -> rollback to original
optimisticSignup(initial, "w1", "s1", () => Promise.reject("fail"))
  .then(s => console.log("T2:", s.signupsByShift.s1)); // ["w2"]

// 3) worker already signed up -> no API call, return same structure
optimisticSignup(initial, "w2", "s1", () => {
  console.log("SHOULD NOT RUN");
  return Promise.resolve();
}).then(s => console.log("T3:", s.signupsByShift.s1)); // ["w2"]

// 4) new shiftId not present -> create it
optimisticSignup(initial, "w9", "s9", () => Promise.resolve({ ok:true }))
  .then(s => console.log("T4:", s.signupsByShift.s9)); // ["w9"]

// 5) original state must not be mutated
optimisticSignup(initial, "w1", "s1", () => Promise.resolve({ ok:true }))
  .then(() => console.log("T5 initial:", initial.signupsByShift.s1)); // still ["w2"]
