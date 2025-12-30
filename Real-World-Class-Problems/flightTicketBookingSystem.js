// Design an object-oriented program for a flight ticket booking system. 
// The system should support functions: adding flight information, booking tickets, canceling bookings, and querying ticket status. 
// Design the class structure and provide interface details and sample code for each function.
// Simple Flight Booking System for Interview
class Flight {
  constructor(flightNumber, from, to) {
    this.flightNumber = flightNumber;
    this.from = from;
    this.to = to;
    this.totalSeats = 1;
    this.availableSeats = 1;
    this.bookedSeats = new Set();
  }
}

class Booking {
  constructor(bookingId, flightNumber, passengerName, seatNumber) {
    this.bookingId = bookingId;
    this.flightNumber = flightNumber;
    this.passengerName = passengerName;
    this.seatNumber = seatNumber;
    this.status = 'CONFIRMED';
  }
}

class FlightBookingSystem {
  constructor() {
    this.flights = new Map();
    this.bookings = new Map();
    this.bookingCounter = 1;
  }

  // Add new flight
  addFlight(flightNumber, from, to) {
    if (this.flights.has(flightNumber)) {
      throw new Error('Flight already exists');
    }
    const flight = new Flight(flightNumber, from, to);
    this.flights.set(flightNumber, flight);
    return `Flight ${flightNumber} added successfully`;
  }

  // Book a ticket
  bookTicket(flightNumber, passengerName, seatNumber) {
    const flight = this.flights.get(flightNumber);
    
    if (!flight) {
      throw new Error('Flight not found');
    }
    
    if (flight.availableSeats === 0) {
      throw new Error('No seats available');
    }
    
    if (flight.bookedSeats.has(seatNumber)) {
      throw new Error('Seat already booked');
    }

    const bookingId = `BK${this.bookingCounter++}`;
    const booking = new Booking(bookingId, flightNumber, passengerName, seatNumber);
    
    flight.bookedSeats.add(seatNumber);
    flight.availableSeats--;
    this.bookings.set(bookingId, booking);
    
    return {
      bookingId,
      message: 'Booking successful',
      details: booking
    };
  }

  // Cancel booking
  cancelBooking(bookingId) {
    const booking = this.bookings.get(bookingId);
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    if (booking.status === 'CANCELLED') {
      throw new Error('Booking already cancelled');
    }

    const flight = this.flights.get(booking.flightNumber);
    flight.bookedSeats.delete(booking.seatNumber);
    flight.availableSeats++;
    booking.status = 'CANCELLED';
    
    return `Booking ${bookingId} cancelled successfully`;
  }

  // Get booking status
  getBookingStatus(bookingId) {
    const booking = this.bookings.get(bookingId);
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    return {
      bookingId: booking.bookingId,
      flightNumber: booking.flightNumber,
      passengerName: booking.passengerName,
      seatNumber: booking.seatNumber,
      status: booking.status
    };
  }


}

// Demo Usage
console.log('=== Flight Booking System Demo ===\n');

const system = new FlightBookingSystem();

// 1. Add flights
console.log('1. Adding Flights:');
console.log(system.addFlight('AI101', 'NYC', 'LAX'));
console.log(system.addFlight('AI102', 'NYC', 'SFO'));
console.log();

// 2. Book tickets
console.log('2. Booking Tickets:');
const booking1 = system.bookTicket('AI101', 'John Doe', '12A');
console.log(booking1);
console.log();

const booking2 = system.bookTicket('AI101', 'Jane Smith', '15B');
console.log(booking2);
console.log();

// 3. Get booking status
console.log('3. Check Booking Status:');
console.log(system.getBookingStatus(booking1.bookingId));
console.log();

// 4. Cancel booking
console.log('4. Cancel Booking:');
console.log(system.cancelBooking(booking2.bookingId));
console.log();

// 5. Check Cancelled Booking:
console.log('5. Check Cancelled Booking:');
console.log(system.getBookingStatus(booking2.bookingId));
console.log();

// 6. Error handling - book already booked seat
console.log('6. Error Handling (book same seat):');
try {
  system.bookTicket('AI101', 'Bob Wilson', '12A');
} catch (error) {
  console.log('Error:', error.message);
}