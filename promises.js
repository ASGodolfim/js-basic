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

        const resPromise1 = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        
        const resPromise2 = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        
        const resPromise3 = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );

        const all = await Promise.all([resPromise1, resPromise2, resPromise3]);

        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('./txt/dot-img.txt', imgs.join('/n'));
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