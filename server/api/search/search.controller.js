'use strict';


var _ = require('lodash');
var request = require('request');
var querystring = require("querystring");
var config = require('../../config/environment');

var flickrSearch = "flickr.photos.search";
var flickrAPIKey = config.flickr.apiKey;

var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrAPIKey;
var flickrEnd = "&has_geo=1&extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_s%2C+url_m&format=json&nojsoncallback=1";



function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

exports.tags = function(req, res) {
  console.log("in the tags func");

  var input = encodeURIComponent(req.params.query).replace(/'/g, "%27").replace(/%20/g, "+");
  var query = flickrURL + "&tags=" + input + "&tag_mode=all" + flickrEnd;
  console.log(query);


  request(query, function (err, response, data) {
    if (err) {
      console.log(err);
    }
// do some sequelize stuff here to check whether any returned photos already saved by user in the db
//get all user links by checking links_table by user_id return an array of photo_ids
//compare each Flickr photo against this array (by id)
// if there is a match add property to the Flickr photo isSaved = true;
// when this photo is diplayed in results it will have a star and if it is clicked on it will get comments
    res.send(data);
  });
};


exports.byID = function(req, res) {
  console.log('in the id func', req.params);

  var query = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + flickrAPIKey + "&photo_id=" + req.params.photoid + "&format=json&nojsoncallback=1";

  request(query, function (err, response, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
};

 // Gets photos within a radius without filtering by tag
 exports.geo = function (req, res) {
  console.log("in the geo func");
  console.log(req.params.query);
  var obj = req.params.query;

   var query = flickrURL;
// check for geo input
 if (obj.placeName){
   query+= "&lat=" + obj.lat + "&lon=" + obj.lon + "&radius=" + obj.radius + "&radius_units=mi";
  }

  request(query, function (err, response, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
 };

// Gets photos that match all passed params / all params optional
exports.searchCriteria = function (req, res) {
  console.log('here in searchCriteria');

  var obj = req.body;

  var query = flickrURL;
  //check for submitted keywords if they exist uri encode them
  if (obj.keywords){
    if (obj.tag === "any keywords") {
      obj.keywords = obj.keywords.replace(/\s+/g, ',');
    }
    var tags = encodeURIComponent(obj.keywords).replace(/'/g, "%27").replace(/%20/g, "+");
    query += "&tags=" + tags;
  }
  //check for any or all tags
  if (obj.tag === "all keywords"){
    query += "&tag_mode=all";
  }
  if (obj.tag === "any keywords"){
    query += "tag_mode=any";
  }

  // check for geo input
  if (obj.placeName){
    query+= "&lat=" + obj.lat + "&lon=" + obj.lon + "&radius=" + obj.radius + "&radius_units=mi";
  }
  //check for startDate // if it exists needs to be 10digit unix timestamp
  if (obj.startDate){
    var startDate = Number((Date.parse(obj.startDate)).toString().slice(0,10));
    query+= "&min_taken_date=" + startDate;
  }
  //check for endDate // if it exists needs to be 10digit unix timestamp
  if (obj.endDate){
    var endDate = Number((Date.parse(obj.endDate)).toString().slice(0,10));
    query+= "&max_taken_date=" + endDate;
  }
  // check for indoor/outdoor
  // if ( (obj.setting.outdoor && obj.setting.indoor) || (!obj.setting.outdoor && !obj.setting.indoor) ) {
  //   obj.geo_context= 0;
  // }
  // else if (obj.setting.indoor){
  //   obj.geo_context = 1;
  // }
  // else if (obj.setting.outdoor){
  //   obj.geo_context = 2;
  // }
  // query+= "&geo_context=" + obj.geo_context;

  // limit to 100 per page
  query+= "&per_page=" + 100;

  // check for page requested
  if (obj.pageRequested){
    query+= "&page=" + Number(obj.pageRequested);
  }

  query+= flickrEnd;

  var options = {
    url: query
  };

  console.log(options.url);

  request(options, function (err, response, data) {
    if (err) {
      console.log(err);
    }

    console.log("data", data);
    // do some sequelize stuff here to check whether any returned photos already saved by user in the db
    //get all user links by checking links_table by user_id return an array of photo_ids
    //compare each Flickr photo against this array (by id)
    // if there is a match add property to the Flickr photo isSaved = true;
    // when this photo is diplayed in results it will have a star and if it is clicked on it will get comments
    res.send(data);
  });



};





