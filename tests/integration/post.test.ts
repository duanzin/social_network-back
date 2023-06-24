import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import { createPost } from "../factories/postFactory";
import { cleanDb, generateValidToken } from "../helpers";
import app, { init } from "../../src/app";
import { createRelationship } from "../factories/relationshipFactory";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /post/:id?", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/post");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/post")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and empty array when no posts are found", async () => {
      const token = await generateValidToken();

      const response = await server
        .get(`/post`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
    it("should respond with status 200 and a post array when :id is undefined", async () => {
      const token = await generateValidToken();

      await createPost();

      const response = await server
        .get("/post")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            content: expect.any(String),
            userId: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: null,
            users: {
              id: expect.any(Number),
              name: expect.any(String),
              pfp: expect.any(String),
            },
          }),
        ])
      );
    });

    describe("when :id is defined", () => {
      it("should respond with status 400 when :id is not a number", async () => {
        const token = await generateValidToken();

        const response = await server
          .get("/post/aaaa")
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
      it("should respond with status 404 when user is not found", async () => {
        const token = await generateValidToken();

        const response = await server
          .get("/post/999")
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });
      it("should respond with status 200 and empty array when no posts are found", async () => {
        const user = await createUser();
        const token = await generateValidToken();

        const response = await server
          .get(`/post/${user.id}`)
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([]);
      });
      it("should respond with status 200 and post array where all userId are equal to :id", async () => {
        const user = await createUser();
        await createPost(user.id);
        const token = await generateValidToken();

        const response = await server
          .get(`/post/${user.id}`)
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              content: expect.any(String),
              userId: user.id,
              createdAt: expect.any(String),
              updatedAt: null,
              users: {
                id: user.id,
                name: user.name,
                pfp: user.pfp,
              },
            }),
          ])
        );
      });
    });
  });
});

describe("GET /post/followed", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/post/followed");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/post/followed")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and a post array", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const { followedId } = await createRelationship(user.id);
      await createPost(followedId);

      const response = await server
        .get("/post/followed")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            content: expect.any(String),
            userId: followedId,
            createdAt: expect.any(String),
            updatedAt: null,
            users: {
              id: followedId,
              name: expect.any(String),
              pfp: expect.any(String),
            },
          }),
        ])
      );
    });
    it("should respond with status 200 and empty array when no posts are found", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createRelationship(user.id);

      const response = await server
        .get("/post/followed")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
  });
});

describe("POST /post", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/post");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/post")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    const generateValidBody = () => ({
      content: faker.lorem.sentence(),
    });
    it("should return error if content is not present", async () => {
      const token = await generateValidToken();

      const response = await server
        .post("/post")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return error if content is not string", async () => {
      const token = await generateValidToken();
      const body = generateValidBody();

      const response = await server
        .post("/post")
        .send({
          ...body,
          content: faker.number.int(),
        })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return error if content is over 150 characters", async () => {
      const token = await generateValidToken();
      const body = generateValidBody();

      const response = await server
        .post("/post")
        .send({
          ...body,
          content: faker.lorem.paragraph(8),
        })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when body is valid", () => {
      it("should respond with status 201", async () => {
        const token = await generateValidToken();
        const body = generateValidBody();

        const response = await server
          .post("/post")
          .send(body)
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.CREATED);
      });
    });
  });
});
