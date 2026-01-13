// Index documents by words. Support addDoc(id, text) and search(word) returning matching doc IDs.

class MiniSearch {
  constructor() {
    // TODO: word -> Set(docId), docId -> Set(words) (for re-indexing/removal)
    this.wordIndex = new Map();
    this.docIndex = new Map();
  }
 
  // TODO: add/update document
  addDoc(docId, text) {
    if (this.docIndex.has(docId)) {
      this.removeDoc(docId);
    }

    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const wordSet = new Set(words);
    this.docIndex.set(docId, wordSet);

    for (const word of wordSet) {
      if (!this.wordIndex.has(word)) {
        this.wordIndex.set(word, new Set());
      }
      this.wordIndex.get(word).add(docId);
    }
  }

  // TODO: remove document
  removeDoc(docId) {
    if (!this.docIndex.has(docId)) return;

    const words = this.docIndex.get(docId);

    for (const word of words) {
      const docs = this.wordIndex.get(word);
      docs.delete(docId);

      // Cleanup empty sets
      if (docs.size === 0) {
        this.wordIndex.delete(word);
      }
    }

    this.docIndex.delete(docId);
  }

  // TODO: search by single word (case-insensitive)
  search(word) {
    // return this.docs;
    const normalized = word.toLowerCase();
    return Array.from(this.wordIndex.get(normalized) || []);
  }
}


const s = new MiniSearch();
s.addDoc("d1", "Hello world");
s.addDoc("d2", "Hello Cambrian");
s.addDoc("d3", "World health");

console.log(s.search("hello"));
console.log(s.search("world"));

s.removeDoc("d1");
console.log(s.search("hello"));
console.log(s.search("world"));


//output:
// ["d1", "d2"]
// ["d1", "d3"]
// ["d2"]
// ["d3"]