module.exports = {
  'shemas_list': [{
    'type': 'ReferenceRoute',
    'timeout': 1 * 1000 * 30, // no more the 30 sec
    'cache': {
      'enable': true,
      'properties': {
        'expiresIn': 12 * 60 * 60 * 1000,  // 12 Hours TTL
        'generateTimeout': false
      }
    }
  }, {
    'type': 'DataRoutes',
    'timeout': 1 * 1000 * 60, // no more the 30 sec
    'cache': {
      'enable': false
    }
  }, {
    'type': 'AnalyticsRoute',
    'timeout': 1 * 1000 * 60 * 5, // 5 Minute per Call
    'cache': {
      'enable': true,
      'properties': {
        'expiresIn': 12 * 60 * 60 * 1000, // 12 Hours TTL
        'generateTimeout': false
      }
    }
  }, {
    'type': 'OperationRoute',
    'timeout': 1 * 1000 * 10, // no more the 10 sec
    'cache': {
      'enable': false
    }
  }, {
    'type': 'AuthenticationRoute',
    'timeout': 1 * 1000 * 10, // no more the 10 sec
    'cache': {
      'enable': false
    },
    'validation': {}
  }]
};
