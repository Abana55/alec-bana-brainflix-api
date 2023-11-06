const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { v4: uuid } = require('uuid');


app.use(cors());
app.use(express.json());
app.use('/photos', express.static('./static/images'));
