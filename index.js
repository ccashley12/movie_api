const express = require('express');
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');
    uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const cors = require('cors');
app.use(cors());

const { check, validationResult } = require('express-validator');

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

//Connect to database
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const Movies = Models.Movie;
const Users = Models.User;

//Default text when at /
app.get('/', (req, res) => {
    res.send("Welcome to Cinema Express!");
});

//Return list of ALL movies
app.get('/movies',
    async (req, res) => {
        await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get movie info for specific movie title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        await Movies.findOne({ Title: req.params.Title })
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get genre info for specific genre name
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const genreName = req.params.genreName;
            const movie = await Movies.findOne({ 'Genre.Name': genreName });

            if (movie) {
                res.status(201).json(movie.Genre);
            } else {
                res.status(404).send('No such genre found');
            }
        } catch (err) {
            console.error(err);
            es.status(500).send('Error: ' + err);
        }
});

//Get info about Director by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const directorName = req.params.directorName;
            const movie = await Movies.findOne({ 'Director.Name': directorName });

            if (movie) {
                res.status(201).json(movie.Director);
            } else {
                res.status(404).send('No such director');
            }
        } catch(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }
});

//Add a user
app.post('/users', 
    [
        check('Username', 'Username is required').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email appears to be invalid').isEmail()
    ],  
        async (req, res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);

        await Users.findOne({ Username: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + 'already exists');
                } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) =>{res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Get all users
app.get('/users', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.find()
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
});

//Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }),
    async (req,res) => {
        await Users.findOne({ Username: req.params.Username })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
});

//UPDATE a user's info, by username
app.put('/users/:Username', passport.authenticate ('jwt', { session: false }),
        async (req,res) => {
            if(req.user.Username !== req.params.Username){
                return res.status(400).send('Permission denied');
            }
            await Users.findOneAndUpdate({ Username: req.params.Username }, 
                { $set:
                    {
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    }
                },
                
            { new: true })
            .then((updatedUser) => {
                res.json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
});

//Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),
    async (req,res) => {
        await Users.findOneAndUpdate({ Username: req.params.Username }, {
            $push: { FavoriteMovies: req.params.MovieID }
        },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Delete a movie from a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),
    async (req,res) => {
        await Users.findOneAndUpdate({ Username: req.params.Username }, {
            $pull: { FavoriteMovies: req.params.MovieID }
        },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Allow users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Middleware for serving static files from the public directory
app.use(express.static('public'));

// Error-handling middleware called when an error occurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

//listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port ' + port);
});