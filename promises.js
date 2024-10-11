const fs = require('fs');
const superagent = require('superagent');


fs.readFile(`./txt/dog.txt`, (err, data)=> {
    console.log(`Breed: ${data}`);

    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if (err) return console.log(err.message = 'Breed Not Found');
        console.log(res.body.message);

        fs.writeFile('./txt/dog-img.txt', res.body.message, err => {
            console.log('Random dog image saved to file!');
        });
    });
});
