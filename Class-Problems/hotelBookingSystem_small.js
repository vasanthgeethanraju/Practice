// Design a Hotel Management System – Create a class design for managing hotel operations: hotel branches, rooms of different types, bookings/reservations, check-in/out, etc. 
// Interviewers at big companies have used this scenario (for instance, Amazon’s low-level design round included a question similar to designing a Hotel Management System) . 
// Key classes might include Hotel, Room (with subclasses for room types), Booking, Guest, Payment, etc., focusing on relationships like aggregation (hotel has rooms) and use of design patterns if needed.

// ---------- Enums ---------- 
const RoomStatus = { 
  AVAILABLE: "AVAILABLE", 
  BOOKED: "BOOKED", 
  OCCUPIED: "OCCUPIED", 
}; 
 
const RoomType = { 
  SINGLE: "SINGLE", 
  DOUBLE: "DOUBLE", 
}; 
 
// ---------- Room ---------- 
class Room { 
  constructor(number, type) { 
    this.number = number; 
    this.type = type; 
    this.status = RoomStatus.AVAILABLE; 
  } 
 
  book() { 
    if (this.status !== RoomStatus.AVAILABLE) { 
      throw new Error("Room not available"); 
    } 
    this.status = RoomStatus.BOOKED; 
  } 
 
  checkIn() { 
    if (this.status !== RoomStatus.BOOKED) { 
      throw new Error("Room must be booked before check-in"); 
    } 
    this.status = RoomStatus.OCCUPIED; 
  } 
 
  checkOut() { 
    this.status = RoomStatus.AVAILABLE; 
  } 
} 
 
// ---------- Guest ---------- 
class Guest { 
  constructor(name) { 
    this.name = name; 
  } 
} 
 
// ---------- Booking ---------- 
class Booking { 
  constructor(guest, room) { 
    this.guest = guest; 
    this.room = room; 
    this.isActive = true; 
  } 
 
  checkIn() { 
    this.room.checkIn(); 
  } 
 
  checkOut() { 
    this.room.checkOut(); 
    this.isActive = false; 
  } 
} 
 
// ---------- Hotel ---------- 
class Hotel { 
  constructor(name) { 
    this.name = name; 
    this.rooms = []; 
    this.bookings = []; 
  } 
 
  addRoom(room) { 
    this.rooms.push(room); 
  } 
 
  findAvailableRoom(type) { 
    return this.rooms.find( 
      (room) => room.type === type && room.status === RoomStatus.AVAILABLE 
    ); 
  } 
 
  createBooking(guest, roomType) { 
    const room = this.findAvailableRoom(roomType); 
    if (!room) { 
      throw new Error("No rooms available"); 
    } 
 
    room.book(); 
    const booking = new Booking(guest, room); 
    this.bookings.push(booking); 
    return booking; 
  } 
} 
 

// ----------------DEMO----------------------
const hotel = new Hotel("Grand Hotel");

hotel.addRoom(new Room(101, RoomType.SINGLE));
hotel.addRoom(new Room(102, RoomType.DOUBLE));

const guest = new Guest("Ashwin");

const booking = hotel.createBooking(guest, RoomType.SINGLE);
console.log("Booked room:", booking.room.number, "Status:", booking.room.status);

booking.checkIn();
console.log("After check-in:", booking.room.number, "Status:", booking.room.status);

booking.checkOut();
console.log("After check-out:", booking.room.number, "Status:", booking.room.status);
console.log("Booking active?", booking.isActive);


