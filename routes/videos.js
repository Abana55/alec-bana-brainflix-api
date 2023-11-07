const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const router = express.Router();
const { v4: uuid } = require('uuid');


app.use(cors());
app.use(express.json());
app.use('/photos', express.static('./static/images'));

router.get('/', (request, response) => {
    const something = fs.readFileSync('../data/video-details.json');
    const parseSomething = JSON.parse(something);
    response.send(parseSomething);
});

router.post('/', (request, response) => {
    const something = fs.readFileSync('../data/video-details.json');
    const parseSomething = JSON.parse(something);

    const newVid =
    {
        id: uuid(),
        title:title,
        views:0,
        likes:0,
        channel: "Posted account",
        image: image,
        description:description,
        duration:"3:00",
        timestamp:Date.now(),
        comments:[]
    }

parseSomething.push(newVid);
    fs.writeFileSync('../data/video-details.json', JSON.stringify(parseSomething));
    response.json(newObj);

});

router.get('/posts/:searchParam', (request, response) => {
    const { id } = request.params
    const something = fs.readFileSync('../data/video-details.json');
    const parseSomething = JSON.parse(something);
    const found = parseSomething.find( x => x.username === request.params.searchParam);
    if(found){
        response.json(found)}
    else(response.status(404).send('aint here'))
});


module.exports = router;