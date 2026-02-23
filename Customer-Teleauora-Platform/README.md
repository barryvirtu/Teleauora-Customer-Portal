
# Teleauora Customer Portal (Java + Angular)

This zip contains a minimal **Spring Boot (Java 17)** backend and **Angular** frontend you can run locally.

## Prerequisites
- Java 17+ and Maven
- Node.js 18+ / Angular CLI (`npm i -g @angular/cli`)
- Docker (optional) to run PostgreSQL locally

## 1) Start PostgreSQL (dev)
Use Docker Compose (quick):
```bash
docker run --name psql-teleauora -e POSTGRES_DB=teleauora -e POSTGRES_USER=teleauora -e POSTGRES_PASSWORD=telepass -p 5432:5432 -d postgres:16
```
The backend will auto-run `schema.sql` and `data.sql` (configured via `spring.sql.init.mode=always`).

## 2) Run the backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
- Catalog API: `GET http://localhost:8080/api/catalog/plans`
- Bills API:
  - `GET /api/bills?customerId=ACME-1001` (returns sample or real blobs if Azure is configured)
  - `GET /api/bills/download-link?customerId=ACME-1001&year=2026&month=02` (returns SAS if Azure is configured)

> **Azure Blob (optional):** set `storage.account-name` and ensure your App Service / dev environment has permissions. For local dev you can `az login` and SDK will use your credentials.

## 3) Run the frontend (Angular)
```bash
cd frontend
npm install
npm start
```
Open `http://localhost:4200`.
- **Discover** pulls plans from the Java API (PostgreSQL seed data).
- **Bills** lists sample bills and tries to fetch a short-lived SAS when configured.

## 4) Branding
Replace `frontend/src/assets/branding/teleauora-logo.png` with your real logo (PNG or SVG) and `favicon.ico` if desired.

## Notes
- Security: Resource server (JWT) is configured but **not enabled by default** in `application.yml` (uncomment `jwk-set-uri` when you wire Entra/B2C). For local testing, catalog endpoints are public.
- Storage: The SAS generation uses a **user-delegation key** (recommended). In Azure App Service, enable **Managed Identity** and assign Storage roles (Blob Data Contributor + Blob Delegator). Locally, `DefaultAzureCredential` uses your `az login` session.

Happy hacking!
