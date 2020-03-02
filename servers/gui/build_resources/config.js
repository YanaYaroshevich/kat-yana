module.exports = {
    "app": {
        "name": "Application",
        "desc": "Dashboards",
        "type": "api"
    },
    "api": {
        "host": "0.0.0.0",
        "port": "8443",
        "protocol": "http"
    },
    "gui": {
        "host": "0.0.0.0",
        "port": "8443",
        "protocol": "http"
    },
    // Authorization Information
    "AuthKey": {
        "enable": false,
        "encoding": true,
        "privateKey": 'ad2a5132404c327b03aded5767d02fb957',
        "privateKeyLogin": "Jsb2dnZWRfdGltZSI6MTQ2NDM1MTQxNTI4MiwibG9naW4iOiJzeXNhZG1pbiI",
        "tokenSalt": 15,
        "tokenExpiry": 1 * 30 * 1000 * 15
    },
    //Config Default Rest_API parameters
    "RestAPI": {
        "advertiser": "AMEX",
        //Global Routing Parameters
        "routing": {
            // Default timeout for operation 30 seconds
            "timeout": 1 * 1000 * 30,
            "cache": {
                "enable": false,
                "type": "redis",
                "options": {
                    "host": "localhost",
                    "port": 6379,
                    "partition": "amc",
                    "shared": true
                }
            }
        },
        "proxy": {
            // enable/disable functionality to proxy API services
            "api_proxy": {
                "enable": false
            },
            // enable/disable functionality to Proxy reporting services
            "reporting_proxy": {
                "enable": false
            }
        },
        //Global Paging Parameters
        "paging": {
            "page_size": 1000,
            "enable": true
        },
        //Global Sorting Parameters
        "sorting": {
            "rules": [],
            "enable": true
        }
    },
    // connection to the db
    "db_connections": ['authentication_data', 'scoreboard_data'],
    //"mailers": ['adsales_data'],
    "mailers": [],
    //"messengers": ["msg_main", "msg_consumer"],
    "messengers": [],
    // Apps List to logging
    "logging": {
        "errors": [],
        "responses": []
    },
    //Debug Mode
    "debug_mode": false
};
