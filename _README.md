# Learn it Now!

> A live one-on-one knowledge sharing platform.

## Team

  - __Product Owner__: Tom Coughlin	
  - __Scrum Master__: Ted Hsiao
  - __Development Team Members__: Calvin Le, Sonny Sheth
  
## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
http://learnitnow.herokuapp.com/

If you have knowledge to share, create a lesson.
If you want to register for a lesson, pick an available appointment and pay the lesson fee.

## Requirements

- Node 0.12.7
- NPM 2.11.3
- MySQL 2.10.2

## Development

### Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### External Requirements

#### Create Database

mysql.server start
CREATE DATABASE learnitnowdb

####  Set up Mailgun

If you deploy to Heroku, you'll need to add Mailgun as an asset.

If you deploy elsewhere, check https://mailgun.com to set up
your API key.

Sending from a local instance only works for sending to the email
used to register with Mailgun.

#### Other APIs

https://developer.appear.in/

### Roadmap

View the project roadmap [here](https://github.com/hrr12-stegosaurus/2016-01-greenfield/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
