const http = require("http");
const url = require("url");
const fs = require("fs");
const PORT = 8080

http.createServer((req, res) => {
    const fullpath = url.parse(req.url, true);
    const queries = fullpath.query;
  

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write(`
        <style>
        body {
        background-color: rgb(14, 14, 62);
        text-align: center;
        color: #fff;
        height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .container {
        max-width: 420px;
        }

        a {
        color: #fff;
        display: inline-block;
        padding: 10px;
        }
        </style>
    `)

    if (fullpath.pathname === "/") {
        res.write('<div class="container">')
        res.write("<h1>Welcome to my Node Server!</h1>");
        res.write("<h2>This is the home page.</h2>");
        res.write("<p>Link to routes below</p>");
        res.write("<a href='/about'>About</a>");
        res.write("<a href='/candy'>Candy</a>");
     
        res.write("<a href='/fruits'>Fruits</a>");
        res.write('</div>')
        res.end();
    }

     else if (fullpath.pathname === "/about") {
        res.write('<div class="container">')
        res.write("<h1>I want to travel the world to:</h1>");
        res.write("<p>See nature</p>");
        res.write("<p>Watch ocean sunsets</p>");
        res.write("<p>Explore forests</p>");
        res.write("<p>Spot wild animals</p>");
        res.write("<p>Swim in clear lakes</p>");
        res.write("<p>Listen to waterfalls</p>");
        res.write("<p>Explore cities</p>");
        res.write("<p>See the mountains</p>");
        res.write("<p>Meet people worldwide</p>");
        res.write("<p>Taste exotic fruits</p>");
        res.write("<p>Learn new cultures</p>");
        res.write("<p>Taste local foods</p>");
        res.write("<p>Explore underground rivers</p>");
        res.write("<p>I want to witness Gods creation in all its glory, from majestic mountains and vast oceans to green meadows and vibrant forests</p>");
        res.write('</div>')
        res.end();

     } else if (fullpath.pathname === "/candy") {
        if (!queries.name && !queries.pathname) {
            res.write('<div class="container">');
            res.write("<h1>Discover My Favorite Snacks Through Queries</h1>")
            res.write("<a href='/candy?name=chocolate'>Chocolate</a>");
            res.write("<a href='/candy?pathname=chips'>Chips</a>");
            res.write('</div>')
            res.end()
        }

        if (queries.name === "chocolate") {
            fs.readFile('./data/chocolate.txt', (err, data) => {
                if (err) {
                    res.write("<p>Error loading chcocolate content</p>")
                } else {
                    res.write('<div class="container">');
                    res.write(data)
                    res.write('</div>')
                }
                res.end();
            });
        } else if (queries.pathname === "chips") {
            fs.readFile('./data/chips.txt', (err, data) => {
                if (err) {
                    res.write("<p>Error loading chips content</p>");
                } else {
                    res.write('<div class="container">');
                    res.write(data)
                    res.write('</div>')
                }
                res.end()
            });
        }
     } else if (fullpath.pathname === "/fruits") {
        fs.readFile('./data/fruits.html', (err, data) => {
                if (err) {
                    res.write("<p>Error loading footer content</p>");
                } else {
                    res.write(data)
                }
                res.end()
            });

        } else {
            res.write("<h1>404 Page not found</h1>");
            res.end();
        }

}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
