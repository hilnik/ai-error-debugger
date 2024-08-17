let filepath = '/Users/nikhilparmar/Repos/AiErrorSolver/monitoredscript.js';
const fs = require('fs');
const readline = require('readline');

try{
    require(filepath) //this is for javascript file, need to specify which type later on
} catch(error) {
    const fs = require('fs');
    const readline = require('readline');
    
    let CaughtError = error.message;
    console.warn(`You have the following error: ${CaughtError}.`)

    let ErrorLocation = error.stack.split('\n')[1];
    let match = ErrorLocation.match(/\(([^)]+)\)/);
    const location = match ? match[1] : 'Location not found';
    console.warn(`The location of the error is: ${location}`)

    TempSplitLocation = location.split(':')
    LineNumOfErr = TempSplitLocation[1]
    
    // Create a readable stream for the file
    const fileStream = fs.createReadStream(filepath);
    
    // Create an interface to read lines
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let lineNumber = 0;
    const targetLine = Number(LineNumOfErr);
    
    rl.on('line', (line) => {
        lineNumber++;
        if (lineNumber === targetLine) {
            targetLineContent = line; // Store the content of the target line
            rl.close();}});
    
    rl.on('close', () => {
        let Prompt = `Write a one-line solution to the error \"${CaughtError}\", given the code snippet \"${targetLineContent}\"`;
        })}

