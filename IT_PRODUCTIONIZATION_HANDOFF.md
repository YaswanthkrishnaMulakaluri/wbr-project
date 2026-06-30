# IT PRODUCTIONIZATION HANDOFF & ARCHITECTURAL REQUIREMENTS
## Weekly Business Intelligence (WBI) Platform

This document serves as the official technical handoff and engineering specification for software engineers and IT operations teams to move the **Weekly Business Intelligence (WBI)** prototype into a production-grade enterprise system.

---

## 1. Executive Summary
The WBI Platform is a critical operations dashboard displaying key performance indicators (KPIs), metric trends, and qualitative leadership inferences on a weekly cadence for **Sales**, **Retention**, **Marketing**, and **Academics** departments. 

To transition from the current Node.js development container to high-availability production, the target system must ingest multi-tab Excel files (`.xlsx`) and single CSV files (`.csv`), support dynamic layouts under secure PIN locks, and handle historical logging of user activities safely.

---

## 2. Recommended Production Tech Stack
The prototype uses React, Tailwind CSS, Express, and local JSON storage. For production, we recommend the following target stack:

### Frontend
- **Framework**: React 18+ (Vite) or Next.js (App Router)
- **UI & Styling**: Tailwind CSS, Radix UI (Headless primitives), Lucide React (Icons)
- **Charting Engine**: Recharts, D3.js or ChartJS for optimized SVG data rendering, with canvas fallback for high-density matrices

### Backend & API Services
- **Runtime**: Node.js v18/v20 (LTS) or Go (Golang) microservices
- **Framework**: NestJS (if Node) or Gin/Fiber (if Go) to provide strong schema validation (DTOs) and enterprise architecture
- **Queue/Workers**: BullMQ (Redis) or Google Cloud Tasks for asynchronous background processing of large Excel file analytical parses

### Database Layer
- **Relational DB**: GCP Cloud SQL for PostgreSQL or AWS RDS PostgreSQL
- **Key-Value Store**: Redis (for session management, API rate limiting, and Excel parsing lock controls)
- **Schema & Migration**: Prisma or Drizzle ORM to maintain type-safe database schemas with continuous migrations

---

## 3. Core Architecture
We recommend a **Separated Full-Stack Cloud Native Architecture** (e.g., hosted on GCP or AWS) with serverless containers for automatic scaling.

```
                  ┌──────────────────────┐
                  │   Cloud CDN (Edge)   │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │  Reverse Proxy / LB  │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
   ┌────────▼────────┐               ┌────────▼────────┐
   │ Frontend Static │               │ API Gateway     │
   │ Host (S3/GCS)   │               │ REST / GraphQL  │
   └─────────────────┘               └────────┬────────┘
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                       ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                       │  Auth / IAM │ │ Ingestion   │ │ Analytics   │
                       │   Service   │ │   Service   │ │   Service   │
                       └─────────────┘ └──────┬──────┘ └──────┬──────┘
                                              │               │
                                              └──────┬────────┘
                                                     │
                                       ┌─────────────▼─────────────┐
                                       │        Load Balancer      │
                                       └─────────────┬─────────────┘
                                                     │
                                       ┌─────────────▼─────────────┐
                                       │       PostgreSQL DB       │
                                       └───────────────────────────┘
```

### Ingestion Pipeline Workflow
Due to the intensive nature of file processing, the parsing of uploaded documents follow an asynchronous worker pattern:
1. **Upload**: Client requests a secure Pre-Signed URL from the API Gateway and uploads the file directly to object storage (GCS/S3) with metadata tags.
2. **Event Trigger**: Object Upload triggers a serverless function or inserts a job into the Redis Queue (`excel-ingestion-queue`).
3. **Worker Processing**: Background workers fetch the raw file, parse the cells using XLSX engines, validate headers against target subcategory configurations, and upsert records into the relational database block-by-block.
4. **WebSocket Push**: Once parsing completes, a WebSocket event or SSE (Server-Sent Events) pushes a `"SUBMISSION_COMPLETE"` topic to active dashboards, refreshing UI states without manual reload.

---

## 4. Key Feature Requirements (IT Requirements Checklist)

### 📊 Ingestion & File Parsing
- **Multi-Format Support**: Support both Excel (`.xlsx`, `.xls`) and `.csv` files.
- **Header Parsing & Mapping Tolerance**: Use normalized lowercase mapping keys (`normKey()`) to resolve spacing, casing, and symbol discrepancies (e.g. `Total Revenue` vs `total_revenue`).
- **Sheet Target Isolation**: Map different tabs of Excel spreadsheets to distinct configured Metrics based on target `sheetName` (case-insensitive).
- **History Rollback**: Allow administrators to wipe/clear specific weekly uploads in one click, rolling back state to preceding weeks.

### 🔐 Multi-Tier Security
- **Configuration Access Control**: Accessing structural dashboards, layouts, and system configurations must be locked behind an administrative credential (e.g., Auth0, Azure AD, or OKTA) paired with PIN Coordinate coordinate confirmations.
- **Data Encryption**: All database-level fields must be encrypted at rest (AES-256) and in transit (TLS 1.3).
- **Client Inactivity Locks**: The frontend application should automatically lock active administrative configuration sessions after 15 minutes of inactivity to prevent physical breach of open terminals.

### 📈 Analytics & Plot Aggregations
- **Dynamic Chart Scaling**: Automatically toggle custom percent formatting (`0.0%`) for indices with names containing `"%"` or `"rate"`.
- **Target Line Comparisons**: Render target benchmarks alongside raw historical performance curves on linear line charts.
- **Prior Year (PY) Overlays**: Support displaying Prior Year values as secondary comparison columns on mouse-hover inspect arrays.

---

## 5. Relational Database Schema Design
For production, the static configurations and dynamic uploads must be backed by relational tables. Below is the proposed PostgreSQL DDL schema.

```sql
-- Create Departments Table
CREATE TABLE departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Categories Table
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    dept_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Subcategories Table
CREATE TABLE subcategories (
    id VARCHAR(50) PRIMARY KEY,
    cat_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Metrics (Sheets) Table
CREATE TABLE metrics (
    id VARCHAR(50) PRIMARY KEY,
    sub_id VARCHAR(50) REFERENCES subcategories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    sheet_name VARCHAR(100) NOT NULL,
    is_kpi BOOLEAN DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Charts (Measures) Table
CREATE TABLE charts (
    id VARCHAR(50) PRIMARY KEY,
    metric_id VARCHAR(50) REFERENCES metrics(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    col_name VARCHAR(100) NOT NULL,
    is_kpi BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Historical Metric Data (Values) Table
-- This table stores parsed time-series data matching 'week_column' or 'period' keys.
CREATE TABLE metric_data (
    id SERIAL PRIMARY KEY,
    dept_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    period_key VARCHAR(50) NOT NULL, -- e.g., 'W15', 'W16_2026', 'M05'
    column_key VARCHAR(150) NOT NULL, -- e.g., 'active_students_overall', 'TGT_active_students_overall'
    value_data DOUBLE PRECISION NOT NULL,
    uploaded_by VARCHAR(150) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_period_column UNIQUE(dept_id, period_key, column_key)
);

-- Create Leadership Notes Table
CREATE TABLE leadership_notes (
    id VARCHAR(50) PRIMARY KEY,
    dept_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    bullet_notes TEXT[] NOT NULL, -- Array of string descriptions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Audit Activity Logs Table
CREATE TABLE audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    login_date VARCHAR(50) NOT NULL,
    login_time VARCHAR(50) NOT NULL,
    ip_address VARCHAR(100),
    device_info TEXT,
    timestamp BIGINT NOT NULL
);
```

---

## 6. Security, Compliance, & Performance Tuning

### Identity Integration (SSO)
Remove coordinate/PIN security fallback loops. Incorporate OAuth2 / OIDC with OpenID providers:
- Enable Role-Based Access Control (**RBAC**): Roles include `Admin`, `Department Manager`, and `Executive Viewer`.
- Restrict file upload endpoints strictly to designated `Department Manager` users or automated Service Accounts.

### Caching Strategy
Weekly business metrics are generated once every 7 days. Under heavy viewing concurrency:
- **Redis Caching**: Cache fully assembled JSON configuration and analytical responses at `/api/data` in Redis.
- **Cache Invalidation**: Automatically purge cache when a verified Excel/CSV ingestion completes successfully on the target week.

---

## 7. Migration Roadmap
IT engineering teams can complete deployment through these 4 structured phases:

1. **Phase 1: DB & IAM Setup** (2 Weeks)
   - Provision high-availability database cluster and caching instances.
   - Design enterprise authentication flows (Microsoft AD/Okta).
2. **Phase 2: Core API & Ingestion Engine** (3 Weeks)
   - Implement secure asynchronous XLSX and CSV worker parsing modules on serverless instances.
   - Build complete unit and transaction tests ensuring no duplicate records.
3. **Phase 3: React Dashboard Assembly** (2 Weeks)
   - Port prototype charts and metrics loaders to use state-managed REST or GraphQL data queries.
   - Integrate WebSockets for live status updates on long uploads.
4. **Phase 4: Load Testing & Handoff** (1 Week)
   - Load test worker parsers with large, corrupted, or missing-header spreadsheets.
   - Cut over domain names and establish continuous delivery pipelines (CI/CD).
