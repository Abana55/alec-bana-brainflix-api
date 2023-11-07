const express = require('express');
const router = express.Router();
const fs = require('fs');
const app = express();
const { v4: uuid } = require('uuid');

const readData = () => {
    return JSON.parse(fs.readFileSync('./data/video-details.json', 'utf8'));
};
    
const writeData = (data) => {
    fs.writeFileSync('./data/video-details.json', JSON.stringify(data, null, 2), 'utf8');
};

router.get('/', (request, response) => {
    const something = readData()
    response.json(something.map(({id, title, channel, image, timestamp, likes, views, comments}) => ({id, title, channel, image, timestamp, likes, views, comments})))
});

router.get('/:id', (request, response) => {
    const {id} = request.params;
    const something = readData();
    const thing = something.find((thing) => thing.id === id)
    if(!thing){
        return response.status(404).json({message:'video aint here'})
    }
    response.json(thing)
});

router.post('/', (request, response) => {
    const something = fs.readFileSync('../data/video-details.json');
    const parseSomething = JSON.parse(something);
    const { username, comment } = request.body;

parseSomething.push(newObj);
    fs.writeFileSync('../data/video-details.json', JSON.stringify(parseSomething));
    response.json(newObj);

});

// router.get('/posts/:searchParam', (request, response) => {
//     const something = fs.readFileSync('../data/video-details.json');
//     const parseSomething = JSON.parse(something);
//     const found = parseSomething.find( x => x.username === request.params.searchParam);
//     response.json(found);
// });


module.exports = router;