const supertest = require("supertest");

const server = require("./server");

const db = require("../database/dbConfig");

describe("server", () => {
  // empties the table after all server tests are performed
  afterAll(async () => {
    await db("users").truncate();
  });
  describe("POST /api/auth/register", () => {
    it("should register a new user", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({ username: "helloworld", password: "pass" })
        .then((res) => {
          expect(res.status).toBe(201);
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

    // it("should return some JSON", () => {
    //   supertest(server)
    //     .post("/api/auth/register")
    //     .send({
    //       username: "biku2",
    //       password: "pass",
    //     })
    //     .then((res) => {
    //       expect(res.status).toBe(201);
    //     });
    //   // .catch((err) => {
    //   //   console.log(err);
    //   //   res.status(500);
    //   // });
    // });

    // it("should have a length of 4 if not its not good ", async () => {
    //   const users = await db("users");
    //   expect(users).toHaveLength(0);
    // });
  });

  describe("/api/auth/login", () => {
    it("should be able to login using created user", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "helloworld",
          password: "pass",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should fail if you pass in wrong credentials", () => {
      supertest(server)
        .post("/api/auth/login")
        .send({
          username: "bamrt",
          password: "passme",
        })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it("should fail if you do not pass all required fields", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "helloworld",
        })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });

    it(" token for verification purposes", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "helloworld",
          password: "pass",
        })
        .then((res) => {
          expect(res.body.token).toBeTruthy();
        });

      // it("GET /jokes/", () => {
      //   supertest(server)
      // .post('/api/auth/register)
      //     .get("/api/jokes")
      //     .then((res) => {
      //       expect(res.type).toMatch(/json/i);
      //     });
      // });
      // it("GET /jokes/", () => {
      //   supertest(server)
      //     .get("/api/jokes")
      //     .then((res) => {
      //       expect(res.body).toBeDefined();
      //     });
    });
  });
});
