let input = process.argv[2];
input = input.trim();
console.log(`youe input is   ` + input);

function regularExp(input) {
  return /^[A-Z]{1}[a-z]{1,7}-[0-9]{4}/.test(input);
}
if (regularExp(input)) {
  console.log("The string is valid.");
} else {
  console.log("The string is not valid.");
}
