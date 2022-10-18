const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

console.log(myUrl.href);

// host (root domain)
console.log(myUrl.hostname);
