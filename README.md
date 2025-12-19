**Ticket Bari**
Ticket Bari is a comprehensive, ticket booking and management platform designed to streamline the connection between travelers, vendors, and administrators.

**Live URL**
Frontend:  https://ticket-bari.web.app

**Project Purpose**
The goal of Ticket Bari is to digitize the ticketing ecosystem in Bangladesh. It provides:

**For Users:** A seamless way to search, book, and pay for bus tickets online.

**For Vendors:** A dashboard to list bus tickets, manage inventory, and track booking requests.

**For Admins:** A centralized hub to verify tickets, manage user roles, and monitor platform performance.

**Key Features**
 Multi-Role Authentication
Secure Login/Register using Firebase Authentication.

Social Login (Google) for quick access.

Role-based redirects (Admin, Vendor, User) upon login.

**Ticket Management**
Vendors can add new tickets with details like operator name, price, and quantity.

Admins must verify and approve tickets before they appear on the homepage.

Real-time Stock Tracking: Quantities decrease automatically upon successful booking.

**Booking & Payments**
Integrated Stripe Payment Gateway for secure transactions.

Booking history with payment status (Pending/Paid).

Automatic receipt generation and transaction history.

**Admin & Vendor Dashboards**
Admin: Manage users (Promote to Vendor/Admin or Ban/Mark Fraud) and toggle homepage advertisements.

Vendor: Overview of earnings, total tickets added, and requested booking management.

**Modern UI/UX**
Responsive design for Mobile and Desktop using Tailwind CSS and DaisyUI.

Dark/Light mode support.

Interactive notifications with SweetAlert2.

**Technologies & Packages Used**
Core Frameworks
React: For building the user interface.

Vite: For a fast development and build environment.

React Router Dom : For dynamic client-side routing.

**Backend & Database**
Firebase: Authentication and Frontend Hosting.

Axios: For handling secure API requests to the Node/Express backend.

TanStack React Query: For efficient data fetching, caching, and state synchronization.

**UI & Styling**
Tailwind CSS & DaisyUI: For utility-first styling and themeable components.

React Icons: For intuitive iconography.

Swiper: For modern touch-enabled sliders.

Headless UI: For accessible UI components.

Utilities & Enhancements
Stripe (@stripe/stripe-js): For handling online payments.

React Hook Form: For performant and flexible form validation.

Recharts: For visualizing data trends in the dashboards.

SweetAlert2: For beautiful, responsive popup messages.

React Countdown: For time-sensitive booking windows.
