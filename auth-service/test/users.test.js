const chai = import("chai");
const chaiHttp = import("chai-http");
const server = import("../server"); // Update with the correct path to your server file
const should = chai.should();

chai.use(chaiHttp);

let token = ""; // Variable to store JWT token for authenticated requests

// import chai from "chai";
// import chaiHttp from "chai-http";
// import { createRequire } from "module";

// const require = createRequire(import.meta.url);
// const { default: app } = await import("../server"); // Update with the correct path to your server file
// const should = chai.should();

// chai.use(chaiHttp);

describe("Users API", () => {
  /*
   * Test the /POST register route
   */
  describe("/POST register", () => {
    it("it should register a new user", (done) => {
      const user = {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        password: "password123",
      };
      chai
        .request(server)
        .post("/api/users/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eql("John Doe");
          done();
        });
    });
  });

  /*
   * Test the /POST login route
   */
  describe("/POST login", () => {
    it("it should login a user and return a token", (done) => {
      const user = {
        email: "john@example.com",
        password: "password123",
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          token = res.body.token; // Save the token for future tests
          done();
        });
    });
  });

  /*
   * Test the /GET all users route
   */
  describe("/GET all users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/users/all")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  /*
   * Test the /PUT update route
   */
  describe("/PUT update user", () => {
    it("it should UPDATE a user", (done) => {
      const updatedUser = {
        name: "Jane Doe",
        email: "jane@example.com",
        phoneNumber: "0987654321",
        password: "newpassword123",
      };
      chai
        .request(server)
        .put("/api/users/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eql("Jane Doe");
          done();
        });
    });
  });

  /*
   * Test the /DELETE user route
   */
  describe("/DELETE user", () => {
    it("it should DELETE a user", (done) => {
      const userToDelete = {
        name: "Jane Doe",
      };
      chai
        .request(server)
        .delete("/api/users/delete")
        .set("Authorization", `Bearer ${token}`)
        .send(userToDelete)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("string").eql("User deleted successfully.");
          done();
        });
    });
  });

  /*
   * Test the /GET me route
   */
  describe("/GET me", () => {
    it("it should GET the authenticated user", (done) => {
      chai
        .request(server)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("email").eql("jane@example.com");
          done();
        });
    });
  });
});
