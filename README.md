# 🛍️ Multi-Vendor Cosmetics Ordering Platform

A comprehensive web application designed to streamline online ordering of cosmetics from multiple retailers in a single checkout. This README outlines the project’s scope, development methodology, market context, and the technologies used.

---

## 📈 Project Scope & Importance

Building a fully functional e-commerce platform is a complex, multi-stage process that aims to deliver a product meeting all business requirements. Key objectives:

- **Define project importance**: why digitizing multi-vendor cosmetic ordering adds value  
- **Establish project scope**: support multiple stores, unified cart, diverse product lines  
- **Highlight specific challenges**: data integration, transactional consistency, security, maintainability  

---

## 🗂️ Development Life-Cycle

The project follows standard software development phases, each equally critical:

1. **Analysis**  
   - Gather requirements through market research and competitor benchmarking (e.g., Lilly, Jasmin, Sephora, Ulta Beauty)  
   - Identify features, user stories, data sources, and technology fit  

2. **Planning**  
   - Create a detailed timeline, resource allocation, and milestones  
   - Define project goals, deliverables, and success criteria  
   - Anticipate risks and dependencies  

3. **Design**  
   - Architect system modules, user workflows, and UI wireframes  
   - Define database schema, API contracts, and component hierarchy  

4. **Implementation**  
   - **Backend**: build RESTful services, business logic, data access layers  
   - **Frontend**: develop responsive UI, routing, and state management  
   - Split work between server-side and client-side teams  

5. **Testing**  
   - Unit, integration, and end-to-end testing of all features  
   - Validate functionality against requirements and performance targets  

6. **Maintenance**  
   - Monitor the live system using logging and APM tools  
   - Apply corrective (bug fixes) and adaptive (feature updates) maintenance  

---

## 🌍 Market Analysis

Several Serbian-based online cosmetics stores exist (e.g., Lilly Drogerija, Alexander Cosmetics, Jasmin Parfimerija). International leaders include **Sephora** and **Ulta Beauty**, both offering:

- Multi-brand product lines  
- Loyalty programs (e.g., Sephora’s tiered rewards)  
- High customer retention via engagement incentives  

**Key differentiator** of this project:  
> **Unified multi-vendor cart**—allowing users to order products from different stores (e.g., Lilly, Jasmin, Sephora) in a single checkout.

---

## 🛠️ Technology Stack

### 1. Database: Microsoft SQL Server Management Studio  
- **Role**: design, manage, and administer the relational database  
- **Features**:  
  - DDL/DML/DCL/TCL support  
  - GUI and script editors for table, view, index, stored procedure management  
  - Backup/restore, user/role management, data import/export, replication  

### 2. Backend: ASP.NET Core + Entity Framework  
- **Framework**: ASP .NET Core Web API  
- **ORM**: Entity Framework Core  
- **Responsibilities**:  
  - Implement business logic and CRUD operations  
  - Define data models with POCO classes and JPA-style annotations  
  - Handle authentication/authorization (JWT or similar)  
  - Expose REST endpoints for products, orders, carts, users  

### 3. Frontend: Angular  
- **Architecture**: component-based with NgModules and TypeScript  
- **Key features**:  
  - Components (`.ts` + `.html` + `.css`), services for HTTP calls, reactive forms  
  - Router for navigation between login, catalog, cart, checkout, admin pages  
  - Real-time filtering and search UI  

### 4. Payment: Stripe  
- **Processor** for secure card payments (credit/debit)  
- **Integration**:  
  1. Client collects payment info  
  2. Uses Stripe.js or mobile SDK to create a Payment Intent  
  3. Stripe encrypts and forwards data to banks  
  4. Handles success/failure callbacks  
- **Payment Gateway**: encrypts card data, authorizes transactions, ensures PCI compliance  

### 5. Webhooks  
- **Purpose**: receive asynchronous Stripe events (e.g., `payment_intent.succeeded`, `charge.failed`)  
- **Implementation**:  
  - Expose a public endpoint for Stripe to POST events  
  - Validate event signatures, update order status, notify admins  
  - Local testing via Stripe CLI (`stripe listen`, `stripe trigger`)  

---

## 🔒 Security & Compliance

- **Input Validation & Sanitization** to prevent SQL injection, XSS  
- **Secure Transport** (HTTPS/TLS) for all endpoints  
- **Role-Based Access Control** for admin vs. customer operations  
- **PCI DSS** considerations when handling payment data  

---
