// Return whether a feature is enabled based on override first, else global, else default false.

class FeatureFlags {
  constructor() {
    // TODO: global flags and per-user overrides
    this.globalFlags = new Map();
    this.userOverrides = new Map();
  }

  // TODO: set global flag on/off
  setGlobal(flagName, enabled) {
    this.globalFlags.set(flagName, enabled);
  }

  // TODO: set user override
  setOverride(flagName, userId, enabled) {
    if(!this.userOverrides.has(flagName)) {
      this.userOverrides.set(flagName, new Map());
    }

    this.userOverrides.get(flagName).set(userId, enabled);
  }

  // TODO: remove user override
  removeOverride(flagName, userId) {
    if (!this.userOverrides.has(flagName)) return;

    const overridesForFlag = this.userOverrides.get(flagName);
    overridesForFlag.delete(userId);

    // cleanup empty maps
    if (overridesForFlag.size === 0) {
      this.userOverrides.delete(flagName);
    }
  }

  // TODO: check enabled
  isEnabled(flagName, userId) {
    // 1. user override wins
    if (this.userOverrides.has(flagName)) {
      const overridesForFlag = this.userOverrides.get(flagName);
      if (overridesForFlag.has(userId)) {
        return overridesForFlag.get(userId); // true OR false
      }
    }

    // 2. global flag
    if (this.globalFlags.has(flagName)) {
      return this.globalFlags.get(flagName);
    }

    // 3. default
    return false;
  }
}

const f = new FeatureFlags();
f.setGlobal("newUI", false);
f.setOverride("newUI", "uA", true);

console.log(f.isEnabled("newUI", "uA"));
console.log(f.isEnabled("newUI", "uB"));

f.setGlobal("newUI", true);
console.log(f.isEnabled("newUI", "uB"));

f.setGlobal("newUB", false);
f.setOverride("newUB", "uB", true);

f.removeOverride("newUB", "uB");
console.log(f.isEnabled("newUB", "u"));


//output:
// true
// false
// true
// false



