export const environment = {
  production: true,
  laravel: {
      url: 'http://laravel-quickstart',
      passport: {
          passwordGrant: {
              client_id: null,
              client_secret: null,
          }
      }
  },
  pusher: {
      key: null,
      cluster: null
  }
};
