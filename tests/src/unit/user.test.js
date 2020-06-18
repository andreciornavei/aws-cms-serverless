const bcrypt = require("bcryptjs");
const factory = require("../factories");

describe("User", () => {
  it("should encrypt user password", async () => {
    const userModel = await factory.create("User");
    const compareHash = await bcrypt.compare(
      userModel.password,
      userModel.password_hash
    );
    expect(compareHash).toBe(true);
  });
});
