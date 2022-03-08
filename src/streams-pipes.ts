import * as fs from 'fs';
import * as http from 'http';

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
