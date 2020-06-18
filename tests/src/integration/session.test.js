require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const factory = require("../factories");
const { User } = require("../../src/app/models")

describe("Authentication", () => {
  it("should authenticate with valid credentials", async () => {
    //retrieve admin created on seeder
    const user = await User.findOne({ where: { username: "admin" } });
    const response = await request(process.env.API_ENDPOINT)
      .post("/login")
      .send({
        ...user.dataValues,
        password: "admin"
      });
    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    //retrieve admin created on seeder
    const user = await User.findOne({ where: { username: "admin" } });
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

});
