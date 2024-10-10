const http = require('http');
const url = require('url');
const fs = require('fs');


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%NAME%}/g, product.productName);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`./template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`./template/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`./template/product.html`, 'utf-8');

const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);


const server = http.createServer((req, res) =>{

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {"content-type": "text/html"});

        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);

        res.end(output);
    }
    
    
    else if (pathName === '/product') {
        res.writeHead(200, {"content-type": "text/html"});
        res.end(tempProduct);
    }
    
    
    else if (pathName === '/api'){
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