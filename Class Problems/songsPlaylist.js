// Goal: Practice private fields and clean APIs.

// Create:

// Song with title, artist, durationSec

// Playlist with:

// private array of songs

// addSong(song)

// totalDuration() → sum duration in seconds

// getSongs() → returns list of "title - artist"
class Song {
  constructor (title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
  }
}

class Playlist {
  #songs;
  constructor() {
    this.#songs = [];
  }
  addSong(song) {
    this.#songs.push(song);
  }
  totalDuration() {
    return this.#songs.reduce((sum, item) => {
      sum += item.duration;
      return sum;
    }, 0);
  }
  getSongs() {
    return this.#songs.map(song => `${song.title} - ${song.artist}`);
  }
}

// Input:

const p = new Playlist();

p.addSong(new Song("Shiver", "Coldplay", 300));
p.addSong(new Song("Yellow", "Coldplay", 260));

console.log(p.totalDuration());
console.log(p.getSongs());
// Expected output:

// 560
// ["Shiver - Coldplay", "Yellow - Coldplay"]