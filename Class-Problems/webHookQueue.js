// You have outgoing webhooks. Add deliveries; mark success/failure; failed ones retry with backoff. Return the next job due.

// Rules:
// Each job has nextAttemptAt
// On failure, attempts++ and nextAttemptAt += backoffMs * attempts
// Stop retrying after maxAttempts

class WebhookQueue {
  constructor({ backoffMs, maxAttempts }) {
    this.backoffMs = backoffMs;
    this.maxAttempts = maxAttempts;
    // TODO: store jobs
    this.storeJobs = [];
  }

  // TODO: add job
  enqueue({ id, url, payload, nowMs }) {
    this.storeJobs.push({ id, url, payload, attempts: 0, nextAttemptAt: nowMs});
  }

  // TODO: returns next due job (or null) at nowMs
  nextDue(nowMs) {
    // “Find the first job whose nextAttemptAt <= nowMs” 
    return this.storeJobs.find((job) => job.nextAttemptAt <= nowMs) || null;
  }

  // TODO: mark success => remove job
  markSuccess(id) {
    this.storeJobs = this.storeJobs.filter(j => j.id !== id);
  }

  // TODO: mark failure => schedule retry or drop if exceeded
  markFailure(id, nowMs) {
    let job = this.storeJobs.find(jobs => jobs.id === id);
    if (!job) return;

    job.attempts += 1;

    if(job.attempts >= this.maxAttempts) {
      this.storeJobs = this.storeJobs.filter(j => j.id !== id);
    } else {
      job.nextAttemptAt = nowMs + this.backoffMs * job.attempts;
    }
  }
}


const q = new WebhookQueue({ backoffMs: 1000, maxAttempts: 3 });
q.enqueue({ id: "j1", url: "/hook", payload: { a: 1 }, nowMs: 0 });

console.log(q.nextDue(0)?.id);
q.markFailure("j1", 0);     // attempts=1 nextAttemptAt=1000

console.log(q.nextDue(500));
console.log(q.nextDue(1000)?.id);

q.markFailure("j1", 1000);  // attempts=2 nextAttemptAt=1000 + 2000 = 3000
console.log(q.nextDue(3000)?.id);

//output:
// j1
// null
// j1
// j1