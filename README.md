# DocLab front end and API

This project contains the main codebase for the REST API and also encompases the React front end for the DocLab website

## Contents

## Prerequisits

* Apache Server
* with PHP >7.1 (ideally)
* MySQL Server
* Composer (Installable via homebrew `brew install composer`)
* NodeJS (Installable via homebrew `brew install node`)
* Yarn (Installable via homebrew `brew install yarn`)

## Installing app dependencies

First, install the PHP dependencies via composer (`composer install`)

Next, install JS dependencies via Yarn (`yarn install`). This installs all of the assest build tools, such as webpack, and front end dependencies and frameworks (e.g. React).

## Generate site assets

Our front end code is written in JSX and must me transpiled into plain JS in order to run on a browser. To do this we use webpack encore (A Symfony wrapper around WebpackJS). We can run this with the following command, `yarn encore dev -—watch`. This command will generate all of the site resources, and also watch for changes in other front end files and automatically transpile them too.

To transpile and minify into production ready code, we can run the `yarn encore production` command.

## Starting the application

To start the app, point your Apache public DIR at the the root of this project and navigate to `http://localhost:{port}`.
