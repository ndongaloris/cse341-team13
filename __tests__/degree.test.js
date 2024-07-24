/**
 * * Created by Loris Jared Ndonga on 2024-07-24
 * * @description This file contains unit tests for the degree model.
 * * The tests are written using Jest, and Supertest.
 * * @file degree.test.js
 * * @author Loris Jared Ndonga
 */

//************************ BRINGING IN DEPENDENCIES *********************/

//* `supertest` allows us to make HTTP requests to our server.
const request = require("supertest"); //
const mongoose = require("mongoose");
const { app, server } = require("../server");
const { certificate } = require("../models");

//************************ TESTING THE degree MODEL *********************/

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

//* Test Suites - the degree model

describe("Degree API", () => {
  let degreeId;

  /**
   * * the `describe` function allows us to group tests
   * * together. It provides structure and organization
   * * for our tests.
   */

  describe("GET /degrees", () => {
    it("should get all degrees", async () => {
      const res = await request(app).get("/degrees");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.length).toBeGreaterThan(0);

      //* Checking that each degree object has the correct properties
      //* and matches the schema

      res.body.data.forEach((degree) => {
        expect(degree).toMatchObject({
          name: expect.any(String),
          institution: expect.any(String),
          certificates: expect.any(String),
          type: expect.any(String),
          description: expect.any(String),
          potentialEmployment: expect.any([String]),
          duration: expect.any(String),
          creditsRequired: expect.any(Number),
          level: expect.any(String),
        });
      });

      //* Storing random degree ID
      const degrees = res.body.data;
      degreeId = degrees[Math.floor(Math.random() * degrees.length)]._id;
    });
  });

  describe("GET /degrees/:id", () => {
    it("should get a single degree by ID", async () => {
      const res = await request(app).get(`/degrees/${degreeId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data._id).toEqual(degreeId);
    });
  });

  describe("POST /degrees/create", () => {
    it("should create a new degree", async () => {
      const res = await request(app).post("/degrees/create").send({
        _id: "sftdev-byui",
        name: "Associate of Science in Business",
        institutions: "byui-pw",
        certificates: "cert-business",
        type: "Associate",
        description: "An associate degree focused on business principles.",
        potentialEmployment: ["Business Analyst", "Marketing Coordinator"],
        duration: "2 years",
        creditsRequired: 60,
        level: "Undergraduate"
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
      degreeId = res.body.data._id;
    });
  });

  describe("PUT /degrees/update/:id", () => {
    it("should update a degree by ID", async () => {
      const res = await request(app).put(`/degrees/update/${degreeId}`).send({
        name: "updatedTestdegree",
        institutions: "BYU provo",
        creditsRequired: 45,
        level: "graduate",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toMatchObject({
        name: "updatedTestdegree",
        institutions: "BYU provo",
        creditsRequired: 45,
        level: "graduate",
      });
    });
  });

  describe("DELETE /degrees/delete/:id", () => {
    it("should delete a degree by ID", async () => {
      const res = await request(app).delete(`/degrees/delete/${degreeId}`);

      expect(res.statusCode).toEqual(204);
    });
  });
});
