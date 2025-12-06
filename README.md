# CalTrack

Full-stack calorie tracking application with Spring Boot backend and React frontend.

## Tech Stack

**Backend:**

- Java 17, Spring Boot 3.4
- Spring MVC, Service, Repository layers
- Spring Data JPA + H2 Database (Hibernate)
- Spring Security with session-based auth (BCrypt)
- Gradle build tool

**Frontend:**

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for API communication

## Features

1. **User Authentication** - Session-based login/register with Spring Security
2. **Data Entry & Storage** - Create, update, and delete food items with calorie information
3. **Reporting & Analytics** - Daily and weekly calorie consumption summaries
4. **Filter Functionality** - Filter foods by calorie range (min/max)
5. **Multimedia Integration** - Add food images via URL to food entries

## Getting Started

### Prerequisites

- JDK 17+
- Node.js 16+ and npm

### Backend Setup

1. **Configuration**
   - The application uses an H2 file-based database by default (configured in `src/main/resources/application.properties`). The database file is stored in `./data/caltrack` and is created automatically on first run.
   - H2 console is enabled for database inspection at `http://localhost:8080/h2-console` (use JDBC URL: `jdbc:h2:file:./data/caltrack`)
   - Tests use an in-memory H2 database (`src/test/resources/application.properties`) for isolated test execution.

2. **Run the backend**

   ```powershell
   ./gradlew.bat bootRun
   ```

   Backend will start on `http://localhost:8080`

3. **Build & tests**

   ```powershell
   ./gradlew.bat build
   ./gradlew.bat test
   ```

### Frontend Setup

1. **Install dependencies**

   ```powershell
   cd frontend
   npm install
   ```

2. **Run the frontend**

   ```powershell
   npm run dev
   ```

   Frontend will start on `http://localhost:5173`

3. **Access the app**

   Open your browser to `http://localhost:5173`

## REST API

| Endpoint | Method | Description |
| --- | --- | --- |
| `/auth/register` | POST | Create account (name, email, password, optional profile data). |
| `/auth/login` | POST | Session-based login. |
| `/auth/logout` | POST | Invalidate current session. |
| `/users/profile` | GET | Retrieve current profile. |
| `/users/profile` | PUT | Update profile (name, age, height, weight, activities). |
| `/foods` | GET | List foods saved by the user. Supports `minCalories` and `maxCalories` query params for filtering. |
| `/foods` | POST | Add a food entry with calories per serving and optional image URL. |
| `/foods/{id}` | PUT | Update an existing food entry. |
| `/foods/{id}` | DELETE | Remove a food entry. |
| `/goals` | GET | Fetch daily/weekly calorie goals. |
| `/goals` | POST/PUT | Create or update goals. |
| `/consumption` | POST | Log consumption for a food, quantity, and optional date. |
| `/consumption/daily` | GET | Daily calorie totals + goal progress (optional `date`). |
| `/consumption/weekly` | GET | Weekly totals + goal progress (optional `weekStart`). |

## Architecture & OOP Principles

The codebase demonstrates core object-oriented programming principles:

- **Encapsulation**: Domain models (`User`, `Food`, `Goal`, `Consumption`) use private fields with Lombok-generated getters/setters, controlling access to internal state.
- **Inheritance**: Repositories extend Spring Data JPA's `JpaRepository` interface; custom exceptions extend `RuntimeException`.
- **Polymorphism**: Spring dependency injection uses interface-based beans (e.g., `JpaRepository` implementations); `UserPrincipal` implements `UserDetails` for polymorphic security integration.
- **Abstraction**: Service layer abstracts business logic from controllers; repository interfaces abstract persistence from services.

## Security & Sessions

- The application uses session-backed authentication managed by Spring Security.
- The security configuration uses `HttpSessionSecurityContextRepository` to store the `SecurityContext` in the user's HTTP session.
- The `/auth/login` endpoint authenticates the user and persists the security context into the HTTP session.
- CSRF is disabled in the default security configuration. CORS is enabled with permissive defaults for development.

## Database

- H2 embedded database (file-based for persistence)
- Database file location: `./data/caltrack.mv.db`
- H2 console available at: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/caltrack`
  - Username: `sa`
  - Password: (leave blank)
