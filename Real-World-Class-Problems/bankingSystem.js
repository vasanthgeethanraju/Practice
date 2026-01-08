// Requirements Your task is to implement a simplified version of a banking system. 
// Plan your design according to the level specifications below: 
// Level 1: The banking system should support creating new accounts and depositing money into and withdrawing/paying money from accounts. 
// Level 2: The banking system should support ranking accounts based on the total value of transactions. 
// Level 3: The banking system should support scheduling transfers and checking the scheduled transfer status. 
// Level 4: The banking system should support merging two accounts while retaining the balances and transaction histories of the original accounts. 
// To move to the next level, you should pass all the tests at the current level.

// WE WILL COME BACK TO THIS LATER ( DONT WORRY ABOUT IT NOW)

// bankingSystem.js
const BankingSystemInterface = require("./bankingSystemInterface");

const DAY = 24 * 60 * 60 * 1000;

class BankingSystem extends BankingSystemInterface {
  constructor() {
    super();
    this.balances = new Map();         // active accountId -> balance
    this.activity = new Map();         // active accountId -> activity total
    this.meta = new Map();             // accountId -> lifetimes[]
    this.transfers = new Map();        // transferId -> transfer record
    this.nextTransferOrdinal = 1;
  }

  // ---------- Lifetimes + history ----------

  _activeLifetime(id) {
    const lifetimes = this.meta.get(id);
    if (!lifetimes || lifetimes.length === 0) return null;
    const lt = lifetimes[lifetimes.length - 1];
    return lt.removedAt === null ? lt : null;
  }

  _pushLifetime(id, createdAt) {
    const lifetimes = this.meta.get(id) ?? [];
    lifetimes.push({ createdAt, removedAt: null, history: [[createdAt, 0]] });
    this.meta.set(id, lifetimes);
  }

  _setBalance(id, time, newBal) {
    this.balances.set(id, newBal);
    const lt = this._activeLifetime(id);
    if (!lt) return;
    const h = lt.history;
    const last = h[h.length - 1];
    if (last && last[0] === time) last[1] = newBal;
    else h.push([time, newBal]);
  }

  // ---------- Expirations ----------
  // Transfer is valid when timestamp <= endAt. Expired when timestamp > endAt.
  // Refund recorded at expireMoment = endAt + 1.
  _processExpirations(now) {
    now = Number(now);

    const expired = [];
    for (const [tid, t] of this.transfers.entries()) {
      if (!t.accepted && now > t.endAt) expired.push([tid, t]);
    }
    if (expired.length === 0) return;

    expired.sort((a, b) => a[1].endAt - b[1].endAt);

    for (const [tid, t] of expired) {
      const expireMoment = t.endAt + 1;
      if (this.balances.has(t.sourceId)) {
        this._setBalance(t.sourceId, expireMoment, this.balances.get(t.sourceId) + t.amount);
      }
      this.transfers.delete(tid);
    }
  }

  _touch(ts) {
    ts = Number(ts);
    this._processExpirations(ts);
    return ts;
  }

  // ---------- Level 1 ----------
  createAccount(timestamp, accountId) {
    const ts = this._touch(timestamp);

    // allow reuse if not currently active
    if (this.balances.has(accountId)) return false;

    this._pushLifetime(accountId, ts);
    this.balances.set(accountId, 0);
    this.activity.set(accountId, 0);
    return true;
  }

  deposit(timestamp, accountId, amount) {
    const ts = this._touch(timestamp);
    amount = Number(amount);

    if (!this.balances.has(accountId)) return null;

    this._setBalance(accountId, ts, this.balances.get(accountId) + amount);
    this.activity.set(accountId, this.activity.get(accountId) + amount);
    return this.balances.get(accountId);
  }

  pay(timestamp, accountId, amount) {
    const ts = this._touch(timestamp);
    amount = Number(amount);

    if (!this.balances.has(accountId)) return null;

    const bal = this.balances.get(accountId);
    if (bal < amount) return null;

    this._setBalance(accountId, ts, bal - amount);
    this.activity.set(accountId, this.activity.get(accountId) + amount);
    return this.balances.get(accountId);
  }

  // ---------- Level 2 ----------
  topActivity(timestamp, n) {
    this._touch(timestamp);
    n = Number(n);

    const arr = Array.from(this.activity.entries());
    arr.sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]));
    return arr.slice(0, Math.min(n, arr.length)).map(([id, val]) => `${id}(${val})`);
  }

  // ---------- Level 3 ----------
  transfer(timestamp, sourceId, targetId, amount) {
    const ts = this._touch(timestamp);
    amount = Number(amount);

    if (sourceId === targetId) return null;
    if (!this.balances.has(sourceId) || !this.balances.has(targetId)) return null;

    const sourceBal = this.balances.get(sourceId);
    if (sourceBal < amount) return null;

    this._setBalance(sourceId, ts, sourceBal - amount);

    const transferId = `transfer${this.nextTransferOrdinal++}`;
    this.transfers.set(transferId, {
      sourceId,
      targetId,
      amount,
      createdAt: ts,
      endAt: ts + DAY, // valid through endAt; expireMoment = endAt + 1
      accepted: false,
    });

    return transferId;
  }

  acceptTransfer(timestamp, accountId, transferId) {
    const ts = this._touch(timestamp);

    if (!this.balances.has(accountId)) return false;

    const t = this.transfers.get(transferId);
    if (!t || t.accepted) return false;
    if (ts > t.endAt) return false;
    if (t.targetId !== accountId) return false;

    this._setBalance(t.targetId, ts, this.balances.get(t.targetId) + t.amount);

    // activity update on acceptance only
    if (this.activity.has(t.sourceId)) this.activity.set(t.sourceId, this.activity.get(t.sourceId) + t.amount);
    if (this.activity.has(t.targetId)) this.activity.set(t.targetId, this.activity.get(t.targetId) + t.amount);

    t.accepted = true;
    return true;
  }

  // ---------- Level 4 ----------
  mergeAccounts(timestamp, accountId1, accountId2) {
    const ts = this._touch(timestamp);

    if (accountId1 === accountId2) return false;
    if (!this.balances.has(accountId1) || !this.balances.has(accountId2)) return false;

    const toDelete = [];

    for (const [tid, t] of this.transfers.entries()) {
      if (t.accepted) continue;

      const outgoingFrom2 = t.sourceId === accountId2;
      const outgoing1to2 = t.sourceId === accountId1 && t.targetId === accountId2;
      const incomingTo2 = t.targetId === accountId2;

      if (outgoingFrom2) {
        this._setBalance(accountId2, ts, this.balances.get(accountId2) + t.amount);
        toDelete.push(tid);
      } else if (outgoing1to2) {
        this._setBalance(accountId1, ts, this.balances.get(accountId1) + t.amount);
        toDelete.push(tid);
      } else if (incomingTo2) {
        t.targetId = accountId1;
      }
    }

    for (const tid of toDelete) this.transfers.delete(tid);

    // combine balances after cancellations/refunds
    this._setBalance(accountId1, ts, this.balances.get(accountId1) + this.balances.get(accountId2));
    this.activity.set(accountId1, this.activity.get(accountId1) + this.activity.get(accountId2));

    // remove account2 from active maps
    this.balances.delete(accountId2);
    this.activity.delete(accountId2);

    // close lifetime for account2
    const lt2 = this._activeLifetime(accountId2);
    if (lt2) lt2.removedAt = ts;

    return true;
  }

  getBalance(timestamp, accountId, timeAt) {
    const now = this._touch(timestamp);
    timeAt = Number(timeAt);

    // If timeAt is in the future relative to "now", apply expirations through that time
    if (timeAt > now) this._processExpirations(timeAt);

    const lifetimes = this.meta.get(accountId);
    if (!lifetimes) return null;

    // find lifetime containing timeAt
    let lt = null;
    for (const candidate of lifetimes) {
      const end = candidate.removedAt ?? Infinity;
      if (candidate.createdAt <= timeAt && timeAt < end) {
        lt = candidate;
        break;
      }
    }
    if (!lt) return null;

    const h = lt.history;

    // binary search last snapshot <= timeAt
    let lo = 0, hi = h.length - 1, ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (h[mid][0] <= timeAt) { ans = mid; lo = mid + 1; }
      else hi = mid - 1;
    }

    return ans === -1 ? null : h[ans][1];
  }
}

module.exports = BankingSystem;
