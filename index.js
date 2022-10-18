const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // if(req.url == '/'){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'),
    //     (err, content) =>{
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //     })
       
    // }
    // // import  Another Page conent
    // if(req.url == '/about'){
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'),
    //     (err, content) =>{
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //     })
       
    // }
    // // API users
    // if(req.url == '/api/users'){
    //     fs.readFile(path.join(__dirname, 'sample.json'),
    //     (err, content) =>{
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-Type': 'application/json'});
    //         res.end(content);
    //     })
    // }

    // Build File Path

    let filePath = path.join(__dirname, 'public',req.url === '/'? 'index.html' : req.url);

    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    fs.readFile(filePath, (err, content) =>{
        if(err){
            if(err.code == 'ENOENT'){
                // Page Not Found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.end(content, 'utf8');
                })
            }
            else{
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            // Success
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    })
    
});

const PORT = process.env.PORT || 5000;
server.listen( PORT, () => console.log(`Server Running on PORT: ${PORT}`));