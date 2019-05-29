const async = require('async');

funct = function() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {

        }, 86400000);
    });
}

async function main() {
    while(1) {
        await funct();
    }
}

main();