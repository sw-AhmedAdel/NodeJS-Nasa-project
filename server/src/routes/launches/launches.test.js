require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches test", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  describe("Test Get Luanches", () => {
    test("It should response with 200 ok", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test post launch", () => {
    const invalidates = {
      mission: "usa",
      target: "Kepler-296 A f",
      rocket: "leo",
      launchDate: "zoo",
    };

    const completeLaunch = {
      mission: "usa",
      target: "Kepler-296 A f",
      rocket: "leo",
      launchDate: "December 27, 2030",
    };
    const launcWithOutDate = {
      mission: "usa",
      target: "Kepler-296 A f",
      rocket: "leo",
    };
    test("it should response with 201", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunch)
        .expect("Content-Type", /json/)
        .expect(201);

      const sendDate = new Date(completeLaunch.launchDate).valueOf();
      const dateFromRespone = new Date(response.body.launchDate).valueOf();
      expect(dateFromRespone).toBe(sendDate);
      expect(response.body).toMatchObject(launcWithOutDate);
      /*
    
    toMatchObject means checl the values in the response body is in the other obj partialy

    expect(response.body).toMatchObject({
      mission: "usa",
      target: "superman",
      rocket: "leo",
      launchDate: "December 27, 2030",
    });*/
    });

    test("it should catch missing values", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launcWithOutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "missing data",
      });
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(invalidates)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "invalid date",
      });
    });
  });

  const id = 100;
  const abort = {
    upcoming: false,
    success: false,
  };

  const invalidID = 1;
  describe("delete launch", () => {
    /*
    test("it should response with 200 ok", async () => {
      const response = await request(app).delete(`/launches/${id}`);
      expect(response.body.data.upcoming).toStrictEqual(abort.upcoming);
      expect(response.body.data.upcoming).toStrictEqual(abort.success);
    });*/

    test("it should response with 200 ok", async () => {
      const response = await request(app).delete(`/v1/launches/${invalidID}`);
      expect(response.body).toStrictEqual({
        error: "Not found",
      });
    });
  });
});
//    "test": "jest --detectOpenHandles",
