# getir-challenge
This is REST API challenge

## About

That's a basic REST API architecture for filtering some data. In the case of the challenge, I created an endpoint named is "record" and now we can use filtering data when sending JSON values like "minCount", "maxCount", "startDate", and "endDate" as a POST method. So, there are two major filters one of the "count" and the other filter is the "date". Also helped me this library is Mongoose to creating Schema and management validation.

## Installation

### 1 - Fork repo

```sh
$ git clone git@github.com:your_github_username/challenge.git
$ cd challenge
```

### 2- Create a .env file in your root folder

contents of .env; `MONGODB_STR` and `PORT`

```
MONGODB_STR = MongoDB URI
PORT = 3000
```

### 3- Install the dependencies and start the server

```sh
$ npm install
$ npm start
```

Your server address in your preferred browser: **localhost:3000**

### Testing

Mocha and Chai used for unit testing. To run the tests:

```
npm test
```

### Project Structure

```
├── bin
│   └── www.js
├── models
│   └── Record.js
├── public
│   ├── images
│   └── javascripts
├── routes
│   └── records.js
├── tests
│   └── records.test.spec.js
├── LICENSE
├── README.md
├── app.js
├── config.js
└── package.json
```

The folder structure of this app is explained below:

| Name                           | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| **bin/www.js**                 | Port listen                                                      |
| **models/Record.js**           | Defines the registration scheme to be used                       |
| **node_modules**               | Contains all npm dependencies                                    |
| **routes/records.js**          | Contain express record route                                     |
| **tests/records.test.spec.js** | Contain record route testing                                     |
| **app.js**                     | Entry point to express app                                       |
| **config.js**                  | Application configuration including environment-specific configs |
| **package.json**               | Contains npm dependencies as well as build scripts               |

### Running the build

| Npm Script   | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `start`      | Runs full build and runs node on dist/index.js. Can be invoked with npm start |
| `serve:dev`  | Runs full build before starting all watch tasks.                              |
| `build:dist` | Full build. Runs ALL build tasks.                                             |
| `test`       | Runs build and run tests using mocha.                                         |

## Endpoint

| HTTP   | Route | Parameters                             | Description                       |
| ------ | ----- | -------------------------------------- | --------------------------------- |
| `POST` | /     | startDate, endDate, minCount, maxCount | Create a new record search query. |

## Request Body

```
{
startDate: String | required,
"endDate": String | required,
"minCount": Number| required,
"maxCount": Number| required
}
```

“startDate” and “endDate” fields filter the data for “createdAt”. “minCount” and “maxCount” are for filtering the data. Sum of "count" sequence documents are between "minCount" and "maxCount".

## Response

```
{
code: 0 / 1,
"msg": Success / Error Message,
"records": data => (keys: key, createdAt, totalCount)
}
```

"records" contain all filtered items.

## Example Request Payload

```
{
	"startDate": "2016-01-26",
	"endDate": "2018-02-02",
	"minCount": 2700,
	"maxCount": 3000
}
```

## Example Response Payload

```
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "NOdGNUDn",
      "createdAt": "2016-01-28T07:10:33.558Z",
      "totalCount": 2813
    },
    {
      "key": "bxoQiSKL",
      "createdAt": "2016-01-29T01:59:53.494Z",
      "totalCount": 2991
    }
  ]
}
```
