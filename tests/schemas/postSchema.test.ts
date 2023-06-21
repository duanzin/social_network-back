import { faker } from "@faker-js/faker";
import { postSchema } from "../../src/schemas/postSchema";

describe("postSchema", () => {
  const generateValidInput = () => ({
    content: faker.lorem.sentence(),
  });

  describe("when content is not valid", () => {
    it("should return error if content is not present", () => {
      const input = { content: undefined };

      const { error } = postSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if content is not string", () => {
      const input = { content: 9 };

      const { error } = postSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if content is over 150 characters", () => {
      const input = { content: faker.lorem.paragraph(8) };

      const { error } = postSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = postSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
