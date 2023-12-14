const getData = (url) => {
    return new Promise((resolve, reject) => {
        const client = require('https');

        client.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
};

(async (url) => {
    const data = await getData(url);
    const myArray = data.trim().split('\n');
    const sum = myArray.reduce((accumulator, currentValue) => {
        currentValue = currentValue.replace(/\D/g, '');
        let firstNum = currentValue.charAt(0);
        let lastNum = currentValue.charAt(currentValue.length - 1);
        
        return accumulator + parseInt(firstNum + lastNum);
    }, 0);

    console.log(sum)
})('https://adventofcode.gladwelln.dev/day-one-input.txt');
