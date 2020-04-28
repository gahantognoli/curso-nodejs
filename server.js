const http = require('http');

const server = http.createServer((req, res) => {
    let html = '';
    if (req.url === '/') {
        html = `
            <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h1>Livraria</h1>
                </body>
            </html>`;
    }
    else if(req.url === "/livros"){
        html = `
            <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h1>Livros</h1>
                </body>
            </html>`;
    }
    res.end(html);
});

server.listen(3000, () => console.log('Node is Running in port 3000'));