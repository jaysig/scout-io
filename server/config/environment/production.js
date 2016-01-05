'use strict';

// Production specific configuration
// =================================
module.exports = {
  
  //Default domain
  domain: process.env.DOMAIN ||
          'http://mighty-sea-6015.herokuapp.com',

  SESSION_SECRET:   process.env.SESSION_SECRET,

  flickr: {
    apiKey:       process.env.FLICKR_API_KEY
  },
   // Server IP       
  ip:     process.env.IP ||
          undefined,

  // Server port
  port:   process.env.PORT ||
          8080,

  // Sequelize connection options
  sequelize: {
    uri: 'scoutio.ckptibf82gdw.us-west-2.rds.amazonaws.com',
    dialect: "mysql",
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },

  // Seed database on startup
  seedDB: false
};
