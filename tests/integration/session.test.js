const request = require("supertest");
const truncate = require("../utils/truncate");
require("dotenv").config({ path: ".env.test" });

const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    //await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User");
    const response = await request(process.env.API_ENDPOINT)
      .post("/login")
      .send(user.dataValues);
    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", { password: "123456789" });
    const response = await request(process.env.API_ENDPOINT)
      .post("/login")
      .send({
        ...user.dataValues,
        password: "123456",
      });
    expect(response.status).toBe(500);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User");
    const response = await request(process.env.API_ENDPOINT)
      .post("/login")
      .send(user.dataValues);

    if (!response.body.token) {
      console.log(response.body);
    }

    expect(response.body).toHaveProperty("token");
  });

  /*
  it("should be able to access private routes when authenticated", async () => {
      const user = await factory.create("User");
      const response = await request(process.env.API_ENDPOINT)
        .get("/users")
        .set("Authorization", `Bearer ${user.generateToken()}`);
      expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without JWT token", async () => {
    const response = await request(process.env.API_ENDPOINT).get("/users");
    expect(response.status).toBe(500);
  });

  it("should not be able to access private routes with invalid JWT token", async () => {
    const response = await request(process.env.API_ENDPOINT)
      .get("/users")
      .set("Authorization", `Bearer abcdef123456789`);
    expect(response.status).toBe(500);
  });
  */
});
