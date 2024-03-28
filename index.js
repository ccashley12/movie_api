const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

//create a write stream (in append mode)
//a log.txt file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let topMovies = [
    {
        title: 'Perks of Being a Wallflower 2012',
        director: 'Stephen Chbosky',
        writer: 'Stephen Chbosky'
    },
    {
        title: 'Poor Things 2023',
        director: 'Yorgos Lanthimos',
        writers: 'Tony McNamara & Alasdair Gray'
    },
    {
        title: 'Everything Everywhere All at Once 2022',
        director: 'Daniel Kwan & Daniel Scheinert',
        writer: 'Daniel Kwan & Daniel Scheinert'
    },
    {
        title: 'Parasite 2019',
        director: 'Bong Joon Ho',
        writer: 'Bong Joon Ho & Han Jin-won'
    },
    {
        title: 'Pulp Fiction 1994',
        director: 'Quentin Tarantino',
        writer: 'Quentin Tarantino & Roger Avary'
    },
    {
        title: 'Forrest Gump 1994',
        director: 'Robert Zemeckis',
        writer: 'Winston Groom & Eric Roth'
    },
    {
        title: 'The Matrix 1999',
        director: 'Lana Wachowski & Lilly Wachowski',
        writer: 'Lana Wachowski & Lilly Wachowski'
    },
    {
        title: 'Charlie\'s Angels 2000',
        director: 'McG',
        writer: 'Ryan Rowe, Ed Solomon, & John August'
    },
    {
        title: 'American Psycho',
        director: 'Mary Harron',
        writer: 'Bret Easton Ellis, Mary Harron, & Guinevere Turner'
    },
    {
        title: 'Donnie Darko',
        director: 'Rirchard Kelly',
        writer: 'Richard Kelly'
    }
];

//set up logger
app.use(morgan('combined', {stream: accessLogStream}));

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to Cinema Express!');
});

app.get('/documentation.html', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

//serve files from public folder
app.use('/documentation.html', express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);

res.status(500).send('Something Broke!');
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});