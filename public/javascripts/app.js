
// var Expand = (function() {
//   var tile = $('.strips__strip');
//   var tileLink = $('.strips__strip > .strip__content');
//   var tileText = tileLink.find('.strip__inner-text');
//   var stripClose = $('.strip__close');
  
//   var expanded  = false;

//   var open = function() {
      
//     var tile = $(this).parent();

//       if (!expanded) {
//         tile.addClass('strips__strip--expanded');
//         // add delay to inner text
//         tileText.css('transition', 'all .5s .3s cubic-bezier(0.23, 1, 0.32, 1)');
//         stripClose.addClass('strip__close--show');
//         stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
//         expanded = true;
//       } 
//     };
  
//   var close = function() {
//     if (expanded) {
//       tile.removeClass('strips__strip--expanded');
//       // remove delay from inner text
//       tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
//       stripClose.removeClass('strip__close--show');
//       stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)')
//       expanded = false;
//     }
//   }

//     var bindActions = function() {
//       tileLink.on('click', open);
//       stripClose.on('click', close);
//     };

//     var init = function() {
//       bindActions();
//     };

//     return {
//       init: init
//     };

//   }());

// Expand.init();


/*yezheng*/

var app = angular.module('angularjsNodejsTutorial', []);
// Controller for the Dashboard page
app.controller('dashboardController', function($scope, $http) {
  // TODO: Q1 //yezheng: exercise3/public/javascripts/app.js
  $http({ 
    url: '/genres',
    method: 'GET'
  }).then(res => {
    console.log("GENRES: ", res.data);
    $scope.genres = res.data
  }, err => {
    console.log("GENRES ERROR: ", err);
  });
  


  $scope.showMovies = function(g) {    
    $http({
    url: '/movies/'+g.genre, //yezheng:??
    method: 'GET'
  }).then(res => {
    console.log("MOVIE: ", res.data);
    $scope.movies = res.data;
  }, err => {
    console.log("MOVIE ERROR: ", err);
  });
  }
});



// Controller for the Recommendations Page
app.controller('recommendationsController', function($scope, $http) {
  // TODO: Q2 //yezheng: exercise3/public/javascripts/app.js

  $scope.submitIds = function() {
    // TODO: Part (3) - Add an HTTP request to this function (see lines 4-12 above for reference)
    $http({
    url: '/movie/'+$scope.movieName,
    method: 'GET'
  }).then(res => {
    console.log("MOVIES: ", res.data);
    $scope.recommendedMovies = res.data;
  }, err => {
    console.log("MOVIES ERROR: ", err);
  });
  }
});

// Controller for the Best Of Page
app.controller('bestofController', function($scope, $http) {
  // TODO: Q3

  $http({ 
    url: '/decades',
    method: 'GET'
  }).then(res => {
    console.log("Decades: ", res.data);
    $scope.decades = res.data
  }, err => {
    console.log("Decades ERROR: ", err);
  });  
  $scope.submitDecade = function() {
    // console.log($scope.selectedDecade.TYPE1);
    // console.log($scope.bestofMovies);
    // console.log('[bestofController] yezheng');
    $http({
    // url: '/de/'+$scope.selectedDecade.decade,
    url: '/bestof/'+$scope.selectedDecade.TYPE1,
    method: 'GET'
  }).then(res => {
     console.log("yezheng!!!!!!!: ", res.data);
    $scope.bestofMovies = res.data[1];
    $scope.bestofAbilities = res.data[0];

    $scope.rate = res.data[2];
// $scope.bestofMovies = res.data["pokemon10"];
//     $scope.bestofAbilities = res['abilities10'];
  }, err => {
    console.log("Movies ERROR: ", err);
  });
  }
});