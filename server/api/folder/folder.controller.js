/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/folders              ->  index
 * POST    /api/folders              ->  create
 * GET     /api/folders/:id          ->  show
 * PUT     /api/folders/:id          ->  update
 * DELETE  /api/folders/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Folder = sqldb.Folder;

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

// Gets a list of Folders
exports.index = function(req, res) {
    Folder.findAll()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Folder from the DB
exports.show = function(req, res) {
    Folder.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Folder in the DB
exports.create = function(req, res) {
    //maybe send a respond response.
    Folder.create(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};


// Updates an existing Folder in the DB
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Folder.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Folder from the DB
exports.destroy = function(req, res) {
    Folder.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};


/**
 * Get folder assets
 */

exports.assets = function(req, res) {
    Folder.find({
            where: {
                _id: req.params.id
            }
        })
        .then(function(folder) {
            if (!folder) {
                return res.status(401).end();
            }
            folder.getAssets().then(function(assets) {
                res.json(assets);
            });
        })
        .catch(function(err) {
            return next(err);
        });
};

/**
 * Get folder links
 */

exports.links = function(req, res) {
    Folder.find({
            where: {
                _id: req.params.id
            }
        })
        .then(function(folder) {
            if (!folder) {
                return res.status(401).end();
            }
            folder.getLinks().then(function(links) {
                res.json(links);
            });
        })
        .catch(function(err) {
            return next(err);
        });
};
