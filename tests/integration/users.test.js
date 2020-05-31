const request = require("supertest");
require("dotenv").config({ path: ".env.test" });

const factory = require("../factories");
const { User } = require("../../src/app/models")

describe("Users", () => {
  it("should be able to create a new user", async () => {
    //retrieve admin created on seeder
    const admin = await User.findOne({ where: { username: "admin" } });
    const newuser = await factory.build("User");
    const response = await request(process.env.API_ENDPOINT)
      .post("/user")
      .set("Authorization", `Bearer ${admin.generateToken()}`)
      .send(newuser.dataValues);
    if (response.status != 200) {
      console.log(response.body);
    }
    expect(response.status).toBe(200);
  });
});
