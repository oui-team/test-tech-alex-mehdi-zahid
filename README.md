# Planète OUI > backend-interview > Alex-Mehdi Zahid

> The goal of the project is to provide a possible solution for the [subject](https://github.com/oui-team/bcm-backend-interview/blob/master/README.md) (SHA1: c461921b9313a423e25f84cd0348e57d91a075e9) given by [Planète OUI](https://www.planete-oui.fr/) (also see ```purpose.md```). This solution has been built on top of a project 'Node TypeScript Starter' that I am currently developing on a private repository. This starter has not been release yet. The good new is that this current project allow me to improve my starter. I hope to release it soon. If you have few time, you can only ready the sections with the flags "🏁(for the Oui Team)" in the [Table of contents](#table-of-contents).

## Prerequisites

- [Git](https://git-scm.com/) to clone the repository.
- An Internet connection is required:
  - to get the source code.
  - to get the project's dependencies to build the application.
  - to get the dependencies during the deployment of the package.
- This project requires [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/) to be
available on your machine.
  - [Node.js](http://nodejs.org/) will allow to execute the program.
  - [NPM](https://npmjs.org/) will allow to get the dependencies.

### [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/)

Make sure you have [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/) available on your machine. The project has been tested with the versions given by the following commands:

#### Node
```sh
$ node -v
v14.15.1
```

#### NPM
```sh
$ npm -v
6.14.8
```

#### [Yarn](https://yarnpkg.com/) (Optional)
You can install Yarn but it is optional.

```sh
$ yarn -v
1.22.5
```
---

## Table of contents

- [Prerequisites](#prerequisites)
- [Motivation](#motivation)
- [Features at a glance](#features-at-a-glance)
  - [Environment](#environment)
  - [Application features](#application-features)
  - [Developer tools](#developer-tools)
- [Getting started](#getting-started)
  - [Getting the source code](#getting-the-source-code)
  - [Installation](#installation)
    - [Installation for production](#installation-for-production)
    - [Additional installation for development (optional)](#additonal-installation-for-development-(optional))
- [Usage](#usage)
  - [Environment variables](#Environment-variables)
  - [Options priority order](#Options-priority-order)
  - [Help option](#help-option)
  - [Run the application](#run-the-application) 🏁(for the Oui Team)
    - [Run the application in production](#run-the-application-in-production)
    - [Run the application in development mode](#run-the-application-in-development-mode)
  - [Run the tests](#run-the-tests)
  - [How to generate the package](#how-to-generate-the-package)
- [Note about the development of this solution](#note-about-the-development-of-this-solution) 🏁(for the Oui Team)
  - [Idea of the implementation](#idea-of-the-implementation)
  - [Specific code for the implementation](#specific-code-for-the-implementation)
  - [Time management](#time-management)
- [Todo](#todo) 🏁(for the Oui Team)
- [Versioning](#versioning)
- [Author](#author)
- [License](#license)

## Motivation

We often consume a lot of time to set the structure of a project with good tools
which provide a nice developer experience. The goal of this project is to give a
boilerplate for an application in
[TypeScriptv4](https://www.typescriptlang.org/) run with
[Node.js](http://nodejs.org/).

I try to use the best practices I have learned during the development of my projects. I recommend you to check the following sources:
- A methodology for building software-as-a-service apps: https://12factor.net.
- General best practices: https://github.com/goldbergyoni/nodebestpractices.
- General testing best practices: https://github.com/goldbergyoni/javascript-testing-best-practices.

Feel free to replace the tools to fit the needs of your own project:
> "The right tool for the right job." - <cite>Every engineer</cite>

Do not hesitate to [contact me](#author) if you any questions or remarks.

## Features at a glance

###  Environment
- [Node.js](http://nodejs.org/).
- [TypeScript v4](https://www.typescriptlang.org/).

### Application features
- A command-line interface with [meow](https://github.com/sindresorhus/meow#readme).
- Loading of environment variables from a .env file with [dotenv](https://github.com/motdotla/dotenv#readme.).
- Logs with [Winston](https://github.com/winstonjs/winston#readme).
  - Console output logs with colorization.
  - Daily rotation of log files in JSON format for handling:
    - warnings and errors, in the default directory ```logs/errors```
    - uncaught exceptions, in the default directory ```logs/uncaught-exceptions```

### Developer tools
- Commands to start the application
  - In production mode ```npm run start```.
  - In development mode (build and start) ```npm run start:dev```.
  - In development watch mode with [Nodemon](http://nodemon.io/) (This needs to be configured depending on the command run by the program, see ```nodemon.json``` file.) ```start:dev-watch```.
- Linting with (```npm run format```):
  - [ESlint](https://eslint.org/).
    - Support of [Airbnb's ESLint config with TypeScript](https://github.com/iamturns/eslint-config-airbnb-typescript).
    - Support of [Prettier](https://prettier.io/).
    - Support of [Jest](https://jestjs.io/).
  - [Prettier](https://prettier.io/).
- Tests with [Jest](https://jestjs.io/).
  - Commands to run them
    - On demand ```npm run test```
    - In development mode ```npm run test:dev```.
    - In a continuous integration environment ```npm run test:ci```.
  - Test coverage can be enabled. See the [Jest](https://jestjs.io/) configuration file ```jest.config.js``` .
- Local pre-commit hooks with [Husky](https://github.com/typicode/husky#readme).
- Some useful commands to run regularly on demand like:
  - The check of outdated dependencies packages ```npm run check-outdate```.
  - The check of vulnerabilities in the dependencies packages ```npm run audit```.
  - Cleaning of generated files ```npm run clean```.
- A command to [package the application](#1.-generate-the-package).
  1. Checks with [NPM CI](https://docs.npmjs.com/cli/v6/commands/npm-ci).
  2. Formatting.
  3. Testing.
  4. Creation of compressed package ready to be deployed.
- [Visual Studio Code](https://code.visualstudio.com/) configuration scripts. See [Installation of Visual Studio Code plugins](#installation-of-visual-studio-code-plugins)
  - Settings to provide a better developer experience. For instance, formatting on save with [Prettier](https://prettier.io/). See ```.vscode/settings.json```.
  - A script to install extensions needed by the settings mentioned above ```.vscode/tasks.json```.
  - A script for debugging the application ```.vscode/launch.json```.

## Getting started

### Getting the source code
**Before the installation** please read the [prerequisites](#prerequisites).

Start by cloning this repository on your local machine:

```sh
$ git clone https://github.com/alex-mehdi-dev/planete-oui-backend-interview-amz.git
$ cd planete-oui-backend-interview-amz
```

### Installation

In the root directory of the project execute the following command:

```sh
$ npm install
```

#### Installation for production

##### 1. Generate the package

In the root directory of the project execute the following command:

```sh
$ npm run package
```

This command will generate a file named [package-name]-[version].tgz at the root of the project directory with:
- [package-name]: the name given by the property "name" in the package.json file.
- [version]: the version given by the property "version" in the package.json file.

For instance, the generated file can be: ```power-plant-cli-amz-1.0.0.tgz```

##### 2. Deployment

###### 1. Copy the package generated at the previous step in the directory where you want to deploy the package.

```sh
$ cp [package-name]-[version].tgz [INSTALLATION_PATH]
```

For instance

```sh
$ cp power-plant-cli-amz-1.0.0.tgz /usr/local
```

###### 2. Extract the package

```sh
$ tar -zxvf [package-name]-[version].tgz
```

For instance

```sh
$ tar -zxvf power-plant-cli-amz-1.0.0.tgz
```

###### 3. Install the dependencies for production

```sh
$ cd package
$ npm ci --only=prod
```

###### 4. Configure environment variables

1. Rename the file ```.env.example``` to ```.env```. If you are curious and want
   to know why we must rename this file, you can read this
   [FAQ](https://www.npmjs.com/package/dotenv#should-i-commit-my-env-file).

```sh
$ cp .env.example .env
```

2. Edit the file with the appropriate environment variables.

3. [Run the application in a production](#run-the-application-in-production)
   mode to check that everything works.

#### Additonal installation for development (optional)

##### Installation of Visual Studio Code plugins
If you use the Integrated Development Environment (IDE) [Visual Studio Code](https://code.visualstudio.com/),
you may be interested by the installation of some extensions used by the defaults settings provided in the file ```.vscode/settings.json```.

For instance, we use the extension [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as the default formatter to allow to format the code automatically on save.

1. Press ```CTRL``` + ```Shift``` + ```P``` or ```F1``` (default shortcut) to show all commands.
2. Write ```Tasks: Run Task``` and press ```Enter```.
3. Select ```vscode: Install Plugins```. This will install the plugins given in the list ```.vscode/extensions.list```.
4. Select ```Continue without scanning the task output``` and press ```Enter```.
5. Then press any key to close the terminal.

## Usage

### Environment variables

The application can load environment variables from a ```.env``` file. This is not
mandatory. If you want to load environment variables from such a file, see section
[configure environment variables](#4.-configure-environment-variables).

### Options priority order

A higher priority option will erase the previous options provided.
0 is the highest priority.
* 0: command-line arguments.
* 1: environment variables values.
* 2: default values of the application.

To know all options availables see the [help](#help-option) option.
To know all the environment variables, open the files:
 - For development or production: ```.env.example```.
 - For testing: ```tests/.env.test.example```.

### Help option

The option ```--help``` provide the list of all the available commands and options.

```sh
$ node bin/index.js --help
```

### Run the application

#### Run the application in production

- With [Node.js](http://nodejs.org/)

```sh
$ node -r dotenv/config bin/index.js <command> <options>
```

Example:

```sh
$ node -r dotenv/config bin/index.js get-total-power --from 01-01-2020 --to 05-01-2020 --format json
or
$ node -r dotenv/config bin/index.js get-total-power --from=01-01-2020 --to=05-01-2020 --format=json
```

- With [NPM](https://npmjs.org/)

```sh
$ npm run start -- <command> <options>
```

Example:

```sh
$ npm run start -- get-total-power --from=01-01-2020 --to=05-01-2020
```

- With [Yarn](https://yarnpkg.com/)

```sh
$ yarn start <command> <options>
```

Example:

```sh
$ yarn start get-total-power --from=01-01-2020 --to=05-01-2020
```

#### Run the application in development mode

All commands in the section
[Run the application in production](#run-the-application-in-production) are
available. But there are more options in development mode.

Instead of running:

```sh
$ npm run start -- <command> <options>
or
$ yarn start <command> <options
```

you can run the following command to build the application, run it and see the
modification(s) if any:

```sh
$ npm run start:dev -- <command> <options>
or
$ yarn start:dev <command> <options
```

If you want to develop in watch mode, you can edit the file ```nodemon.json```
to provide the command and the options you need. And then run the following
commands:

```sh
$ npm run start:dev-watch -- <command> <options>
or
$ yarn start:dev-watch <command> <options
```

### Run the tests

You can only run tests in development mode. In other words, the tests are not available
from the sources provided in the package.

1. Rename the file ```tests/.env.test.example``` to ```tests/.env.test```. If you are curious
    and want to know why we must rename this file, you can read this [FAQ](https://www.npmjs.com/package/dotenv#should-i-commit-my-env-file):

```sh
$ cp tests/.env.test.example tests/.env.test
```

2. Edit the file with the appropriate environment variables (optional).

3. Run the tests:

- On demand ```npm run test```
- In development mode ```npm run test:dev```.
- In a continuous integration environment ```npm run test:ci```.

### How to generate the package

See [Generate the package](#1.-generate-the-package)

## Note about the development of this solution

### Idea of the implementation
The implementation have been written following the idea of modularity. Algorithms have been thinking in this way. They can be improved if performance become an issue.

If performance become an issue, you can first overwrite environment variables in the file ```.env``` to suit your needs.

### Specific code for the implementation

The specific implementation of this solution is given in the following files:
- ```src/index.ts```: Entry point. Specific parts relative to the command have been written in this file.
- ```src/commands/GetTotalPower.ts```: Implementation of the command which allow to aggregate the total power of the power plants.
- ```src/domain/PowerPlant.ts```: Abstract class which allow to provide generic algorithms to transform the data given by the implementation of power plants connectors.
- ```src/domain/PowerPlantBarnsley.ts```: Implementation of the connector to the Barnsley power plants server.
- ```src/domain/PowerPlantHawes.ts```: Implementation of the connector to the Hawes power plants server.
- ```src/domain/PowerPlantHounslow.ts```: Implementation of the connector to the Hounslow power plants server.
- ```src/types/domain.d.ts```: Declaration file for the ```Measure``` type.
- ```tests/commands/GetTotalPower.test.ts```: incomplete test file for the get-total-power command.
  - A unit test for the function which aggregate measures.
- ```tests/domain/PowerPlant.test.ts```: incomplete test file for the generic algorithms.
  - A unit test for the function which fix missing measures.
  - A unit test for the function which smooth measures on a time step.
- ```.env.example``` and ```tests/.env.test.example```: Specific environment variables have been written here.
- ```fixtures```: This directory provide example of servers responses.

### Time management

The time management given here is relative to the [specific code for the implementation](#specific-code-for-the-implementation).

- Reading of the subject and paper/pen thinking: around 25 min.
- Development of a first version: around 2h.
  - less flexible algorithms.
  - minimum error management.
  - no test.
  - no documentation.
- Development of the last version: around 2.5 days.
  - flexible algorithms.
  - error management improved.
  - tests.
  - documentation and code cleaning (0.5 day).

## Todo

Due to time management, I have not implemented all the things I have in mind. Additionnal tasks can be done:

- Write more tests. Due to time management and because the 'Node TypeScript Starter' project is currently in development there is very few tests. Kind of tests to add:
  - unit tests.
  - integration tests.
  - deployment tests.
- Add documentation for each methods.
- Add a command ```status``` which will get all the status of all the power plants server.
- Improve the ```src/utils/OutputWritter.ts``` to write the output into files or a database.
- Add a cache feature for requests already performed.
- Avoid bottlenecks by dividing big requests into small requests and perform aggregatation operations in a streaming way.
- Add a [Docker](https://www.docker.com/) image.

## Versioning

We use [SemVer](http://semver.org/) for versioning.
## Author

* **Alex-Mehdi Zahid** - alexmehdi.dev@gmail.com (*Don't hesitate to contact me
if you have any question or if you find a bug or typographical error.*).

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0)
