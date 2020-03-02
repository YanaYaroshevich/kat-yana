const path = require('path');

module.exports.VERSION = 1.0;

module.exports = {
    'app': {
        'name': 'AMC-Server',
        'desc': '',
        'type': 'api'
    },
    'api': {
        'host': '0.0.0.0',
        'port': '8443',
        'protocol': 'http'
    },
    'dataProvider': {
        'connection_path': path.join(__dirname, 'connections'),
        'connection_path_dev': path.join(__dirname, 'connections')
    },
    'plugins': {
        // AMC-PLUGINS
        'amcMailer': {
            'plugin': 'amc-mailer',
            'options': {
                'mailers': ['auth_mailer']
            }
        },
        'amcAuth': {
            'plugin': 'amc-auth',
            'options': {}
        },
        'amcAuthValidation': {
            'plugin': 'amc-auth-validation',
            'options': {}
        },
        'amcDataProvider': {
            'plugin': 'amc-data-provider',
            'options': {
                'connection_path': path.join(__dirname, 'connections'),
                'connection_path_dev': path.join(__dirname, 'connections'),
                'dbConnections': ['authentication_data']
            }
        },
        'amcProxy': {
            'plugin': 'amc-proxy',
            'options': {
                'config': {},
                'db_routes_proxy': require('./db_routes_proxy')
            }
        },
        'amcThreading': {
            'plugin': 'amc-threading',
            'options': {}
        },
        'amcBaseDB': {
            'plugin': 'amc-basedb',
            'options': {}
        },
        'amcModules': {
            'plugin': 'amc-modules',
            'options': {
                'config': {
                    'RestAPI': {
                        'advertiser': 'AMEX',
                        //Global Routing Parameters
                        'routing': {
                        },
                        'proxy': {
                            // enable/disable functionality to proxy API services
                            'api_proxy': {
                                'enable': false
                            },
                            // enable/disable functionality to Proxy reporting services
                            'reporting_proxy': {
                                'enable': false
                            }
                        },
                        //Global Paging Parameters
                        'paging': {
                            'page_size': 1000,
                            'enable': true
                        },
                        //Global Sorting Parameters
                        'sorting': {
                            'rules': [],
                            'enable': true
                        }
                    },
                    'AuthKey': {
                        'enable': false,
                        'encoding': true
                    }
                },
                'db_modules_configs': [
                    {
                        'apiBaseDir': path.join(__dirname, '../api'),
                        'db_modules_config': require('./db_modules_config')
                    }
                ],
                'db_routes_types': require('./db_routes_types')
            }
        },
        'amcAuthRest': {
            'plugin': 'amc-auth-rest',
            'options': {
            },
        },
        // EXTERNAL
        'hapi-auth-jwt2': {
            'plugin': 'hapi-auth-jwt2',
            'options': {},
            'external': true
        },
        'blipp': {
            'plugin': 'blipp',
            'options': {},
            'external': true
        }
    },
    // Authorization Information
    'AuthKey': {
        'enable': true,
        'encoding': true,
        'privateKey': 'ad2a5132404c327b03aded5767d02fb957',
        'privateKeyLogin': 'Jsb2dnZWRfdGltZSI6MTQ2NDM1MTQxNTI4MiwibG9naW4iOiJzeXNhZG1pbiI',
        'tokenSalt': 15,
        'tokenExpiry': 10 * 60 * 1000,
        'refreshTokenExpiry': 24 * 60 * 60 * 1000,
        'passwordExpiry': 12 * 30 * 24 * 60 * 60 * 1000, // 1 year
        'oneTimeTokenExpiry': 30 * 60 * 1000,     // 30 min
        'resetLinkExpire': 30 * 60,     // 30 min (value in seconds!)
        'acceptLicenseTokenExpiry': 3 * 60 * 1000,     // 3 min
        'storage': {
            'type': 'local', //value: redis, local
            'options': {
                'host': '127.0.0.1',
                'port': 6379,
                'partition': 'amc_session',
                'shared': true
            }
        }    ,
        'authProviders': {
            'DASHDB_PKG': {},
        },
        'resetTemplateData': {
            'name': '',
            'action_url': '',
            'operating_system': '',
            'browser_name': '',
            'support_url': '',
            'productName': 'DDM',
            'companyName': 'DataMola'
        }
    },
    //Config Default Rest_API parameters
    'RestAPI': {
        'advertiser': 'AMEX',
        //Global Routing Parameters
        'routing': {
            // Default timeout for operation 30 seconds
            'timeout': 1 * 1000 * 30,
            'cache': {
                'enable': true,
                'type': 'local',
                'options': {
                    'host': 'redis_db',
                    'port': 6379,
                    'partition': 'amc_session',
                    'maxAttemptsCount': 5,
                    'shared': true,
                    'init': false
                }
            }
        },
        'proxy': {
            // enable/disable functionality to proxy API services
            'api_proxy': {
                'enable': false
            },
            // enable/disable functionality to Proxy reporting services
            'reporting_proxy': {
                'enable': false
            }
        },
        //Global Paging Parameters
        'paging': {
            'page_size': 1000,
            'enable': true
        },
        //Global Sorting Parameters
        'sorting': {
            'rules': [],
            'enable': true
        }
    },
    // enable/disable functionality to store the log info into the Application's DB
    'logFilesProcessing': {
        'enableLogsToDB': false,
        'insertSize': 20000
    },
    'ENDPOINT': {
        'protocol': 'http',
        'url': 'localhost:4200',
        'suffix': ''
    },
    //Debug Mode
    'debug_mode': false
};
