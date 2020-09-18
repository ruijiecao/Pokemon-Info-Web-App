console.log("myjs");
// console.log(document);
// var currentNode,
//     ni = document.createNodeIterator(document.documentElement, NodeFilter.SHOW_ELEMENT);

// while(currentNode = ni.nextNode()) {
//     console.log(currentNode.nodeName);
// }
var allElements = document.getElementsByTagName("*");
var allIds = [];
for (var i = 0, n = allElements.length; i < n; ++i) {
  var el = allElements[i];
  if (el.id) { allIds.push(el.id); }
}
console.log(allIds);
// var app = angular.module('angularjsNodejsTutorial', []);
// app.controller('recommendationsController', function($scope, $http) {

//   $scope.submitIds = function(){
//     $http({
//       url: '/recommendations/' + $scope.movieName,
//       method: 'GET'
//     }).then(res => {
//       console.log("MOVIES: ", res.data);
//       // $scope.recommendedMovies = res.data;
//     }, err => {
//       console.log("Movies Error", err);
//     });
//   }
// });

// var topHeader = document.createElement("h1");
// topHeader.innerHTML = "Search the Pokemon";

// var nameString = document.createElement("div");
// nameString.innerHTML = "Name: ";
// var nameInput = document.createElement("input");
// nameInput.type = "text";
// nameInput.placeholder = "enter pokemon name";



var nameInput = document.getElementById("searchPokemon");
var buttonName = document.getElementById("submitPokemonBtn");
// var nameInput = document.getElementsByClassName("searchPokemon");
// var buttonName = document.getElementsByClassName("submitPokemonBtn");



// var buttonName = document.createElement("button");



// buttonName.type = "button";
// buttonName.innerHTML = ("Search");

// var imageString = document.createElement("div");
// imageString.innerHTML = "The image of the pokemon displayed as follow: ";

// var displays = document.createElement("div");
var image = document.getElementById("submitPokemonImage");



// var image = document.createElement("img");
// var countC = document.createElement("div");
// var buttons = document.createElement("div");
// nameInput.className = "movie-input"; 
// // buttonName.className = "btn-search"; 
// buttonName.setAttribute("class", "btn-search");
// nameInput.setAttribute("class", "movie-input");

// nameInput.style.margin = "10px 0";
// nameInput.style.width = "250px";
// nameInput.style.height = "36px";
// // nameInput.style.border = "none";
// nameInput.style.padding = "2px 16px";
// nameInput.style.boxSizing = "border-box";
// nameInput.style.borderRadius = "20px";
// nameInput.style.outline = "none";
// buttonName.style.marginLeft = "10px";
// buttonName.style.width = "100px";
// buttonName.style.height = "36px";
// buttonName.style.border = "none";
// buttonName.style.padding = "2px 16px";
// buttonName.style.boxSizing = "border-box";
// buttonName.style.borderRadius = "20px";
// buttonName.style.outline = "none";
// buttonName.style.background = "#66ff66";
// buttonName.style.color = "#000000";
// buttonName.style.cursor = "pointer";
// buttonName.style.fontSize = "14px";
// buttonName.style.fontWeight = "bold";
// image.style.width = "100px";
// image.style.height = "auto";

// document.body.appendChild(topHeader);
// document.write("<br>");

// nameString.appendChild(nameInput);
// document.body.appendChild(nameString);
// document.body.appendChild(buttonName);
// document.write("<br><br><br>");


// document.write("<br>");
// document.body.appendChild(displays);
// document.write("<br>");


// displays.appendChild(imageString);
// displays.appendChild(document.createElement("br"));
// displays.appendChild(image);
// displays.appendChild(document.createElement("br"));


// displays.appendChild(countC);
// displays.appendChild(buttons);
// displays.appendChild(document.createElement("br"));
// displays.appendChild(document.createElement("br"));
// displays.appendChild(document.createElement("br"));

// image.style.width = "100px";
// image.style.height = "auto";
// image.style.width = "100px"; 
// image.style.height = "auto";
// image.style.margin = "0 auto";
// imageString.style.marginLeft = "auto";
// imageString.style.marginRight = "auto"; 
// image.style.marginLeft = "auto";
// image.style.marginRight = "auto"; 
// displays.style.marginLeft = "auto";
// displays.style.marginRight = "auto"; 
// displays.style.width = "50%"; 
// displays.style.margin = "0 auto";

load();

buttonName.onclick = function(){
  console.log("onclick");
  var name = nameInput.value.toLowerCase();
  // if (!isAlphabetic(name) || !isNumeric(name)) {
  //   alert("Your name should be an alphabetic string!");
  // }
  // else {
  //   show(name);
  // }
  show(name);
};


function isAlphabetic(str) {
  var c;
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i);
    if (!(c > 64 && c < 91) && !(c > 96 && c < 123)) {
      return false;
    }
  }
  return true;
}

function load(){
  image.onerror = function() { alert("The pokemon cannot be found!"); };
  image.src = "https://camo.githubusercontent.com/8dd9439d771cb25409831294fc728ac61c499b72/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67";
}

function show(name){
  image.src = "/images/images/" + name + ".png";
}