'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var searchCtrlStub = {
  index: 'searchCtrl.index',
  show: 'searchCtrl.show',
  create: 'searchCtrl.create',
  update: 'searchCtrl.update',
  destroy: 'searchCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var searchIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './search.controller': searchCtrlStub
});

describe('Search API Router:', function() {

  it('should return an express router instance', function() {
    expect(searchIndex).to.equal(routerStub);
  });

  describe('GET /api/searches', function() {

    it('should route to search.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'searchCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/searches/:id', function() {

    it('should route to search.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'searchCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/searches', function() {

    it('should route to search.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'searchCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/searches/:id', function() {

    it('should route to search.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'searchCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/searches/:id', function() {

    it('should route to search.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'searchCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/searches/:id', function() {

    it('should route to search.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'searchCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
