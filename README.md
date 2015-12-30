# Scout-IO

*Discover the best location for your next film* 

## Features
- Search thousands of Photos for the perfect location
- Organize your photos into projects
- Free and open-source through the MIT license.

## Prerequisites

- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [SQLite](https://www.sqlite.org/quickstart.html)

## Getting Started

1. Clone this repo using `git clone git@github.com/hrr10-scout-io/scout-io`.

2. Delete the existing git repository by running `rm -rf .git`.

3. Initialize a new git repository with `git init`

4. Run `npm install` to install server dependencies.

5. Run `bower install` to install front-end dependencies.

6. Set up your SQL server and add config variables to `local.env.js`

7. Run `grunt build` + `nodemon server/index.js`

8. Go to `http://localhost:9000` and you should see the app running!

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma. There are old tests from the Yeoman generator we are currently working on removing. 

## Styling

Styling can be added with Stylus or traditional CSS. `Grunt Build` will convert Stylus Files into CSS. 

## How to contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for infos on how you can help!

## License

This project is licensed under the MIT license, Copyright (c) 2015 hrr10-scout-io. For more information see `LICENSE.md`.
