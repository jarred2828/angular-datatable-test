class HomeService
{
  constructor($http, baseUrl)
  {
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getData() {
    // return this.$http({
    //   method: 'POST',
    //   url: `${this.baseUrl}/near`,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     latitude: 26.398883200000004,
    //     longitude: -80.1120511,
    //     radius: 25,
    //     update_cookie: true
    //   }
    // });
    return this.$http({
      method: 'GET',
      url: 'data/users.json'
    });
  }

  static homeFactory($http, baseUrl){
    return new HomeService($http, baseUrl);
  }
}

HomeService.homeFactory.$inject = ['$http', 'baseUrl'];

export default HomeService;
