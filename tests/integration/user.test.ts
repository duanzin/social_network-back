import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import { cleanDb, generateValidToken } from "../helpers";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /user/all", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/user/all");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/user/all")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and empty array when no users are found", async () => {
      const token = await generateValidToken();

      const response = await server
        .get("/user/all")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
    it("should respond with status 200 and array of users", async () => {
      await createUser();
      const token = await generateValidToken();

      const response = await server
        .get("/user/all")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            userName: expect.any(String),
            pfp: expect.any(String),
            banner: expect.any(String),
            createdAt: expect.any(String),
            slug: expect.any(String),
          }),
        ])
      );
    });
  });
});

describe("GET /user/:slug?", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/user");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and user with profileOwner as true when :slug is undefined", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server
        .get("/user")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: user.id,
        name: user.name,
        userName: user.userName,
        profileOwner: true,
        pfp: user.pfp,
        banner: user.banner,
        followers: expect.any(Number),
        following: expect.any(Number),
        createdAt: user.createdAt.toISOString(),
        slug: user.slug,
      });
    });
    describe("when :slug is defined", () => {
      it("should respond with status 404 when user is not found", async () => {
        const token = await generateValidToken();

        const response = await server
          .get("/user/mmmmmmmm")
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });
      it("should respond with status 200 and user with profileOwner as false", async () => {
        const user = await createUser();
        const token = await generateValidToken();

        const response = await server
          .get(`/user/${user.slug}`)
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          id: user.id,
          name: user.name,
          userName: user.userName,
          profileOwner: false,
          pfp: user.pfp,
          banner: user.banner,
          followers: expect.any(Number),
          following: expect.any(Number),
          createdAt: user.createdAt.toISOString(),
          slug: user.slug,
        });
      });
    });
  });
});
