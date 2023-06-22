import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import { cleanDb } from "../helpers";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /auth/signup", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/auth/signup");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/auth/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
      name: faker.internet.displayName(),
      pfp: faker.internet.avatar(),
    });

    it("should respond with status 409 if there is already an user for given email", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/auth/signup").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    describe("when email is valid", () => {
      it("should respond with status 201", async () => {
        const body = generateValidBody();

        const response = await server.post("/auth/signup").send(body);

        expect(response.status).toBe(httpStatus.CREATED);
      });
    });
  });
});

describe("POST /auth", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/auth");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/auth").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await server.post("/auth").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/auth").send({
        ...body,
        password: faker.internet.password({ length: 6 }),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/auth").send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with token", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/auth").send(body);
        expect(response.body.token).toBeDefined();
      });
    });
  });
});
