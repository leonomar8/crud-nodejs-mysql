# User Management API

## Overview
This is a simple RESTful API for managing user data. It supports basic CRUD (Create, Read, Update, Delete) operations using **Node.js**, **Express**, and **Sequelize** with a MySQL database. The API is configured to work with an existing `users` table in your MySQL database.

## Features
- Add new users
- Retrieve all users or a specific user by ID
- Update user information
- Delete users

## Prerequisites
- **Node.js** (v14+)
- **MySQL** database
- **npm** (Node package manager)
- Docker (optional, for containerized MySQL database)

## Installation

1. Clone the repository:
	```bash
	git clone <repository-url>
	cd <repository-directory>
	```
	
2. Install dependencies:
	```bash
	npm install
	```

3. Configure environment variables: Create a .env file in the root directory and specify the following variables:

	```env
	PORT=3000
	DB_HOST=localhost
	DB_USER=root
	DB_PASSWORD=yourpassword
	DB_NAME=yourdbname
	DB_PORT=3306
	```

4. Set up the database: Ensure you have an existing MySQL database with a table named users:

	```sql
	CREATE TABLE users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL UNIQUE
	);
	```

## Usage
1. Start the server:
	```bash
	npm start
	```

2. Access the API at:
	```URL
	http://localhost:3000
	```

## API Endpoints
	| Method | Endpoint    | Description               |
	|--------|-------------|---------------------------|
	| GET    | /users      | Retrieve all users        |
	| GET    | /users/:id  | Retrieve a specific user  |
	| POST   | /users      | Add a new user            |
	| PUT    | /users/:id  | Update a user's details   |
	| DELETE | /users/:id  | Delete a user             |

## Sample Payload for POST /users
	```json
	{
	  "name": "John Doe",
	  "email": "johndoe@example.com"
	}
	```
	
## Project Structure
	```bash
	src/
	├── config/
	│   └── db.js         # Database connection setup
	├── controllers/
	│   └── userController.js  # Business logic for user routes
	├── models/
	│   └── userModel.js  # Sequelize User model
	├── routes/
	│   └── userRoutes.js # Express routes for user operations
	├── services/
	│   └── userService.js # Service layer for database operations
	└── index.js          # Entry point of the API
	```

## Troubleshooting
1. Database connection errors: Verify your `.env` file has the correct database credentials.
2. You need to create the `users` table before start nodejs.
