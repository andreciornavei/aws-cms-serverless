const request = require("supertest");
const truncate = require("../utils/truncate");
require("dotenv").config({ path: ".env.test" });

const factory = require("../factories");

describe("Posts", () => {
  beforeEach(async () => {
    //await truncate();
  });

  it("should be able to list all registered posts", async () => {
    await factory.createMany("Post", 5);
    const response = await request(process.env.API_ENDPOINT).get(
      "/cms/all_posts"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to retrieve a specific post by query string param", async () => {
    const post = await factory.create("Post");
    const response = await request(process.env.API_ENDPOINT).get(
      `/cms/posts?id=${post.dataValues.id}`
    );
    expect(response.status).toBe(200);
  });

  it("should be able to create a new post", async () => {
    const user = await factory.create("User");
    const post = await factory.build("Post");
    const response = await request(process.env.API_ENDPOINT)
      .post("/cms/posts")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(post.dataValues);
    expect(response.status).toBe(200);
  });

  it("should be able to update an existent post", async () => {
    const user = await factory.create("User");
    const post = await factory.create("Post");
    const postUpdate = await factory.build("Post");
    const response = await request(process.env.API_ENDPOINT)
      .put("/cms/posts")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        ...postUpdate.dataValues,
        id: post.dataValues.id,
      });
    expect(response.status).toBe(200);
  });

  it("should be able to delete an existent post", async () => {
    const user = await factory.create("User");
    const post = await factory.create("Post");
    const response = await request(process.env.API_ENDPOINT)
      .delete("/cms/posts")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        id: post.dataValues.id,
      });
    expect(response.status).toBe(200);
  });
});
