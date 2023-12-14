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

// Part 1
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

// Part 2
(async (url) => {
    const nums = {
        one: 1, 
        two: 2, 
        three: 3, 
        four: 4, 
        five: 5, 
        six: 6, 
        seven: 7, 
        eight: 8, 
        nine: 9
    };

    const data = await getData(url);
//     const data = `
// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
//     `;
    const myArray = data.trim().split('\n');
    const sum = myArray.reduce((accumulator, currentValue) => {
        let realFirstLast = {};
        for (const key in nums) {
            const index = currentValue.indexOf(key);
            if (index >= 0) {
                realFirstLast[index] = key;
            }
        }

        for (const index in realFirstLast) {
            currentValue = currentValue.replace(realFirstLast[index], nums[realFirstLast[index]]);
        }
    
        currentValue = currentValue.replace(/\D/g, '');
        let firstNum = currentValue.charAt(0);
        let lastNum = currentValue.charAt(currentValue.length - 1);
 
        return accumulator + parseInt(firstNum + lastNum);
    }, 0);

    console.log(sum)
})('https://adventofcode.gladwelln.dev/day-one-input.txt');