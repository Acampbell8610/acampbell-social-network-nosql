const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/api'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/acampbell-social-network-nosql', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Use this to log mongo quires being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));
