var React                   = require('react');
var ReactDOM                = require('react-dom');

var App = require("./components/CardComponent.jsx").App;

var loadJSON = function(callback) {

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', '/data/new_hs.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

var beginRender = function(responseText) {

  var cards = JSON.parse(responseText);
  ReactDOM.render(
    <App cards={cards.Basic}/>,
    document.getElementById('container')
  );
}

loadJSON(beginRender);

//
