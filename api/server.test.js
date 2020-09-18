const supertest = require("supertest");

const server = require("./server");

const db = require("../database/dbConfig");

describe("server", () => {
  afterAll(async () => {
    await db("users".truncate());
  });
  describe("POST /api/auth/register", () => {
    it("should register a new user", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "biku",
          password: "pass",
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
});
