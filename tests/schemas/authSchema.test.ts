import { faker } from "@faker-js/faker";
import { signInSchema, signUpSchema } from "../../src/schemas/authSchema";

describe("signInSchema", () => {
  const generateValidInput = () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
  });

  describe("when email is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = signInSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if email does not follow valid email format", () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = signInSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = signInSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is not a string", () => {
      const input = generateValidInput();

      const { error } = signInSchema.validate({
        ...input,
        password: faker.number.int(),
      });

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = signInSchema.validate(input);

    expect(error).toBeUndefined();
  });
});

describe("signUpSchema", () => {
  const generateValidInput = () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
    name: faker.internet.displayName(),
    pfp: faker.internet.avatar(),
  });

  describe("when email is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = signUpSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if email does not follow valid email format", () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = signUpSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = signUpSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is shorter than 6 characters", () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(5);

      const { error } = signUpSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is not a string", () => {
      const input = generateValidInput();

      const { error } = signInSchema.validate({
        ...input,
        password: faker.number.int(),
      });

      expect(error).toBeDefined();
    });
  });

  describe("when name is not valid", () => {
    it("should return error if name is not present", () => {
      const input = generateValidInput();
      delete input.name;

      const { error } = signUpSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name is not a string", () => {
      const input = generateValidInput();

      const { error } = signInSchema.validate({
        ...input,
        name: faker.number.int(),
      });

      expect(error).toBeDefined();
    });
  });

  describe("when pfp is not valid", () => {
    it("should not return error if pfp is not present", () => {
      const input = generateValidInput();
      delete input.pfp;

      const { error } = signUpSchema.validate(input);

      expect(error).toBeUndefined();
    });

    it("should return error if pfp does not follow valid format", () => {
      const input = generateValidInput();

      const { error } = signInSchema.validate({
        ...input,
        pfp: faker.number.int(),
      });

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = signUpSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
