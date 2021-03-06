/**
 * Link model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Link = require('../../sqldb').Link;
var LinkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LinkEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Link.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LinkEvents.emit(event + ':' + doc._id, doc);
    LinkEvents.emit(event, doc);
    done(null);
  }
}

module.exports = LinkEvents;
