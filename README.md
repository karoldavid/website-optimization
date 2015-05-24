## Website Performance And Rendering Optimization

Here is a link to the live version:
http://karoldavid.github.io/frontend-nanodegree-mobile-portfolio/

Usage:
On the bottom of the mobile portfolio page (index.html) you will find a link to Cam's Online Pizzeria (views/pizza.html).

Once you get there, you can scroll down or you may click on one of the menu items "Menu", "Our Ingredients", "Pick a Pizza Now!" to
get to the slider, where you can adjust your pizza to one of three sizes.


Description:

Project 4 consists of two parts, the Mobile Portfolio Performance Optimization and 
of the Cameron's Pizza Shop's Rendering Optimization.

Time for initial page load in index.html
Smooth browser animations and efficient code execution in main.js for the Pizzas page under /views/pizza.html

Optimization Results:

(1) Mobile Portfolio Page (index.html):
    - 94%  Speed on Mobile;
    - 95%  Speed on Desktop;
    - 100% Mobile User Experience;
    https://developers.google.com/speed/pagespeed/insights/

(2) Cam's Online Pizzeria (pizza.html, views/js/main.js):
    - scrolling is under 60 frames per second;
    - time to resize a pizza is less than 5ms shown in the console;

Furthermore, static assests such as images, css and javascipt files are automatically optimized, concatenated and/ or minified with Grunt.


Optimization of Cam's Online Pizzeria:

Essentially optimizing JavaScript, Layout and Paint executions

First, in views/js/main.js I am looking for the more obvious and main bottlenecks, that are usually easier to change.

So, I reduced the number of animated pizzas from 200 to a more reasonable number of 35:

document.addEventListener('DOMContentLoaded', function() {
  [...]
  for (var i = 0; i < 35; i++) {
    [...]
  }
  [...]
});

Where possible, I calculate variables outside the For Loops, like the 5 phases:

function updatePositions() {
  [...]
  var phases = [];
  for (var x = 0; x < 5; x++) { phases[x] = Math.sin((document.body.scrollTop / 1250) + x); }
  for (var i = 0; i < items.length; i++) {
    items[i].style.transform = 'translateX(' + parseInt(items[i].basicLeft + 100 * phases[i % 5] - halfScreenWidth ) + 'px' + ')';
  }
  [...]
  }
}

Change Pizza Sizes
The last optimization we need to accomplish is to make the Change Pizza Sizes function more efficient. If we open up
Chrome Dev Tools and look at the console, whenever we change the sizes of the pizzas with the slider on the page, wwe
get an average time to resize pizzas of over 100 milliseconds. The goal is to reduce this time to under 5 milliseconds.
We go into our HTML file and look at this line:
 
<input id="sizeSlider" type="range" min="1" max="3" value="2" step="1"
onchange="resizePizzas(this.value)"> 
We see that whenever we change the slider, we tell the slider to call the JavaScript function
 
resizePizzas(this.value) 
.
From there we then look into main.js and study the   
resizePizzas() 
 function and proceed to look for bottle necks in the
calculations. Again the main bottleneck is how everything is calculated in the For Loops.

The next change reduces the scripting time. There is no need to access the DOM element for every scroll.
 Therefore I create an array variable that has a reference to all of the pizzas that has the class name "mover":

[..]
var items = [];
[..]
document.addEventListener('DOMContentLoaded', function() {
  [..]
  // get all moving pizza objects from the DOM and put them into one array to reduce DOM access
  items = document.getElementsByClassName('mover');
  [..]
});

- Furthermore, I reduce the layout time by using te more performant 'document.getElementsByClassName()' instead of 'document.querySelectorAll()':

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


Then, I reduce the paint time by forcing each moving pizza into its own composite layer. Adding 'backface-visibility' to the css mover class in views/css/style.css does the trick:
  .mover {
    position: fixed;
    width: 256px;
    transform: translateZ(0);
    backface-visibility: hidden;
    z-index: -1;
  }

When we scroll, the browser will only repaint the pixels that are affected by the moving pizzas, and therefore will not repaint the whole screen, drastically reducing our total paint time and increasing our FPS.

Finally, I give the background pizza an own image views/images/pizza-small.png, having the exact size on screen. The rezisable pizza gets its own optimized image views/images/pizza-large.png, too.

