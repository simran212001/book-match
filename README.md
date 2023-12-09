[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org)

Book Match is a web application equipped with the capability to match individuals' personalities with literature genres and specific books using vector algorithms.

The API has the functionality to create students, questions, and match specific genres of books based on users' answers to the questions.

The UI boasts an easy-to-use design that offers a straightforward graphical visual representation of the matching results.


This solution uses `Node.js` runtime, `Express.js` for the API layer, `MongoDB` for non-relational data, `Tailwind CSS` for styling, `Puppeteer` for web scraping using Chromium over the DevTools Protocol, and `Next.js` for the UI

You can explore the [REST API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/evanigwilo/book-match/main/backend/docs/api-definition.yml)


## How the web scraping tool works
The web scraping tool leverages Puppeteer and headless browsing to automate the process of navigating to a webpage, extracting book details using selective DOM queries, and returning the information in a structured format. 

This approach provides a robust and controlled mechanism for scraping data from the target website.

## Design Notes

- Straightforwardness of visual representation of results
- Effective, efficient and useful book matching system
- Responsive web design
- Easy-to-use UI

## Screenshots

## <img src="frontend/capture/1.jpg" width="100%" height='512px' />
## <img src="/frontend/capture/2.jpg" width="100%" height='512px' />

### API Routes

| Methods | Routes                     | Description                                              |
| ------- | -------------------------- | -------------------------------------------------------- |
| POST    | /student                   | Creates or gets a student with a random question         |
| PUT     | /student                   | Updates a student answers                                |

---
## Technologies Used
- Next.js (+SSR)
- React
- Tailwind CSS
- Express.js
- MongoDB
- Puppeteer
- Redux Toolkit
- Axios
- Others...

---
## Requirements

Before getting started, make sure you have the following requirements:

- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/) (Supporting compose file version 3)
- [Node.js](https://nodejs.org) (v16 or higher)
- [Yarn Package Manager](https://yarnpkg.com/)
- A [bash](https://www.gnu.org/software/bash) compatible shell

### Run The Project

Follow these steps to get your development environment set up:

1. **Clone this repository** locally;

```bash
# Change to the desired directory
$ cd <desired-directory>

# Clone the repo
$ git clone https://github.com/evanigwilo/book-match.git

# Change to the project directory
$ cd book-match
```

2. Change environmental variables file name in **backend** folder from `.env.example` to `.env`

3. Change environmental variables file name in **frontend** folder from `.env.local.example` to `.env.local`

4. Update the `.env` or `.env.local` file configuration values (optional)

5. At the root directory, run the following command to start a mongo database in a docker container

```bash
# Create external docker volume for the mongo development database
$ docker volume create book-match_mongo-db

# Build and run mongo database in a development container environment
$ docker-compose --env-file ./backend/.env -p book-match-dev-stack -f ./backend/docker-compose.yml up --build -d
```

6. At the root directory, run the following command to start the backed server

```bash
# Change to the project directory
$ cd backend

# Install dependencies
$ yarn install

#  Run app
$ yarn development
```

7. At the root directory, run the following command to start the web app

```bash
# Change to the project directory
$ cd frontend

# Install dependencies
$ yarn install

#  Run app
$ yarn dev
```

8. The web-app will be running at http://localhost:3000 and the api-server will be running at http://localhost:4000/v1


>Note: When configuring Puppeteer, ensure that you adjust the 'executablePath' according to the actual installation path of Chrome on your system. This adjustment should be made in the environmental variable file within the backend.

```javascript
Linux - /usr/bin/google-chrome
Mac - /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
Windows - C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe
```

## Useful commands
```bash
# Stops backend development containers and removes containers, networks and volumes
$ docker-compose --env-file ./backend/.env -p book-match-dev-stack -f ./backend/docker-compose.yml down --remove-orphans

# Removes the external docker volume for the mongo database
$ docker volume rm book-match_mongo-db

```

---
## References
> [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

> [Puppeteer](https://pptr.dev/)

> [MongoDB](https://www.mongodb.com/)

> [Redux Toolkit](https://redux-toolkit.js.org/)

> [Tailwind CSS](https://tailwindcss.com//)

> [Swagger: API Documentation & Design Tools for Teams](https://swagger.io/specification/)