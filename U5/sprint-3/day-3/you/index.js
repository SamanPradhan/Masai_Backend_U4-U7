const regularExpression1 = /..../;
// const regularExpression2 = new RegExp(".");
const string = "afgyhaa";

//    . -> any single character

//testing = .test method - true or false

const result = regularExpression1.test(string);
console.log(result);

//matching - .match method -> matched value or null

const match = string.match(regularExpression1);
console.log(match);
