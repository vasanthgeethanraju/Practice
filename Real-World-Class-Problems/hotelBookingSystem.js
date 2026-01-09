// Design a Hotel Management System – Create a class design for managing hotel operations: hotel branches, rooms of different types, bookings/reservations, check-in/out, etc. 
// Interviewers at big companies have used this scenario (for instance, Amazon’s low-level design round included a question similar to designing a Hotel Management System) . 
// Key classes might include Hotel, Room (with subclasses for room types), Booking, Guest, Payment, etc., focusing on relationships like aggregation (hotel has rooms) and use of design patterns if needed.

// Enums for type safety
const RoomType = {
  SINGLE: 'SINGLE',
  DOUBLE: 'DOUBLE',
  DELUXE: 'DELUXE',
  SUITE: 'SUITE'
};

const RoomStatus = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  MAINTENANCE: 'MAINTENANCE',
  RESERVED: 'RESERVED'
};

const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  CANCELLED: 'CANCELLED'
};

const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
};

// Guest class - represents a hotel guest
class Guest {
  constructor(id, name, email, phone, address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  getDetails() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone
    };
  }
}

// Abstract Room class - base class for all room types
class Room {
  constructor(roomNumber, floor, basePrice) {
    if (this.constructor === Room) {
      throw new Error("Abstract class 'Room' cannot be instantiated");
    }
    this.roomNumber = roomNumber;
    this.floor = floor;
    this.basePrice = basePrice;
    this.status = RoomStatus.AVAILABLE;
  }

  getPrice() {
    return this.basePrice;
  }

  isAvailable() {
    return this.status === RoomStatus.AVAILABLE;
  }

  updateStatus(status) {
    this.status = status;
  }

  getDetails() {
    return {
      roomNumber: this.roomNumber,
      type: this.constructor.name,
      floor: this.floor,
      price: this.getPrice(),
      status: this.status
    };
  }
}

// Concrete Room classes - different room types
class SingleRoom extends Room {
  constructor(roomNumber, floor) {
    super(roomNumber, floor, 100);
    this.type = RoomType.SINGLE;
    this.capacity = 1;
  }
}

class DoubleRoom extends Room {
  constructor(roomNumber, floor) {
    super(roomNumber, floor, 150);
    this.type = RoomType.DOUBLE;
    this.capacity = 2;
  }
}

class DeluxeRoom extends Room {
  constructor(roomNumber, floor) {
    super(roomNumber, floor, 250);
    this.type = RoomType.DELUXE;
    this.capacity = 2;
    this.amenities = ['Mini Bar', 'Ocean View', 'Balcony'];
  }

  getPrice() {
    return this.basePrice * 1.2; // 20% premium for amenities
  }
}

class SuiteRoom extends Room {
  constructor(roomNumber, floor) {
    super(roomNumber, floor, 400);
    this.type = RoomType.SUITE;
    this.capacity = 4;
    this.amenities = ['Living Room', 'Kitchen', 'Jacuzzi', 'Premium View'];
  }

  getPrice() {
    return this.basePrice * 1.5; // 50% premium
  }
}

// Payment class - handles payment processing
class Payment {
  constructor(id, amount, method) {
    this.id = id;
    this.amount = amount;
    this.method = method; // 'CARD', 'CASH', 'UPI'
    this.status = PaymentStatus.PENDING;
    this.transactionDate = null;
  }

  processPayment() {
    // Simulate payment processing
    this.status = PaymentStatus.COMPLETED;
    this.transactionDate = new Date();
    return true;
  }

  refund() {
    if (this.status === PaymentStatus.COMPLETED) {
      this.status = PaymentStatus.REFUNDED;
      return true;
    }
    return false;
  }

  getDetails() {
    return {
      id: this.id,
      amount: this.amount,
      method: this.method,
      status: this.status,
      transactionDate: this.transactionDate
    };
  }
}

// Booking class - represents a reservation
class Booking {
  static bookingCounter = 1000;

  constructor(guest, room, checkInDate, checkOutDate) {
    this.bookingId = `BK${++Booking.bookingCounter}`;
    this.guest = guest;
    this.room = room;
    this.checkInDate = new Date(checkInDate);
    this.checkOutDate = new Date(checkOutDate);
    this.status = BookingStatus.PENDING;
    this.payment = null;
    this.createdAt = new Date();
  }

  calculateTotalAmount() {
    const days = Math.ceil(
      (this.checkOutDate - this.checkInDate) / (1000 * 60 * 60 * 24)
    );
    return this.room.getPrice() * days;
  }

  confirmBooking(paymentMethod) {
    if (this.status !== BookingStatus.PENDING) {
      throw new Error('Booking already processed');
    }

    const totalAmount = this.calculateTotalAmount();
    this.payment = new Payment(
      `PAY${this.bookingId}`,
      totalAmount,
      paymentMethod
    );

    if (this.payment.processPayment()) {
      this.status = BookingStatus.CONFIRMED;
      this.room.updateStatus(RoomStatus.RESERVED);
      return true;
    }
    return false;
  }

  checkIn() {
    if (this.status !== BookingStatus.CONFIRMED) {
      throw new Error('Booking must be confirmed before check-in');
    }
    this.status = BookingStatus.CHECKED_IN;
    this.room.updateStatus(RoomStatus.OCCUPIED);
  }

  checkOut() {
    if (this.status !== BookingStatus.CHECKED_IN) {
      throw new Error('Must be checked in before checkout');
    }
    this.status = BookingStatus.CHECKED_OUT;
    this.room.updateStatus(RoomStatus.AVAILABLE);
  }

  cancelBooking() {
    if (this.status === BookingStatus.CHECKED_IN) {
      throw new Error('Cannot cancel after check-in');
    }
    
    this.status = BookingStatus.CANCELLED;
    this.room.updateStatus(RoomStatus.AVAILABLE);
    
    if (this.payment && this.payment.status === PaymentStatus.COMPLETED) {
      this.payment.refund();
    }
  }

  getDetails() {
    return {
      bookingId: this.bookingId,
      guest: this.guest.getDetails(),
      room: this.room.getDetails(),
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      status: this.status,
      totalAmount: this.calculateTotalAmount(),
      payment: this.payment?.getDetails()
    };
  }
}

// Hotel Branch class - represents a single hotel location
class HotelBranch {
  constructor(branchId, name, location, address) {
    this.branchId = branchId;
    this.name = name;
    this.location = location;
    this.address = address;
    this.rooms = new Map(); // roomNumber -> Room
    this.bookings = new Map(); // bookingId -> Booking
  }

  addRoom(room) {
    if (this.rooms.has(room.roomNumber)) {
      throw new Error(`Room ${room.roomNumber} already exists`);
    }
    this.rooms.set(room.roomNumber, room);
  }

  removeRoom(roomNumber) {
    const room = this.rooms.get(roomNumber);
    if (room && room.status === RoomStatus.AVAILABLE) {
      this.rooms.delete(roomNumber);
      return true;
    }
    return false;
  }

  searchAvailableRooms(checkInDate, checkOutDate, roomType = null) {
    const available = [];
    
    for (const room of this.rooms.values()) {
      if (roomType && room.type !== roomType) continue;
      
      if (this.isRoomAvailable(room.roomNumber, checkInDate, checkOutDate)) {
        available.push(room);
      }
    }
    
    return available;
  }

  isRoomAvailable(roomNumber, checkInDate, checkOutDate) {
    const room = this.rooms.get(roomNumber);
    if (!room || !room.isAvailable()) return false;

    const reqCheckIn = new Date(checkInDate);
    const reqCheckOut = new Date(checkOutDate);

    // Check for overlapping bookings
    for (const booking of this.bookings.values()) {
      if (booking.room.roomNumber === roomNumber &&
          (booking.status === BookingStatus.CONFIRMED || 
           booking.status === BookingStatus.CHECKED_IN)) {
        
        const bookingCheckIn = booking.checkInDate;
        const bookingCheckOut = booking.checkOutDate;

        // Check for overlap
        if (reqCheckIn < bookingCheckOut && reqCheckOut > bookingCheckIn) {
          return false;
        }
      }
    }
    
    return true;
  }

  createBooking(guest, roomNumber, checkInDate, checkOutDate) {
    const room = this.rooms.get(roomNumber);
    if (!room) {
      throw new Error('Room not found');
    }

    if (!this.isRoomAvailable(roomNumber, checkInDate, checkOutDate)) {
      throw new Error('Room not available for selected dates');
    }

    const booking = new Booking(guest, room, checkInDate, checkOutDate);
    this.bookings.set(booking.bookingId, booking);
    return booking;
  }

  getBooking(bookingId) {
    return this.bookings.get(bookingId);
  }

  getAllBookings() {
    return Array.from(this.bookings.values());
  }

  getRoomOccupancy() {
    let total = this.rooms.size;
    let occupied = 0;
    
    for (const room of this.rooms.values()) {
      if (room.status === RoomStatus.OCCUPIED) {
        occupied++;
      }
    }
    
    return {
      total,
      occupied,
      available: total - occupied,
      occupancyRate: ((occupied / total) * 100).toFixed(2) + '%'
    };
  }
}

// Hotel Management System - Singleton pattern
class HotelManagementSystem {
  static instance = null;

  constructor() {
    if (HotelManagementSystem.instance) {
      return HotelManagementSystem.instance;
    }
    
    this.branches = new Map(); // branchId -> HotelBranch
    this.guests = new Map(); // guestId -> Guest
    HotelManagementSystem.instance = this;
  }

  static getInstance() {
    if (!HotelManagementSystem.instance) {
      HotelManagementSystem.instance = new HotelManagementSystem();
    }
    return HotelManagementSystem.instance;
  }

  addBranch(branch) {
    if (this.branches.has(branch.branchId)) {
      throw new Error(`Branch ${branch.branchId} already exists`);
    }
    this.branches.set(branch.branchId, branch);
  }

  getBranch(branchId) {
    return this.branches.get(branchId);
  }

  addGuest(guest) {
    this.guests.set(guest.id, guest);
  }

  getGuest(guestId) {
    return this.guests.get(guestId);
  }

  searchRoomsAcrossBranches(checkInDate, checkOutDate, location = null, roomType = null) {
    const results = [];
    
    for (const branch of this.branches.values()) {
      if (location && branch.location !== location) continue;
      
      const availableRooms = branch.searchAvailableRooms(
        checkInDate, 
        checkOutDate, 
        roomType
      );
      
      if (availableRooms.length > 0) {
        results.push({
          branch: branch.name,
          location: branch.location,
          rooms: availableRooms
        });
      }
    }
    
    return results;
  }
}

// ============== DEMO USAGE ==============

console.log('=== Hotel Management System Demo ===\n');

// Get singleton instance
const hms = HotelManagementSystem.getInstance();

// Create hotel branch
const downtown = new HotelBranch(
  'BR001',
  'Grand Hotel Downtown',
  'New York',
  '123 Main St, NY 10001'
);

// Add rooms to branch
downtown.addRoom(new SingleRoom('101', 1));
downtown.addRoom(new DoubleRoom('102', 1));
downtown.addRoom(new DeluxeRoom('201', 2));
downtown.addRoom(new SuiteRoom('301', 3));

hms.addBranch(downtown);

// Create guest
const guest1 = new Guest('G001', 'John Doe', 'john@email.com', '555-1234', 'NYC');
hms.addGuest(guest1);

console.log('1. Search Available Rooms:');
const available = downtown.searchAvailableRooms('2026-02-01', '2026-02-05');
console.log(`Found ${available.length} available rooms`);
available.forEach(room => console.log(room.getDetails()));

console.log('\n2. Create Booking:');
const booking = downtown.createBooking(
  guest1,
  '201', // Deluxe room
  '2026-02-01',
  '2026-02-05'
);
console.log('Booking created:', booking.bookingId);
console.log('Total amount:', booking.calculateTotalAmount());

console.log('\n3. Confirm Booking with Payment:');
booking.confirmBooking('CARD');
console.log('Booking confirmed');
console.log('Payment details:', booking.payment.getDetails());

console.log('\n4. Check-in:');
booking.checkIn();
console.log('Guest checked in successfully');
console.log('Room status:', booking.room.status);

console.log('\n5. Hotel Occupancy:');
console.log(downtown.getRoomOccupancy());

console.log('\n6. Check-out:');
booking.checkOut();
console.log('Guest checked out');
console.log('Room status:', booking.room.status);

console.log('\n7. Final Booking Details:');
console.log(booking.getDetails());

// Test cancellation scenario
console.log('\n8. Cancellation Test:');
const booking2 = downtown.createBooking(guest1, '102', '2026-03-01', '2026-03-03');
booking2.confirmBooking('UPI');
console.log('New booking created and confirmed:', booking2.bookingId);
booking2.cancelBooking();
console.log('Booking cancelled');
console.log('Payment status:', booking2.payment.status);

console.log('\n=== Demo Complete ===');