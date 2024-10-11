const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not Found');
            resolve(data);
        })
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not Write File');
            resolve('success');
        })
    })
};

const getDogPic = async () => {
    try {
        const data = await readFilePro('./txt/dog.txt');
        console.log(`Breed: ${data}`);

        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body.message);

        await writeFilePro('./txt/dot-img.txt', res.body.message);
        console.log('Random Dog image saved to file');
        
    } catch (err) {
        console.log(err.message);
    }
};

getDogPic();

/*
readFilePro('./txt/dog.txt')
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then( res => {
        console.log(res.body.message);
        return writeFilePro('./txt/dot-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random Dog image saved to file');
    })
    .catch( err => {
        console.log(err.message = 'Nothing Found');
});
*/