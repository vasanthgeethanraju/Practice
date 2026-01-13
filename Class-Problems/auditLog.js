// Record events (who/what/when) and support querying by entityId and time range.

class AuditLog {
  constructor() {
    // TODO: store events
    this.auditLog = new Map();
  }

  // TODO: add an event
  record({ entityId, actorId, action, timestampMs }) {
    if(!this.auditLog.has(entityId)) {
      this.auditLog.set(entityId, new Map());
    }
    this.auditLog.get(entityId).set(timestampMs, { actorId, action });

    // console.log(this.auditLog);
  }

  // TODO: return events for entityId in [startMs, endMs] inclusive
  query(entityId, startMs, endMs) {
    let entity = this.auditLog.get(entityId);
    if (!entity) return [];

    let result = [];
    entity.forEach((event, timestamp) => {
      if(timestamp >= startMs && timestamp <= endMs) {
        result.push({ entityId,
          actorId: event.actorId, 
          action: event.action, 
          timestampMs: timestamp });
      }
    })

    return result;
  }
}


const log = new AuditLog();

log.record({ entityId: "patient-1", actorId: "u1", action: "VIEWED", timestampMs: 100 });
log.record({ entityId: "patient-1", actorId: "u2", action: "UPDATED", timestampMs: 200 });
log.record({ entityId: "patient-2", actorId: "u1", action: "VIEWED", timestampMs: 300 });

console.log(log.query("patient-1", 0, 150));
console.log(log.query("patient-1", 0, 500));


//output:
// [ { entityId: 'patient-1', actorId: 'u1', action: 'VIEWED', timestampMs: 100 } ]
// [
//   { entityId: 'patient-1', actorId: 'u1', action: 'VIEWED', timestampMs: 100 },
//   { entityId: 'patient-1', actorId: 'u2', action: 'UPDATED', timestampMs: 200 }
// ]




