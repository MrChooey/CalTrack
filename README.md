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
   - MySQL running locally (or provide a remote URL)

2. **Configuration**
   Override any of the following environment variables (or update `application.properties`):
   ```
   CALTRACK_DB_URL=jdbc:mysql://localhost:3306/caltrack?createDatabaseIfNotExist=true
   CALTRACK_DB_USERNAME=root
   CALTRACK_DB_PASSWORD=password
   ```

3. **Run migrations & app**
   ```bash
   ./gradlew bootRun
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