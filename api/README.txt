----------------
| Instructions |
----------------

$cd streams
$mkdir api
$cd api

$npm init

$npm install --save json-server

This creates package.json

$touch db.json

Inside db.json file:

    {
        "streams" : []
    }

Inside package.json
Delete "test" key-value pair and change for:

    "scripts": {
    "start" : "json-server -p 3001 -w db.json"
    },

