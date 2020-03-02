# Template Project

## Prerequisites

* node 10.x.x
* npm >= 6.9.0 
* java 8 (jdk)
* ssh access for bitbucket

### Windows  

* Python 2.7
* ```npm i -g windows-build-tools```


## Installation

```bash
npm i
```

## Development

### API

To start dev server run:

```bash
node servers/api/server.js
```

[server.js](servers/api/server.js) looks like:

```js
'use strict';

const amcServer = require('amc-server');
const serverConfig = require('./config/config.local');
const server = amcServer.start(serverConfig);
```

You can customize the server config by modifying [config file](servers/api/config/config.local.js)

Important config sections for you:

### amc-data-provider plugin

```
'amcDataProvider': {
            'plugin': 'amc-data-provider',
            'options': {
                'connection_path': path.join(__dirname, 'connections'),
                'connection_path_dev': path.join(__dirname, 'connections'),
                'dbConnections': ['authentication_data', 'project_data']
            }
        }
```

dbConnections section determines connections configs that should be loaded from ```connection_path``` folder 

### authentication

```
'AuthKey': {
        'enable': false,
        'encoding': false,
        ...
        }
```

enable(true/false) - turn on/off auth

encoding(true/false) - turn on/off crypto-checks of the auth payloads


### GUI

TODO :)

## BUILD

### API

#### prerequisites

You had to install the latest version of [amc-project-builder](https://bitbucket.org/AMC_TV/amc-project-builder/src/master/)

### building

All info about usage provided in the [README](https://bitbucket.org/AMC_TV/amc-project-builder/src/master/README.md)

After successfully build, you can push created/updated folder into the api-build repo.

If you have any questions, please, ask Vitaly Butoma (skype: v.butoma), Oleg Pavlish (skype: opavlish) or your team-lead.


### GUI

Todo :)
