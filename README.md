# Code Test

## Introduction

This code test is designed to give you an opportunity to experience the technical stack that you would be working on day to day. The below is a list of required technologies that you must use in order to complete your task.

## Getting started

Make sure you have the following installed on your machine:

- [Nodejs 10+](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)

Then, in the directory that you have cloned this repo, run:

- `docker-compose up -d db` - this will start the database for you
- `yarn` - this will install the required nodejs packages (note this may take a while on the first time)
- `yarn dev` - this will run a dev server

And open your browser @ http://localhost:3000/

The following links may help you understand the scaffolded structure of the application:

- [next.js](https://nextjs.org/)
- [styled-components](https://www.styled-components.com/)
- [sequelize](https://sequelize.org/v5/manual/getting-started.html)

If you are more comfortable with a different set of technologies, please feel free to use them and document how to get started in this README.

## Task

Create a basic gallery to display media items.

- Use a responsive fixed-width layout
- The app should consist of two pages:
  - A list view of gallery items
    - For desktop there should be 4 results to a row
    - For mobile there should be 1 result per row
    - A way to filter and/or sort by file type
  - A page to add a gallery item, consisting of:
    - URL to the gallery item
    - Caption for the gallery item
    - An "Add" button to create the item
    - An "Import dog" button that will optionally populate the URL field with a result from:
      https://random.dog/woof.json
- The app should support jpg, gif, png and mp4 gallery items
- Do not store the actual media item in the app, simply display the media items directly from the URL entered
- Please include tests, use your judgement on what an appropriate amount of tests looks like
- Provide instructions in this README if you've changed anything from above - again, use your judgement on what you think is an appropriate amount of documentation

## Instructions

1. Fork this repository
2. Complete the assignment in your own fork
3. Submit a merge request to this base and add the following reviewers

   - `e-r-w`

If you have any questions, please raise a Gitlab issue against this repository and tag `e-r-w` in it. If you have any privacy concerns you may alternatively contact Tex directly.
