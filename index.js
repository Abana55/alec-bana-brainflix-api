const express = require('express');
const app = express();
const cors = require('cors');
const videoRouter = require('./routes/videos');

app.use('/images', express.static('./public/images'));
app.use('/videos', videoRouter);


app.listen(8081, () => {
    console.log('Server listening on port 8081');
});