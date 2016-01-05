'use strict';

var app = require('../..');
var request = require('supertest');

var newSearch;

describe('Search API:', function() {

  describe('GET /api/searches', function() {
    var searchs;

    beforeEach(function(done) {
      request(app)
        .get('/api/searches')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          searchs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(searchs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/searches', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/searches')
        .send({
          name: 'New Search',
          info: 'This is the brand new search!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSearch = res.body;
          done();
        });
    });

    it('should respond with the newly created search', function() {
      expect(newSearch.name).to.equal('New Search');
      expect(newSearch.info).to.equal('This is the brand new search!!!');
    });

  });

  describe('GET /api/searches/:id', function() {
    var search;

    beforeEach(function(done) {
      request(app)
        .get('/api/searches/' + newSearch._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          search = res.body;
          done();
        });
    });

    afterEach(function() {
      search = {};
    });

    it('should respond with the requested search', function() {
      expect(search.name).to.equal('New Search');
      expect(search.info).to.equal('This is the brand new search!!!');
    });

  });

  describe('PUT /api/searches/:id', function() {
    var updatedSearch

    beforeEach(function(done) {
      request(app)
        .put('/api/searches/' + newSearch._id)
        .send({
          name: 'Updated Search',
          info: 'This is the updated search!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSearch = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSearch = {};
    });

    it('should respond with the updated search', function() {
      expect(updatedSearch.name).to.equal('Updated Search');
      expect(updatedSearch.info).to.equal('This is the updated search!!!');
    });

  });

  describe('DELETE /api/searches/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/searches/' + newSearch._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when search does not exist', function(done) {
      request(app)
        .delete('/api/searches/' + newSearch._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
