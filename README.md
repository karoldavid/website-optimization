## Website Performance Optimization Portfolio Project

#### This project is part of the Udacity Front-End Web Developer Nanodegree

https://www.udacity.com/course/front-end-web-developer-nanodegree--nd00

#### The code was forked from:

https://github.com/udacity/frontend-nanodegree-mobile-portfolio.git

#### Here is a link to the live version:

http://karoldavid.github.io/frontend-nanodegree-mobile-portfolio/

### HOWTO

On the bottom of the mobile portfolio page (index.html) you will find a
link to Cam's Online Pizzeria (views/pizza.html).

Once you get to the online pizzeria, you may scroll down or you can
click on one of the menu items "Menu", "Our Ingredients",
"Pick a Pizza Now!" to get to the slider, which allows you to adjust
your pizza to one of three sizes.

### Project Overview

Project 4 consists of two parts:

1. Mobile Portfolio Performance Optimization
2. Cameron's Pizza Shop's Rendering Optimization.

The optimization results will be rated for:

1. Time for initial page load in 'index.html'
2. Smooth browser animations and efficient code execution in
   'views/js/main.js' for the pizzeria page under 'views/pizza.html'

### Measured Results

1. Mobile Portfolio Page (index.html):

* 93% Speed on Mobile
* 95% Speed on Desktop
* 100% Mobile UserExperience

=> https://developers.google.com/speed/pagespeed/insights/

2. Cam's Online Pizzeria (views/pizza.html, views/js/main.js):

* scrolling is under 60 frames per second
* the time to resize a pizza is less than 5ms

=> shown in the browser console

### Additional Rating

Static assests such as images, css and javascipt files are automatically
optimized, concatenated and/ or mini-/ uglyfied with Grunt. Grunt Watch automates
this tasks and runs them whenever watched files have changed. Furthermore,
Grunt is linting files to check for errors with jshint and htmlhint. You may also
type 'grunt pagespeed' into the console to get the actual pagespeed results for
the live version.

### Optimization of Cam's Online Pizzeria:

Here is a link to the documentation of 'views/js/main.js' created with Docco:

http://karoldavid.github.io/frontend-nanodegree-mobile-portfolio/views/docs/main.html

Basically, I was looking for possible optimizations of JavaScript, Layout and Paint
execution (The Critical Rendering Path: HTML -> CSSOM <- JavaScript -> Render Tree
-> Layout -> Paint).

To get started, I was on the lookout for the more obvious bottlenecks in
'views/js/main.js', that are usually easier to change.

For example, I asked myself if there is really a need to animate 200 background pizzas?
So, I have chosen to calculate dynamically the number of background pizzas needed to fill the
screen, based on browser window resolution (width and height):

    document.addEventListener('DOMContentLoaded', function() {
      [..]
      // Get screen width to calculate number of columns for background pizzas
      cols = Math.round((((window.innerWidth > 0) ? window.innerWidth : screen.width)) / 200),
      s = 256,
      // Get screen height to calculate number of rows for background pizzas
      rows = Math.round((((window.innerHeight > 0) ? window.innerHeight : screen.height)) / s),
      // calculate number of background pizzas
      pizzas = rows * cols,
      [..]
    });

To save more SCRIPTING TIME, I calculated variables, where possible, outside the For Loops,
like the 5 phases in the function updatePositions():

    function updatePositions() {
      [..]
      var phases = [],
        top = document.body.scrollTop;
      // Calculates the five phases that animate the scrolling background pizzas outside the For Loop
      for (var x = 0; x < 5; x++) { phases[x] = Math.sin((top / 1250) + x) };
      [..]
    }

... I accessed, where possible, the DOM outside the For Loops and I avoided to calculate
unnecessary values like 'dx':

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

The next change reduced the SCRIPTING TIME, too. There is no need to access the DOM element
for every single scroll. Therefore, I created an array variable 'items', that has a reference
to all of the pizzas that have the class name "mover":

    // Array for moving pizza objects
    [..]
    var items = [];
    [..]
    document.addEventListener('DOMContentLoaded', function() {
      [...]
      // Access the DOM outside the For Loop
      pizzasDiv = document.getElementById("movingPizzas1");
      [..]
      // Get all moving pizza objects from the DOM and put them into one array to reduce DOM access
      items = document.getElementsByClassName('mover');
      [..]
    });

Furthermore, I reduced the LAYOUT TIME by using faster methods to access the DOM (for example:
'document.getElementsByClassName()' instead of 'document.querySelectorAll()'):

    function changePizzaSizes(size) {
      [..]
      var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
      [..]
    }

    document.addEventListener('DOMContentLoaded', function() {
      [..]
      for (var i = 0; i < 25; i++) {
        [..]
        document.getElementById("movingPizzas1").appendChild(elem);
      }
      [..]
    });

    document.addEventListener('DOMContentLoaded', function() {
      [..]
      items = document.getElementsByClassName('mover');
      [..]
    });

Even if the performance gain is not so big, I was curious to implement the CSS3 hardware acceleration
with 'transform: translateX()', and to avoid to trigger re-layout:

    function updatePositions() {
      [...]
      for (var i = 0; i < items.length; i++) {
        items[i].style.transform = 'translateX(' + parseInt(items[i].basicLeft + 100 * phases[i % 5] - halfScreenWidth ) + 'px' + ')';
      }
      [...]
    }

Then, I reduced the PAINT TIME by forcing each moving pizza into its own composite layer to let the
Graphics Processing Unit do the work. Adding 'backface-visibility' to the css mover class in
'views/css/style.css' did the trick:

    .mover {
      position: fixed;
      width: 256px;
      transform: translateZ(0);
      backface-visibility: hidden;
      z-index: -1;
    }

When we scroll now, the browser will only repaint the pixels that are affected by the moving pizzas.
There is no need anymore to repaint the whole screen.

Finally, I created an own optimized image file ('views/images/pizza-100.png') for the background pizza,
having the exact size it has on a normal desktop screen. The resizable pizza got it's own optimized image
file ('views/images/pizza-200.png'), too.

### Contact

My email address k.zysk@zoho.com
