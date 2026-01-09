// Design an Expense Sharing (“Splitwise”) System – Design a bill-splitting application where multiple users can share expenses, record transactions, and settle balances. 
// This low-level design question has been frequently asked in machine coding rounds at companies like OpenTable, ShareChat, ClearTax, Groww, etc. . 
// The OOD solution typically includes classes like User, Expense, Split, Group, and uses principles to calculate each person’s owed amount (sometimes using strategy patterns for different split modes).


// ==================== SPLIT STRATEGIES ====================

class SplitStrategy {
  calculate(amount, participants, metadata = {}) {
    throw new Error("Must implement calculate method");
  }
}

class EqualSplit extends SplitStrategy {
  calculate(amount, participants) {
    const share = amount / participants.length;
    return participants.map(p => ({ userId: p.id, amount: share }));
  }
}

class ExactSplit extends SplitStrategy {
  calculate(amount, participants, metadata) {
    // metadata.amounts = { userId: amount }
    return participants.map(p => ({
      userId: p.id,
      amount: metadata.amounts[p.id] || 0
    }));
  }
}

class PercentSplit extends SplitStrategy {
  calculate(amount, participants, metadata) {
    // metadata.percentages = { userId: percentage }
    return participants.map(p => ({
      userId: p.id,
      amount: (amount * (metadata.percentages[p.id] || 0)) / 100
    }));
  }
}

// ==================== CORE CLASSES ====================

class User {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.balances = {}; // { userId: amount } - positive means they owe me, negative means I owe them
  }

  getBalance(userId) {
    return this.balances[userId] || 0;
  }

  updateBalance(userId, amount) {
    this.balances[userId] = (this.balances[userId] || 0) + amount;
  }

  getTotalBalance() {
    return Object.values(this.balances).reduce((sum, amt) => sum + amt, 0);
  }

  getAllBalances() {
    return { ...this.balances };
  }
}

class Expense {
  constructor(id, description, amount, paidBy, participants, splitType, metadata = {}) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.paidBy = paidBy; // User who paid
    this.participants = participants; // Array of Users involved
    this.splitType = splitType; // 'EQUAL', 'EXACT', 'PERCENT'
    this.metadata = metadata; // Additional data for splits
    this.splits = [];
    this.createdAt = new Date();
    this.calculateSplits();
  }

  calculateSplits() {
    let strategy;
    switch(this.splitType) {
      case 'EQUAL':
        strategy = new EqualSplit();
        break;
      case 'EXACT':
        strategy = new ExactSplit();
        break;
      case 'PERCENT':
        strategy = new PercentSplit();
        break;
      default:
        throw new Error(`Unknown split type: ${this.splitType}`);
    }
    
    this.splits = strategy.calculate(this.amount, this.participants, this.metadata);
    this.validateSplits();
  }

  validateSplits() {
    const total = this.splits.reduce((sum, s) => sum + s.amount, 0);
    if (Math.abs(total - this.amount) > 0.01) {
      throw new Error(`Split amounts (${total}) don't match expense amount (${this.amount})`);
    }
  }

  getSplits() {
    return this.splits.map(s => ({
      ...s,
      user: this.participants.find(p => p.id === s.userId)
    }));
  }
}

class Group {
  constructor(id, name, createdBy) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.members = [createdBy];
    this.expenses = [];
    this.createdAt = new Date();
  }

  addMember(user) {
    if (!this.members.find(m => m.id === user.id)) {
      this.members.push(user);
    }
  }

  removeMember(userId) {
    this.members = this.members.filter(m => m.id !== userId);
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }

  getExpenses() {
    return [...this.expenses];
  }

  getMembers() {
    return [...this.members];
  }
}

class Transaction {
  constructor(id, fromUser, toUser, amount, settledAt = new Date()) {
    this.id = id;
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.amount = amount;
    this.settledAt = settledAt;
  }
}

// ==================== EXPENSE MANAGER ====================

class ExpenseManager {
  constructor() {
    this.users = new Map();
    this.expenses = new Map();
    this.groups = new Map();
    this.transactions = new Map();
    this.expenseCounter = 1;
    this.groupCounter = 1;
    this.transactionCounter = 1;
  }

  addUser(name, email, phone) {
    const userId = `U${this.users.size + 1}`;
    const user = new User(userId, name, email, phone);
    this.users.set(userId, user);
    return user;
  }

  getUser(userId) {
    return this.users.get(userId);
  }

  createGroup(name, createdById) {
    const creator = this.getUser(createdById);
    if (!creator) throw new Error("Creator not found");
    
    const groupId = `G${this.groupCounter++}`;
    const group = new Group(groupId, name, creator);
    this.groups.set(groupId, group);
    return group;
  }

  addExpense(description, amount, paidById, participantIds, splitType, metadata = {}, groupId = null) {
    const paidBy = this.getUser(paidById);
    if (!paidBy) throw new Error("Payer not found");

    const participants = participantIds.map(id => this.getUser(id)).filter(Boolean);
    if (participants.length === 0) throw new Error("No valid participants");

    const expenseId = `E${this.expenseCounter++}`;
    const expense = new Expense(expenseId, description, amount, paidBy, participants, splitType, metadata);
    
    this.expenses.set(expenseId, expense);
    
    // Update balances
    expense.splits.forEach(split => {
      if (split.userId !== paidById) {
        // The participant owes the payer
        const participant = this.getUser(split.userId);
        participant.updateBalance(paidById, split.amount);
        paidBy.updateBalance(split.userId, -split.amount);
      }
    });

    // Add to group if specified
    if (groupId) {
      const group = this.groups.get(groupId);
      if (group) group.addExpense(expense);
    }

    return expense;
  }

  showBalance(userId) {
    const user = this.getUser(userId);
    if (!user) throw new Error("User not found");

    const balances = [];
    for (const [otherUserId, amount] of Object.entries(user.balances)) {
      if (Math.abs(amount) > 0.01) {
        const otherUser = this.getUser(otherUserId);
        balances.push({
          user: otherUser,
          amount: amount,
          type: amount > 0 ? 'GETS_BACK' : 'OWES'
        });
      }
    }
    return balances;
  }

  showAllBalances() {
    const result = [];
    this.users.forEach(user => {
      const balances = this.showBalance(user.id);
      if (balances.length > 0) {
        result.push({ user, balances });
      }
    });
    return result;
  }

  settleBalance(fromUserId, toUserId, amount) {
    const fromUser = this.getUser(fromUserId);
    const toUser = this.getUser(toUserId);
    
    if (!fromUser || !toUser) throw new Error("User not found");

    fromUser.updateBalance(toUserId, amount);
    toUser.updateBalance(fromUserId, -amount);

    const transactionId = `T${this.transactionCounter++}`;
    const transaction = new Transaction(transactionId, fromUser, toUser, amount);
    this.transactions.set(transactionId, transaction);
    
    return transaction;
  }

  // Simplified debt settlement using greedy approach
  simplifyDebts() {
    const balances = new Map();
    
    // Calculate net balance for each user
    this.users.forEach(user => {
      const netBalance = user.getTotalBalance();
      if (Math.abs(netBalance) > 0.01) {
        balances.set(user.id, netBalance);
      }
    });

    const creditors = []; // People who get money back
    const debtors = [];   // People who owe money

    balances.forEach((amount, userId) => {
      if (amount > 0) {
        creditors.push({ userId, amount });
      } else if (amount < 0) {
        debtors.push({ userId, amount: -amount });
      }
    });

    const settlements = [];
    let i = 0, j = 0;

    while (i < creditors.length && j < debtors.length) {
      const minAmount = Math.min(creditors[i].amount, debtors[j].amount);
      
      settlements.push({
        from: this.getUser(debtors[j].userId),
        to: this.getUser(creditors[i].userId),
        amount: minAmount
      });

      creditors[i].amount -= minAmount;
      debtors[j].amount -= minAmount;

      if (creditors[i].amount < 0.01) i++;
      if (debtors[j].amount < 0.01) j++;
    }

    return settlements;
  }
}

// ==================== DEMO USAGE ====================

const manager = new ExpenseManager();

// Add users
const alice = manager.addUser("Alice", "alice@email.com", "1234567890");
const bob = manager.addUser("Bob", "bob@email.com", "2345678901");
const charlie = manager.addUser("Charlie", "charlie@email.com", "3456789012");
const david = manager.addUser("David", "david@email.com", "4567890123");

console.log("=== EXPENSE SHARING SYSTEM ===\n");

// Create a group
const group = manager.createGroup("Goa Trip", alice.id);
group.addMember(bob);
group.addMember(charlie);
group.addMember(david);
console.log(`Group Created: ${group.name} with ${group.members.length} members\n`);

// Example 1: Equal split
console.log("--- Example 1: Equal Split ---");
const expense1 = manager.addExpense(
  "Dinner at restaurant",
  4000,
  alice.id,
  [alice.id, bob.id, charlie.id, david.id],
  'EQUAL',
  {},
  group.id
);
console.log(`${expense1.description}: ₹${expense1.amount} paid by ${expense1.paidBy.name}`);
expense1.getSplits().forEach(s => {
  console.log(`  ${s.user.name}: ₹${s.amount.toFixed(2)}`);
});

// Example 2: Exact split
console.log("\n--- Example 2: Exact Split ---");
const expense2 = manager.addExpense(
  "Shopping",
  3000,
  bob.id,
  [alice.id, bob.id, charlie.id],
  'EXACT',
  { amounts: { [alice.id]: 1200, [bob.id]: 800, [charlie.id]: 1000 } },
  group.id
);
console.log(`${expense2.description}: ₹${expense2.amount} paid by ${expense2.paidBy.name}`);
expense2.getSplits().forEach(s => {
  console.log(`  ${s.user.name}: ₹${s.amount.toFixed(2)}`);
});

// Example 3: Percent split
console.log("\n--- Example 3: Percent Split ---");
const expense3 = manager.addExpense(
  "Hotel booking",
  10000,
  charlie.id,
  [alice.id, bob.id, charlie.id, david.id],
  'PERCENT',
  { percentages: { [alice.id]: 40, [bob.id]: 30, [charlie.id]: 20, [david.id]: 10 } },
  group.id
);
console.log(`${expense3.description}: ₹${expense3.amount} paid by ${expense3.paidBy.name}`);
expense3.getSplits().forEach(s => {
  console.log(`  ${s.user.name}: ₹${s.amount.toFixed(2)}`);
});

// Show balances
console.log("\n--- Current Balances ---");
manager.showAllBalances().forEach(({ user, balances }) => {
  console.log(`\n${user.name}:`);
  balances.forEach(b => {
    if (b.type === 'GETS_BACK') {
      console.log(`  Gets back ₹${b.amount.toFixed(2)} from ${b.user.name}`);
    } else {
      console.log(`  Owes ₹${Math.abs(b.amount).toFixed(2)} to ${b.user.name}`);
    }
  });
});

// Simplified settlements
console.log("\n--- Simplified Settlement Plan ---");
const settlements = manager.simplifyDebts();
settlements.forEach(s => {
  console.log(`${s.from.name} pays ₹${s.amount.toFixed(2)} to ${s.to.name}`);
});

// Settle one transaction
console.log("\n--- Settling Transaction ---");
if (settlements.length > 0) {
  const settlement = settlements[0];
  manager.settleBalance(settlement.from.id, settlement.to.id, settlement.amount);
  console.log(`${settlement.from.name} paid ₹${settlement.amount.toFixed(2)} to ${settlement.to.name}`);
  
  console.log("\n--- Updated Balances ---");
  manager.showAllBalances().forEach(({ user, balances }) => {
    console.log(`\n${user.name}:`);
    balances.forEach(b => {
      if (b.type === 'GETS_BACK') {
        console.log(`  Gets back ₹${b.amount.toFixed(2)} from ${b.user.name}`);
      } else {
        console.log(`  Owes ₹${Math.abs(b.amount).toFixed(2)} to ${b.user.name}`);
      }
    });
  });
}