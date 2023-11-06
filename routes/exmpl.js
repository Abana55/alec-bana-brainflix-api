const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { v4: uuid } =  require('uuid');

app.use(cors());
app.use(express.json());
app.use('/photos', express.static('./static/images'))

app.get('/', (_request, response) => {
    response.send('christian is flexy');
});

// Create route; posts would be replaced with 'videos'
// Get request function 
app.get('/posts', (request, response) => {
    const something = fs.readFileSync('./data/blog-posts.json');
    response.send(something);
});

// Post request function 
app.post('/posts', (request, response) => {
    const something = fs.readFileSync('./data/blog-posts.json');
    const parseSomething = JSON.parse(something);

    const { username, comment } = request.body;

    const newObj = {
        id: uuid(),
        avatar: '/tom.jpeg',
        username: username,
        comment: comment,
        likes: 0
    }

    parseSomething.push(newObj);
    fs.writeFileSync('./data/blog-posts.json', JSON.stringify(parseSomething));
    response.json(newObj);

});

app.get('/posts/:searchParam', (request, response) => {
    const something = fs.readFileSync('./data/blog-posts.json');
    const parseSomething = JSON.parse(something);
    const found = parseSomething.find( x => x.username === request.params.searchParam);
    response.json(found);
});

app.listen(8082, () => {
    console.log('listening on port 8082');
});


** reference blog-client for frontend integration (urls) ** 

package.json
“scripts”: {
    “start”: “nodemon server.js”
} <— switch ‘node’ with ‘nodemon’

terminal
npm start


HomePage.js
useEffect( () => {
        async function postSomething() {
            const response = await axios.post('http://localhost:8082/posts', newPosts);
        }
        if(newPosts) {
            postSomething();
        }
    }, [newPosts]);