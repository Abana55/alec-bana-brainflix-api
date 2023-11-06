const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { v4: uuid } = require('uuid');


app.use(cors());
app.use(express.json());
app.use('/photos', express.static('./static/images'));

app.get('/', (request, response) => {
    const something = fs.readFileSync('../data/video-details.json');
    response.send(something);
});

app.post('/', (request, response) => {
    const something = fs.readFileSync('../data/video-details.json');
    const parseSomething = JSON.parse(something);

    const { username, comment } = request.body;

parseSomething.push(newObj);
    fs.writeFileSync('../data/video-details.json', JSON.stringify(parseSomething));
    response.json(newObj);

});

app.get('/posts/:searchParam', (request, response) => {
    const something = fs.readFileSync('./data/blog-posts.json');
    const parseSomething = JSON.parse(something);
    const found = parseSomething.find( x => x.username === request.params.searchParam);
    response.json(found);
});

app.listen(8081, () => {
    console.log('listening on port 8081');
});