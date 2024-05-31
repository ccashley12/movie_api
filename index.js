const express = require('express');
    app = express(),
    uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//Connect to database locally
mongoose.connect('mongodb://localhost:27017/ceDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let users = [
    {
        id: 1,
        name: 'Chrissy Baby',
        favoriteMovies: ["Donnie Darko"]

    },
    {
        id: 2,
        name: 'Danny Boi',
        fovoriteMovies: ["Pulp Fiction"]
    }
]

let topMovies = [
    {
        "Title":"Forrest Gump",
        "Description":"Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, creates the smiley, writes bumper stickers and songs, donates to people and meets the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny Curran, who has messed up her life. Although in the end all he wants to prove is that anyone can love anyone.",
        "Genre": {
            "Name":"Drama",
            "Description":"Drama is defined as a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action."
        },
        "Director": {
            "Name":"Robert Zemeckis",
            "Bio": "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.",
            "Birth":1952.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i",
        "Featured":true    
    },
    {
        "Title":"Pulp Fiction",
        "Description":"Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
        "Genre": {
            "Name":"Drama",
            "Description":"Drama is defined as a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action."
        },
        "Director": {
            "Name":"Quentin Tarantino",
            "Bio": "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old. In January of 1992, first-time writer-director Tarantino's Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay.",
            "Birth":1963.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"The Matrix",
        "Description":"Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.",
        "Genre": {
            "Name":"Action",
            "Description":"Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work."
        },
        "Director": {
            "Name":"Lana Wachowski",
            "Bio": "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays. Their 1995 script, Assassins (1995), was made into a movie, leading to a Warner Bros contract. After that time, the Wachowskis devoted themselves to their movie careers. In 2012, during interviews for Cloud Atlas and in her acceptance speech for the Human Rights Campaign's Visibility Award, Lana spoke about her experience of being a transgender woman, sacrificing her much cherished anonymity out of a sense of responsibility. Lana is known to be extremely well-read, loves comic books and exploring ideas of imaginary worlds, and was inspired by Stanley Kubrick's 2001: A Space Odyssey (1968) in creating Cloud Atlas.",
            "Birth":1965.0
        },
        "Director": {
            "Name":"Lilly Wachowski",
            "Bio":"Director, writer, and producer Lilly Wachowski was born in 1967 in Chicago, the daughter of Lynne, a nurse and painter, and Ron, a businessman. Lilly was educated at Kellogg Elementary School in Chicago, before moving on to Whitney M. Young High School. After graduating from high school, she attended Emerson College in Boston but dropped out. Lilly teamed up with her older sibling, Lana Wachowski, and began working on films. Their first script was optioned and formed the basis for the film Assassins (1995). The Wachowskis went on to make their directorial debut with the self-written Bound (1996), which was well-received. They followed this with the smash hit The Matrix (1999) and went on to produce two successful sequels, The Matrix Reloaded (2003) and The Matrix Revolutions (2003). Other projects include scripting and producing the cult hit V for Vendetta (2005), a live-action version of a Japanese anime series; Speed Racer (2008); Cloud Atlas (2012); and the ambitious epic Jupiter Ascending (2015).",
            "Birth":1967.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"Charlie's Angels",
        "Description":"The captivating crime-fighting trio who are the masters of disguise, espionage, and martial arts. When a devious mastermind embroils them in a plot to destroy individual privacy, the Angels, aided by their loyal sidekick Bosley (Bill Murray), set out to bring down the bad guys. But when a terrible secret is revealed, it makes the Angels targets for assassination.",
        "Genre": {
            "Name":"Action",
            "Description":"Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work."
        },
        "Director": {
            "Name":"McG",
            "Bio": "McG was born on August 9, 1968 in Kalamazoo, Michigan, USA. He is a producer and director, known for Charlie's Angels: Full Throttle (2003), Terminator Salvation (2009) and The Babysitter: Killer Queen (2020).",
            "Birth":1968.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0160127/mediaviewer/rm270011392/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"American Psycho",
        "Description":"It's the late 1980s. Twenty-seven year old Wall Streeter Patrick Bateman travels among a closed network of the proverbial beautiful people, that closed network in only they able to allow others like themselves in in a feeling of superiority. Patrick has a routinized morning regimen to maintain his appearance of attractiveness and fitness. He, like those in his network, are vain, narcissistic, egomaniacal and competitive, always having to one up everyone else in that presentation of oneself, but he, unlike the others, realizes that, for himself, all of these are masks to hide what is truly underneath, someone/something inhuman in nature. In other words, he is comprised of a shell resembling a human that contains only greed and disgust, greed in wanting what others may have, and disgust for those who do not meet his expectations and for himself in not being the first or the best. That disgust ends up manifesting itself in wanting to rid the world of those people, he not seeing them as people but only of those characteristics he wants to rid.",
        "Genre": {
            "Name":"Drama",
            "Description":"Drama is defined as a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action."
        },
        "Director": {
            "Name":"Marry Harron",
            "Bio": "Mary Harron (born January 12, 1953) is a Canadian filmmaker and screenwriter. She gained recognition for her role in writing and directing several independent films, including I Shot Andy Warhol (1996), American Psycho (2000), and The Notorious Bettie Page (2005). She co-wrote American Psycho and The Notorious Bettie Page with Guinevere Turner. Although Harron has denied this title, she has been thought to be feminist filmmaker due to her film on lesbian feminist Valerie Solanas, in I Shot Andy Warhol (1996), and a queer story-line within her teenage Gothic horror, The Moth Diaries (2011).",
            "Birth":1953.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0144084/mediaviewer/rm3296681472/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"Donnie Darko",
        "Description":"Donnie Darko doesn't get along too well with his family, his teachers, and his classmates; but he does manage to find a sympathetic friend in Gretchen, who agrees to date him. He has a compassionate psychiatrist, who discovers hypnosis is the means to unlock hidden secrets. His other companion may not be a true ally. Donnie has a friend named Frank, a large bunny which only Donnie can see. When an engine falls off a plane and destroys his bedroom, Donnie is not there. Both the event, and Donnie's escape, seem to have been caused by supernatural events.",
        "Genre": {
            "Name":"Drama",
            "Description":"Drama is defined as a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action."
        },
        "Director": {
            "Name":"Richard Kelly",
            "Bio": "James Richard Kelly better known as Richard Kelly, is an American film director and writer, known for writing and directing the cult classic Donnie Darko in 2001. Kelly was born James Richard Kelly in Newport News, Virginia, the son of Lane and Ennis Kelly. He grew up in Midlothian, Virginia, where he attended Midlothian High School and graduated in 1993. When he was a child, his father worked for NASA on the Mars Viking Lander program. He won a scholarship to the University of Southern California to study at the USC School of Cinema-Television where he was a member of the Phi Delta Theta fraternity. He made two short films at USC, The Goodbye Place and Visceral Matter, before graduating in 1997.",
            "Birth":1975.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0246578/mediaviewer/rm1527459840/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"Kill Bill: Vol. 1",
        "Description":"The lead character, called 'The Bride,' was a member of the Deadly Viper Assassination Squad, led by her lover 'Bill.' Upon realizing she was pregnant with Bill's child, 'The Bride' decided to escape her life as a killer. She fled to Texas, met a young man, who, on the day of their wedding rehearsal was gunned down by an angry and jealous Bill (with the assistance of the Deadly Viper Assassination Squad). Four years later, 'The Bride' wakes from a coma, and discovers her baby is gone. She, then, decides to seek revenge upon the five people who destroyed her life and killed her baby. The saga of Kill Bill Volume I begins.",
        "Genre": {
            "Name":"Thriller",
            "Description":"One that thrills. Especially : a work of fiction or drama designed to hold the interest by the use of a high degree of intrigue, adventure, or suspense."
        },
        "Director": {
            "Name":"Quentin Tarantino",
            "Bio": "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old. In January of 1992, first-time writer-director Tarantino's Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay.",
            "Birth":1963.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0266697/mediaviewer/rm2033140224/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"Parasite",
        "Description":"The Kims - mother and father Chung-sook and Ki-taek, and their young adult offspring, son Ki-woo and daughter Ki-jung - are a poor family living in a shabby and cramped half basement apartment in a busy lower working class commercial district of Seoul. Ki-woo is the one who has dreams of getting out of poverty by one day going to university. Despite not having that university education, Ki-woo is chosen by his university student friend Min, who is leaving to go to school, to take over his tutoring job to Park Da-hye, who Min plans to date once he returns to Seoul and she herself is in university. The Parks are a wealthy family who for four years have lived in their modernistic house designed by and the former residence of famed architect Namgoong. While Mr. and Mrs. Park are all about status, Mrs. Park has a flighty, simpleminded mentality and temperament, which Min tells Ki-woo to feel comfortable in lying to her about his education to get the job. In getting the job, Ki-woo further learns that Mrs. Park is looking for an art therapist for the Parks' adolescent son, Da-song, Ki-woo quickly recommending his professional art therapist friend Jessica, really Ki-jung who he knows can pull off the scam in being the easiest liar of the four Kims. In Ki-woo also falling for Da-hye, he begins to envision himself in that house, and thus the Kims as a collective start a plan for all the Kims, like Ki-jung using assumed names, to replace existing servants in the Parks' employ in orchestrating reasons for them to be fired. The most difficult to get rid of may be Moon-gwang, the Parks' housekeeper who literally came with the house - she Namgoong's housekeeper when he lived there - and thus knows all the little nooks and crannies of it better than the Parks themselves. The question then becomes how far the Kims can take this scam in their quest to become their version of the Parks.",
        "Genre": {
            "Name":"Drama",
            "Description":"Drama is defined as a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action."
        },
        "Director": {
            "Name":"Bong Joon Ho",
            "Bio": "Bong Joon-ho is a South Korean filmmaker. The recipient of three Academy Awards, his filmography is characterized by emphasis on social themes, genre-mixing, black humor, and sudden tone shifts. He first became known to audiences and achieved a cult following with his directorial debut film, the black comedy Barking Dogs Never Bite (2000), before achieving both critical and commercial success with his subsequent films: the crime thriller Memories of Murder (2003), the monster film The Host (2006), the science fiction action film Snowpiercer (2013), and the black comedy thriller Parasite (2019), all of which are among the highest-grossing films in South Korea, with Parasite also being the highest-grossing South Korean film in history. All of Bong's films have been South Korean productions, although both Snowpiercer and Okja (2017) are mostly in the English language. Two of his films have screened in competition at the Cannes Film Festival-Okja in 2017 and Parasite in 2019; the latter earned the Palme d'Or, which was a first for a South Korean film. Parasite also became the first South Korean film to receive Academy Award nominations, with Bong winning Best Picture, Best Director, and Best Original Screenplay, making Parasite the first film not in English to win Best Picture. In 2017, Bong was included on Metacritic's list of the 25 best film directors of the 21st century. In 2020, Bong was included in Time's annual list of 100 Most Influential People and Bloomberg 50.",
            "Birth":1969.0
        },
        "ImageURL":"https://www.imdb.com/title/tt6751668/mediaviewer/rm3194916865/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"Everything Everywhere All at Once",
        "Description":"With her laundromat teetering on the brink of failure and her marriage to wimpy husband Waymond on the rocks, overworked Evelyn Wang struggles to cope with everything, including tattered relationships with her judgmental father Gong Gong and her daughter Joy. She must also brace herself for an unpleasant meeting with an impersonal bureaucrat: Deirdre, the shabbily-dressed IRS auditor. However, as the stern agent loses patience, an inexplicable multiverse rift becomes an eye-opening exploration of parallel realities. Will Evelyn jump down the rabbit hole? How many stars are in the universe? Can weary Evelyn fathom the irrepressible force of possibilities, tap into newfound powers, and prevent an evil entity from destroying the thin, countless layers of the unseen world?",
        "Genre": {
            "Name":"Action",
            "Description":"Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work."
        },
        "Director": {
            "Name":"Daniel Kwan",
            "Bio": "Daniel Kwan with Daniel Scheinert, collectively known as Daniels, are a duo of film directors and writers. They began their career as directors of music videos, including the popular DJ Snake promotional for the single Turn Down for What (2013). They have since ventured into film, having written and directed the surreal comedy-drama Swiss Army Man (2016) and the science-fiction action comedy Everything Everywhere All at Once (2022), the latter became A24's highest-grossing film of all time.",
            "Birth":1988.0
        },
        "Director": {
            "Name":"Daniel Scheinert",
            "Bio": "Daniel Scheinert was born on June 7, 1987 in Birmingham, Alabama, USA. He is a director and actor, known for Everything Everywhere All at Once (2022), Swiss Army Man (2016) and Foster the People: Houdini (2012).",
            "Birth":1987.0
        },
        "ImageURL":"https://www.imdb.com/title/tt6710474/mediaviewer/rm316021249/?ref_=tt_ov_i",
        "Featured":true
    },
    {
        "Title":"Poor Things",
        "Description":"From filmmaker Yorgos Lanthimos and producer Emma Stone comes the incredible tale and fantastical evolution of Bella Baxter (Stone), a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter (Willem Dafoe). Under Baxter's protection, Bella is eager to learn. Hungry for the worldliness she is lacking, Bella runs off with Duncan Wedderburn (Mark Ruffalo), a slick and debauched lawyer, on a whirlwind adventure across the continents. Free from the prejudices of her times, Bella grows steadfast in her purpose to stand for equality and liberation.",
        "Genre": {
            "Name":"Drama",
            "Description":"Drama is defined as a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action."
        },
        "Director": {
            "Name":"Yorgos Lanthimos",
            "Bio": "Yorgos Lanthimos was born in Athens, Greece. He studied directing for Film and Television at the Stavrakos Film School in Athens. He has directed a number of dance videos in collaboration with Greek choreographers, in addition to TV commercials, music videos, short films and theater plays. Kinetta, his first feature film, played at Toronto and Berlin film festivals to critical acclaim. His second feature Dogtooth, won the Un Certain Regard prize at the 2009 Cannes film festival, followed by numerous awards at festivals worldwide. It was nominated for a Best Foreign Language Film Academy Award (Oscar) in 2011. Alps won the Osella for best screenplay at the 2011 Venice film festival and Best Film at the Sydney film festival in 2012. His first English language film The Lobster was presented in Competition at the 68th Cannes Film Festival. Moreover, The Lobster was nominated for the (Oscar about the) Best Original Screenplay by the Academy and won Best Screenplay and Best Costume Design at the European Film Awards of 2015. His fifth project The Killing of a Sacred Deer was also presented in Competition at the 70th Cannes Film Festival where it won the award for the best Screenplay. Lanthimos's last film The Favorite is a historical Drama about the British Queen Anne.",
            "Birth":1963.0
        },
        "ImageURL":"https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i",
        "Featured":true
    }
];

//Default text when at /
app.get('/', (req, res) => {
    res.send("Welcome to Cinema Express!");
});

app.get('')

//Return list of ALL movies
app.get('/movies', async (req, res) => {
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
app.get('/movies/:Title', async (req, res) => {
   await Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Get list of ALL Genres
app.get('/genre', async (req, res) => {
    await Genres.find()
    .then((genres) => {
        res.status(201).json(genres);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Get genre info for specific genre name
app.get('/genre/:Name', async (req, res) => {
    await Genres.findOne({ Name: req.params.Name })
    .then((genres) => {
        res.status(201).json(genres);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Get info about Director by name
app.get('/director/:Name', async (req, res) => {
    await Directors.findOne({ Name: req.params.Name })
    .then((directors) => {
        res.status(201).json(directors);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Add a user
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
        .then((users) => {
            if (users) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
            Users
                .create({
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                })
                .then((user) =>{res.status(201).json(users) })
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
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get a user by username
app.get('/users/:Username', async (req,res) => {
    await Users.findOne({ Username: req.params.Username})
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//UPDATE a user's info, by username
app.put('/users/:Username', async (req,res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
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
app.post('/users/:Username/movies/:MovieID', async (req,res) => {
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
app.delete('/users/:Username/movies/:MovieID', async (req,res) => {
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

//Delete a user by username
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + 'was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});