import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { authenticateToken, generateToken, type AuthRequest } from "./auth";
import { notifyOrderStatusChange } from "./notifications";
import { 
  insertUserSchema, 
  insertDriverSchema, 
  insertVehicleSchema, 
  insertOrderSchema,
  loginSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  console.log("✅ Using MongoDB database storage");

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(userWithoutPassword);
      
      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Dashboard Stats
  app.get("/api/dashboard/stats", authenticateToken, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      const drivers = await storage.getAllDrivers();
      const vehicles = await storage.getAllVehicles();

      const today = new Date().toISOString().split("T")[0];
      
      const stats = {
        totalOrders: orders.length,
        activeDrivers: drivers.filter(d => d.status === "available" || d.status === "busy").length,
        pendingOrders: orders.filter(o => o.status === "pending").length,
        completedToday: orders.filter(o => 
          o.status === "delivered" && 
          o.actualDeliveryTime && 
          o.actualDeliveryTime.toString().startsWith(today)
        ).length,
        availableVehicles: vehicles.filter(v => v.status === "available").length,
        inTransitOrders: orders.filter(o => o.status === "in-transit").length,
      };

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Orders Routes
  app.get("/api/orders", authenticateToken, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders/recent", authenticateToken, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders.slice(0, 5));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders/driver/:userId", authenticateToken, async (req, res) => {
    try {
      const drivers = await storage.getAllDrivers();
      const driver = drivers.find(d => d.userId === req.params.userId);
      
      if (!driver) {
        return res.json([]);
      }

      const orders = await storage.getOrdersByDriver(driver.id);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders/track/:orderNumber", async (req, res) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/orders/track/:orderNumber/driver", async (req, res) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (!order.driverId) {
        return res.json(null);
      }

      const driver = await storage.getDriver(order.driverId);
      if (!driver) {
        return res.json(null);
      }

      res.json({
        id: driver.id,
        currentLocation: driver.currentLocation,
        status: driver.status,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/orders", authenticateToken, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const data = insertOrderSchema.parse(req.body);
      
      const order = await storage.createOrder({
        ...data,
        customerId: authReq.user?.id || null,
        status: data.driverId ? "assigned" : "pending",
      });

      if (data.driverId) {
        await storage.updateDriver(data.driverId, { status: "busy" });
      }

      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/orders/:id/status", authenticateToken, async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.getOrder(req.params.id);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const oldStatus = order.status;
      const updates: any = { status };

      if (status === "delivered") {
        updates.actualDeliveryTime = new Date().toISOString();
        
        if (order.driverId) {
          const driver = await storage.getDriver(order.driverId);
          if (driver) {
            await storage.updateDriver(order.driverId, {
              status: "available",
              completedDeliveries: String(Number(driver.completedDeliveries) + 1),
            });
          }
        }
      }

      const updatedOrder = await storage.updateOrder(req.params.id, updates);

      if (order.customerId) {
        const customer = await storage.getUser(order.customerId);
        if (customer) {
          await notifyOrderStatusChange(
            customer.email,
            customer.phone,
            order.orderNumber,
            oldStatus,
            status
          );
        }
      }

      res.json(updatedOrder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Drivers Routes
  app.get("/api/drivers", authenticateToken, async (req, res) => {
    try {
      const drivers = await storage.getAllDrivers();
      res.json(drivers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/drivers", authenticateToken, async (req, res) => {
    try {
      const data = insertDriverSchema.parse(req.body);
      const driver = await storage.createDriver(data);
      res.json(driver);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/drivers/:id", authenticateToken, async (req, res) => {
    try {
      const driver = await storage.getDriver(req.params.id);
      if (!driver) {
        return res.status(404).json({ error: "Driver not found" });
      }
      res.json(driver);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/drivers/:id/location", authenticateToken, async (req, res) => {
    try {
      const { lat, lng } = req.body;
      if (typeof lat !== "number" || typeof lng !== "number") {
        return res.status(400).json({ error: "Invalid location data" });
      }

      const driver = await storage.updateDriver(req.params.id, {
        currentLocation: { lat, lng },
      });

      if (!driver) {
        return res.status(404).json({ error: "Driver not found" });
      }

      res.json(driver);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Vehicles Routes
  app.get("/api/vehicles", authenticateToken, async (req, res) => {
    try {
      const vehicles = await storage.getAllVehicles();
      res.json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/vehicles", authenticateToken, async (req, res) => {
    try {
      const data = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle(data);
      res.json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Analytics Routes
  app.get("/api/analytics", authenticateToken, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();

      const dailyDeliveries = last7Days.map(date => ({
        date: date.split("-").slice(1).join("/"),
        count: orders.filter(o => o.createdAt?.toString().startsWith(date)).length,
      }));

      const statusDistribution = [
        { name: "pending", value: orders.filter(o => o.status === "pending").length },
        { name: "assigned", value: orders.filter(o => o.status === "assigned").length },
        { name: "in-transit", value: orders.filter(o => o.status === "in-transit").length },
        { name: "delivered", value: orders.filter(o => o.status === "delivered").length },
        { name: "cancelled", value: orders.filter(o => o.status === "cancelled").length },
      ].filter(s => s.value > 0);

      const deliveryTimes = Array.from({ length: 24 }, (_, hour) => ({
        hour: `${hour}:00`,
        avgTime: 30 + Math.random() * 30,
      })).filter((_, i) => i >= 8 && i <= 20);

      const delivered = orders.filter(o => o.status === "delivered").length;
      const total = orders.length;
      const successRate = total > 0 ? Math.round((delivered / total) * 100) : 0;

      res.json({
        dailyDeliveries,
        statusDistribution,
        deliveryTimes,
        successRate,
        avgDeliveryTime: 35,
        totalRevenue: orders.filter(o => o.status === "delivered").length * 25,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
