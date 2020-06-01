require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const factory = require("../factories");
const { User } = require("../../src/app/models");

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

  it("should not be able to create a new user if has no 'User Manager' permission", async () => {
    //retrieve admin created on seeder
    const user = await factory.create("User", {
      access_group_id: "23",
    });
    const newuser = await factory.build("User");
    const response = await request(process.env.API_ENDPOINT)
      .post("/user")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(newuser.dataValues);
    expect(response.status).toBe(500);
  });
});
