const firstPromise = Promise.resolve(1);

firstPromise
    .then(result=>{
        return result+1;
        console.log(`${result}`);
    })
    .then(result=>{
        return result+1;
        console.log(`${result}`);
    })
    .then(result=>{
        console.log(`${result}`);
    });

console.log("ggwp");