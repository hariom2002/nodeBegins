const EventEmitter = require('events');

// Create class
class MyEmitter extends EventEmitter{ }

const myEmitter  = new MyEmitter();

// even listener
myEmitter.on('event', ()=> console.log('Event Fired!'));

// Init event
myEmitter.emit('event');


