const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`./template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`./template/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`./template/product.html`, 'utf-8');

const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);


const server = http.createServer((req, res) =>{

    const {query, pathname} = url.parse(req.url, true);

    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {"content-type": "text/html"});

        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);

        res.end(output);
    }
    
    else if (pathname === '/product') {
        res.writeHead(200, {"content-type": "text/html"});
        
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product)
        
        res.end(output);
    }
    
    else if (pathname === '/api'){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(data);
    }
    
    else {
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