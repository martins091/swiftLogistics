# LogisticsPro - Logistics Management System

## Project Overview
A comprehensive MERN stack logistics management dashboard for tracking deliveries, managing drivers, optimizing fleet operations, and real-time delivery tracking.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Recharts, React Query
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, bcrypt
- **Notifications**: SendGrid (email), Twilio (SMS)
- **Maps**: Google Maps API

## Features Implemented
- ✅ Role-based authentication (Admin, Driver, Customer)
- ✅ Admin Dashboard with KPI overview
- ✅ Order Management (CRUD operations)
- ✅ Driver Management with performance tracking
- ✅ Vehicle Fleet Management
- ✅ Analytics Dashboard with charts
- ✅ Customer Order Tracking
- ✅ Email & SMS notifications for status changes
- ✅ Dark mode support
- ✅ Responsive design

## User Roles
1. **Admin**: Full access to dashboard, orders, drivers, vehicles, analytics
2. **Driver**: Access to assigned deliveries, update delivery status
3. **Customer**: Track orders by order number

## Environment Variables
Required secrets (already configured):
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret for JWT token signing
- `SENDGRID_API_KEY`: SendGrid API key for emails
- `TWILIO_ACCOUNT_SID`: Twilio account SID
- `TWILIO_AUTH_TOKEN`: Twilio auth token
- `TWILIO_PHONE_NUMBER`: Twilio phone number
- `GOOGLE_MAPS_API_KEY`: Google Maps API key

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Auth context, utilities
│   │   └── App.tsx        # Main app with routing
├── server/                # Express backend
│   ├── db.ts             # MongoDB connection
│   ├── storage.ts        # Data access layer
│   ├── auth.ts           # JWT authentication
│   ├── notifications.ts  # Email & SMS services
│   └── routes.ts         # API endpoints
└── shared/
    └── schema.ts         # Shared TypeScript types
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/track/:orderNumber` - Track order by number
- `PATCH /api/orders/:id/status` - Update order status

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Add new driver

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Add new vehicle

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/dashboard/stats` - Get dashboard statistics

## Design System
- **Colors**: Blue primary (#3b82f6), status-based colors
- **Typography**: Inter for UI, JetBrains Mono for codes
- **Components**: Shadcn UI with custom theming
- **Spacing**: Consistent 4px grid system
- **Animations**: Subtle hover/active states

## Development
The app runs on port 5000 with both frontend and backend served from the same Express server using Vite middleware.

## Notification System
- **Email**: Sent via SendGrid when order status changes
- **SMS**: Sent via Twilio for critical updates (in-transit, delivered)
- Notifications are triggered automatically on status changes

## Recent Changes
- Implemented complete MERN stack with MongoDB
- Built responsive admin and driver dashboards
- Created order tracking system for customers
- Integrated email and SMS notifications
- Added analytics with charts and metrics
- Implemented JWT authentication with role-based access
