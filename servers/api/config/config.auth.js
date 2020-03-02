const path = require('path');
module.exports.VERSION = 1.0;

module.exports = {
    'app': {
        'name': 'AMC-AUTH-Server',
        'desc': '',
        'type': 'api'
    },
    'api': {
        'host': '0.0.0.0',
        'port': '8443',
        'protocol': 'http'
    },
    'ENDPOINT': {
        'protocol': 'https',
        'url': 'www.auroravts.com:8443',
        'suffix': '/uat/ddm'
    },
    'plugins': {
        'amcDataProvider': {
            'plugin': 'amc-data-provider',
            'options': {
                'connection_path': path.join(__dirname, 'connections'),
                'dbConnections': ['authentication_data']
            }
        },
    },
    'AuthKey': {
        'enable': true,
        'encoding': true,
        'privateKey': 'ad2a5132404c327b03aded5767d02fb957',
        'privateKeyLogin': 'Jsb2dnZWRfdGltZSI6MTQ2NDM1MTQxNTI4MiwibG9naW4iOiJzeXNhZG1pbiI',
        'tokenSalt': 15,
        'tokenExpiry': 12 * 60 * 60 * 1000,
        'refreshTokenExpiry': 24 * 60 * 60 * 1000,
        'passwordExpiry': 12 * 30 * 24 * 60 * 60 * 1000, // 1 year
        'oneTimeTokenExpiry': 30 * 60 * 1000,     // 30 min
        'resetLinkExpire': 30 * 60,     // 30 min (value in seconds!)
        'acceptLicenseTokenExpiry': 12 * 60 * 60 * 1000,     // 3 min
        'storage': {
            'type': 'local', //value: redis, local
            'options': {
                'host': 'redis_db',
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
};