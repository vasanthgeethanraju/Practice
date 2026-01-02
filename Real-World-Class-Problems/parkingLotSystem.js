// Design a Parking Lot System – Model a parking lot with multiple levels, parking spots of various sizes, and different vehicle types. 
// This is one of the most popular OOD questions, commonly asked at companies like Google, Amazon, Apple, Gojek, etc.medium.com. 
// The design typically involves classes for ParkingLot, Levels, Spots, Vehicles, Tickets, etc., and often uses principles like inheritance (for vehicle types) 
// and maybe design patterns for parking allocation.

// Simple Parking Lot System - First Round Interview

class Vehicle {
  constructor(licensePlate, size) {
    this.licensePlate = licensePlate;
    this.size = size; // 'small', 'medium', 'large'
  }
}

class ParkingSpot {
  constructor(id, size) {
    this.id = id;
    this.size = size;
    this.vehicle = null;
  }

  isAvailable() {
    return this.vehicle === null;
  }

  canFit(vehicle) {
    // Simple rule: spot size must match or be larger than vehicle
    const sizes = { small: 1, medium: 2, large: 3 };
    return sizes[this.size] >= sizes[vehicle.size];
  }

  park(vehicle) {
    if (this.isAvailable() && this.canFit(vehicle)) {
      this.vehicle = vehicle;
      return true;
    }
    return false;
  }

  unpark() {
    this.vehicle = null;
  }
}

class ParkingLot {
  constructor() {
    this.spots = [];
  }

  addSpot(spot) {
    this.spots.push(spot);
  }

  parkVehicle(vehicle) {
    // Find first available spot that fits
    for (let spot of this.spots) {
      if (spot.park(vehicle)) {
        console.log(`Parked ${vehicle.licensePlate} at spot ${spot.id}`);
        return spot;
      }
    }
    console.log(`No available spot for ${vehicle.licensePlate}`);
    return null;
  }

  unparkVehicle(licensePlate) {
    for (let spot of this.spots) {
      if (spot.vehicle && spot.vehicle.licensePlate === licensePlate) {
        spot.unpark();
        console.log(`Unparked ${licensePlate} from spot ${spot.id}`);
        return true;
      }
    }
    console.log(`Vehicle ${licensePlate} not found`);
    return false;
  }

  getAvailableSpots() {
    return this.spots.filter(spot => spot.isAvailable()).length;
  }
}

// ===== DEMO =====
const lot = new ParkingLot();

// Add 5 spots
lot.addSpot(new ParkingSpot(1, 'small'));
lot.addSpot(new ParkingSpot(2, 'medium'));
lot.addSpot(new ParkingSpot(3, 'medium'));
lot.addSpot(new ParkingSpot(4, 'large'));
lot.addSpot(new ParkingSpot(5, 'large'));

console.log(`Available spots: ${lot.getAvailableSpots()}\n`);

// Park some vehicles
const bike = new Vehicle('ABC123', 'small');
const truck = new Vehicle('TRK456', 'large');
const car = new Vehicle('XYZ789', 'medium');
const bus = new Vehicle('XYZ123', 'medium');
const cycle = new Vehicle('ABC789', 'large');
const scooter = new Vehicle('ABC780', 'small');

lot.parkVehicle(bike);
lot.parkVehicle(car);
lot.parkVehicle(truck);
lot.parkVehicle(bus);
lot.parkVehicle(cycle);
lot.parkVehicle(scooter);

console.log(`\nAvailable spots: ${lot.getAvailableSpots()}\n`);

// Unpark a vehicle
lot.unparkVehicle('XYZ789');
console.log(`\nAvailable spots: ${lot.getAvailableSpots()}`);
lot.parkVehicle(scooter);
console.log(`\nAvailable spots: ${lot.getAvailableSpots()}`);
