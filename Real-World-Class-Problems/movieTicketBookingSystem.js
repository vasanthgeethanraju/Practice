// Design a Movie Ticket Booking System (e.g. BookMyShow) – 
// Create an OOP design for an online movie ticketing platform with theaters, screens, shows, seats, bookings, payments, etc. 
// Variations of this problem have appeared in company interviews (e.g. Park+ and Flipkart asked candidates to design a “BookMyShow” system)glassdoor.comleetcode.com. 
// It involves class design for entities like Movie, Theater, Show, Seat, Booking, Payment, etc., focusing on relationships and interactions between these objects.

// ==================== Core Classes ====================

class Movie {
  constructor(id, title, duration) {
    this.id = id;
    this.title = title;
    this.duration = duration; // in minutes
  }
}

class Theater {
  constructor(id, name, city) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.screens = [];
  }
  
  addScreen(screen) {
    this.screens.push(screen);
  }
}

class Screen {
  constructor(id, name, totalSeats) {
    this.id = id;
    this.name = name;
    this.totalSeats = totalSeats;
  }
}

class Show {
  constructor(id, movie, screen, theater, startTime, price) {
    this.id = id;
    this.movie = movie;
    this.screen = screen;
    this.theater = theater;
    this.startTime = startTime;
    this.price = price;
    this.bookedSeats = new Set(); // seat numbers that are booked
  }
  
  getAvailableSeats() {
    return this.screen.totalSeats - this.bookedSeats.size;
  }
  
  bookSeats(numSeats) {
    if (this.getAvailableSeats() >= numSeats) {
      for (let i = 0; i < numSeats; i++) {
        this.bookedSeats.add(this.bookedSeats.size + 1);
      }
      return true;
    }
    return false;
  }
}

class Booking {
  constructor(id, user, show, numSeats) {
    this.id = id;
    this.user = user;
    this.show = show;
    this.numSeats = numSeats;
    this.totalAmount = numSeats * show.price;
    this.bookingTime = new Date();
  }
    
  getDetails() {
    return `
      Booking ID: ${this.id}
      Movie: ${this.show.movie.title}
      Theater: ${this.show.theater.name}, ${this.show.theater.city}
      Show Time: ${this.show.startTime.toLocaleString()}
      Seats: ${this.numSeats}
      Total: ₹${this.totalAmount}
          `.trim();
  }
}

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// ==================== Booking System ====================

class BookingSystem {
  constructor() {
    this.movies = new Map();
    this.theaters = new Map();
    this.shows = new Map();
    this.bookings = new Map();
    this.users = new Map();
  }
  
  addMovie(movie) {
    this.movies.set(movie.id, movie);
  }
  
  addTheater(theater) {
    this.theaters.set(theater.id, theater);
  }
  
  addShow(show) {
    this.shows.set(show.id, show);
  }
  
  addUser(user) {
    this.users.set(user.id, user);
  }
  
  searchShows(city, movieTitle) {
    return Array.from(this.shows.values()).filter(show => show.theater.city === city && 
                                                  show.movie.title.toLowerCase().includes(movieTitle.toLowerCase()));
  }

  bookTickets(userId, showId, numSeats) {
    const user = this.users.get(userId);
    const show = this.shows.get(showId);
    
    if (!user || !show) {
      return null;
    }
    
    if (show.bookSeats(numSeats)) {
      const bookingId = `BK${Date.now()}`;
      const booking = new Booking(bookingId, user, show, numSeats);
      this.bookings.set(bookingId, booking);
      return booking;
    }
    
    return null;
  }
  
  getBooking(bookingId) {
    return this.bookings.get(bookingId);
  }
}

// ==================== Demo ====================

const system = new BookingSystem();

// Setup
const movie = new Movie("M1", "Inception", 148);
system.addMovie(movie);

const theater = new Theater("T1", "PVR Cinemas", "Mumbai");
const screen = new Screen("S1", "Screen 1", 100);
theater.addScreen(screen);
system.addTheater(theater);

const showTime = new Date();
showTime.setHours(18, 0, 0);
const show = new Show("SH1", movie, screen, theater, showTime, 250);
system.addShow(show);

const user = new User("U1", "John Doe", "john@example.com");
system.addUser(user);

// Search shows
console.log("=== Search Shows in Mumbai ===");
const shows = system.searchShows("Mumbai", "Inception");
shows.forEach(s => {
  console.log(`${s.movie.title} at ${s.theater.name}`);
  console.log(`Time: ${s.startTime.toLocaleTimeString()}`);
  console.log(`Available Seats: ${s.getAvailableSeats()}`);
  console.log(`Price: ₹${s.price}\n`);
});

// Book tickets
console.log("=== Book Tickets ===");
const booking = system.bookTickets("U1", "SH1", 3);

if (booking) {
  console.log(booking.getDetails());
  console.log(`\nSeats remaining: ${show.getAvailableSeats()}`);
} else {
  console.log("Booking failed!");
}