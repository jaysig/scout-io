'use strict';

// Development specific configuration
// ==================================

var localConfig;
try {
  localConfig = require('../local.env');
} catch(e) {
  localConfig = {};
}

module.exports = {

  flickr: {
    apiKey:       localConfig.FLICKR_API_KEY
  },
  facebook: {
    clientID:     localConfig.FACEBOOK_ID,
    clientSecret: localConfig.FACEBOOK_SECRET
  },
  google: {
    clientID:     localConfig.GOOGLE_ID,
    clientSecret: localConfig.GOOGLE_SECRET
  },
  // Sequelize connection options
  sequelize: {
    uri: 'scoutio.ckptibf82gdw.us-west-2.rds.amazonaws.com',
    dialect: "mysql",
    username: localConfig.MYSQL_USERNAME,
    password: localConfig.MYSQL_PASSWORD,
    database: localConfig.MYSQL_DATABASE
  },

  // Seed database on startup
  seedDB: false

};
