import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  fullName: string;
  phone?: string;
  createdAt: Date;
}

export interface IDriver extends Document {
  id: string;
  userId?: string;
  licenseNumber: string;
  status: string;
  currentLocation?: any;
  vehicleId?: string;
  rating: string;
  completedDeliveries: string;
  createdAt: Date;
}

export interface IVehicle extends Document {
  id: string;
  licensePlate: string;
  type: string;
  model: string;
  status: string;
  capacity?: string;
  lastMaintenance?: Date;
  createdAt: Date;
}

const vehicleFields = {
  id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  licensePlate: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  status: { type: String, required: true, default: "available" },
  capacity: { type: String },
  lastMaintenance: { type: Date },
  createdAt: { type: Date, default: Date.now },
};

export interface IOrder extends Document {
  id: string;
  orderNumber: string;
  customerId?: string;
  driverId?: string;
  status: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupLocation?: any;
  deliveryLocation?: any;
  packageDetails?: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  notes?: string;
  createdAt: Date;
}

export interface INotification extends Document {
  id: string;
  userId?: string;
  orderId?: string;
  type: string;
  message: string;
  read: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "customer" },
  fullName: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const driverSchema = new Schema<IDriver>({
  id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  userId: { type: String },
  licenseNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: "available" },
  currentLocation: { type: Schema.Types.Mixed },
  vehicleId: { type: String },
  rating: { type: String, default: "5.00" },
  completedDeliveries: { type: String, default: "0" },
  createdAt: { type: Date, default: Date.now },
});

const vehicleSchema = new Schema<IVehicle>(vehicleFields as any);

const orderSchema = new Schema<IOrder>({
  id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  orderNumber: { type: String, required: true, unique: true },
  customerId: { type: String },
  driverId: { type: String },
  status: { type: String, required: true, default: "pending" },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  pickupLocation: { type: Schema.Types.Mixed },
  deliveryLocation: { type: Schema.Types.Mixed },
  packageDetails: { type: String },
  estimatedDeliveryTime: { type: Date },
  actualDeliveryTime: { type: Date },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const notificationSchema = new Schema<INotification>({
  id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  userId: { type: String },
  orderId: { type: String },
  type: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: String, required: true, default: "false" },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
export const DriverModel = mongoose.model<IDriver>("Driver", driverSchema);
export const VehicleModel = mongoose.model<IVehicle>("Vehicle", vehicleSchema);
export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
export const NotificationModel = mongoose.model<INotification>("Notification", notificationSchema);
