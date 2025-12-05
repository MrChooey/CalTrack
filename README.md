# CalTrack

Modern calorie tracking backend built with Spring Boot, Spring Security, and MySQL. The service exposes JSON-first REST APIs that will power a future React frontend.

## Tech stack
- Java 17, Spring Boot 3.4
- Spring MVC, Service, Repository layers
- Spring Data JPA + MySQL (Hibernate)
- Spring Security with session-based auth (BCrypt)
- Gradle build tool

## Getting started

1. **Prerequisites**
   - JDK 17+
   - MySQL (or use the included H2 examples for local/dev)

2. **Configuration (updated)**
   - Production / default: the application now uses environment-variable-driven datasource configuration by default. You can override these environment variables or set them in `application.properties`:
     ```powershell
     $env:CALTRACK_DB_URL = "jdbc:mysql://localhost:3306/caltrack?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
     $env:CALTRACK_DB_USERNAME = "root"
     $env:CALTRACK_DB_PASSWORD = "password"
     ```
   - Local / development: an H2 file-based datasource is provided as an example in `src/main/resources/application.properties`. To use it locally, uncomment the H2 settings (they are commented by default). Example:
     ```properties
     spring.datasource.url=jdbc:h2:file:./data/caltrack
     spring.datasource.driverClassName=org.h2.Driver
     spring.datasource.username=sa
     spring.datasource.password=
     spring.h2.console.enabled=true
     ```
   - Tests: the test resources use an in-memory H2 database (`src/test/resources/application.properties`) so unit/integration tests run without a MySQL instance.

3. **Run the app**
   ```powershell
   ./gradlew.bat bootRun
   ```

4. **Build & tests**
   ```powershell
   ./gradlew.bat build
   ./gradlew.bat test
   ```

## REST API

| Endpoint | Method | Description |
| --- | --- | --- |
| `/auth/register` | POST | Create account (name, email, password, optional profile data). |
| `/auth/login` | POST | Session-based login. |
| `/auth/logout` | POST | Invalidate current session. |
| `/users/profile` | GET | Retrieve current profile. |
| `/users/profile` | PUT | Update profile (name, age, height, weight, activities). |
| `/foods` | GET | List foods saved by the user. |
| `/foods` | POST | Add a food entry with calories per serving. |
| `/foods/{id}` | PUT | Update an existing food entry. |
| `/foods/{id}` | DELETE | Remove a food entry. |
| `/goals` | GET | Fetch daily/weekly calorie goals. |
| `/goals` | POST/PUT | Create or update goals. |
| `/consumption` | POST | Log consumption for a food, quantity, and optional date. |
| `/consumption/daily` | GET | Daily calorie totals + goal progress (optional `date`). |
| `/consumption/weekly` | GET | Weekly totals + goal progress (optional `weekStart`). |

All successful responses are JSON, ready for integration with a frontend client.

## Security & Sessions (important changes)

- The application uses session-backed authentication managed by Spring Security. The security configuration wires a `HttpSessionSecurityContextRepository` so the `SecurityContext` is stored in the user's HTTP session.
- The `/auth/login` endpoint authenticates the user and the application persists the security context into the HTTP session so subsequent requests from the same session are authenticated.
- `CSRF` has been disabled in the default security configuration (use care when exposing the app to untrusted clients or browsers). CORS is enabled with permissive defaults for development; tighten these for production.

## Recent merge resolution

- Merge conflicts were resolved to keep an environment-variable-driven MySQL datasource as the default production config and to preserve an H2 example for local/dev usage.
- Security-related conflicts were resolved in favor of session-backed security using a `SecurityContextRepository`, and the login controller persists the `SecurityContext` to the session on successful login.
- Commit: `05c2d0c` (fix(merge): resolve conflicts for datasource and security session)

If you'd like I can push these docs changes to the remote, run the build, or open a PR with the updates.