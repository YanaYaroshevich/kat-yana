module.exports = {
  'gui_proxy': {
    'enable': false,
    'config': {
      'routes': [
        {
          'name_based': true,
          'template': '/%s/{routes*}',
          'target_uri': 'http://0.0.0.0:8081'
        }
      ]
    }
  },
  'api_proxy': {
    'enable': false,
    'config': {
      'auth': {
        'scope': ['user', 'admin']
      },
      'routes': [
        {
          'name_based': false,
          'template': '/api/v1/{routes*}',
          'target_uri': 'http://0.0.0.0:8081'
        },
        {
          'name_based': true,
          'template': '/%s/api/v1/{routes*}',
          'target_uri': 'http://0.0.0.0:8081'
        }
      ]
    }
  },
  'reporting_proxy': {
    'config': {
      'auth': {
        'scope': ['user', 'admin']
      },
      'routes': [
        {
          'name_based': false,
          'template': '/report/api',
          'target_uri': 'http://127.0.0.1:5488/api/report'
        }
      ]
    }
  }
};
