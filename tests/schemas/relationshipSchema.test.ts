import { faker } from "@faker-js/faker";
import { userIdSchema } from "../../src/schemas/relationshipSchema";

describe("userIdSchema", () => {
  const generateValidInput = () => ({
    id: faker.number.int(),
  });

  describe("when id is not valid", () => {
    it("should return error if id is not present", () => {
      const input = { id: undefined };

      const { error } = userIdSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if id is not number", () => {
      const input = { id: "blabla" };

      const { error } = userIdSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = userIdSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
