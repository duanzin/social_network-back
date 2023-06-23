import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import { cleanDb, generateValidToken } from "../helpers";
import app, { init } from "../../src/app";
import { createRelationship } from "../factories/relationshipFactory";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /relationship", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/relationship");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .post("/relationship")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return error if id is not present", async () => {
      const token = await generateValidToken();

      const response = await server
        .post("/relationship")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return error if id is not number", async () => {
      const token = await generateValidToken();

      const response = await server
        .post("/post")
        .send({ id: faker.string.sample() })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when id is valid", () => {
      it("should respond with status 200 and relationship id when no relationship is found", async () => {
        const user = await createUser();
        const token = await generateValidToken();

        const response = await server
          .post("/relationship")
          .send({ id: user.id })
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          relationship: expect.any(Number),
        });
      });
      it("should respond with status 200 and null when relationship is found", async () => {
        const user = await createUser();
        const { followedId } = await createRelationship(user.id);
        const token = await generateValidToken(user);

        const response = await server
          .post("/relationship")
          .send({ id: followedId })
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          relationship: null,
        });
      });
    });
  });
});

describe("GET /relationship/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/relationship/9");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/relationship/9")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when :id is not a number", async () => {
      const token = await generateValidToken();

      const response = await server
        .get("/relationship/aaaa")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should respond with status 200 and relationship id when relationship is found", async () => {
      const user = await createUser();
      const relationship = await createRelationship(user.id);
      const token = await generateValidToken(user);

      const response = await server
        .get(`/relationship/${relationship.followedId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        relationship: relationship.id,
      });
    });
    it("should respond with status 200 and user with profileOwner as false", async () => {
      const user = await createUser();
      const token = await generateValidToken();

      const response = await server
        .get(`/relationship/${user.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ relationship: null });
    });
  });
});
