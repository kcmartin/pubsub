'use strict';

var redis = require('../lib/redis');

/**
*  Save badges to database
*  @param {Array} badges
*  @param {Function} callback
*/

exports.save = function(badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();

  redis.lpush('badges', JSON.stringify(badge), function(err){
    if (err) return callback(err, null);
      /* recursive function */
      exports.save(badges, callback);
  });
};

/**
*  Trim down the redis list to 10 items
*/

exports.trim = function() {
  redis.ltrim('badges', 0, 9);
}
