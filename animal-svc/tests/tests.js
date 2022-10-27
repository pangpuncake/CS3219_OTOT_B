import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";
import { deleteAnimal } from "../model/repository.js";

chai.use(chaiHttp);
chai.should();

describe("Animal", () => {
  before(async () => {
    await deleteAnimal("pig");
  });

  describe("GET /api/animal", () => {
    it("should get all animal records", (done) => {
      chai
        .request(app)
        .get("/api/animal")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("POST /api/animal", () => {
    it("should add an animal record", (done) => {
      chai
        .request(app)
        .post("/api/animal")
        .send({ name: "pig", count: 1 })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
  describe("PUT /api/animal", () => {
    it("should update an animal record", (done) => {
      chai
        .request(app)
        .put("/api/animal")
        .send({ name: "pig", count: 3 })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("DELETE /api/animal", () => {
    it("should delete an animal record", (done) => {
      chai
        .request(app)
        .delete("/api/animal")
        .send({ name: "pig" })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
