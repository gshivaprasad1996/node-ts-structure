"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
//const rs = fs.createReadStream('./src/file2.txt');
//const ws = fs.createWriteStream('./src/writeMe.txt');
//Listening data reading
// rs.on('data', function (chunk) {
//     console.log('new chunk recieved..');
//     ws.write(chunk);
// });
//Reading data using pipe.
//rs.pipe(ws);
const server = http.createServer((req, res) => {
    console.log('request was made', req.url);
    res.writeHead(200, { 'Content-type': 'text/palin' });
    const rs = fs.createReadStream('./src/file2.txt');
    rs.pipe(res);
});
server.listen(5000, '127.0.0.1');
console.log(`Server listening on port ${5000}`);
