const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../app');
const dummyData = require('../data/users');
const { apiMsg, welcomeMsg } = require('../constants');

// Configure chai. an assertion library for node and browser, can be paired with any JS testing framework (like Mocha)
chai.use(chaiHttp);
chai.should(); // use Should Assertion style

describe('GET', function() {
  it('should show main api message', function(done) {
    chai.request(app)
        .get('/api')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success");
          result.body.message.should.equal(welcomeMsg);
          done();
      });
  });
  it('should show all users', function(done) {
    this.timeout(5000);
    chai.request(app)
        .get('/api/users')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success");
          result.body.message.should.equal("Users retrieved successfully!");
          done();
        });
  });
  it('should show specified user', function(done) {
    chai.request(app)
        .get(`/api/users/${dummyData[0].name}`)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success");
          result.body.message.should.equal("User detail loaded!");
          assert(result.body.data == null);
          done();
      });
  });
});

describe('POST', function() {
  it('should add a new random user', function(done) {
    chai.request(app)
        .post('/api/users')
        .send(dummyData[0])
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success")
          result.body.message.should.equal("New user created!");
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('picture');
          result.body.data.should.have.property('age');
          result.body.data.should.have.property('hobbies');
          result.body.data.should.have.property('department');
          result.body.data.name.should.equal(dummyData[0].name);
          result.body.data.picture.should.equal(dummyData[0].picture);
          result.body.data.age.should.equal(dummyData[0].age);
          result.body.data.hobbies.should.equal(dummyData[0].hobbies);
          result.body.data.department.should.equal(dummyData[0].department);
          done();
      });
  });
  it('should have a random user now', function(done) {
    chai.request(app)
        .get(`/api/users`)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success");
          result.body.message.should.equal("Users retrieved successfully!");
          assert(result.body.data);
          done();
      });
  });
  it(`should have specified user ${dummyData[0].name}`, function(done) {
    chai.request(app)
        .get(`/api/users/${dummyData[0].name}`)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success");
          result.body.message.should.equal("User detail loaded!");
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('picture');
          result.body.data.should.have.property('age');
          result.body.data.should.have.property('hobbies');
          result.body.data.should.have.property('department');
          result.body.data.name.should.equal(dummyData[0].name);
          result.body.data.picture.should.equal(dummyData[0].picture);
          result.body.data.age.should.equal(dummyData[0].age);
          result.body.data.hobbies.should.equal(dummyData[0].hobbies);
          result.body.data.department.should.equal(dummyData[0].department);
          done();
      });
  })
});

describe('PUT', function() {
  it('should update a specific user', function(done) {
    chai.request(app)
        .put(`/api/users/${dummyData[0].name}`)
        .send({department: "Frontend Team"})
        .end((err, result) => {
            result.should.have.status(200);
            result.body.status.should.equal("success");
            result.body.message.should.equal("User info updated!");
            result.body.data.should.have.property('name');
            result.body.data.should.have.property('picture');
            result.body.data.should.have.property('age');
            result.body.data.should.have.property('hobbies');
            result.body.data.should.have.property('department');
            result.body.data.name.should.equal(dummyData[0].name);
            result.body.data.picture.should.equal(dummyData[0].picture);
            result.body.data.age.should.equal(dummyData[0].age);
            result.body.data.hobbies.should.equal(dummyData[0].hobbies);
            result.body.data.department.should.equal("Frontend Team");
            done();
        });
  });
  it('should update a specific user', function(done) {
    chai.request(app)
        .put(`/api/users/${dummyData[0].name}`)
        .send({department: dummyData[0].department})
        .end((err, result) => {
            result.should.have.status(200);
            result.body.status.should.equal("success");
            result.body.message.should.equal("User info updated!");
            result.body.data.should.have.property('name');
            result.body.data.should.have.property('picture');
            result.body.data.should.have.property('age');
            result.body.data.should.have.property('hobbies');
            result.body.data.should.have.property('department');
            result.body.data.name.should.equal(dummyData[0].name);
            result.body.data.picture.should.equal(dummyData[0].picture);
            result.body.data.age.should.equal(dummyData[0].age);
            result.body.data.hobbies.should.equal(dummyData[0].hobbies);
            result.body.data.department.should.equal(dummyData[0].department);
            done();
        });
  });
})

describe('DELETE', function() {
  it('should delete a user with specified name', function(done) {
    chai.request(app)
        .delete(`/api/users/${dummyData[0].name}`)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.status.should.equal("success")
          result.body.message.should.equal("User deleted!");
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('picture');
          result.body.data.should.have.property('age');
          result.body.data.should.have.property('hobbies');
          result.body.data.should.have.property('department');
          result.body.data.name.should.equal(dummyData[0].name);
          result.body.data.picture.should.equal(dummyData[0].picture);
          result.body.data.age.should.equal(dummyData[0].age);
          result.body.data.hobbies.should.equal(dummyData[0].hobbies);
          result.body.data.department.should.equal(dummyData[0].department);
          done();
      });
  })
});