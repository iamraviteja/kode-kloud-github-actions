const mongoose = require("mongoose");
const request = require("supertest");

let { server } = require("../index");

// beforeEach(async (done) => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       user: process.env.MONGO_USERNAME,
//       pass: process.env.MONGO_PASSWORD,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     done();
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// afterEach((done) => {
//   mongoose.connection.close((err) => {
//     console.log("Mongoose default connection closed");
//     done();
//   });
// });

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
})

describe("Planets API Suite", () => {
  describe("Fetching Planet Details", () => {
    it("it should fetch a planet named Mercury", async () => {
      let payload = {
        id: 1,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(1);
      expect(response.body.name).toEqual("Mercury");
    });

    it("it should fetch a planet named Venus", async () => {
      let payload = {
        id: 2,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(2);
      expect(response.body.name).toEqual("Venus");
    });

    it("it should fetch a planet named Earth", async () => {
      let payload = {
        id: 3,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(3);
      expect(response.body.name).toEqual("Earth");
    });

    it("it should fetch a planet named Mars", async () => {
      let payload = {
        id: 4,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(4);
      expect(response.body.name).toEqual("Mars");
    });

    it("it should fetch a planet named Jupiter", async () => {
      let payload = {
        id: 5,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(5);
      expect(response.body.name).toEqual("Jupiter");
    });

    it("it should fetch a planet named Saturn", async () => {
      let payload = {
        id: 6,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(6);
      expect(response.body.name).toEqual("Saturn");
    });

    it("it should fetch a planet named Uranus", async () => {
      let payload = {
        id: 7,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(7);
      expect(response.body.name).toEqual("Uranus");
    });

    it("it should fetch a planet named Neptune", async () => {
      let payload = {
        id: 8,
      };
      const response = await request(server).post("/planet").send(payload);

      expect(response.status).toEqual(200);
      expect(response.body.orderFromSun).toEqual(8);
      expect(response.body.name).toEqual("Neptune");
    });

    // it('it should fetch a planet named Pluto', (done) => {
    //     let payload = {
    //         id: 9
    //     }
    //   chai.request(server)
    //       .post('/planet')
    //       .send(payload)
    //       .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.have.property('id').eql(9);
    //             res.body.should.have.property('name').eql('Sun');
    //         done();
    //       });
    // });
  });
});

//Use below test case to achieve coverage
describe("Testing Other Endpoints", () => {
  describe("it should fetch OS Details", () => {
    it("it should fetch OS details", async () => {
      const response = await request(server).get("/os");

      expect(response.status).toEqual(200);
    });
  });

  describe("it should fetch Live Status", () => {
    it("it checks Liveness endpoint", async () => {
      const response = await request(server).get("/live");

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual("live");
    });
  });

  describe("it should fetch Ready Status", () => {
    it("it checks Readiness endpoint", async () => {
      const response = await request(server).get("/ready");

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual("ready");
    });
  });
});
