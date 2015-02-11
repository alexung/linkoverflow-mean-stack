var myApp = angular.module('hackerNews', ['ui.router']);
// we included ui.router in the script we included in index.html
myApp.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl'
  });

  $stateProvider.state('posts', {
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });

  $urlRouterProvider.otherwise('home');

}])


myApp.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

// by angular conventions, lowerCamelCase is used for factory names that won't be new'd
// factory and service are similar, but nuanced.  Can check out the difference at http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

// myApp.state('posts', {
//   url: '/posts/{id}',
//   templateUrl: '/posts.html',
//   controller: 'PostsCtrl'
// });

myApp.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {

  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = ''
  };

}]);

myApp.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){

  $scope.posts = posts.posts;

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') {return;}
    $scope.posts.push({title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Alex', body: 'This post is teh most awesome Ive ever seen', upvotes: 0}
        ]
      });
    $scope.title = ''; // to clear the form after submit has been entered
    $scope.link = '';
  };

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };

}]);
