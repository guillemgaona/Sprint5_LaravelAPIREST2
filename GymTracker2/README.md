# 🎉 sprint5-GymTracker-api

A RESTful API for tracking gym workouts, featuring authentication, user roles, and statistics calculation, built with Laravel.
**Note:** This is an API-only project (no web views are included).

---

## 🚀 Features

- **User Management:** Register, login, profile management, and role assignment.
- **Exercise Management:** Paginated list of exercises and full CRUD functionality for administrators.
- **Workout Tracking:** Creation, update, and deletion of training sessions per user.
- **Set Tracking:** Logging of sets per session, including repetitions and weight.
- **Performance Statistics:** Calculation of training volume by muscle group, workout frequency, and personal records (PRs).
- **OAuth2 Authentication:** Secure endpoints with Laravel Passport.
- **Role-Based Access:** 'user' and 'admin' roles with different permissions, managed with Spatie.
- **Functional Testing:** Automated tests with PHPUnit covering all API routes.

---

## 👤 User Roles

- **User:** Manages their own profile, tracks and manages their training sessions and sets, views the exercise list, and sees their own stats.
- **Admin:** Manages all exercises (create, edit, delete), has full API access.

---

## 📚 Main Endpoints

See routes/api.php for the full list.
Some examples:

- `POST /api/register` — Register a new user
- `POST /api/login` — Login
- `GET /api/exercises` — List all exercises
- `POST /api/exercises` — Create a new exercise (admin only)
- `POST /api/sessions` — Create a new training session (auth required)
- `POST /api/sessions/{id_session}/sets` — Add a set to a session
- `GET /api/users/{id_user}/stats/volume` — Get a user's training volume

---

## ⚙️ Installation & Usage

> **You do NOT need to have Laravel installed globally.**  
> All dependencies are managed via Composer.

### 1. Requirements

- PHP 8.2 or higher
- Composer (https://getcomposer.org/)
- MySQL (for development)
- SQLite (for testing, in-memory)
- Git (recommended)
- XAMPP or similar stack for Windows users
- Swagger (recommended)

### 2. Clone the repository

```sh
git clone https://github.com/guillemgaona/Sprint5_LaravelAPIREST2.git
cd GymTracker2
```

### 3. Install dependencies

```sh
composer install
```

If you get an error about the `ext-sodium` or `ext-gd` extension, enable them in your `php.ini`:
- Open your `php.ini` (e.g. `C:\xampp\php\php.ini`)
- Find `;extension=sodium` and/or `;extension=gd` and remove the `;`
- Save and restart Apache

### 4. Environment setup

Copy the example environment file and generate the app key:

```sh
cp .env.example .env
php artisan key:generate
```

### 5. Database setup

By default, the application uses MySQL for development.
Make sure your .env file has the correct MySQL settings, for example:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gymtracker
DB_USERNAME=root
DB_PASSWORD=

Create the gymtracker database in your MySQL server before running migrations.

You can use phpMyAdmin, MySQL Workbench, or the command line:

Note:
The automated tests use an in-memory SQLite database, so you do not need to configure SQLite for development.

> **Note:**  
> The automated tests use an in-memory SQLite database, so you do **not** need to configure SQLite for development.

### 6. Run migrations and seeders

This command will create all tables and populate them with sample data (roles, users, exercises, etc.).
```sh
php artisan migrate --seed
```

### 7. Install Passport

```sh
php artisan passport:install
```
This command will create the access clients and encryption keys necessary for OAuth2 authentication.

If they are already create a personal acces Oauth client: 

```sh
php artisan passport:client --personal
```

---

## 🧪 Running Feature Tests

**This is the main way to verify the API.**

```sh
php artisan test --testsuite=Feature
```

Or simply:

```sh
php artisan test
```

All tests in [`tests/Feature`](tests/Feature) will be executed.

---
## 📖 API Documentation (Swagger)

This project uses l5-swagger to generate interactive API documentation from OpenAPI annotations in the code.

1. Generate the Documentation
The documentation is not generated automatically. Any time you add or change the API annotations in the source code, you must run this command to update the documentation file:

```sh
php artisan l5-swagger:generate
```
2. View the Documentation
Once generated, you can view the interactive documentation by running the local server:

```sh
php artisan serve
```

And then navigating to the following URL in your web browser:

http://127.0.0.1:8000/api/documentation

## ⚠️ Troubleshooting

### Duplicate Passport Migration Files

If you see errors like table 'oauth_auth_codes' already exists during migrations, you may have duplicate Passport migration files.  
**Solution:**  
- Check your database/migrations folder.
- Keep only one migration file for each Passport table (oauth_auth_codes, oauth_access_tokens, etc.).
- Delete any duplicates (files with similar names but different timestamps).

### Other Common Issues

- **Tests fail due to database:** Make sure your `phpunit.xml` contains:
  ```xml
  <env name="DB_CONNECTION" value="sqlite"/>
  <env name="DB_DATABASE" value=":memory:"/>
  ```
- **Cache issues:** Run `php artisan config:clear` and `php artisan cache:clear`.

---

## 📁 Project Structure

- Controllers: app/Http/Controllers/Api
- Models: app/Models
- Policies: app/Policies
- Form Requests: app/Http/Requests
- API Resources: app/Http/Resources
- API Routes: routes/api.php
- Feature Tests: tests/Feature

---

## ❓ FAQ

- **Do I need to install Laravel globally?**  
  No, everything is handled via Composer.

- **Is there a frontend?**  
  No, this is an API-only project.

- **How do I test the API?**  
 Run the feature tests as described above, or use an API client like Postman.

---
