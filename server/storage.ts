import type { 
  User, InsertUser, 
  Driver, InsertDriver,
  Vehicle, InsertVehicle,
  Order, InsertOrder,
  Notification, InsertNotification 
} from "@shared/schema";
import { getDb } from "./db";
import { v4 as uuidv4 } from "uuid";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;

  // Drivers
  getDriver(id: string): Promise<Driver | null>;
  getAllDrivers(): Promise<Driver[]>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriver(id: string, updates: Partial<Driver>): Promise<Driver | null>;

  // Vehicles
  getVehicle(id: string): Promise<Vehicle | null>;
  getAllVehicles(): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null>;

  // Orders
  getOrder(id: string): Promise<Order | null>;
  getOrderByNumber(orderNumber: string): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByDriver(driverId: string): Promise<Order[]>;
  getOrdersByCustomer(customerId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order | null>;

  // Notifications
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
}

export class MongoStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | null> {
    const db = getDb();
    return await db.collection<User>("users").findOne({ id });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const db = getDb();
    return await db.collection<User>("users").findOne({ username });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const db = getDb();
    return await db.collection<User>("users").findOne({ email });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const db = getDb();
    const user: User = {
      ...insertUser,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await db.collection("users").insertOne(user);
    return user;
  }

  // Drivers
  async getDriver(id: string): Promise<Driver | null> {
    const db = getDb();
    return await db.collection<Driver>("drivers").findOne({ id });
  }

  async getAllDrivers(): Promise<Driver[]> {
    const db = getDb();
    return await db.collection<Driver>("drivers").find().toArray();
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const db = getDb();
    const driver: Driver = {
      ...insertDriver,
      id: uuidv4(),
      rating: "5.00",
      completedDeliveries: "0",
      createdAt: new Date().toISOString(),
    };
    await db.collection("drivers").insertOne(driver);
    return driver;
  }

  async updateDriver(id: string, updates: Partial<Driver>): Promise<Driver | null> {
    const db = getDb();
    const result = await db.collection<Driver>("drivers").findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: "after" }
    );
    return result || null;
  }

  // Vehicles
  async getVehicle(id: string): Promise<Vehicle | null> {
    const db = getDb();
    return await db.collection<Vehicle>("vehicles").findOne({ id });
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    const db = getDb();
    return await db.collection<Vehicle>("vehicles").find().toArray();
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const db = getDb();
    const vehicle: Vehicle = {
      ...insertVehicle,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await db.collection("vehicles").insertOne(vehicle);
    return vehicle;
  }

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
    const db = getDb();
    const result = await db.collection<Vehicle>("vehicles").findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: "after" }
    );
    return result || null;
  }

  // Orders
  async getOrder(id: string): Promise<Order | null> {
    const db = getDb();
    return await db.collection<Order>("orders").findOne({ id });
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    const db = getDb();
    return await db.collection<Order>("orders").findOne({ orderNumber });
  }

  async getAllOrders(): Promise<Order[]> {
    const db = getDb();
    return await db.collection<Order>("orders").find().sort({ createdAt: -1 }).toArray();
  }

  async getOrdersByDriver(driverId: string): Promise<Order[]> {
    const db = getDb();
    return await db.collection<Order>("orders").find({ driverId }).sort({ createdAt: -1 }).toArray();
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    const db = getDb();
    return await db.collection<Order>("orders").find({ customerId }).sort({ createdAt: -1 }).toArray();
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const db = getDb();
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const order: Order = {
      ...insertOrder,
      id: uuidv4(),
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    await db.collection("orders").insertOne(order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
    const db = getDb();
    const result = await db.collection<Order>("orders").findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: "after" }
    );
    return result || null;
  }

  // Notifications
  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const db = getDb();
    const notification: Notification = {
      ...insertNotification,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await db.collection("notifications").insertOne(notification);
    return notification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const db = getDb();
    return await db.collection<Notification>("notifications")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
  }
}

// Determine which storage to use
let activeStorage: IStorage;

// In-memory fallback storage (same implementation as before)
class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private drivers: Map<string, Driver> = new Map();
  private vehicles: Map<string, Vehicle> = new Map();
  private orders: Map<string, Order> = new Map();
  private notifications: Map<string, Notification> = new Map();

  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find(u => u.username === username) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find(u => u.email === email) || null;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async getDriver(id: string): Promise<Driver | null> {
    return this.drivers.get(id) || null;
  }

  async getAllDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values());
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const driver: Driver = {
      ...insertDriver,
      id: uuidv4(),
      rating: "5.00",
      completedDeliveries: "0",
      createdAt: new Date().toISOString(),
    };
    this.drivers.set(driver.id, driver);
    return driver;
  }

  async updateDriver(id: string, updates: Partial<Driver>): Promise<Driver | null> {
    const driver = this.drivers.get(id);
    if (!driver) return null;
    const updated = { ...driver, ...updates };
    this.drivers.set(id, updated);
    return updated;
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    return this.vehicles.get(id) || null;
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const vehicle: Vehicle = {
      ...insertVehicle,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    this.vehicles.set(vehicle.id, vehicle);
    return vehicle;
  }

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return null;
    const updated = { ...vehicle, ...updates };
    this.vehicles.set(id, updated);
    return updated;
  }

  async getOrder(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    return Array.from(this.orders.values()).find(o => o.orderNumber === orderNumber) || null;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getOrdersByDriver(driverId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(o => o.driverId === driverId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(o => o.customerId === customerId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const order: Order = {
      ...insertOrder,
      id: uuidv4(),
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
    const order = this.orders.get(id);
    if (!order) return null;
    const updated = { ...order, ...updates };
    this.orders.set(id, updated);
    return updated;
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const notification: Notification = {
      ...insertNotification,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }
}

// Will be set during app startup
export const storage = {} as IStorage;

export function setStorage(impl: IStorage) {
  Object.assign(storage, impl);
}

export function useMongoStorage() {
  activeStorage = new MongoStorage();
  setStorage(activeStorage);
}

export function useMemStorage() {
  activeStorage = new MemStorage();
  setStorage(activeStorage);
}
