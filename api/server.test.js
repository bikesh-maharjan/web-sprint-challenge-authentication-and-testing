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
          expect(res.status).toBe(500);
        });
    });
    it("should fail when bad data is passed", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "",
        })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });

    it("should return some JSON", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "biku2",
          password: "pass",
        })
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should have a length of two if not its not good ", async () => {
      const users = await db("users");
      expect(users).toHaveLength(3);
    });
  });

  describe("/api/auth/login", () => {
    it("should be able to login using created user", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "biku",
          password: "pass",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should fail if you pass in wrong credentials", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "bam",
          password: "passme",
        })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });

    it("GET /jokes/", () => {
      return supertest(server)
        .get("/api/jokes/")
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("GET /jokes/", () => {
      return supertest(server)
        .get("/api/jokes")
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });
  });
});
