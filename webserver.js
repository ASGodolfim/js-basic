const http = require('http');
const url = require('url');
const fs = require('fs');


fs.readFileSync(`./dev-data/data.json`, 'utf-8', (err, data) =>{
    const productData = JSON.parse(data);
});

const server = http.createServer((req, res) =>{

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the Overview!');
    } else if (pathName === '/product') {
        res.end('This is the Product!');
    } else if (pathName === '/api'){
        console.log(productData);
        res.writeHead(200, {"content-type": "application/json"});
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page Not found</h1>');
        }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});