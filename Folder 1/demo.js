const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    // Parse the requested file path from the query string
    const filePath = req.url.split('?file=')[1];

    if (!filePath) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: File parameter is missing');
        return;
    }

    // Construct the full path to the requested file
    const fullPath = path.join(__dirname, filePath);

    // Read and serve the file
    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found or error reading file');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    });
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
