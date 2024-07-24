/**
 * * Created by Samuel Turay on 2024-07-24
 * * @description This file contains unit tests for the user model.
 * * The tests are written using Jest, and Supertest.
 * * @file user.test.js
 * * @author Samuel Turay
 */

//************************ BRINGING IN DEPENDENCIES *********************/

//* `supertest` allows us to make HTTP requests to our server.
const request = require("supertest"); //
const mongoose = require("mongoose");
const { app, server } = require("../server");

//************************ TESTING THE USER MODEL *********************/

/**
 * * @description  - This function connects to the database
 * * before any tests are run
 */

beforeAll(async () => {
  const url = process.env.DB_URL;
  await mongoose.connect(url);
});

/**
 * * @description  - This function closes the connection
 * * after all tests are run
 */

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

//* Test Suites - the user model

describe("User API", () => {
  let userId;

  /**
   * * the `describe` function allows us to group tests
   * * together. It provides structure and organization
   * * for our tests.
   */

  describe("GET /users", () => {
    it("should get all users", async () => {
      const res = await request(app).get("/users");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.length).toBeGreaterThan(0);

      //* Checking that each user object has the correct properties
      //* and matches the schema

      res.body.data.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          role: expect.any(String),
        });
      });

      //* Storing random user ID
      const users = res.body.data;
      userId = users[Math.floor(Math.random() * users.length)]._id;
    });
  });

  describe("GET /users/:id", () => {
    it("should get a single user by ID", async () => {
      const res = await request(app).get(`/users/${userId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data._id).toEqual(userId);
    });
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/users").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        role: "student",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
      userId = res.body.data._id;
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user by ID", async () => {
      const res = await request(app).put(`/users/${userId}`).send({
        username: "updatedTestUser",
        email: "updatedTestUser@example.com",
        password: "newpassword123",
        role: "dev",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toMatchObject({
        username: "updatedTestUser",
        email: "updatedTestUser@example.com",
        role: "dev",
      });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user by ID", async () => {
      const res = await request(app).delete(`/users/${userId}`);

      expect(res.statusCode).toEqual(204);
    });
  });
});
