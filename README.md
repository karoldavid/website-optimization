## Website Performance And Rendering Optimization

Here is a link to the live version:
http://karoldavid.github.io/frontend-nanodegree-mobile-portfolio/


Usage:
------
On the bottom of the mobile portfolio page (index.html) you will find a link to Cam's Online Pizzeria (views/pizza.html).

Once you get there, you may scroll down or you can click on one of the menu items "Menu", "Our Ingredients", "Pick a Pizza Now!" to
get to the slider, which allows you to adjust your pizza to one of three sizes.


Overview:
---------
Project 4 consists of two parts, the Mobile Portfolio Performance Optimization and 
of the Cameron's Pizza Shop's Rendering Optimization.

Time for initial page load in index.html
Smooth browser animations and efficient code execution in main.js for the Pizzas page under /views/pizza.html


Results:
--------
(1) Mobile Portfolio Page (index.html):
    - 94%  Speed on Mobile;
    - 95%  Speed on Desktop;
    - 100% Mobile User Experience;
    => https://developers.google.com/speed/pagespeed/insights/

(2) Cam's Online Pizzeria (pizza.html, views/js/main.js):
    - scrolling is under 60 frames per second;
    - time to resize a pizza is less than 5ms shown in the console;

Furthermore, static assests such as images, css and javascipt files are automatically optimized, concatenated and/ or minified with Grunt.


Optimization of Cam's Online Pizzeria:
--------------------------------------
Essentially, I am looking for possible optimization of JavaScript, Layout and Paint executions.

To get started, I am on the lookout for the more obvious bottlenecks in 'views/js/main.js', that are usually easier to change.
For example, I asked myself if there is really a need to animate 200 background pizzas. After some experimenting, I reduced this number to a
more reasonable size of 35:

document.addEventListener('DOMContentLoaded', function() {
  [...]
  for (var i = 0; i < 35; i++) {
    [...]
  }
  [...]
});

To save more scripting time, I calculate variables, where possible, outside the For Loops, like the 5 phases in the function updatePositions():

function updatePositions() {
  [...]
  var phases = [];
  for (var x = 0; x < 5; x++) { phases[x] = Math.sin((document.body.scrollTop / 1250) + x); }
  for (var i = 0; i < items.length; i++) {
    items[i].style.transform = 'translateX(' + parseInt(items[i].basicLeft + 100 * phases[i % 5] - halfScreenWidth ) + 'px' + ')';
  }
  [...]
}

... access the DOM outside the For Loops and I get rid of calculating unnecessary values like 'dx':

function changePizzaSizes(size) {
    var newWidth;
    switch(size) {
      case "1":
        newWidth = 25;
        break;
      case "2":
        newWidth = 33.3;
        break;
      case "3":
        newWidth = 50;
        break;
      default:
        console.log("Bug in sizeSwitcher");
        break;
    }
    
    var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
    for (var i = 0; i < randomPizzas.length; i++) {
      randomPizzas[i].style.width = newWidth + "%";
    }
}

The next change reduces the scripting time, too. There is no need to access the DOM element for every single scroll.
Therefore, I create an array variable that has a reference to all of the pizzas that have the class name "mover":

[..]
var items = [];
[..]
document.addEventListener('DOMContentLoaded', function() {
  [..]
  // get all moving pizza objects from the DOM and put them into one array to reduce DOM access
  items = document.getElementsByClassName('mover');
  [..]
});

Furthermore, I reduce the layout time by using the faster 'document.getElementsByClassName()' instead of 'document.querySelectorAll()':

function changePizzaSizes(size) {
    [..]
    var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
    [..]
}

document.addEventListener('DOMContentLoaded', function() {
  [..]
  items = document.getElementsByClassName('mover');
  [..]
});


Then, I reduce the paint time by forcing each moving pizza into its own composite layer. Adding 'backface-visibility' to the css mover class in 'views/css/style.css' does the trick:
  .mover {
    position: fixed;
    width: 256px;
    transform: translateZ(0);
    backface-visibility: hidden;
    z-index: -1;
  }

When we scroll now, the browser will only repaint the pixels that are affected by the moving pizzas. There is no need anymore to repaint the whole screen.

Finally, I give the background pizza an own optimkized image file ('views/images/pizza-small.png'), having the exact size it will also have on screen. The resizable pizza gets its own optimized image file ('views/images/pizza-large.png'), too.

