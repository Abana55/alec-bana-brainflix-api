const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuid } = require('uuid');


const shmeagles = () => {
    return JSON.parse(fs.readFileSync('./data/video-details.json', 'utf8'));
};

router.get('/', (req, res) => {
    const videos = shmeagles();
    res.json(videos.map(({ id, title, channel, image, timestamp, likes, views, comments }) => ({ id, title, channel, image, timestamp, likes, views, comments })));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const videos = shmeagles();
    const video = videos.find((video) => video.id === id);
    if (!video) {
        return res.status(404).json({ message: "Shmeagle can't find your beagle" });
    }
    res.json(video);
});

router.post('/', (request, response) => {
    const something = fs.readFileSync('./data/video-details.json');
    const parseSomething = JSON.parse(something);

    const newVid =
    {
        id: uuid(),
        title:title,
        views:0,
        likes:0,
        channel: "Great Chieftan",
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




module.exports = router;