"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const eventEmitter = new events_1.default();
eventEmitter.on('myEvent', (msg) => {
    console.log(msg);
});
eventEmitter.emit('myEvent', 'Hey i am from event...');
eventEmitter.off('myEvent', (msg) => {
    console.log('off', msg);
});
