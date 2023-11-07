const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const readData = () => {
    try {
        const data = fs.readFileSync('./data/video-details.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync('./data/video-details.json', JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error:', err);
    }
};

router.get('/', (request, response) => {
    const data = readData();
    response.json(data);
});

router.get('/:id', (request, response) => {
    const { id } = request.params;
    const data = readData();
    const video = data.find((things) => things.id === id);
    if (!video) {
        return response.status(404).json({ message: 'Video not here' });
    }
    response.json(video);
});

router.post('/', (request, response) => {
    const data = readData();
    const { title, description } = request.body;

    const newVideo = {
        id: uuid(),
        title,
        description,
        channel: "Posted account",
        likes: 0, 
        views: 0, 
        duration: "4:00",
        video: "http://localhost:8087/videos?images",
        timestamp: Date.now(), 
        comments: [],
    };

    data.push(newVideo);
    writeData(data);
    response.json(newVideo);
});

module.exports = router;