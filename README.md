# User Management API

## Overview
This project is a RESTful API for managing user data, built with Node.js using the MVC architecture. It supports basic CRUD (Create, Read, Update, Delete) operations with a MySQL database and leverages Sequelize as the ORM. The API is designed to work seamlessly in a Dockerized environment, making it easy to set up and deploy.

## Features
- Add new users to the MySQL database.
- Retrieve all users or a specific user by ID.
- Update user details in the database.
- Delete users from the database.
- Fully containerized with Docker for easy setup and deployment.
- Configuration management using environment variables (.env file).

## Prerequisites
- Node.js (v14+): JavaScript runtime for running the API.
- npm: Comes with Node.js, used to manage dependencies.
- express (v4.21.1): Framework for building RESTful APIs.
- sequelize (v6.37.5): ORM for interacting with the MySQL database.
- mysql2 (v3.11.4): MySQL driver for Node.js, required by Sequelize.
- dotenv (v16.4.5): For managing environment variables.
- morgan (v1.10.0): HTTP request logger middleware for better debugging.
- MySQL: A running MySQL database (or a containerized instance).
- Docker (optional): For running the API and MySQL database in containers.

## Installation

1. Clone the repository:
	```bash
	git clone <repository-url>
	cd <repository-directory>
	```
	
2. Dockerfile
 	```
	FROM node:16
	WORKDIR /app
	COPY package*.json ./
	RUN npm install
	COPY . .
	EXPOSE 3000
	CMD ["node", "src/index.js"]
	```

3. docker-compose.yml
Creates nodejs api, mysql container and creates the db database with the MYSQL_DATABASE: ${DB_NAME} command
 	```
	version: '3.8'
	services:
	  api:
	    build:
	      context: .
	    ports:
	      - "${PORT}:3000"
	    env_file:
	      - .env
	    depends_on:
	      - mysql
	    networks:
	      - net
	  mysql:
	    image: mysql:latest
	    container_name: mysql
	    ports:
	      - "${DB_PORT}:3306"
	    environment:
	      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
	      MYSQL_DATABASE: ${DB_NAME}
	    volumes:
	      - /tmp/mysql-data:/var/lib/mysql
	    networks:
	      - net
	networks:
	  net:
	```
 
4. Configure environment variables: Create a .env file in the root directory and specify the following variables:

	```
	PORT=3000
	DB_HOST=<mysql_container_name>		//from docker-compose.yml
	DB_USER=root
	DB_PASSWORD=yourpassword
	DB_NAME=yourdbname
	DB_PORT=3306
	```
 
5. .dockerignore
	```
	node_modules
	npm-debug.log
	.git
	.env
	.env.example
	.gitignore
	```
 
## Usage
1. Run the docker-compose file:
	```bash
	docker-compose up -d
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

## CURLs
1. GET  /users
	```
 	curl --location 'http://localhost:3000/users'
 	```
2. GET  /users/:id
	```
 	curl --location 'http://localhost:3000/Users/1'
 	```
3. POST  /users
	```
 	curl --location 'http://localhost:3000/users' \
	--header 'Content-Type: application/json' \
	--data-raw '{"name": "John Doe", "email": "jdoe@example.com"}'
 	```
4. PUT 	/users/:id
	```
 	curl --location --request PUT 'http://localhost:3000/users/1' \
	--header 'Content-Type: application/json' \
	--data-raw '{"name": "Omar Leon", "email": "oleon@example.com"}'
 	```
5. DELETE  /users/:id
	```
	curl --location --request DELETE 'http://localhost:3000/users/2'
	```

## Sample Payload for POST /users
	{
	  "name": "John Doe",
	  "email": "johndoe@example.com"
	}

## MySQL Verification

	```sql
	$ docker exec -ti mysql bash
	$ mysql -u root -p
	mysql> show databases;
	mysql> use db;
 	mysql> show tables;
  	mysql> select * from users;
	```
 
## Project Structure
	```
 	.
	├── docker-compose.yml
	├── Dockerfile
	├── .dockerignore
	├── .env
	├── .env.example
	├── .git
	├── .gitignore
	├── package.json
	├── package-lock.json
 	└── src/
		├── config/
		│   └── db.js         			# Database connection setup
		├── controllers/
		│   └── userController.js  		# Business logic for user routes
		├── models/
		│   └── userModel.js  			# Sequelize User model
		├── routes/
		│   └── userRoutes.js 			# Express routes for user operations
		├── services/
		│   └── userService.js 			# Service layer for database operations
		└── index.js          			# Entry point of the API
  	```

## Troubleshooting
1. Database connection errors: Verify your `.env` file has the correct database credentials.
2. You need to create the `users` table before start nodejs.
3. If nodejs-mysql-api container exits, review the logs:
   $ docker logs <nodejs-mysql-api_ID>
