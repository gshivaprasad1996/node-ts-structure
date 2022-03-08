import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', (msg) => {
    console.log(msg);
});

eventEmitter.emit('myEvent', 'Hey i am from event...');

eventEmitter.off('myEvent', (msg) => {
    console.log('off', msg);
});
