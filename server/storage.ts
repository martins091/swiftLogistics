import type {
  User,
  InsertUser,
  Driver,
  InsertDriver,
  Vehicle,
  InsertVehicle,
  Order,
  InsertOrder,
  Notification,
  InsertNotification,
} from "@shared/schema";
import { UserModel, DriverModel, VehicleModel, OrderModel, NotificationModel } from "./models";

export interface IStorage {
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;

  getDriver(id: string): Promise<Driver | null>;
  getAllDrivers(): Promise<Driver[]>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriver(id: string, updates: Partial<Driver>): Promise<Driver | null>;

  getVehicle(id: string): Promise<Vehicle | null>;
  getAllVehicles(): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null>;

  getOrder(id: string): Promise<Order | null>;
  getOrderByNumber(orderNumber: string): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByDriver(driverId: string): Promise<Order[]>;
  getOrdersByCustomer(customerId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order | null>;

  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
}

export class DatabaseStorage implements IStorage {
  private toPlainObject(doc: any): any {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    const { _id, __v, ...rest } = obj;
    if (rest.createdAt && rest.createdAt instanceof Date) {
      rest.createdAt = rest.createdAt.toISOString();
    }
    if (rest.lastMaintenance && rest.lastMaintenance instanceof Date) {
      rest.lastMaintenance = rest.lastMaintenance.toISOString();
    }
    if (rest.estimatedDeliveryTime && rest.estimatedDeliveryTime instanceof Date) {
      rest.estimatedDeliveryTime = rest.estimatedDeliveryTime.toISOString();
    }
    if (rest.actualDeliveryTime && rest.actualDeliveryTime instanceof Date) {
      rest.actualDeliveryTime = rest.actualDeliveryTime.toISOString();
    }
    return rest;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id });
    return this.toPlainObject(user);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    return this.toPlainObject(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return this.toPlainObject(user);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = await UserModel.create(insertUser);
    return this.toPlainObject(user);
  }

  async getDriver(id: string): Promise<Driver | null> {
    const driver = await DriverModel.findOne({ id });
    return this.toPlainObject(driver);
  }

  async getAllDrivers(): Promise<Driver[]> {
    const drivers = await DriverModel.find();
    return drivers.map(d => this.toPlainObject(d));
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const driver = await DriverModel.create(insertDriver);
    return this.toPlainObject(driver);
  }

  async updateDriver(
    id: string,
    updates: Partial<Driver>
  ): Promise<Driver | null> {
    const driver = await DriverModel.findOneAndUpdate(
      { id },
      updates,
      { new: true }
    );
    return this.toPlainObject(driver);
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findOne({ id });
    return this.toPlainObject(vehicle);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    const vehicles = await VehicleModel.find();
    return vehicles.map(v => this.toPlainObject(v));
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const vehicle = await VehicleModel.create(insertVehicle);
    return this.toPlainObject(vehicle);
  }

  async updateVehicle(
    id: string,
    updates: Partial<Vehicle>
  ): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findOneAndUpdate(
      { id },
      updates,
      { new: true }
    );
    return this.toPlainObject(vehicle);
  }

  async getOrder(id: string): Promise<Order | null> {
    const order = await OrderModel.findOne({ id });
    return this.toPlainObject(order);
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    const order = await OrderModel.findOne({ orderNumber });
    return this.toPlainObject(order);
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    return orders.map(o => this.toPlainObject(o));
  }

  async getOrdersByDriver(driverId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ driverId }).sort({ createdAt: -1 });
    return orders.map(o => this.toPlainObject(o));
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ customerId }).sort({ createdAt: -1 });
    return orders.map(o => this.toPlainObject(o));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;
    const order = await OrderModel.create({ ...insertOrder, orderNumber });
    return this.toPlainObject(order);
  }

  async updateOrder(
    id: string,
    updates: Partial<Order>
  ): Promise<Order | null> {
    const order = await OrderModel.findOneAndUpdate(
      { id },
      updates,
      { new: true }
    );
    return this.toPlainObject(order);
  }

  async createNotification(
    insertNotification: InsertNotification
  ): Promise<Notification> {
    const notification = await NotificationModel.create(insertNotification);
    return this.toPlainObject(notification);
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });
    return notifications.map(n => this.toPlainObject(n));
  }
}

export const storage: IStorage = new DatabaseStorage();
