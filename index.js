const http = require('http');
const url = require('url');
const Message = require("./Message");


const hostname = '0.0.0.0';
const port = 3000;

let messages = [new Message("message", "test")];

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if(req.method === 'POST') {
        handlePost(req, res);
    }

    if(req.method === 'GET') {
        if(req.url !== "/" && req.url !== "/favicon.ico") {
            var urlParts = url.parse(req.url, true);
            var query = urlParts.query;

            if (query !== {}) {
                var body = {message: query.message, author: query.author};
                let message = new Message(body.message, body.author);

                saveMessage(message);
            }
        }
        res.end(JSON.stringify(messages));
    }
});

function saveMessage(body) {
    if (body !== {}) {
        messages.push(body);
    }
}


function handlePost(req, res) {
    let body = '';

    req.on('data', buffer => {
        body += buffer.toString(); // convert Buffer to string
    });

    

    req.on('end', () => {
        body = JSON.parse(body);
        let message = new Message(body.message, body.author);
        saveMessage(message);
        res.end(JSON.stringify(messages));
    });
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});