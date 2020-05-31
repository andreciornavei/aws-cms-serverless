const request = require("supertest");
const truncate = require("../utils/truncate");
require("dotenv").config({ path: ".env.test" });

const factory = require("../factories");

describe("Users", () => {
  beforeEach(async () => {
    //await truncate();
  });

  it("should be able to create a new user", async () => {
    const user = await factory.create("User");
    const response = await request(process.env.API_ENDPOINT)
      .post("/user")
      .set("Authorization", `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });
});
