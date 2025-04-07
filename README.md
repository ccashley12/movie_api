# CinemaExpress API

*CinemaExpress API* is a RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Passport** for handling user authentication and managing movies, users, and their favorites. The API allows for user registration, login, and CRUD operations on movies and user profiles.

---

## Table of Contents

1.  [Features](#features)
2.  [API Endpoints](#endpoints)
3.  [How to Use](#howToUse)
4.  [Setup](#setup)
5.  [Technology Used](#technology)
6.  [Contribution](#contribution)
7.  [License](#license)
8.  [Acknowledgments](#acknowledgments)

---

## <a name="features"></a>Features:

- **Fully Functional Movie Listing**  
  Dynamically loads a list of movies from an external API.
  
- **Detailed Movie Information**  
  View detailed information about each movie (title, release year, genre, etc.).

- **Responsive Design**  
  The app is fully responsive, working on various screen sizes.

- **Search Feature**  
  Find movies by title using the search bar.

- **Sort Movies**  
  Sort movies by release date or rating.

- **Custom Loading Message**  
  A loading message is displayed while fetching data.

---

## <a name="endpoints"></a>API Endpoints:

- **GET /**:
  Welcome screen where ussers login with email and password, returns a JWT token.
- **GET /movies**:
  Fetches all movies in the database.
- **GET /movies/:Title**:
  Fetches a movie by its title.
- **GET /movies/genre/:genreName**:
  Fetches movies belonging to a specific genre and extra information on the genre.
- **GET /movies/directors/:directorName**:
  Fetches movies directed by a specific director and extra information on the director.
- **POST /users**:
  Registers a new user with a username, email, password, and optional birthday.
- **PUT /users/:Username**:
  Updates the user profile by username, with optional fields like newUsername, newEmail, newPassword, and newBirthday.
- **PUT /users/:Username/movies/:MovieID**:
  Adds a movie to the user's favorites list by movie ID.
- **DELETE /users/:Username**:
  Deletes a user by username.
- **DELETE /users/:Username/movies/:MovieID**:
  Deletes a movie from the user's favorites list by movie ID.

---

## <a name="howToUse"></a>How to Use:

- **Navigate the Movie List**  
  View a list of movies on the main page.

- **Click on a Movie to View Its Details**  
  Each movie will have detailed information including its title, release year, genre, and more.

- **Use the Search Bar**  
  Search for movies by title, actor, director, genre, or release year.

- **Sort the Movies**  
  Use the sort options to view movies by release year, actor, director, title, or genre.

---

## <a name="setup"></a>Setup:

### Local Setup:
1. **Clone the Repository**  
   `git clone https://github.com/ccashley12/movie_api`

2. **Navigate to the Project Folder**  
   `cd movie_api`

3. **Install Dependencies**  
   With npm: `npm install`  
   With yarn: `yarn install`

4. **Start Application Locally**  
   `npm start`

5. **Access in Browser**  
   Go to `http://localhost:3000`

---

## <a name="technology"></a>Technology Used:
- **Node.js**: Server-side runtime environment
- **Express**: Framework to handle routing, log requests and serve static files
- **Morgan**: HTTP request logger middleware
- **MongoDB** - NoSQL database to store movie and user data.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB.
- **Passport.js** - Authentication middleware for Node.js.
- **Bcrypt.js** - Library for hashing passwords.
- **JWT (JSON Web Tokens)** - For authenticating users.
- **CORS** - To enable cross-origin requests from allowed origins.
- **GitHub** - Version control and repository hosting.
- **Heroku** - Platform as a Service (PaaS) for hosting and deploying the app.
- **MongoDB Atlas** - Cloud database service for storing movie and user data.
- **Netlify** - Used to deploy the frontend.

---

## <a name="contributing"></a>Contributing:

You are very welcome to contribute! 

1. Fork the repository.
2. Create a feature branch: ```git checkout -b feature-branch```.
3. Commit your changes: ```git commit -m 'Add new feature'```.
4. Push the branch: ```git push origin feature-branch```.
5. Submit a pull request.

Please follow the code formatting guidelines and include tests for new features where applicable.

---

## <a name="license"></a>License:

This project is licensed under the MIT License. See the [License](./LICENSE) file for details.