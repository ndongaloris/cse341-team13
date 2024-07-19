# BYU PathwayWorldwide API

This project is an API for replicating BYU PathwayWorldwide, including resources/collections such as degrees, institutions, certificates, and courses. It also includes user management with roles like students, developers, instructors, and admins.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Institution Endpoints](#institution-endpoints)
  - [Degree Endpoints](#degree-endpoints)
  - [Certificate Endpoints](#certificate-endpoints)
  - [Course Endpoints](#course-endpoints)
  - [User Endpoints](#user-endpoints)
- [Data Models](#data-models)
- [Access Control](#access-control)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- CRUD operations for institutions, degrees, certificates, and courses
- User authentication with roles (student, dev, instructor, admin)
- Role-based access control
- Custom ID generation for easier management
- Batch creation of users
- Embedded and referenced data for efficient access

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/byu-pathway-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd byu-pathway-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add your own Environment Variables:
   ```env
   PORT=8080
   MONGO_URI=mongodb://your_mongodb_url
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

Use a REST client like Postman or VSCode's REST Client extension to interact with the API. Import the `User.rest` file for predefined requests.

## API Endpoints

### Institution Endpoints

- **Create Institution**

  ```http
  POST /institutions/create
  Content-Type: application/json

  {
    "name": "BYU Pathway Worldwide",
    "address": "Salt Lake City, UT",
    "description": "An educational institution providing pathways to higher education.",
    "contactInfo": {
      "email": "info@byupathway.org",
      "phoneNumber": "1234567890"
    },
    "website": "https://www.byupathway.org",
    "accreditation": "International"
  }
  ```

- **Get All Institutions**
  ```http
  GET /institutions
  ```

### Degree Endpoints

- **Create Degree**

  ```http
  POST /degrees/create
  Content-Type: application/json

  {
    "id": "sftdev-byui",
    "name": "Associate of Science in Business",
    "institutionId": "byui1875",
    "type": "Associate",
    "description": "An associate degree focused on business principles.",
    "potentialEmployment": ["Business Analyst", "Marketing Coordinator"],
    "duration": "2 years",
    "creditsRequired": 60,
    "level": "Undergraduate"
  }
  ```

- **Get All Degrees**
  ```http
  GET /degrees
  ```

### Certificate Endpoints

- **Create Certificate**

  ```http
  POST /certificates/create
  Content-Type: application/json

  {
    "id": "cert-business",
    "name": "Business Fundamentals",
    "description": "A certificate in fundamental business skills.",
    "requirements": ["Complete all core courses"],
    "degreeId": "sftdev-byui",
    "courses": ["course-bus101", "course-math101"]
  }
  ```

- **Get All Certificates**
  ```http
  GET /certificates
  ```

### Course Endpoints

- **Create Course**

  ```http
  POST /courses/create
  Content-Type: application/json

  {
    "id": "course-bus101",
    "name": "Introduction to Business",
    "code": "BUS101",
    "description": "An introductory course to business principles.",
    "credits": 3,
    "certificateId": "cert-business",
    "degreeId": "sftdev-byui",
    "courseType": "Core"
  }
  ```

- **Get All Courses**
  ```http
  GET /courses
  ```

### User Endpoints

- **Create Users (Batch)**

  ```http
  POST /users
  Content-Type: application/json

  [
    {
      "username": "alice_wonder",
      "email": "alice@example.com",
      "password": "password123",
      "role": "student"
    },
    {
      "username": "bob_builder",
      "email": "bob@example.com",
      "password": "password123",
      "role": "dev"
    }
  ]
  ```

- **Get All Users**

  ```http
  GET /users
  ```

- **Get Single User by ID**

  ```http
  GET /users/{{userId}}
  ```

- **Update a User by Admin**

  ```http
  PUT /users/{{userId}}
  Content-Type: application/json

  {
    "username": "john_doe_updated",
    "email": "john.doe.updated@example.com",
    "role": "dev"
  }
  ```

- **Update My Profile (Non-Admin Users)**

  ```http
  PUT /users/me/{{userId}}
  Content-Type: application/json

  {
    "username": "john_doe_updated",
    "email": "john.doe.updated@example.com"
  }
  ```

- **Delete a User**
  ```http
  DELETE /users/{{userId}}
  ```

## Data Models

### Institution

```json
{
  "_id": "byui1875",
  "name": "BYU Pathway Worldwide",
  "address": "Salt Lake City, UT",
  "description": "An educational institution providing pathways to higher education.",
  "contactInfo": {
    "email": "info@byupathway.org",
    "phoneNumber": "1234567890"
  },
  "website": "https://www.byupathway.org",
  "accreditation": "International",
  "degrees": [
    { "_id": "sftdev-byui", "name": "Associate of Science in Business" }
  ],
  "certificates": [{ "_id": "cert-business", "name": "Business Fundamentals" }],
  "courses": [{ "_id": "course-bus101", "name": "Introduction to Business" }]
}
```

### Degree

```json
{
  "_id": "sftdev-byui",
  "name": "Associate of Science in Business",
  "institution": "byui1875",
  "type": "Associate",
  "description": "An associate degree focused on business principles.",
  "potentialEmployment": ["Business Analyst", "Marketing Coordinator"],
  "duration": "2 years",
  "creditsRequired": 60,
  "level": "Undergraduate",
  "certificates": [{ "_id": "cert-business", "name": "Business Fundamentals" }],
  "courses": [{ "_id": "course-bus101", "name": "Introduction to Business" }]
}
```

### Certificate

```json
{
  "_id": "cert-business",
  "name": "Business Fundamentals",
  "description": "A certificate in fundamental business skills.",
  "requirements": ["Complete all core courses"],
  "degree": "sftdev-byui",
  "courses": [{ "_id": "course-bus101", "name": "Introduction to Business" }]
}
```

### Course

```json
{
  "_id": "course-bus101",
  "name": "Introduction to Business",
  "code": "BUS101",
  "description": "An introductory course to business principles.",
  "credits": 3,
  "certificate": "cert-business",
  "degree": "sftdev-byui",
  "courseType": "Core"
}
```

### User

```json
{
  "username": "alice_wonder",
  "email": "alice@example.com",
  "password": "hashed_password",
  "role": "student"
}
```

## Access Control

- **Admin**: Can create, read, update, and delete any user. Can manage all resources.
- **Instructor**: Can manage courses and certificates.
- **Developer**: Can only read from resources.
- **Student**: Can read and update their own profile.

## Error Handling

Errors are handled centrally using an error handling middleware. Custom error messages are provided for validation and other types of errors. Here's an example of how errors are handled in the application:

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

app.use(errorHandler);
```
