/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/links              ->  index
 * POST    /api/links              ->  create
 * GET     /api/links/:id          ->  show
 * PUT     /api/links/:id          ->  update
 * DELETE  /api/links/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Link = sqldb.Link;
var Folder = sqldb.Folder;
var Comment = sqldb.Comment;
var Project = sqldb.Project;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Links
exports.index = function(req, res) {
  Link.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Link from the DB
exports.show = function(req, res) {
  Link.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Link in the DB
exports.create = function(req, res) {
  var newLink;

  Link.create({
    name: req.body.name,
    url: req.body.url,
    apiID: Number(req.body.apiID),
    apiName: req.body.apiName,
    active: 1
  })
    .then(function(link){
      newLink = link;
      link.setUser(req.user);

      Folder.find({
        where: {
          _id: req.body.folderId
        }
      })
      .then(function(folder){
        newLink.setFolder(folder)
      })
    })
    .then(function(){
      if (req.body.comment){
        Comment.create({
          text: req.body.comment
        })
        .then(function(comment){
          comment.setLink(newLink);
          comment.setUser(req.user);
        })
      }
    })
    .then(function(link){
      res.status(200).json(link);
    })
    .catch(handleError(res));
};

// Updates an existing Link in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Link.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Link from the DB
exports.destroy = function(req, res) {
  Link.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

/**
 * Get link comments
 */

exports.comments = function(req, res) {
  Link.find({
      where: {
        _id: req.params.id
      }
    })
    .then(function(link) {
      if (!link) {
        return res.status(401).end();
      }
      link.getComments().then(function (comments) {
        res.json(comments);
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Get link user
 */

exports.user = function(req, res) {
  Link.find({
      where: {
        _id: req.params.id
      }
    })
    .then(function(link) {
      if (!link) {
        return res.status(401).end();
      }
      link.getUser().then(function (user) {
        res.json(user);
      });
    })
    .catch(function(err) {
      return next(err);
    });
};
